import { faker } from "@faker-js/faker";
require("dotenv").config();

export function generateNewEmailAddress() {
  return `${faker.person.firstName()}${Date.now()}@${
    process.env.MAILOSAUR_SERVED_ID
  }.mailosaur.net`;
}
