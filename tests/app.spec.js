// @ts-check
import { test, expect } from '@playwright/test';

test('Rendering successfully', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});
