//** GayathriAsokh
// This page is used to perform UI operations in Escalation ladders page 
// in both Sensara Test and Acceptance environment*/

import {Page, expect} from "@playwright/test";
import Wrapper from "../base/Wrapper";
import locators from "../common/locators";
import commonpage from "../common/commonpage";

export default class EscalationLaddersPage extends Wrapper{
    common: commonpage;

    constructor(public page: Page){
        super(page);
        this.common = new commonpage(page);
    }

    public async clickEscalationLaddersLink(){
    const escalationLaddersink = await this.findLocator(locators.escalationLaddersXpath);
    await escalationLaddersink.first().waitFor({state:"attached"});
    await escalationLaddersink.first().click(); 
  }
   
    public async getescalationPageHeader() : Promise<string> {
    const escalationLaddersink = await this.findLocator(locators.escalationLaddersXpath);
    const escalationLadderHeader = escalationLaddersink.nth(1).textContent();
    return escalationLadderHeader;
    }
   
    public async clickArrowUpDownForSectorInEscalation(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.first().waitFor({ state: 'visible' });
    await arrowUpDownLocator.first().click();
}

 public async clickArrowUpDownForTotalDelay(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(1).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(1).click();
}

 public async clickArrowUpDownForStep1(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(2).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(2).click();
}

public async clickArrowUpDownForStep2(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(3).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(3).click();
}

public async clickPolygonButtonForSectorInEscalationLadders(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.first().waitFor({ state: 'visible' });
    await polyBtn.first().click();
}

public async clickPolygonButtonForTotalDelayInEscalationLadders(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(1).waitFor({ state: 'visible' });
    await polyBtn.nth(1).click();
}

public async clickPolygonButtonForStep1InEscalationLadders(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(2).waitFor({ state: 'visible' });
    await polyBtn.nth(2).click();
}

public async clickPolygonButtonForStep2InEscalationLadders(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(3).waitFor({ state: 'visible' });
    await polyBtn.nth(3).click();
}

//this method click the columns dropdown and select all the unselected values.
public async validateColumnsDropdownFunctionalityInEscalationLaddersPage (){
    const residentColumnsLocator = await this.findLocator(locators.residentColumns);
    const sectorLoc = await this.findLocator(locators.sectorXpath);
    const totalDelayLocator = await this.findLocator(locators.totalDelayXpath);
    const step1Loc = await this.findLocator(locators.step1Xpath);
    const step2Loc = await this.findLocator(locators.step2Xpath);
    const activeFilters = await this.findLocator(locators.activeFiltersXpath);
    
     await this.page.waitForTimeout(2000);
    await residentColumnsLocator.nth(2).waitFor({state:"attached"});
    await residentColumnsLocator.nth(2).click();
    await this.page.waitForTimeout(1000);
    await sectorLoc.waitFor({ state: "visible" });
    await sectorLoc.click();
   await totalDelayLocator.waitFor({ state: "visible" });
    await totalDelayLocator.click();
    await step1Loc.waitFor({ state: "visible" });
    await step1Loc.click();
    await step2Loc.waitFor({ state: "visible" });
    await step2Loc.click();

    await activeFilters.waitFor({state:"visible"});
    await activeFilters.click({ force: true });
}
//this method is used to validate the headers against the expected 
// after selecting all the options from the columns dropdown
public async getAllHeadersTextAfterColumnsSelectionInEscalationLadderPage(): Promise<string[]> {
    const tableHeaders= await this.findLocator(locators.tableHeaders);
    await tableHeaders.last().waitFor({state:"visible"});
    await this.page.waitForLoadState('networkidle');
    const headersCount = await (tableHeaders).count();
    const headerTexts: string[] = [];
    for (let i = 1; i <= 4; i++) { 
     console.log(await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent());
     const headerText = await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent();
     headerTexts.push(headerText?.trim() || ''); 
    }
    return headerTexts;
}

//this method is used to add new escalation ladder step, and validate delete button functionality 
// and perform save operation
public async addNewEscalationLadders(){
    const addEscalationLadder = await this.findLocator(locators.addEscalationLadderXpath);
    await addEscalationLadder.waitFor({ state: "visible" });
    await addEscalationLadder.click();

    await this.page.waitForLoadState('networkidle');
    const escalationLadderHeader = await this.findLocator(locators.addEscalationLadderHeaderXpath);
    const escalationLadderHeaderText = await escalationLadderHeader.textContent();
    console.log(`value`, escalationLadderHeaderText);
    expect(escalationLadderHeaderText).toContain("Nieuwe escalatieladder");

    const startSectorLabel = await this.findLocator(locators.startSectorLabelXpath);
    const startSectorText = await startSectorLabel.textContent();
    expect(startSectorText).toContain("Start sector");
    console.log(`value`, startSectorText);

    const selectStartSector = await this.findLocator(locators.selectStartSectorXpath);
    const selectStartSectorText = await selectStartSector.textContent();
    expect(selectStartSectorText).toContain("Kies een startsector");
    await selectStartSector.waitFor({ state: "visible" });
    await selectStartSector.click();

    const selectXpath = await this.findLocator(locators.selectXpath);
     await selectXpath.waitFor({ state: "visible" });
    await selectXpath.selectOption({ label: 'GayathriTest' });
    await this.page.waitForTimeout(2000); 
    await this.page.locator('body').click(); 
    await selectXpath.selectOption({ label: 'GayathriTest' });
    await this.page.waitForTimeout(2000); 

    const addStep = await this.findLocator(locators.addStepXpath);
    await addStep.waitFor({ state: "visible" });
    await addStep.click();

    const escalationStepsHeader = await this.findLocator(locators.escalationStepsXpath);
    const escalationStepsHeaderText = await escalationStepsHeader.textContent();
    expect(escalationStepsHeaderText).toContain("Escalation steps");
    console.log(`value`, escalationStepsHeaderText);

    const shiftStep1 = await this.findLocator(locators.shiftStep1Xpath);
    const shiftStep1Text = await shiftStep1.textContent();
    expect(shiftStep1Text).toContain("➛ Dienst stap 1");
    console.log(`value`, shiftStep1Text);

    const delayStep1 = await this.findLocator(locators.delayStep1Xpath);
    const delayStep1Text = await delayStep1.textContent();
    expect(delayStep1Text).toContain("Vertraging stap 1");
    console.log(`value`, delayStep1Text);

    const trashBtn = await this.findLocator(locators.trashBtnXpath);
    await trashBtn.waitFor({ state: "visible" });
    await trashBtn.click();
     await this.page.waitForTimeout(2000); 

    await addStep.waitFor({ state: "visible" });
    await addStep.click();
     
    const shiftstepDropdown = await this.findLocator(locators.shiftstepDropdownXpath);
    await shiftstepDropdown.nth(1).waitFor({ state: "visible" });
    await shiftstepDropdown.nth(1).click();

    const selectDropdown = await this.findLocator(locators.selectXpath);
    await selectDropdown.nth(1).waitFor({ state: "visible" });
    await selectDropdown.nth(1).selectOption({ label: 'GayuShift' });
    await this.page.waitForTimeout(2000); 
    await this.page.locator('body').click(); 
    await selectDropdown.nth(1).selectOption({ label: 'GayuShift' });
     await this.page.waitForTimeout(2000); 

     const stepDelayLoc = await this.findLocator(locators.stepDelayXpath);
     await stepDelayLoc.fill('3');
    
     const saveBTn = await this.findLocator(locators.saveButton);
     await saveBTn.waitFor({ state: "visible" });
    await saveBTn.click();
    await this.page.waitForTimeout(5000); 
}

//this method is used to search the added escalation step from the search box and delete it
public async searchAddedEscalationStepAndPerformDeletion(sectorsUsersData:string){
    const searchInputBox = await this.findLocator(locators.searchInputBoxXpath);
    const deleteButton = await this.findLocator(locators.deleteButtonXpath);
    const toDeleteBtnXpath = await this.findLocator(locators.toDeleteBtnXpath);
    
     await this.page.waitForLoadState('networkidle');
     await searchInputBox.waitFor({state:"attached"});
      await searchInputBox.fill(sectorsUsersData);
      await this.page.waitForLoadState('networkidle');
      await deleteButton.first().waitFor({state:"attached"});
      await deleteButton.first().click();
      await this.page.waitForTimeout(1000);
       await toDeleteBtnXpath.waitFor({state:"attached"});
      await toDeleteBtnXpath.click();
}


}

