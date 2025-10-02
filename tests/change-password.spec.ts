import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { faker } from "@faker-js/faker";
const MailosaurClient = require("mailosaur");
import { extractResetPasswordLink } from "../helpers/emailHelpers";

test("Change password", async ({ page }) => {
  const email = "rudy1759348849338@ka7ehvgq.mailosaur.net";

  const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
  const loginPage = new LoginPage(page);

  await page.goto("/");
  await loginPage.changePassword(email);

  const resetPasswordLink = await extractResetPasswordLink(mailosaur, email);
  await page.goto(resetPasswordLink);

  const newPassword = faker.internet.password();
  await loginPage.fillNewPassword(newPassword);

  await expect(page.getByText("Your account has been updated.")).toBeVisible();
});
