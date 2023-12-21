/* eslint-disable @next/next/no-img-element */
import BackPage from "@/components/BackPage";
import ErrorMessage from "@/components/ErrorMessage";
import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import { useFetch } from "@/hooks/useFetch";
import { Event } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

interface Cloudinary {
  secure_url: string;
}

function EditEvent() {
  const { query } = useRouter();
  const eventId = query.editEvent;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<Event>(`${API_URL}/events/${eventId}`, fetcher);
  const { fetchData } = useFetch();
  const { push } = useRouter();
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [eventData, setEventData] = useState<Event>({
    id: parseInt(eventId as string),
    name: "",
    startTime: "",
    duration: "",
    category: "",
    price: 0,
    image: "",
    description: "",
    capacity: 0,
  });
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [nameError, setNameError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [capacityError, setCapacityError] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString().slice(0, 16);
    setCurrentDateTime(currentDateTime);
  }, []);

  useEffect(() => {
    setEventData(data as Event);
  }, [data]);

  useEffect(() => {
    if (eventData?.name.length < 10) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [eventData?.name]);

  useEffect(() => {
    const currentDate = new Date();
    const currentDateTime = currentDate.toISOString().slice(0, 16);
    setCurrentDateTime(currentDateTime);
  }, []);

  useEffect(() => {
    if (eventData?.startTime === "") {
      setStartTimeError(true);
    } else {
      setStartTimeError(false);
    }
  }, [eventData?.startTime]);

  useEffect(() => {
    if (eventData?.duration.length < 6) {
      setDurationError(true);
    } else {
      setDurationError(false);
    }
  }, [eventData?.duration]);

  useEffect(() => {
    if (eventData?.category === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  }, [eventData?.category]);

  useEffect(() => {
    if (eventData?.price < 0 || eventData?.price > 2000000) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }, [eventData?.price]);

  useEffect(() => {
    if (eventData?.description.length < 10) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }, [eventData?.description]);

  useEffect(() => {
    if (eventData?.capacity < 0 || eventData?.capacity > 100) {
      setCapacityError(true);
    } else {
      setCapacityError(false);
    }
  }, [eventData?.capacity]);

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
      setEventData({
        ...eventData,
        image: cloudinaryUploadResponse.secure_url,
      });
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
    const URL = `${API_URL}/events/${eventId}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    };
    await fetchData(URL, options);
    toast.success("Event update successful");
    push("/manageEvents");
  };

  const hasError =
    nameError ||
    startTimeError ||
    durationError ||
    categoryError ||
    priceError ||
    descriptionError ||
    capacityError;

  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] flex flex-col items-center">
        <PageTitle>Add Event</PageTitle>
        <div className="flex w-[80%] mb-4">
          <BackPage props={() => push("/manageEvents")} />
        </div>
        <form
          className="mb-[2rem] rounded-[0.5rem] w-[80%] flex flex-col gap-[1rem]"
          onSubmit={(e) => updateJsonServer(e)}
        >
          <div>
            <label htmlFor="name">Event Name:</label>
            <InputForm
              type="text"
              value={eventData?.name}
              onChange={(e) =>
                setEventData({ ...eventData, name: e.target.value })
              }
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
              onChange={(e) =>
                setEventData({ ...eventData, startTime: e.target.value })
              }
              id="datetime"
              min={currentDateTime}
              value={eventData?.startTime}
            />
            {startTimeError && (
              <ErrorMessage>Date and Time is required</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <InputForm
              type="text"
              onChange={(e) =>
                setEventData({ ...eventData, duration: e.target.value })
              }
              placeholder="Enter duration here..."
              id="duration"
              value={eventData?.duration}
            />
            {durationError && (
              <ErrorMessage>Duration is required. Ex: {"2 Hours"}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              className="bg-white w-full p-4"
              onChange={(e) =>
                setEventData({ ...eventData, category: e.target.value })
              }
              id="category"
              value={eventData?.category}
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
            <div className="h-[10rem] w-[10rem] object-cover mb-2 border-[2px] rounded-[0.5rem] p-4">
              <img
                className="w-full h-full"
                src={eventData?.image}
                alt="event image"
              />
            </div>
            <InputForm type="file" id="image" onChange={handlePictureChange} />
            <button type="button" onClick={handleUpload}>
              Upload
            </button>
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <InputForm
              type="number"
              onChange={(e) =>
                setEventData({ ...eventData, price: parseInt(e.target.value) })
              }
              placeholder="Enter price here..."
              id="price"
              value={eventData?.price}
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
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              placeholder="Enter description here..."
              value={eventData?.description}
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
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  capacity: parseInt(e.target.value),
                })
              }
              placeholder="Enter Capacity here..."
              id="capacity"
              value={eventData?.capacity}
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

export default EditEvent;
