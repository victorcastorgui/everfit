import Reveal from "@/utils/Reveal";
import Image from "next/image";
function HomePage() {
  return (
    <>
      <div className=" flex flex-col justify-center bg-[url('/images/gym.jpg')] bg-cover h-[35rem] brightness-50 text-white text-center">
        <Reveal>
          <h3 className="text-[4rem]">
            The Greatest Wealth is <br />
            <b>Health</b>
          </h3>
        </Reveal>
        <Reveal>
          <h4 className="text-[2rem]">- Virgil -</h4>
        </Reveal>
      </div>
      <div className="flex flex-col items-center bg-black h-[20rem] mt-[2rem]">
        <h3 className="text-white text-[2rem] mt-[2rem]">Sponsored By</h3>
        <div className="grid grid-cols-3 bg-white h-[11rem] w-[85%] rounded-[0.5rem] mt-[1rem] content-center place-items-center gap-y-2">
          <Reveal>
            <Image
              src="/images/gymshark.png"
              width={80}
              height={80}
              alt="gymshark logo"
            />
          </Reveal>
          <Reveal>
            <Image
              src="/images/alo.png"
              width={80}
              height={80}
              alt="alo logo"
            />
          </Reveal>
          <Reveal>
            <Image
              src="/images/youngla.png"
              width={80}
              height={80}
              alt="youngla logo"
            />
          </Reveal>
          <Reveal>
            <Image
              src="/images/nike.png"
              width={80}
              height={80}
              alt="nike logo"
            />
          </Reveal>
          <Reveal>
            <Image
              src="/images/adidas.png"
              width={80}
              height={80}
              alt="adidas logo"
            />
          </Reveal>
          <Reveal>
            <Image
              src="/images/lululemon.png"
              width={80}
              height={80}
              alt="lululemon logo"
            />
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default HomePage;
