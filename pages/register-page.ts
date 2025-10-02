import { Page } from "@playwright/test";
import MailosaurClient from "mailosaur";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async completeRegisterForm(
    firstName: string,
    lastName: string,
    password: string,
    email: string
  ) {
    await this.page
      .getByRole("textbox", { name: "First name" })
      .fill(firstName);
    await this.page.getByRole("textbox", { name: "Last name" }).fill(lastName);
    await this.page.getByRole("textbox", { name: "Email" }).fill(email);
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
    await this.page.getByRole("button", { name: "Register" }).click();
  }

  async validateEmailCode(mailosaur: MailosaurClient, email: string) {
    const readEmail = await mailosaur.messages.get(
      process.env.MAILOSAUR_SERVED_ID!,
      {
        sentTo: email,
      }
    );
    const code = readEmail.subject!.split(":")[1].trim();

    await this.page
      .getByRole("textbox", { name: "Email Verification Code" })
      .fill(code);

    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
