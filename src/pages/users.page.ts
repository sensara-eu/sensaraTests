import {Page, expect} from "@playwright/test";
import Wrapper from "../base/Wrapper";
import locators from "../common/locators";
import commonpage from "../common/commonpage";

export default class AlarmOverviewPage extends Wrapper{
    common: commonpage;

    constructor(public page: Page){
        super(page);
        this.common = new commonpage(page);
    }

    public async clickUsersLink(){
     const usersLink = await this.findLocator(locators.usersLinkXpath);
     await usersLink.first().waitFor({state:"attached"});
     await usersLink.first().click();
    
  }
    public async getUsersPageHeader() : Promise<string> {
     const usersHeaderLink = await this.findLocator(locators.usersLinkXpath);
     const usersLinkHeaderText = usersHeaderLink.nth(1).textContent();
     return usersLinkHeaderText;
    }

    public async clickArrowUpDownForNaamInUsers(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.first().waitFor({ state: 'visible' });
    await arrowUpDownLocator.first().click();
}

   public async clickArrowUpDownForEmailInUsers(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(1).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(1).click();
}

   public async clickArrowUpDownForRollenInUsers(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(2).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(2).click();
}

   public async clickArrowUpDownForZorgsectieInUsers(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(3).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(3).click();
}

public async clickPolygonButtonForNaamInUsers(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.first().waitFor({ state: 'visible' });
    await polyBtn.first().click();
}   

public async clickPolygonButtonForEmailInUsers(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(1).waitFor({ state: 'visible' });
    await polyBtn.nth(1).click();
}  

public async clickPolygonButtonForRollenInUsers(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(2).waitFor({ state: 'visible' });
    await polyBtn.nth(2).click();
}  

public async clickPolygonButtonForZorgsectieInUsers(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(3).waitFor({ state: 'visible' });
    await polyBtn.nth(3).click();
}  

public async validateColumnsDropdownFunctionalityInUsersPage (){
    const residentColumnsLocator = await this.findLocator(locators.residentColumns);
    const naamUserLoc = await this.findLocator(locators.naamUserXpath);
    const emailUserLocator = await this.findLocator(locators.emailUserXpath);
    const rollenUserLoc = await this.findLocator(locators.rollenUserXpath);
    const sectorUserLoc = await this.findLocator(locators.sectorUserXpath);
    const activeFilters = await this.findLocator(locators.activeFiltersXpath);
    
     await this.page.waitForTimeout(2000);
    await residentColumnsLocator.nth(2).waitFor({state:"attached"});
    await residentColumnsLocator.nth(2).click();
    await this.page.waitForTimeout(1000);
    await naamUserLoc.waitFor({ state: "visible" });
    await naamUserLoc.click();
   await emailUserLocator.waitFor({ state: "visible" });
    await emailUserLocator.click();
    await rollenUserLoc.waitFor({ state: "visible" });
    await rollenUserLoc.click();
    await sectorUserLoc.waitFor({ state: "visible" });
    await sectorUserLoc.click();

    await activeFilters.waitFor({state:"visible"});
    await activeFilters.click({ force: true });
}

//this method is used to add a new user in users Page
public async validateAddUserFunctionality(){
    const addNewUserLoc = await this.findLocator(locators.addNewUserXpath);
    await addNewUserLoc.waitFor({state:"attached"});
    await addNewUserLoc.click();
}

//this method is used to get all the label names from the add user popup and validate it against the expected
public async getAllLabelNamesInUsers() :Promise<string[]> {
  const formLabel = await this.findLocator(locators.formLabelXpath);
  await this.page.waitForTimeout(5000);
  await formLabel.last().waitFor({ state: 'visible', timeout: 5000 });
  const formLabelCount =await formLabel.count();
  console.log(formLabelCount);
  const labelTexts: string[] = [];
  for(let i=0; i<await formLabelCount; i++){
    const labelText = await formLabel.nth(i).textContent(); 
    labelTexts.push(labelText?.trim() || ''); 
  }
  return labelTexts;  
}

//this method is used to enter all the values in the add user popup and save it
public async fillUsersPageFormData(nameUsersData:string,passwordUsersData:string,confPasswordUsersData:string,phoneNumberUsersData:string,sectorsUserData:string){
  const emailUsersDataForm = await this.findLocator(locators.emailUsersDataFormXpath);
  const nameUsersDataForm = await this.findLocator(locators.nameUsersDataFormXpath);
  const passwordUsersDataForm = await this.findLocator(locators.passwordUsersDataFormXpath);
  const confPasswordUsersDataForm = await this.findLocator(locators.confPasswordUsersDataFormXpath);
  const phoneNumberUsersDataForm = await this.findLocator(locators.phoneNumberUsersDataFormXpath);
  const rollenUsersDataForm = await this.findLocator(locators.rollenUsersDataFormXpath);
  const sectorUsersDataForm = await this.findLocator(locators.sectorUsersDataFormXpath);
  const rollenValueToSelect = await this.findLocator(locators.rollenValueToSelectXpath);
  const saveBtn = await this.findLocator(locators.saveButton);
  //const closeBtn = await this.findLocator(locators.closeButton);

  const generatedEmail = this.common.generatedEmailId();
  await emailUsersDataForm.waitFor({state:"visible"});
  await emailUsersDataForm.fill(generatedEmail);
  
  await passwordUsersDataForm.waitFor({state:"attached"});
  await passwordUsersDataForm.fill(passwordUsersData);
  await confPasswordUsersDataForm.waitFor({state:"attached"});
  await confPasswordUsersDataForm.fill(confPasswordUsersData);
  await phoneNumberUsersDataForm.waitFor({state:"attached"});
  await phoneNumberUsersDataForm.fill(phoneNumberUsersData);

  await rollenUsersDataForm.waitFor({state:"attached"});
  await rollenUsersDataForm.click();
  await rollenValueToSelect.waitFor({state:"attached"});
  await rollenValueToSelect.click();
 
  await sectorUsersDataForm.waitFor({state:"attached"});
  await sectorUsersDataForm.fill(sectorsUserData);
  await nameUsersDataForm.waitFor({state:"visible"});
  await nameUsersDataForm.fill(nameUsersData);
  await this.page.waitForTimeout(1000);
  await saveBtn.waitFor({state:"visible"});
   await saveBtn.scrollIntoViewIfNeeded();
  await saveBtn.click();
  //await closeBtn.waitFor({state:"attached"});
  //await closeBtn.click();
    await this.page.waitForTimeout(5000);
}

//this method is used to search the added user from the search box and delete it
public async searchAddedUsersAndPerformDeletion(nameUsersData:string){
    const filterResetBtn = await this.findLocator(locators.filterResetBtnXpath);
    const searchInputBox = await this.findLocator(locators.searchInputBoxXpath);
    const deleteButton = await this.findLocator(locators.deleteButtonXpath);
    const toDeleteBtnXpath = await this.findLocator(locators.toDeleteBtnXpath);
    
    await filterResetBtn.waitFor({state:"attached"});
    await filterResetBtn.click();
     await this.page.waitForLoadState('networkidle');
     await searchInputBox.waitFor({state:"attached"});
      await searchInputBox.fill(nameUsersData);
      await this.page.waitForLoadState('networkidle');
      await deleteButton.first().waitFor({state:"attached"});
      await deleteButton.first().click();
      await this.page.waitForTimeout(1000);
       await toDeleteBtnXpath.waitFor({state:"attached"});
      await toDeleteBtnXpath.click();
}
}