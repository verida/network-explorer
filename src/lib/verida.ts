import { config } from "@/config/verida";
import { Profile } from "@/types/profile";
import { Client, Context } from "@verida/client-ts";
import { ClientConfig, IMessaging } from "@verida/types";
import { EventEmitter } from "events";

const userConfig: ClientConfig = {
  environment: config.veridaEnv,
  didClientConfig: {
    network: config.veridaEnv,
    rpcUrl: config.veridaRpcUrl,
  },
};

class VeridaClient extends EventEmitter {
  private client: Client;
  public profile?: Profile;
  public context: Context | undefined;
  private did: string;
  public connected?: boolean;
  public credentials: any;
  public didDocument: any;
  private _messagingInstance: IMessaging | undefined;
  on: any;

  constructor(config: ClientConfig) {
    super();
    this.client = new Client(config);
    this.did = "";
    this.context = undefined;
  }

  public async connect(context: Context): Promise<void> {
    this.context = context;
    this.did = await context.getAccount().did();

    if (this.context) {
      this.connected = true;
    }
  }

  async getProfile(did: string, contextName?: string): Promise<any> {
    const profileContextName =
      contextName || (config.veridaVaultContextName as string);

    const profileInstance = await this.client.openPublicProfile(
      did,
      profileContextName,
      "basicProfile"
    );
    if (profileInstance) {
      this.profile = await profileInstance.getMany({}, {});
      if (this.profile) {
        this.profile.did = did;
      }
    }

    return this.profile;
  }
  private async initialiseMessagingInstance(): Promise<IMessaging> {
    if (!this.context) {
      throw new Error("No app context");
    }
    if (this._messagingInstance) {
      return this._messagingInstance;
    }
    this._messagingInstance = await this.context.getMessaging();
    return this._messagingInstance;
  }

  public async sendMessage(messageData: any): Promise<boolean> {
    const type = "inbox/type/dataSend";
    const data = {
      data: [messageData],
    };
    const messageConfig = {
      did: this.did,
      recipientContextName: config.veridaVaultContextName,
    };

    const messaging = await this.initialiseMessagingInstance();
    const subject = `New Contact: ${messageData.firstName}`;
    await messaging.send(this.did, type, data, subject, messageConfig);
    return true;
  }

  public async getSchemaSpecs(schema: string): Promise<any> {
    const schemas = await this.client.getSchema(schema);

    const json = await schemas.getSpecification();

    return json;
  }

  async getDidDocument(did: string): Promise<void> {
    const didClient = this.client.didClient;
    const document = await didClient.get(did);
    this.didDocument = document;
  }

  logout(): void {
    this.context = undefined;
    this.connected = false;
    this.did = "";
    this.didDocument = undefined;
    this.credentials = undefined;
    this._messagingInstance = undefined;
  }

  public reset(): void {
    this.did = "";
    this.profile = undefined;
    this.didDocument = undefined;
    this.credentials = undefined;
  }
}

const VeridaHelper = new VeridaClient(userConfig);

export { VeridaHelper };
