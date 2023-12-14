import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const StepperController = ({
  currentStep,
  setCurrentStep,
  handleBuyEvent,
  disable,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleBuyEvent: () => void;
  disable: boolean;
}) => {
  const { push } = useRouter();
  const handleClose = () => {
    push("/events");
  };
  return (
    <div className="flex  justify-end w-[85%] m-auto gap-3">
      {currentStep === 1 || currentStep === 3 ? (
        <></>
      ) : (
        <button
          className="rounded-[0.5rem] bg-white border-[2px] text-black hover:border-[2px] hover:border-black hover:text-black hover:bg-white text-[1.3rem] w-28 h-10"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </button>
      )}
      {currentStep === 3 ? (
        <button
          onClick={handleClose}
          className="rounded-[0.5rem] bg-black border-[2px] border-black text-white hover:border-[2px] hover:text-black hover:bg-white text-[1.3rem] w-28 h-10"
        >
          Close
        </button>
      ) : (
        <>
          {currentStep === 1 ? (
            <button
              className="rounded-[0.5rem] bg-black border-[2px] border-black text-white hover:border-[2px] hover:text-black hover:bg-white text-[1.3rem] w-28 h-10"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="rounded-[0.5rem] bg-black border-[2px] border-black text-white hover:border-[2px] hover:text-black hover:bg-white text-[1.3rem] w-28 h-10"
              onClick={() => {
                handleBuyEvent;
                setCurrentStep(currentStep + 1);
              }}
              disabled={disable}
            >
              Confirm
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default StepperController;
