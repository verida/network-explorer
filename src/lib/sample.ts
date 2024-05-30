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
  [1327359600000,80],
  [1327446000000,60],
  [1327532400000, 31.18],
  [1327618800000,30],
  [1327878000000, 29],
  [1327964400000,80],
  [1328050800000, 10],
  [1328137200000, 20],
  [1328223600000, 15],
  [1328482800000, 16],
  [1328569200000, 16],
  [1327618800000,30],
  [1327178000000, 29],
  [1327964400000,80],
  [1328050800000, 10],
  [1328137200000, 20],
  [1328223600000, 15],
  [1328482800000, 16],
  [1328569200000, 16],
  [1360105200000, 38.4],
  [1360191600000, 38.07],
];

export const resultJson = `{   "errors": [],   "doc": {     "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",     "created": "2023-12-29T23:59:54Z",     "updated": "2024-03-04T09:48:09Z",     "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",     "versionId": 5,     "assertionMethod": [       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a#controller",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=sign",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=asym"     ],     "verificationMethod": [       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a#controller",         "type": "EcdsaSecp256k1RecoveryMethod2020",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "blockchainAccountId": "@eip155:137:0xCDEdd96AfA6956f0299580225C2d9a52aca8487A"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "04160eda411c3f278d653111773f52db5da19b67c3275e5bd67f10cd7a223520ef36e0e92371081f3d80d9ed97cad3397d87a4ae8ebd6d64e8fef784ca6a5f3bb6"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0xca523b08f749d44d82ca13bc5ea5be37256302745a4bd31c1b731e9471b3e2601fc52209b02a8ade0436847902788124fdaa7222fca73074ae71bb98794cebae1b",         "publicKeyHex": "02c2d3be755d834ce6de3b901703c19c32d8f028de90f6770bda6a03083cfcc565"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "ee4263cce29cdce6ecab4eb4a0cceb33d2cfacb97d683c862626a4c802184153"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0x9c57afc303832adf34e3179fdd0a2d97a090b0537f665e5d3c899f9c4d9e76f50294fa27ac8b4ec2e6cad5b8ad8ecf95fd2e65d4e79184165b5e4f878e3245341c",         "publicKeyHex": "02583f2889afbfe6d4da3d9084f57f2fc06b8d49225c96a98265eb9b8a2a5f12dc"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "b2d243c096886c386abbeab897266ba4a9023c33900d49afaddce5d4c7800530"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0xee30b8072fe5acb5651f1b94b69dfea69be38165ab40765b79ab21f506c7260a70a899e551092d1062078661f8b0222955e769e3d633a168c318ec6b538a0f421b",         "publicKeyHex": "03a064d993c1511c6dd55f15a9877ed7ab5d7e8f6e360b518d12f4a8bbc489ecbb"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "eae2b7e71a97a4a50b6dd284c19126009e76c94ef0711fefaaf999a4fb75f771"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0xe4e7ca86f2a275678c8e0a01bd480cbb35880a98901f60763f6fb425e54b8db777011de85125068379afaa6c29679c39e1c3fe53d9b84f0f334f6e42bf07aa981b",         "publicKeyHex": "03f5da2ffcf65f6a60a278cf6797c1c568b4ad0ec9a382db014d34f36a4d0a1a05"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "c327bafc3723202b2c1f2606afe8a979914bb04ae85c6ae2e15df0c3434f5e08"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0x24701a737c864cb279640ecf49301e1b11d61bf4d2a308186d966d6f57fdb53225da66830066c3a8fd68e79a73e62a552b70434376aeae38194bfe05a31c8ae41b",         "publicKeyHex": "029c57e85db8ac5af8d72e55dfb111bb3541879343b3fa40173ec0ec8405c3cd05"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "07933d943606a173f166601bcb2166fad0388d8db0c8bb3b87ace19369412b20"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=sign",         "type": "EcdsaSecp256k1VerificationKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "proof": "0x4b729071069d96f39e626de35226bb6d7c5c8eb423b3acce19562356be2faccd5839e8f0ae298442ff13581d62222b5fe7f11a3f746a90837030125138f24f331c",         "publicKeyHex": "03cafa3a71cbd5df1031fa97105653b412c6e8c57b51820b1026fdc01f89ae8022"       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=asym",         "type": "X25519KeyAgreementKey2019",         "controller": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",         "publicKeyHex": "99c58ab74950b054a39aa542e763bb3d06bfa82303811064e3c6fb90cd8ba63e"       }     ],     "authentication": [       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a#controller",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a"     ],     "service": [       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=database",         "type": "VeridaDatabase",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=messaging",         "type": "VeridaMessage",         "serviceEndpoint": [           "https://node1-germanywestcentral.mnaz.verida.tech:443/",           "https://node1-switzerlandnorth.mnaz.verida.tech:443/",           "https://node1-francecentral.mnaz.verida.tech:443/"         ]       },       {         "id": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=notification",         "type": "VeridaNotification",         "serviceEndpoint": [           "https://notifications.acacia.verida.tech:443/"         ]       }     ],     "keyAgreement": [       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x87d91d96f6d2a480ed607bdb4abefe9bf0492e11d49debf7efe4a692853ad3a8&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x2cd9d903fe971922fac1c70baa5d08cac17cc8a3cb4abfc17df6df31b1aafe80&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8b47bbd15ed21c86e556c7e55a00b8f39d73188640eeb5c2f2394c3cc65d2c85&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x8dd7076996f82508ae4f83f31d6e4c77695fedc0cf74ab2433f6ee3f2731a3eb&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0xf3ad6f82dfba3fe4d6dfe029b45ac21e2bb65c14318828a345a19a482ffacf06&type=asym",       "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a?context=0x11ae0d19ef496cc34141145da01bad3bd04573c1d334ff28fd5a34f3e0d8cf80&type=asym"     ],     "proof": {       "type": "EcdsaSecp256k1VerificationKey2019",       "verificationMethod": "did:VDA:mainnet:0xcdedd96afa6956f0299580225c2d9a52aca8487a",       "proofPurpose": "assertionMethod",       "proofValue": "0xf9cdbb847027ea001f2a61790c532dde11dd3f104778ee70ddc0e9cff82894b740771af01d196ef6a66bd66204783c6aca40bfff00080346c35962660c92a5281b"     }   } }
`;

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
