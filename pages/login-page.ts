import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("button", { name: "Sign In" }).click();
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
  }

  async changePassword(email: string) {
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("button", { name: "Sign In" }).click();

    await this.page.getByText("Forgot Password?").click();

    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async fillNewPassword(newPassword: string) {
    await this.page
      .getByRole("textbox", { name: "New Password" })
      .fill(newPassword);
    await this.page
      .getByRole("textbox", { name: "Confirm password" })
      .fill(newPassword);

    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
