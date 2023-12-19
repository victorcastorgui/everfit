import ErrorMessage from "@/components/ErrorMessage";
import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface Cloudinary {
  secure_url: string;
}

function AddEvent() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [cloudinaryLink, setCloudinaryLink] = useState("");

  const [nameError, setNameError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [capacityError, setCapacityError] = useState(false);

  const { fetchData } = useFetch();
  const { push } = useRouter();
  useEffect(() => {
    if (name.length < 10) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString().slice(0, 16);
    setCurrentDateTime(currentDateTime);
  }, []);

  useEffect(() => {
    if (startTime === "") {
      setStartTimeError(true);
    } else {
      setStartTimeError(false);
    }
  }, [startTime]);

  useEffect(() => {
    if (duration.length < 7) {
      setDurationError(true);
    } else {
      setDurationError(false);
    }
  }, [duration]);

  useEffect(() => {
    if (category === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  }, [category]);

  useEffect(() => {
    if (selectedPicture === null) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }, [selectedPicture]);

  useEffect(() => {
    if (price < 0 || price > 2000000) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }, [price]);

  useEffect(() => {
    if (description.length < 10) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }, [description]);

  useEffect(() => {
    if (capacity < 0 || capacity > 100) {
      setCapacityError(true);
    } else {
      setCapacityError(false);
    }
  }, [capacity]);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedPicture(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedPicture) {
      const cloudinaryUploadResponse: Cloudinary = await uploadToCloudinary(
        selectedPicture
      );
      setCloudinaryLink(cloudinaryUploadResponse.secure_url);
    }
  };

  const uploadToCloudinary = async (picture: File): Promise<Cloudinary> => {
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("upload_preset", "everfit");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/adminmatoa/image/upload",
      { method: "POST", body: formData }
    );
    return response.json();
  };

  const updateJsonServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${API_URL}/events`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        startTime: startTime,
        duration: duration,
        category: category,
        price: price,
        image: cloudinaryLink,
        description: description,
        capacity: capacity,
      }),
    };
    await fetchData(URL, options);
  };

  const hasError =
    nameError ||
    startTimeError ||
    durationError ||
    categoryError ||
    imageError ||
    priceError ||
    descriptionError ||
    capacityError;

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] flex flex-col items-center">
        <PageTitle>Add Event</PageTitle>
        <form
          className="mb-[2rem] rounded-[0.5rem] w-[80%] flex flex-col gap-[1rem]"
          onSubmit={(e) => updateJsonServer(e)}
        >
          <div>
            <label htmlFor="name">Event Name:</label>
            <InputForm
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event name here..."
              id="name"
            />
            {nameError && (
              <ErrorMessage>Name must be more than 10 letters</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="datetime">Date & Time:</label>
            <InputForm
              className="bg-white [&::-webkit-calendar-picker-indicator]:bg-black [&::-webkit-calendar-picker-indicator]:rounded-[0.5rem] [&::-webkit-calendar-picker-indicator]:p-[0.5rem] w-full p-4"
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
              id="datetime"
              min={currentDateTime}
            />
            {startTimeError && (
              <ErrorMessage>Date and Time is required</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <InputForm
              type="text"
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration here..."
              id="duration"
            />
            {durationError && (
              <ErrorMessage>Duration is required. Ex: {"2 Hours"}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              className="bg-white w-full p-4"
              onChange={(e) => setCategory(e.target.value)}
              id="category"
            >
              <option selected disabled>
                Select Category
              </option>
              <option value="marathon">Marathon</option>
              <option value="yoga">Yoga</option>
              <option value="cycling">Cycling</option>
              <option value="martial art">Martial Art</option>
              <option value="racket sports">racker sports</option>
              <option value="swimming">swimming</option>
              <option value="football">football</option>
            </select>
            {categoryError && <ErrorMessage>Category is required</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <InputForm type="file" id="image" onChange={handlePictureChange} />
            <button type="button" onClick={handleUpload}>
              Upload
            </button>
            {imageError && <ErrorMessage>Image is required</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <InputForm
              type="number"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder="Enter price here..."
              id="price"
              value={price}
              min={0}
            />
            {priceError && (
              <ErrorMessage>
                Price cannot be less than {IDRFormat.format(0)} and more than{" "}
                {IDRFormat.format(2000000)}
              </ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              className="resize-none bg-white w-full"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
            />
            {descriptionError && (
              <ErrorMessage>
                Description must have atleast 10 letters
              </ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="capacity">Capacity:</label>
            <InputForm
              type="number"
              onChange={(e) => setCapacity(parseInt(e.target.value))}
              placeholder="Enter Capacity here..."
              id="capacity"
              value={capacity}
              min={0}
            />
            {capacityError && (
              <ErrorMessage>
                Capacity must not be less than 0 and more than 100
              </ErrorMessage>
            )}
          </div>
          <InputForm
            className="bg-black border-[2px] border-black text-white hover:bg-white hover:text-black p-4 disabled:cursor-not-allowed disabled:bg-gray-500"
            type="submit"
            disabled={hasError}
          />
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
