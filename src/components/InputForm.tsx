import { InputHTMLAttributes } from "react";

function InputForm(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input className="text-black bg-white w-full p-4" {...props} />
    </>
  );
}

export default InputForm;
