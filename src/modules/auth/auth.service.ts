import { PluggyClient } from "pluggy-sdk";
import { BANK_CPF, BANK_PASSWORD } from "../../utils/constants";

const clientId = "efc98e3d-4b58-4b6f-aa5f-2dffdcb5d230";
const clientSecret = "362f4123-f5c3-47c3-90b4-4d7ac74426c6";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
class AuthService {
  constructor() {}

  async exchangeToken(): Promise<any> {
    const client = new PluggyClient({
      clientId,
      clientSecret,
    });

    try {
      let item = await client.createItem(212, {
        cpf: BANK_CPF,
        password: BANK_PASSWORD,
      });

      while (!["LOGIN_ERROR", "OUTDATED", "UPDATED"].includes(item.status)) {
        await sleep(3000);
        item = await client.fetchItem(item.id);

        if ((item.status = "WAITING_USER_INPUT")) {
          return { itemId: item.id };
        }
      }

      return item;
    } catch (error: any) {
      throw new Error("Failed to exchange token: " + error.message);
    }
  }

  async validateItemId(itemId: string, code: string): Promise<any> {
    const client = new PluggyClient({
      clientId,
      clientSecret,
    });

    try {
      const item = await client.fetchItem(itemId);
      const { parameter } = item;

      if (!parameter) throw new Error("MFA Parameter doesn't exist ");

      const { name } = parameter;

      const response = await client.updateItemMFA(itemId, { [name]: code });

      return response;
    } catch (error: any) {
      throw new Error("Failed to exchange token: " + error.message);
    }
  }
}

export { AuthService };
