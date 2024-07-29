import { AccountRepository } from "../../interfaces/account.interface";

class AccountService {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }
  async listAccount(itemId: string): Promise<any> {
    try {
      const account = await this.accountRepository.findAccountByItemId(itemId);

      if (!account) throw new Error("ItemId invalid ");

      return account;
    } catch (error: any) {
      throw new Error("Failed to exchange token: " + error.message);
    }
  }
}

export { AccountService };
