import React from "react";
import NetworkExplorer from "@/components/accounts/NetworkExplorer";
import TotalAccounts from "@/components/accounts/TotalAccounts";
import Accounts from "@/components/accounts/Accounts";
import { csv2json } from "@/lib/utils/csvToArray";

const getAccounts = async () => {
  let isloading = true;
  const response = await fetch(
    "https://assets.verida.io/metrics/network/mainnet/stats.csv",
    { cache: "no-store" }
  );
  if (!response.ok) {
    isloading = false;
    throw new Error("Failed to fetch data");
  }

  let data: {
    datetime_utc: string;
    activedids: string;
  }[] = csv2json(await response.text());
  isloading = false;

  return {
    AccountData: data.map((item) => [
      new Date(item.datetime_utc).getTime(),
      Number(item.activedids),
    ]),
    isLoading: isloading,
  };
};

const Home = async () => {
  const AccountData = await getAccounts();
  return (
    <div>
      <NetworkExplorer />
      <TotalAccounts data={AccountData} />
      <Accounts />
    </div>
  );
};

export default Home;
