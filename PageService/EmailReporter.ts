import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      const failureMessage = `
        Test Failed: ${test.title}
        File: ${test.location.file}:${test.location.line}
        ${result.error?.message}
      `;

      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.Email_User, 
          pass: process.env.Email_Pass,
        },
      });

      await transporter.sendMail({
        from: `"Playwright Test Reporter" <${process.env.EMAIL_USER}>`,
        to: 'xujan1966@gmail.com',
        subject: `Playwright Test Failed: ${test.title}`,
        text: failureMessage,
      });
    }
  }
}

export default EmailReporter;
