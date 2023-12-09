/* eslint-disable @next/next/no-img-element */
import PageTitle from "@/components/PageTitle";
import TopUpModal from "@/components/TopUpModal";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import { getCookie, removeCookie } from "@/utils/CheckCookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Cloudinary {
  secure_url: string;
}

function Profile() {
  const router = useRouter();
  const { data, isLoading, fetchData } = useFetch<User>();
  const { fetchData: putFetchData } = useFetch<User>();
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [topUpModal, setShowTopUpModal] = useState(false);

  useEffect(() => {
    const id = getCookie("id");
    const URL = `${API_URL}/users/${id}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(URL, options);
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  const logout = () => {
    removeCookie("id");
    removeCookie("token");
    removeCookie("role");
    router.push("/auth/login");
  };

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
      const cloudinaryLink = cloudinaryUploadResponse.secure_url;
      await updateJsonServer(data?.id as number, cloudinaryLink);
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

  const updateJsonServer = async (userId: number, link: string) => {
    const URL = `${API_URL}/users/${userId}`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
        name: data?.name,
        email: data?.email,
        password: data?.password,
        role: data?.role,
        balance: data?.balance,
        membership: data?.membership,
        image: link,
      }),
    };
    putFetchData(URL, options);

    const id = getCookie("id");
    const reFetchURL = `${API_URL}/users/${id}`;
    const reFetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetchData(reFetchURL, reFetchOptions);
  };

  return (
    <div>
      <div className="text-center">
        <PageTitle>Profile Settings</PageTitle>
      </div>
      <div className="w-[85%] m-auto mt-[2rem] h-[25rem] rounded-[0.5rem] bg-black text-white">
        <div className="flex w-[85%] h-[100%] m-auto justify-between items-center">
          <div className="flex flex-col text-[1]">
            <div className="h-[10rem] w-[10rem] rounded-full object-cover">
              <img
                src={data?.image}
                className="h-[100%] w-[100%]"
                alt="user profile image"
              />
            </div>
            <input type="file" onChange={handlePictureChange} />
            <button onClick={handleUpload}>Upload Picture</button>
            <p>Balance: {data?.balance}</p>
            <button
              onClick={() => setShowTopUpModal(true)}
              className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
            >
              Top Up
            </button>
          </div>
          <div className="text-[1]">
            <p>ID: {data?.id}</p>
            <p>Name: {data?.name}</p>
            <p>Email: {data?.email}</p>
            <p>Membership: {data?.membership}</p>
            <button className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]">
              Change Membership Plan
            </button>
          </div>
        </div>
      </div>
      <button onClick={logout}>Logout</button>
      {topUpModal ? (
        <TopUpModal setShowModal={setShowTopUpModal} data={data as User} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
