import { expect, test } from "@playwright/test";
import { RegisterPage } from "../pages/register-page";
import { faker } from "@faker-js/faker";
import { generateNewEmailAddress } from "../helpers/emailHelpers";
const MailosaurClient = require("mailosaur");
require("dotenv").config();

test("Register new user", async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const password = faker.internet.password();
  const email = generateNewEmailAddress();
  const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

  const registerPage = new RegisterPage(page);

  await page.goto("/");
  await page.getByText("Sign Up For Free").click();

  await registerPage.completeRegisterForm(firstName, lastName, password, email);
  await registerPage.validateEmailCode(mailosaur, email);

  await expect(page.getByText("Get a Fax Number")).toBeVisible();
});
