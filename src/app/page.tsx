import React from "react";
import NetworkExplorer from "@/components/accounts/NetworkExplorer";
import { IdentitiesStatsSection } from "@/components/accounts/IdentitiesStatsSection";
import { IdentitiesTable } from "@/components/accounts/IdentitiesTable";
import { csv2json } from "@/lib/utils/csvToArray";
import { Separator } from "@/components/ui/separator";
import { getIdentitiesStatsFileUrl } from "@/features/identities/utils";
import { serverEnvVars } from "@/config/server";

const getIdentitiesStats = async () => {
  let isloading = true;

  const url = getIdentitiesStatsFileUrl(
    serverEnvVars.NEXT_PUBLIC_VERIDA_NETWORK
  );

  const response = await fetch(url, { cache: "no-store" });
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

export default async function HomePage() {
  const identitiesStatsData = await getIdentitiesStats();

  return (
    <div className="flex flex-col gap-16">
      <NetworkExplorer />
      <Separator className="hidden md:block" />
      <IdentitiesStatsSection data={identitiesStatsData} />
      <IdentitiesTable />
    </div>
  );
}
