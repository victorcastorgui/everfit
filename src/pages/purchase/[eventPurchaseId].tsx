import Complete from "@/components/Complete";
import Merchandise from "@/components/Merchandise";
import Payment from "@/components/Payment";
import Stepper from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { useFetch } from "@/hooks/useFetch";
import { Purchase } from "@/types/types";
import { API_URL } from "@/utils/API_URL";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

function EventPurchaseId() {
  const [disable, setDisable] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const userId = Cookies.get("id");
  const { query } = useRouter();
  const { fetchData } = useFetch<Purchase>();
  const { fetchData: patchUserData } = useFetch<Purchase>();
  const eventId = parseInt(query.eventPurchaseId as string);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: userData } = useSWR(`${API_URL}/users/${userId}`, fetcher);
  const [purchaseData, setPurchaseData] = useState<Purchase>({
    paymentTotal: 0,
    eventId: eventId,
    purchaseDate: new Date(),
    merchs: [],
    paymentStatus: true,
    discount: 0,
    userId: parseInt(userId as string),
  });

  useEffect(() => {
    if (eventId) {
      setPurchaseData((prevPurchaseData) => ({ ...prevPurchaseData, eventId }));
    }
  }, [eventId]);

  const handleBuyEvent = () => {
    const URL = `${API_URL}/purchases`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchaseData),
    };
    fetchData(URL, options);

    toast.success("Order created successfully");

    const newBalance = userData.balance - purchaseData.paymentTotal;

    const UserBalanceUpdateURL = `${API_URL}/users/${userId}`;
    const userUpdateOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        balance: newBalance,
      }),
    };
    patchUserData(UserBalanceUpdateURL, userUpdateOptions);
  };

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
        return (
          <Payment
            purchaseData={purchaseData}
            eventId={eventId}
            setDisable={setDisable}
            setPurchaseData={setPurchaseData}
          />
        );
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
        handleBuyEvent={handleBuyEvent}
        disable={disable}
      />
    </div>
  );
}

export default EventPurchaseId;
