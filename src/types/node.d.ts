export type Node = {
  id: string;
  operator: string;
  slots: {
    count: number;
    total: number;
  };
  failure_reports: number;
  days_on_network: number;
  status: "Active" | "Deregister";
  date: string;
};
