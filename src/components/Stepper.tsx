function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ul className="steps">
      <li className="step step-neutral">Merchandise</li>
      {currentStep >= 2 ? (
        <li className="step step-neutral">Payment Method</li>
      ) : (
        <li className="step">Payment Method</li>
      )}
      {currentStep === 3 ? (
        <li className="step step-neutral">Complete</li>
      ) : (
        <li className="step">Complete</li>
      )}
    </ul>
  );
}

export default Stepper;
