import React from "react";
import NetworkExplorer from "@/components/account/NetworkExplorer";
import TotalAccounts from "@/components/account/TotalAccounts";
import Accounts from "@/components/account/Accounts";

const Home = () => {
  return (
    <div >
      <NetworkExplorer />
      <TotalAccounts />
      <Accounts />
    </div>
  );
};

export default Home;
