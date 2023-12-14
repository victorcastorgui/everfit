/* eslint-disable @next/next/no-img-element */

const Complete = () => {
  return (
    <div className="flex gap-[2rem] my-[2rem]">
      <div className="bg-white rounded-[0.5rem] flex flex-col justify-center items-center">
        <img src="/icons/confirmedorder.png" alt="confirmed order icon" />
        <h3 className="text-[1.5rem] text-center mb-[1rem]">Order Confirmed</h3>
        <div className="w-[60%] text-center m-auto mb-[1rem]">
          <p>
            Do not forget to check purchase history so you remember what you
            bought.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Complete;
