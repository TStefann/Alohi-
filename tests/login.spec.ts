import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("login with valid credentials", async ({ page }) => {
  const email = "gainsboro401@rouflav.com";
  const password = "asdfadf124124eqwd1e2da";
  const loginPage = new LoginPage(page);

  await loginPage.login(email, password);

  await expect(page.getByRole("button", { name: "Send a Fax" })).toBeVisible();
});

test("login with invalid credentials", async ({ page }) => {
  const email = "gainsboro401@rouflav.com";
  const password = "wrongPassword";
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);

  await expect(
    page.getByText("Invalid email or password. Please try again.")
  ).toBeVisible();
});
