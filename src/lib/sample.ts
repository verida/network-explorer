import { Node } from "@/types/node";
import { Account } from "@/types/account";

export const nodes: Node[] = [
  {
    id: "1234567890",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 30,
    status: "Active",
    date: "27d N 59h : 59m : 59s",
  },
  {
    id: "1234567891",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 40,
    status: "Active",
    date: "27d N 59h : 59m : 59s",
  },
  {
    id: "1234567889",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 20,
    status: "Deregister",
    date: "27d N 59h : 59m : 59s",
  },
  {
    id: "1234567289",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 10,
    status: "Deregister",
    date: "27d N 59h : 59m : 59s",
  },
  {
    id: "1234522289",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 50,
    status: "Deregister",
    date: "27d N 59h : 59m : 59s",
  },
  {
    id: "5634522289",
    operator: "0x486e...644a55",
    slots: {
      count: 60,
      total: 100,
    },
    failure_reports: 2,
    days_on_network: 30,
    status: "Deregister",
    date: "27d N 59h : 59m : 59s",
  },
];
export const sampleOverviewData = [
  [1327359600000, 80],
  [1327446000000, 60],
  [1327532400000, 31.18],
  [1327618800000, 30],
  [1327878000000, 29],
  [1327964400000, 80],
  [1328050800000, 10],
  [1328137200000, 20],
  [1328223600000, 15],
  [1328482800000, 16],
  [1328569200000, 16],
  [1327618800000, 30],
  [1327178000000, 29],
  [1327964400000, 80],
  [1328050800000, 10],
  [1328137200000, 20],
  [1328223600000, 15],
  [1328482800000, 16],
  [1328569200000, 16],
  [1360105200000, 38.4],
  [1360191600000, 38.07],
];

export const accounts: Account[] = [
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chris Were",
    },
    country: "Australia",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "2345678901",
    },
    country: "Europe",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "3456789012",
    },
    country: "USA",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chris Were",
    },
    country: "Australia",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "2345678901",
    },
    country: "Europe",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chris Were",
    },
    country: "Australia",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "2345678901",
    },
    country: "Europe",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "3456789012",
    },
    country: "USA",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Chris Were",
    },
    country: "Australia",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
  {
    user: {
      profile:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "2345678901",
    },
    country: "Europe",
    did: "0x486e...644a55",
    bio: "Founder of Verida",
    createdAt: new Date("May 12, 2023, 4:20 PM"),
  },
];
