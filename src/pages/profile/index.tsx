/* eslint-disable @next/next/no-img-element */
import ChangeMembership from "@/components/ChangeMembership";
import PageTitle from "@/components/PageTitle";
import TopUpModal from "@/components/TopUpModal";
import { useFetch } from "@/hooks/useFetch";
import useProfile from "@/hooks/useProfile";
import { User } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import Reveal from "@/utils/Reveal";
import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Cloudinary {
  secure_url: string;
}

function Profile() {
  const router = useRouter();
  const { data: updatedData, fetchData: putFetchData } = useFetch<User>();
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [topUpModal, setShowTopUpModal] = useState(false);
  const [memberModal, setShowMemberModal] = useState(false);
  const id = Cookie.get("id");
  const { data, isLoading, getProfile } = useProfile(`${API_URL}/users/${id}`);

  useEffect(() => {
    if (updatedData !== null) {
      getProfile();
    }
  }, [updatedData]);

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
      <div className="w-[85%] max-w-[60rem] m-auto mt-[2rem] min-[800px]:h-[30rem] rounded-[0.5rem] bg-black text-white">
        <div className="max-[800px]:py-[2rem] max-[800px]:flex-col flex w-[85%] h-[100%] m-auto justify-between items-center">
          <div className="flex flex-col">
            <div className="h-[16rem] w-[16rem] rounded-full object-cover">
              <Reveal>
                <img
                  src={data?.image}
                  className="h-[100%] w-[100%]"
                  alt="user profile image"
                />
              </Reveal>
            </div>
            <div className="flex gap-[1rem] mt-[1rem] justify-center items-center">
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
            <Reveal>
              <p className="mt-[1rem] text-center text-[1.5rem]">
                Balance: {data?.balance}
              </p>
            </Reveal>
            <button
              onClick={() => setShowTopUpModal(true)}
              className="mt-[1rem] text-[1.3rem] text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
            >
              Top Up
            </button>
          </div>
          <div className="max-[800px]:pt-[1rem] flex flex-col gap-[1rem] text-[1.5rem]">
            <Reveal>
              <p>ID: {data?.id}</p>
            </Reveal>
            <Reveal>
              <p>Name: {data?.name}</p>
            </Reveal>
            <Reveal>
              <p>Email: {data?.email}</p>
            </Reveal>
            <Reveal>
              <p>Membership: {data?.membership?.toUpperCase()}</p>
            </Reveal>
            <button
              onClick={() => setShowMemberModal(true)}
              className="text-[1.3rem] text-white py-[0.2rem] px-[0.6rem] border-white border-[1px] rounded-[0.5rem]"
            >
              Change Membership Plan
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-[85%] m-auto justify-center text-[1.3rem] mt-[2rem]">
        <button
          onClick={logout}
          className="bg-black rounded-[0.5rem] p-[0.5rem] text-white"
        >
          Logout
        </button>
      </div>
      {topUpModal ? (
        <TopUpModal
          setShowTopUpModal={setShowTopUpModal}
          getProfile={getProfile}
          data={data as User}
        />
      ) : (
        <></>
      )}
      {memberModal ? (
        <ChangeMembership
          setShowMemberModal={setShowMemberModal}
          getProfile={getProfile}
          data={data as User}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
