import React, { memo } from "react";
import CommonLayout from "@/layouts/CommonLayout";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <CommonLayout />
      Home
    </>
  );
};

export default memo(Home);
