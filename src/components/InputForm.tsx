import { InputHTMLAttributes } from "react";

function InputForm(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input className="text-black" {...props} />
    </>
  );
}

export default InputForm;
