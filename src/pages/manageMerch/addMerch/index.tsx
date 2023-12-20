/* eslint-disable @next/next/no-img-element */
import BackPage from "@/components/BackPage";
import ErrorMessage from "@/components/ErrorMessage";
import InputForm from "@/components/InputForm";
import PageTitle from "@/components/PageTitle";
import useEvent from "@/hooks/useEvent";
import { useFetch } from "@/hooks/useFetch";
import { API_URL } from "@/utils/API_URL";
import { IDRFormat } from "@/utils/IDRFormat";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface Cloudinary {
  secure_url: string;
}

function AddMerch() {
  const { data } = useEvent(`${API_URL}/events`);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [eventId, setEventId] = useState<number | null>(null);
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [cloudinaryLink, setCloudinaryLink] = useState("");

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [eventIdError, setEventIdError] = useState(false);

  const { fetchData } = useFetch();
  const { push } = useRouter();

  useEffect(() => {
    if (name.length < 5) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  useEffect(() => {
    if (stock === 0) {
      setStockError(true);
    } else {
      setStockError(false);
    }
  }, [stock]);

  useEffect(() => {
    if (price < 0) {
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
    if (selectedPicture === null) {
      setImageError(true);
    } else {
      setImageError(false);
    }
  }, [selectedPicture]);

  useEffect(() => {
    if (eventId === null) {
      setEventIdError(true);
    } else {
      setEventIdError(false);
    }
  }, [eventId]);

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

  const updateMerch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${API_URL}/merchs`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        eventId: eventId,
        price: price,
        image: cloudinaryLink,
        desc: description,
        stock: stock,
      }),
    };
    await fetchData(URL, options);
    push("/manageMerch");
  };

  const hasError =
    nameError ||
    descriptionError ||
    priceError ||
    stockError ||
    imageError ||
    eventIdError;
  return (
    <div className="flex">
      <div className="w-[15%]"></div>
      <div className="w-[85%] flex flex-col items-center">
        <PageTitle>Add Merch</PageTitle>
        <div className="flex w-[80%] mb-4">
          <BackPage props={() => push("/manageMerch")} />
        </div>
        <form
          className="mb-[2rem] rounded-[0.5rem] w-[80%] flex flex-col gap-[1rem]"
          onSubmit={(e) => updateMerch(e)}
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
            <label htmlFor="image">Image:</label>
            <div className="h-[10rem] w-[10rem] object-cover mb-2 border-[2px] rounded-[0.5rem] p-4">
              {cloudinaryLink && <img src={cloudinaryLink} alt="event image" />}
            </div>
            <InputForm type="file" id="image" onChange={handlePictureChange} />
            <button
              className=" mt-2 px-4 py-2 rounded-[0.5rem] bg-black text-white border-[2px] border-black hover:bg-white hover:text-black"
              type="button"
              onClick={handleUpload}
            >
              Upload
            </button>
            {imageError && <ErrorMessage>Image is required</ErrorMessage>}
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
            <label htmlFor="stock">Stock:</label>
            <InputForm
              type="number"
              onChange={(e) => setStock(parseInt(e.target.value))}
              placeholder="Enter stock here..."
              id="stock"
              value={stock}
              min={1}
            />
            {stockError && (
              <ErrorMessage>Stock cannot be less than 1</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              className="bg-white w-full p-4"
              onChange={(e) => setEventId(parseInt(e.target.value))}
              id="category"
              defaultValue="select category"
            >
              <option value="select category" disabled>
                Select Event
              </option>
              {data?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.id} {item.name}
                </option>
              ))}
            </select>
            {eventIdError && <ErrorMessage>Category is required</ErrorMessage>}
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

export default AddMerch;
