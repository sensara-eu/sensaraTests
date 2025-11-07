import test, {expect} from "../src/utils/fixtures";
import ENV from "../src/utils/env";
import LoginPage from "../src/pages/login.page";
import ResidentPage from "../src/pages/resident.page"
import { Page } from "@playwright/test";
import data from "../testData/data.json";
import EscalationLaddersPage from "../src/pages/escalationLadders.page";
import AlarmOverviewPage from "../src/pages/alarmOverview.page";

let page: Page;
let loginPage: LoginPage;
let residentPage: ResidentPage;
let escalationLaddersPage: EscalationLaddersPage;
let alarmoverviewPage: AlarmOverviewPage;

test.describe('Resident Page Tests', () => {

   test.beforeAll(async ({ browser }) => {

     page = await browser.newPage();
    loginPage = new LoginPage(page);
     residentPage = new ResidentPage(page);
     alarmoverviewPage = new AlarmOverviewPage(page);
     escalationLaddersPage = new EscalationLaddersPage(page);
     await page.goto(ENV.BASE_URL);
   });

test.afterAll(async () => {
    await page.close();
  });

  test("Validating the login functionality", async() => {
   
    await loginPage.enterUserName(ENV.USERNAME);
    await loginPage.enterPassword(ENV.PASSWORD);
    await loginPage.clickSignInBtn();
    await page.screenshot({ path: 'ResidentPage.png', fullPage: true });
});

test("Validate escalation ladder page functionalities", async() => {

    await escalationLaddersPage.clickEscalationLaddersLink();
    const actualHeaders = await escalationLaddersPage.getescalationPageHeader();
    const expectedHeaders = data.expectedEscalationPageHeader;
    expect(actualHeaders).toEqual(expectedHeaders);
});

test("validate arrowupDownFunctionality in Escalation Ladders page for Sector column", async () => {

    await escalationLaddersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await escalationLaddersPage.clickArrowUpDownForSectorInEscalation();
     await escalationLaddersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Sector column in Escalation Ladders page", async()=> {
    await escalationLaddersPage.clickPolygonButtonForSectorInEscalationLadders();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Escalation Ladders page for Total Delay column", async () => {

    await escalationLaddersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await escalationLaddersPage.clickArrowUpDownForTotalDelay();
     await escalationLaddersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Total Delay column in Escalation Ladders page", async()=> {
    await escalationLaddersPage.clickPolygonButtonForTotalDelayInEscalationLadders();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Escalation Ladders page for Step 1 column", async () => {

    await escalationLaddersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await escalationLaddersPage.clickArrowUpDownForStep1();
     await escalationLaddersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Step1 column in Escalation Ladders page", async()=> {
    await escalationLaddersPage.clickPolygonButtonForStep1InEscalationLadders();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Escalation Ladders page for Step 2 column", async () => {

    await escalationLaddersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await escalationLaddersPage.clickArrowUpDownForStep2();
     await escalationLaddersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Step2 column in Escalation Ladders page", async()=> {
    await escalationLaddersPage.clickPolygonButtonForStep2InEscalationLadders();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("Validate columns Dropdown in Escalation Ladders page", async()=> {
    await escalationLaddersPage.validateColumnsDropdownFunctionalityInEscalationLaddersPage();
    await escalationLaddersPage.page.waitForLoadState("networkidle", { timeout: 10000 });
    await escalationLaddersPage.validateColumnsDropdownFunctionalityInEscalationLaddersPage();

    const actualHeaders = await escalationLaddersPage.getAllHeadersTextAfterColumnsSelectionInEscalationLadderPage();
    const expectedHeaders = data.expectedHeadersAfterColumnsOptionsInEscalationLadderPage;
    expect(actualHeaders).toEqual(expectedHeaders);
    await residentPage.validateResetFiltersFunctionality();
    await residentPage.resetVisibilityFunctionality();
});

test("validate add and delete operations in Escalation ladder", async()=> {
   await escalationLaddersPage.addNewEscalationLadders();
   await escalationLaddersPage.searchAddedEscalationStepAndPerformDeletion(data.sectorsUsersData);
})

})
