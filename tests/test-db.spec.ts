import { test } from '@playwright/test';
import { getDataFromDB } from '../Utils/Database';

test('validate db data', async ({ page }) => {
  let getUser = "select * from users";
  const client = await getDataFromDB(getUser);  
});