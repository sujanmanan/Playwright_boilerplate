import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailReporter implements Reporter {
  private results: { title: string; status: string; error?: string; file: string; line: number }[] = [];

  async onTestEnd(test: TestCase, result: TestResult) {
    this.results.push({
      title: test.title,
      status: result.status,
      error: result.error?.message,
      file: test.location.file,
      line: test.location.line,
    });
  }

  async onEnd() {
    const hasFailures = this.results.some(r => r.status === 'failed');

    const tableRows = this.results
      .map(
        r => `
      <tr style="background-color: ${r.status === 'failed' ? '#f8d7da' : '#d4edda'}">
        <td>${r.title}</td>
        <td>${r.status.toUpperCase()}</td>
        <td>${r.file}:${r.line}</td>
        <td>${r.status === 'failed' ? r.error : ''}</td>
      </tr>
    `
      )
      .join('');

    const htmlReport = `
      <h2>Playwright Test Report</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #cce5ff;">
            <th>Test</th>
            <th>Status</th>
            <th>File</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Playwright Test Reporter" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Playwright Test  Report',
      html: htmlReport,
    });
  }
}

export default EmailReporter;
