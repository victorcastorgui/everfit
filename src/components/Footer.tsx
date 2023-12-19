import Reveal from "@/utils/Reveal";
import Logo from "./Logo";

function Footer() {
  return (
    <div className="bg-black h-[15rem] mt-[2rem] max-[800px]:h-[18rem]">
      <div className="flex flex-col justify-center gap-[2rem] w-[85%] h-[100%] m-auto text-white">
        <Reveal>
          <Logo />
        </Reveal>
        <Reveal>
          <div className="flex justify-between max-[800px]:flex-col">
            <p>Copyright 2023 &copy; EVERFIT</p>
            <ul className="flex gap-[1rem] max-[800px]:flex-col">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Contact</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Footer;
