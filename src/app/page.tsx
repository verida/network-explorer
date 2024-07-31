import React from "react";
import NetworkExplorer from "@/components/accounts/NetworkExplorer";
import TotalAccounts from "@/components/accounts/TotalAccounts";
import Accounts from "@/components/accounts/Accounts";
import { csv2json } from "@/lib/utils/csvToArray";
import { Separator } from "@/components/ui/separator";

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

// const getProfiles = async (pageNum:number,limitNum:number)=>{
//   const dids = await getDIDs(BlockchainAnchor.POLPOS, pageNum, limitNum);

//       const profiles = await Promise.all(
//         dids.map(async (did: string) => {
//           try {
//             return await getAnyPublicProfile(config.client, did);
//           } catch (error) {
//             console.error(`Failed to get profile for DID: ${did}`, error);
//             return null; // or handle the error as needed
//           }
//         })
//       );

//       return profiles.filter(
//         (profile) => profile !== null || profiles !== undefined
//       );
// }

const Home = async () => {
  const AccountData = await getAccounts();
  return (
    <div className="flex flex-col gap-16">
      <NetworkExplorer />
      <Separator className="hidden bg-foreground/20 md:block" />
      <TotalAccounts data={AccountData} />
      <Accounts />
    </div>
  );
};

export default Home;
