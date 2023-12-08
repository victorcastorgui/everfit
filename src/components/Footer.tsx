import Logo from "./Logo";

function Footer() {
  return (
    <div className="bg-black h-[15rem] mt-[2rem]">
      <div className="flex flex-col justify-center gap-[2rem] w-[85%] h-[100%] m-auto text-white">
        <Logo />
        <div className="flex justify-between">
          <p>Copyright 2023 &copy; EVERFIT</p>
          <ul className="flex gap-[1rem]">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
