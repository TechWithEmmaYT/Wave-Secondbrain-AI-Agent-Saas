import React from "react";
import Header from "../_common/header";
import PricingSection from "./_common/pricing-section";

const Billing = () => {
  return (
    <>
      <Header title="Billings" />
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <PricingSection />
        </div>
      </div>
    </>
  );
};

export default Billing;
