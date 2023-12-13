import Complete from "@/components/Complete";
import Merchandise from "@/components/Merchandise";
import Payment from "@/components/Payment";
import Stepper from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { useState } from "react";

function EventPurchaseId() {
  const [currentStep, setCurrentStep] = useState(1);
  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Merchandise />;
      case 2:
        return <Payment />;
      case 3:
        return <Complete />;
      default:
    }
  };
  return (
    <div className="flex flex-col items-center mt-8">
      <Stepper currentStep={currentStep} />
      {displayStep(currentStep)}
      <StepperController
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

export default EventPurchaseId;
