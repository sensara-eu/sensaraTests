import test, {expect} from "../src/utils/fixtures";
import ENV from "../src/utils/env";
import LoginPage from "../src/pages/login.page";
import ResidentPage from "../src/pages/resident.page"
import { Page } from "@playwright/test";
import data from "../testData/data.json";


let page: Page;
let loginPage: LoginPage;
let residentPage: ResidentPage;

test.describe('Resident Page Tests', () => {

   test.beforeAll(async ({ browser }) => {

     page = await browser.newPage();
    loginPage = new LoginPage(page);
     residentPage = new ResidentPage(page);
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

test("Validate Resident page functionalities", async() => {

    await residentPage.clickResidentLink();
    const actualHeaders = await residentPage.getAllHeadersText();
    const expectedHeaders = data.expectedHeaders;
    expect(actualHeaders).toEqual(expectedHeaders);
});

test("validate arrowupDownFunctionality in Resident page for Name Column", async () => {

    await residentPage.page.waitForLoadState('networkidle');
    const firstCellText = await residentPage.getFirstCellText();

     for (let i = 0; i < 3; i++) {
     await residentPage.clickArrowUpDownForName();
     await residentPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
    const updatedCellText = await residentPage.getFirstCellText();
    console.log(`Before: ${firstCellText} | After: ${updatedCellText}`);
});

// test("validate Dropdown value in polygon Button for Name column", async()=> {
//     await residentPage.clickPolygonButtonForName();
//     await residentPage.validatepolygonFunctionality();
// });

test("validate arrowupDownFunctionality in Resident page for Sector Column", async () => {

    await residentPage.page.waitForLoadState('networkidle');
    const sectorFirstCellText = await residentPage.getSectorFirstCellText();

    for (let i = 0; i < 3; i++) {
     await residentPage.clickArrowUpDownForSector();
     await residentPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
    const sectorUpdatedCellText = await residentPage.getSectorFirstCellText();
    console.log(`Before: ${sectorFirstCellText} | After: ${sectorUpdatedCellText}`);
});

test("validate Dropdown value in polygon Button for Sector column", async()=> {
    await residentPage.clickPolygonButtonForSector();
    await residentPage.validatepolygonFunctionalityForSector();
});

test("validate arrowupDownFunctionality in Resident page for Room Status Column", async () => {

    await residentPage.page.waitForLoadState('networkidle');
    const roomStatusFirstCellText = await residentPage.getRoomStatusFirstCellText();
    for (let i = 0; i < 3; i++) {
     await residentPage.clickArrowUpDownForRoomStatus();
     await residentPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
    const roomStatusUpdatedCellText = await residentPage.getSectorFirstCellText();
    console.log(`Before: ${roomStatusFirstCellText} | After: ${roomStatusUpdatedCellText}`);
});

test("validate Dropdown value in polygon Button for room status column", async()=> {
    await residentPage.clickPolygonButtonForRoomStatus();
    await residentPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Resident page for History Column", async () => {

    await residentPage.page.waitForLoadState('networkidle');
    for (let i = 0; i < 3; i++) {
     await residentPage.clickArrowUpDownForHistory();
     await residentPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for History column", async()=> {
    await residentPage.clickPolygonButtonForHistory();
    await residentPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Resident page for Alarm settings Column", async () => {

    await residentPage.page.waitForLoadState('networkidle');
    for (let i = 0; i < 3; i++) {
     await residentPage.clickArrowUpDownForAlarmSettings();
     await residentPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Alarm settings column", async()=> {
    await residentPage.clickPolygonButtonForAlarmSettings();
    await residentPage.validatepolygonFunctionality();
});

test("Validate columns Dropdown in resident page", async()=> {
    await residentPage.validateColumnsDropdownFunctionalityInResidentsPage();
    await residentPage.page.waitForLoadState("networkidle", { timeout: 10000 });
    await residentPage.getAllHeadersTextAfterColumnsSelection();
    await residentPage.validateResetFiltersFunctionality();
    await residentPage.resetVisibilityFunctionality();
});

test("validate functionality of Edit button in Resident page", async()=> {
    await residentPage.validateEditButtonFunctionality();
    const expectedLabelsNames = data.expectedLabels;
    const actualLabelNames = await residentPage.getAllLabelNames();
    expect(actualLabelNames).toEqual(expectedLabelsNames);
});

test("Fill form values after clicking the edit button ", async()=> {
    await residentPage.fillFormData(data.name, data.clientNumber, data.street, data.houseNumber, data.postalCode,data.city, data.TelephoneNumber);
    await page.screenshot({ path: 'EditForm.png', fullPage: true });
});

// test("delete Button functionality", async()=> {
//     await residentPage.validateDeleteButtonFunctionality();
//     await residentPage.page.waitForLoadState("networkidle", { timeout: 1000 });
// })


})
