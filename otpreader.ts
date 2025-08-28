import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS, 
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false, 
    },
    authTimeout: 3000,
  },
};

export async function fetchOTP() {
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  const searchCriteria = ['UNSEEN'];
  const fetchOptions = {
    bodies: ['HEADER', 'TEXT'],
    markSeen: true,
  };

  const messages = await connection.search(searchCriteria, fetchOptions);

  for (const item of messages) {
    const all = item.parts.find(part => part.which === 'TEXT');
    const parsed = await simpleParser(all.body);
    const otpMatch = parsed.text?.match(/\b\d{6}\b/); 
    if (otpMatch) {
      await connection.end();
      return otpMatch[0];
    }
  }

  await connection.end();
  throw new Error('OTP not found');
}
