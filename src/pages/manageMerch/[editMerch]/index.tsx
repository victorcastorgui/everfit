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
import useSWR from "swr";

interface Cloudinary {
  secure_url: string;
}

interface MerchEdit {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  eventId: number;
  stock: number;
}
function EditMerch() {
  const { fetchData } = useFetch();
  const { query, push } = useRouter();
  const merchId = query.editMerch;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR<MerchEdit>(`${API_URL}/merchs/${merchId}`, fetcher);
  const { data: eventData } = useEvent(`${API_URL}/events`);

  const [merchData, setMerchData] = useState<MerchEdit>({
    id: parseInt(merchId as string),
    name: "",
    desc: "",
    price: 0,
    image: "",
    eventId: 0,
    stock: 0,
  });
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [eventIdError, setEventIdError] = useState(false);

  useEffect(() => {
    setMerchData(data as MerchEdit);
  }, [data]);

  useEffect(() => {
    if (merchData?.name.length < 5) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [merchData?.name]);

  useEffect(() => {
    if (merchData?.stock === 0) {
      setStockError(true);
    } else {
      setStockError(false);
    }
  }, [merchData?.stock]);

  useEffect(() => {
    if (merchData?.price < 0) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  }, [merchData?.price]);

  useEffect(() => {
    if (merchData?.desc.length < 10) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  }, [merchData?.desc]);

  useEffect(() => {
    if (merchData?.eventId === null) {
      setEventIdError(true);
    } else {
      setEventIdError(false);
    }
  }, [merchData?.eventId]);

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
      setMerchData({
        ...merchData,
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

  const updateMerch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = `${API_URL}/merchs`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(merchData),
    };
    await fetchData(URL, options);
    push("/manageMerch");
  };

  const hasError =
    nameError || descriptionError || priceError || stockError || eventIdError;
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
            <label htmlFor="name">Merch Name:</label>
            <InputForm
              type="text"
              onChange={(e) =>
                setMerchData({ ...merchData, name: e.target.value })
              }
              placeholder="Enter event name here..."
              id="name"
              value={merchData?.name}
            />
            {nameError && (
              <ErrorMessage>Name must be more than 10 letters</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <div className="h-[10rem] w-[10rem] object-cover mb-2 border-[2px] rounded-[0.5rem] p-4">
              <img src={merchData?.image} alt="event image" />
            </div>
            <InputForm type="file" id="image" onChange={handlePictureChange} />
            <button
              className=" mt-2 px-4 py-2 rounded-[0.5rem] bg-black text-white border-[2px] border-black hover:bg-white hover:text-black"
              type="button"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              className="resize-none bg-white w-full"
              onChange={(e) =>
                setMerchData({ ...merchData, desc: e.target.value })
              }
              placeholder="Enter description here..."
              value={merchData?.desc}
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
              onChange={(e) =>
                setMerchData({ ...merchData, price: parseInt(e.target.value) })
              }
              placeholder="Enter price here..."
              id="price"
              value={merchData?.price}
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
              onChange={(e) =>
                setMerchData({ ...merchData, stock: parseInt(e.target.value) })
              }
              placeholder="Enter stock here..."
              id="stock"
              value={merchData?.stock}
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
              onChange={(e) =>
                setMerchData({
                  ...merchData,
                  eventId: parseInt(e.target.value),
                })
              }
              id="category"
              defaultValue={merchData?.eventId}
            >
              <option value="select category" disabled>
                Select Event
              </option>
              {eventData?.map((item, index) => (
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

export default EditMerch;
