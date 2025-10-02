import { faker } from "@faker-js/faker";
import MailosaurClient from "mailosaur";
require("dotenv").config();

export function generateNewEmailAddress() {
  return `${faker.person.firstName()}${Date.now()}@${
    process.env.MAILOSAUR_SERVED_ID
  }.mailosaur.net`;
}

export async function extractResetPasswordLink(
  mailosaur: MailosaurClient,
  email: string
) {
  const readEmail = await mailosaur.messages.get(
    process.env.MAILOSAUR_SERVED_ID!,
    {
      sentTo: email,
    }
  );
  const code = readEmail.html?.links?.[1].href;
  return code!;
}
