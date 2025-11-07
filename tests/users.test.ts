import test, {expect} from "../src/utils/fixtures";
import ENV from "../src/utils/env";
import LoginPage from "../src/pages/login.page";
import { Page } from "@playwright/test";
import data from "../testData/data.json";
import AlarmOverviewPage from "../src/pages/alarmOverview.page";
import ResidentPage from "../src/pages/resident.page";
import UsersPage from "../src/pages/users.page";


let page: Page;
let loginPage: LoginPage;
let alarmoverviewPage: AlarmOverviewPage;
let residentPage: ResidentPage;
let usersPage: UsersPage;

test.describe('AlarmOverview Page Tests', () => {

    test.beforeAll(async ({ browser }) => {

     page = await browser.newPage();
    loginPage = new LoginPage(page);
    residentPage = new ResidentPage(page);
    alarmoverviewPage = new AlarmOverviewPage(page);
    usersPage = new UsersPage(page);
     await page.goto(ENV.BASE_URL);
   });

test.afterAll(async () => {
    await page.close();
  })

  test("Validating the login functionality", async() => {
   
    await loginPage.enterUserName(ENV.USERNAME);
    await loginPage.enterPassword(ENV.PASSWORD);
    await loginPage.clickSignInBtn();
    await loginPage.page.waitForLoadState("networkidle", { timeout: 8000 });
    await page.screenshot({ path: 'Page.png', fullPage: true });
});
test("Validate Users page functionalities", async() => {

    await usersPage.clickUsersLink();
    const actualHeaders = await usersPage.getUsersPageHeader();
    const expectedHeaders = data.expectedPageHeaderTitle;
    expect(actualHeaders).toEqual(expectedHeaders);
    const actualHeadersInUsers = await alarmoverviewPage.getAllHeadersTextsInAlarmOverviewPage();
    const expectedHeadersInUsers = data.expectedUsersPageHeader;
    expect(actualHeadersInUsers).toEqual(expectedHeadersInUsers);
    await alarmoverviewPage.page.waitForLoadState("networkidle", { timeout: 2000 });

});

test("validate arrowupDownFunctionality in Users page for Naam column", async () => {

    await usersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await usersPage.clickArrowUpDownForNaamInUsers();
     await usersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Naam column in Users page", async()=> {
    await usersPage.clickPolygonButtonForNaamInUsers();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Users page for Email column", async () => {

    await usersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await usersPage.clickArrowUpDownForEmailInUsers();
     await usersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Email column in users page", async()=> {
    await usersPage.clickPolygonButtonForEmailInUsers();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Users page for Rollen column", async () => {

    await usersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await usersPage.clickArrowUpDownForRollenInUsers();
     await usersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Rollen column in users page", async()=> {
    await usersPage.clickPolygonButtonForRollenInUsers();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate arrowupDownFunctionality in Users page for Zorgsectie column", async () => {

    await usersPage.page.waitForLoadState('networkidle');
     for (let i = 0; i < 3; i++) {
     await usersPage.clickArrowUpDownForZorgsectieInUsers();
     await usersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
    }
});

test("validate Dropdown value in polygon Button for Zorgsectie column in users page", async()=> {
    await usersPage.clickPolygonButtonForZorgsectieInUsers();
    await alarmoverviewPage.validatepolygonFunctionality();
});

test("validate add new user functionality", async()=> {
   await usersPage.validateAddUserFunctionality();
    await usersPage.page.waitForLoadState("networkidle", { timeout: 5000 });
   const expectedLabelsNames = data.expectedLabelsInAddUser;
    const actualLabelNames = await usersPage.getAllLabelNamesInUsers();
    expect(actualLabelNames).toEqual(expectedLabelsNames);
})

test("Fill form values in UsersPage after clicking the Add button ", async()=> {
    await usersPage.fillUsersPageFormData(data.nameUsersData, data.passwordUsersData, data.confPasswordUsersData, data.phoneNumberUsersData, data.sectorsUsersData);
    await page.screenshot({ path: 'AddUsersForm.png', fullPage: true });
});

test("Test to validate the search and delete functionality in users page", async()=> {
    await usersPage.searchAddedUsersAndPerformDeletion(data.nameUsersData);
})


})