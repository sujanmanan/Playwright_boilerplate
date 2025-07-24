import { test } from '@playwright/test';
import { getPostgresClient } from '../PageService/Database';

test('validate db data', async ({ page }) => {
  let getUser = "select * from users";
  const client = await getPostgresClient(getUser);  
});