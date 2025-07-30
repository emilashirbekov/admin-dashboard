import { test, expect } from "@playwright/test";
import { ROUTES } from "../src/shared/config/route-config/route-constants";

test.describe("test home page and navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.USERS);
  });

  test("renders users table correctly, add users, update users, delete users", async ({
    page,
  }) => {
    await expect(page.getByTestId("users-title")).toHaveText(
      "Users Management"
    );
    await expect(page.getByTestId("users-description")).toHaveText(
      "Manage your application users"
    );
    await expect(page.getByPlaceholder("Search users...")).toBeVisible();

    await page.getByPlaceholder("Search users...").fill("john");
    await expect(page.locator("table")).toContainText("john");

    await page.getByRole("button", { name: /Add User/i }).click();

    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");

    await page.getByRole("button", { name: /Create User/i }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.locator("table")).toContainText("Test User");

    await page.getByTestId("edit-btn").first().click();

    await page.getByLabel("Name").fill("Updated Name");
    await page.getByRole("button", { name: /Update User/i }).click();

    await expect(page.locator("table")).toContainText("Updated Name");

    const firstRow = page.locator("table tbody tr").first();
    const userName = await firstRow.locator("td").first().innerText();

    await firstRow.getByTestId("delete-btn").click();
    await expect(page.locator("table")).not.toContainText(userName);
  });
});
