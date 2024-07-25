import Distribution from "@/components/nodes/Distribution";
import NodesList from "@/components/nodes/NodesList";
import React from "react";
// import Overview from "@/components/nodes/Overview";
import { csv2json } from "@/lib/utils/csvToArray";

import { COUNTRY_CODES } from "@/lib/constants/misc";

export interface CountrySummary {
  country: string;
  latitude: number | undefined;
  longitude: number | undefined;
  count: number;
}

type DistributionType = {
  summary: CountrySummary[];
  isLoading: boolean;
};

const getStorageOverView = async () => {
  let isLoading = true;
  const response = await fetch(
    "https://assets.verida.io/metrics/nodes/node2-southeastasia.mnaz.verida.tech/stats.csv"
  );
  if (!response.ok) {
    isLoading = false;
    throw new Error("Failed to fetch data");
  }

  const data = await response.text();

  let converted_data: {
    datetime_utc: string;
    max_storage_slots: string;
    storage_slots_used: string;
  }[] = csv2json(data);

  isLoading = false;
  return {
    converted_data,
    isLoading,
  };
};

const getDistributions = async () => {
  let isLoading = true;
  const response = await fetch(
    "https://assets.verida.io/registry/storageNodes/mainnet.json",
    {
      method: "get",
    }
  );
  if (!response.ok) {
    isLoading = false;
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    isLoading = false;
  }
  const data: any[] = await response.json();

  // remove repeating countries and add long,lat properties
  const countryCounts = data.reduce((acc, country) => {
    const countryLocation = country["countryLocation"];
    if (!acc[countryLocation]) {
      acc[countryLocation] = { ...country, count: 1 };
    } else {
      acc[countryLocation].count += 1;
    }
    return acc;
  }, {});

  const summary = Object.values(countryCounts).map((country: any) => {
    const countryData = COUNTRY_CODES.find(
      (c) => c.alpha2 === country["countryLocation"]
    );
    return {
      country: country["countryLocation"],
      latitude: countryData?.latitude,
      longitude: countryData?.longitude,
      count: country.count,
    };
  });
  isLoading = false;
  return {
    summary,
    isLoading,
  };
};
const NodesPage = async () => {
  const data = await getStorageOverView();
  const distribution = await getDistributions();
  return (
    <div className="py-6">
      {/* <Overview StorageOverView={data} /> */}
      <Distribution
        summary={distribution.summary}
        isLoading={distribution.isLoading}
      />
      <NodesList />
    </div>
  );
};

export default NodesPage;
