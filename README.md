Need to add .env file
--Install dotenv package
Syntax: npm install dot env

Sample of .env file
Test_Username="test"
Test_Password="test"

How to use .env file in test:
-example.spec.ts

import dotenv from "dotenv";
dotenv.config();
await page.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
