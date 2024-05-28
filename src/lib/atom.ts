import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: {
    registered: true,
    connected: true,
    authorized: true,
  },
});

export const setupWizardAtom = atom({
  key: "setupWizard",
  default: false,
});
