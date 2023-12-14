/* eslint-disable @next/next/no-img-element */
import ChangeMembership from "@/components/ChangeMembership";
import PageTitle from "@/components/PageTitle";
import TopUpModal from "@/components/TopUpModal";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

interface Cloudinary {
  secure_url: string;
}

function Profile() {
  const router = useRouter();
  const { fetchData: putFetchData } = useFetch<User>();
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [topUpModal, setShowTopUpModal] = useState(false);
  const [memberModal, setShowMemberModal] = useState(false);
  const id = Cookie.get("id");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, isLoading } = useSWR(`${API_URL}/users/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("token");
    Cookie.remove("role");
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
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: link,
      }),
    };
    putFetchData(URL, options);
  };

  return (
    <div>
      <div className="text-center">
        <PageTitle>Profile Settings</PageTitle>
      </div>
      <div className="w-[85%] m-auto mt-[2rem] h-[30rem] rounded-[0.5rem] bg-black text-white">
        <div className="flex w-[85%] h-[100%] m-auto justify-between items-center">
          <div className="flex flex-col text-[1]">
            <div className="h-[10rem] w-[10rem] rounded-full object-cover">
              <img
                src={data?.image}
                className="h-[100%] w-[100%]"
                alt="user profile image"
              />
            </div>
            <div className="flex gap-[1rem] justify-center items-center">
              <label htmlFor="profile">
                <Image
                  src="/icons/upload-profile.png"
                  alt="upload picture icon"
                  width={30}
                  height={30}
                />
              </label>
              <input
                className="hidden"
                type="file"
                id="profile"
                onChange={handlePictureChange}
              />
              <button
                className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
                onClick={handleUpload}
              >
                Save
              </button>
            </div>
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
            <p>Membership: {data?.membership.toUpperCase()}</p>
            <button
              onClick={() => setShowMemberModal(true)}
              className="text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
            >
              Change Membership Plan
            </button>
          </div>
        </div>
      </div>
      <button onClick={logout}>Logout</button>
      {topUpModal ? (
        <TopUpModal setShowTopUpModal={setShowTopUpModal} data={data as User} />
      ) : (
        <></>
      )}
      {memberModal ? (
        <ChangeMembership
          setShowMemberModal={setShowMemberModal}
          data={data as User}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
