import { test, expect } from "@playwright/test";
import { request } from "http";

test("API: POST to all product list", async ({ request }) => {


    const response = await request.post("https://automationexercise.com/api/productsList");

    const body = await response.json();
    console.log("API Response: " , body);
    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.")


});