import { test, expect } from "@playwright/test";
import { request } from "http";

test("GET - All Products", async ({ request }) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty("products");
    expect(body.products.length).toBeGreaterThan(0);
});