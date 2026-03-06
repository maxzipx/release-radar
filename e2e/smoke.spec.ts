import { expect, test } from '@playwright/test';

test('timeline renders the core product framing', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Cultural release calendar')).toBeVisible();
  await expect(page.getByText('Timeline')).toBeVisible();
});

test('browse route renders visible filters', async ({ page }) => {
  await page.goto('/browse', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Always-visible filters')).toBeVisible();
  await expect(page.getByText('Platform', { exact: true })).toBeVisible();
});

test('this week route renders the quick-scan view', async ({ page }) => {
  await page.goto('/this-week', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Next seven days')).toBeVisible();
});
