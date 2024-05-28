import React from "react";
import NetworkExplorer from "@/components/accounts/NetworkExplorer";
import TotalAccounts from "@/components/accounts/TotalAccounts";
import Accounts from "@/components/accounts/Accounts";

const Home = () => {
  return (
    <div>
      <NetworkExplorer />
      <TotalAccounts />
      <Accounts />
    </div>
  );
};

export default Home;
