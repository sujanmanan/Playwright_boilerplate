import { test } from '@playwright/test';
import { fetchOTP } from '../otpreader';

test("Fetch OTP from gmail", async ({ page }) => {
    const otp = await fetchOTP();
    console.log(otp);
});

