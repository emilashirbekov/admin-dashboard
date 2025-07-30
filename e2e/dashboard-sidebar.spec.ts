import { test, expect } from "@playwright/test";
import { ROUTES } from "../src/shared/config/route-config/route-constants";

test.describe("test home page and navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTES.OVERVIEW);
  });

  test("should load all pages and display the correct content", async ({
    page,
  }) => {
    await expect(page).toHaveURL(ROUTES.OVERVIEW);
    await expect(page.getByTestId("dashboard")).toHaveText("Dashboard");
    await expect(page.getByTestId("dashboard-title")).toHaveText("Admin Panel");

    await page.getByRole("link", { name: "Analytics" }).click();
    await expect(page).toHaveURL(ROUTES.ANALYTICS);
    await expect(page.getByTestId("chart-title")).toHaveText(
      "Detailed Analytics"
    );
    await expect(page.getByTestId("chart-description")).toHaveText(
      "Comprehensive view of your application metrics"
    );

    await page.getByRole("link", { name: "Users" }).click();
    await expect(page).toHaveURL(ROUTES.USERS);
    await expect(page.getByTestId("users-title")).toHaveText(
      "Users Management"
    );
    await expect(page.getByTestId("users-description")).toHaveText(
      "Manage your application users"
    );

    await page.getByRole("link", { name: "Activity" }).click();
    await expect(page).toHaveURL(ROUTES.ACTIVITY);
    await expect(page.getByTestId("activity-title")).toHaveText(
      "Recent Activity"
    );
    await expect(page.getByTestId("activity-description")).toHaveText(
      "Latest actions and system events"
    );
  });
});
