import Complete from "@/components/Complete";
import Merchandise from "@/components/Merchandise";
import Payment from "@/components/Payment";
import Stepper from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { Purchase } from "@/types/types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EventPurchaseId() {
  const [currentStep, setCurrentStep] = useState(1);
  const userId = Cookies.get("id");
  const { query } = useRouter();
  const eventId = parseInt(query.eventPurchaseId as string);
  console.log(eventId);
  const [purchaseData, setPurchaseData] = useState<Purchase>({
    paymentTotal: 0,
    eventId: eventId,
    purchaseDate: new Date(),
    merchs: [],
    paymentStatus: false,
    userId: parseInt(userId as string),
  });

  useEffect(() => {
    if (eventId) {
      setPurchaseData((prevPurchaseData) => ({ ...prevPurchaseData, eventId }));
    }
  }, [eventId]);

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Merchandise
            purchaseData={purchaseData}
            setPurchaseData={setPurchaseData}
            eventId={eventId}
          />
        );
      case 2:
        return <Payment purchaseData={purchaseData} eventId={eventId} />;
      case 3:
        return <Complete />;
      default:
    }
  };
  console.log(purchaseData);
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
