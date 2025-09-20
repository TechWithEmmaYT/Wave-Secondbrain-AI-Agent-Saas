import React from "react";
import MainSection from "./_common/main-section";
import { generateUUID } from "@/lib/utils";

const Home = async () => {
  const id = generateUUID();

  return <MainSection key={id} id={id} />;
};

export default Home;
