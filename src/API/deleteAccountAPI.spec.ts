import { test, expect } from "@playwright/test";
import { request } from "http";

test("API: DELETE User Account", async ({ request}) =>{
    const email = "api@gmail.com";
    const password = "test@143";

   const response = await request.delete("https://automationexercise.com/api/verifyLogin", {
        form: {
            email: email,
            password: password
        }
    });
    const body = await response.json();
    console.log("API Response:", body);


    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.")


});