import { test } from "@playwright/test";
import { addSystemInfo } from "../utils/testInfoHelper";


test.beforeEach(async ({}, testInfo) => {
  await addSystemInfo(testInfo);
});
