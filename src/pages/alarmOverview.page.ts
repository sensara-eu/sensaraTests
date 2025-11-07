//** GayathriAsokh
// This page is used to perform UI operations in Alarm Overview page 
// in both Sensara Test and Acceptance environment*/

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
    
  public async clickAlarmOverviewLink(){
    const alarmOverviewLink = await this.findLocator(locators.alarmOverviewXpath);
    await alarmOverviewLink.waitFor({state:"attached"});
    await alarmOverviewLink.click();
    
  }

// this method is used to get all the table headers in alarm Overview page and 
// validate it against the expected one
  public async getAllHeadersTextsInAlarmOverviewPage(): Promise<string[]> {
    const tableHeaders= await this.findLocator(locators.tableHeaders);
    await tableHeaders.first().waitFor({state:"visible"});
    await this.page.waitForLoadState('networkidle');
    const headersCount = await (tableHeaders).count();
    const headerTexts: string[] = [];
    for (let i = 1; i <= headersCount; i++) { 
      console.log(await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent());
        const headerText = await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent();
        headerTexts.push(headerText?.trim() || ''); 
    }
    return headerTexts;
}

  public async clickArrowUpDownForType(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.first().waitFor({ state: 'visible' });
    await arrowUpDownLocator.first().click();
}

public async getFirstCellTextInAlarmOverView(): Promise<string> {
    const firstCell = await this.findLocator(locators.typeFirstCellText);
    await firstCell.waitFor({ state: "visible" });
    const text = await firstCell.textContent();
    return text?.trim() || "";
}

 public async clickArrowUpDownForCreationDate(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(1).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(1).click();
}

 public async getFirstCellTextForCreationDate(): Promise<string> {
    const firstCell = await this.findLocator(locators.creationDateFirstCellText);
    await firstCell.nth(0).waitFor({ state: "visible" });
    const text = await firstCell.nth(0).textContent();
    return text?.trim() || "";
}

 public async clickArrowUpDownForAlarm(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(2).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(2).click();
}

 public async clickArrowUpDownForResident(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(3).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(3).click();
}

 public async getFirstCellTextForResident(): Promise<string> {
    const firstCell = await this.findLocator(locators.residentFirstCellText);
    await firstCell.waitFor({ state: "visible" });
    const text = await firstCell.textContent();
    return text?.trim() || "";
}

 public async clickArrowUpDownForSectorInAlarmOverviewPage(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(4).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(4).click();
}

 public async getFirstCellTextForSectorInAlarmOverviewPage(): Promise<string> {
    const firstCell = await this.findLocator(locators.sectorFirstCellInAlarmOverview);
    await firstCell.waitFor({ state: "visible" });
    const text = await firstCell.textContent();
    return text?.trim() || "";
}

public async clickArrowUpDownForProcessorInAlarmOverviewPage(){
    const arrowUpDownLocator = await this.findLocator(locators.arrowUpDownXpath);
    await arrowUpDownLocator.nth(5).waitFor({ state: 'visible' });
    await arrowUpDownLocator.nth(5).click();
}

 public async getFirstCellTextForProcessorInAlarmOverviewPage(): Promise<string> {
    const firstCell = await this.findLocator(locators.processorFirstCellText);
    await firstCell.waitFor({ state: "visible" });
    const text = await firstCell.textContent();
    return text?.trim() || "";
}

public async clickPolygonButtonForType(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.first().waitFor({ state: 'visible' });
    await polyBtn.first().click();
}
//this method is used to click the polygon button and select all the values from the polygon dropdown
public async validatepolygonFunctionality(){
    const dropdownItems = await this.findLocator(locators.polygondropdownOptions);
    const numberOfOptions = dropdownItems.count();
  
    for (let i = 0; i < await numberOfOptions ; i++) {
    const item = dropdownItems.nth(i);
    const text = await item.innerText();
    console.log(`Clicking on: ${text}`);

    await item.click();
}}

//this method is used to validate calendar date picker for the creation date field(there is existing bug)
public async validatepolygonFunctionalityForCreationDate(){
  const fromDateBtn = await this.findLocator(locators.fromDateButtonXpath);
  const nextMonthBtn = await this.findLocator(locators.nextButtonXpath);
  const prevMonthBtn = await this.findLocator(locators.previousMonthButtonXpath);
  const monthLabel = await this.findLocator(locators.monthLabelXpath);
  const fromDateValue = await this.findLocator(locators.fromDateValueXpath);

  const toDateBtn = await this.findLocator(locators.toDateButtonXpath);
  const toDateValue = await this.findLocator(locators.toDateValueXpath);

  await fromDateBtn.waitFor({ state: 'visible' });
    await fromDateBtn.click();
  while(!(await monthLabel.textContent()).includes('oktober')){
    await prevMonthBtn.click();
    await this.page.waitForTimeout(1000);
  }
   await fromDateValue.waitFor({ state: 'visible' });
   await fromDateValue.click();
   await fromDateBtn.waitFor({ state: 'visible' });
    await fromDateBtn.click();

  await toDateBtn.waitFor({ state: 'visible' });
  await toDateBtn.click();
  while(!(await monthLabel.textContent()).includes('december')){
    await nextMonthBtn.click();
    await this.page.waitForTimeout(1000);

    await toDateValue.first().waitFor({ state: 'visible' });
   await toDateValue.first().click();
   await toDateBtn.waitFor({ state: 'visible' });
    await toDateBtn.click();
  }

}

public async clickPolygonButtonForCreationDate(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(1).waitFor({ state: 'visible' });
    await polyBtn.nth(1).click();
}

public async clickPolygonButtonForAlarm(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(2).waitFor({ state: 'visible' });
    await polyBtn.nth(2).click();
}

public async clickPolygonButtonForResident(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(3).waitFor({ state: 'visible' });
    await polyBtn.nth(3).click();
}

public async clickPolygonButtonForSector(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(4).waitFor({ state: 'visible' });
    await polyBtn.nth(4).click();
}

public async clickPolygonButtonForProcessor(){
    const polyBtn = await this.findLocator(locators.polygonBtn);
    await polyBtn.nth(5).waitFor({ state: 'visible' });
    await polyBtn.nth(5).click();
}

//this method is used to validate the pagination functionality in alarm overview page
public async validatePaginationFunctionalityForRightStroke(){
    const paginationRightBtn = await this.findLocator(locators.paginationRightXpath);
    const numberOfItems = await this.findLocator(locators.tabledataXpath);
    const firstPageItems = await numberOfItems.first().textContent();
    await paginationRightBtn.waitFor({state: 'visible'});
    await paginationRightBtn.click();
    await this.page.waitForLoadState("networkidle");
     await this.page.waitForTimeout(5000);
    const secondPageItems = await numberOfItems.first().textContent();
    expect(secondPageItems).not.toContain(firstPageItems);

}

public async validatePaginationFunctionalityForLeftStroke(){
    const paginationLeftBtn = await this.findLocator(locators.paginationLeftXpath);
    const numberOfItems = await this.findLocator(locators.tabledataXpath);
    const secondPageItems = await numberOfItems.first().textContent();
    await paginationLeftBtn.waitFor({state: 'visible'});
    await paginationLeftBtn.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(5000);
    const firstPageItems = await numberOfItems.first().textContent();
    expect(secondPageItems).not.toContain(firstPageItems);

}

//this method is used to validate the toggle button-the automatic refresh functionality 
public async validateAutomaticRefreshFunctionality() {
  await this.page.waitForLoadState("networkidle");
  const paginationLeft = await this.findLocator(locators.paginationLeftXpath);
  const paginationRight = await this.findLocator(locators.paginationRightXpath);
  const refreshToggle = await this.findLocator(locators.refreshToggleXpath);
  const refreshToggleAfterClick = await this.findLocator(locators.refreshToggleAfterEnabled)

  await refreshToggle.waitFor({ state: 'visible', timeout: 10000 });
  await expect(refreshToggle).toBeVisible();

  let classAttr = await refreshToggle.getAttribute('class');
  console.log('Toggle class:', classAttr);

  // If toggle is disabled (toggle-left), click it to enable it
  if (classAttr?.includes('toggle-left')) {
    await refreshToggle.click();
    await this.page.waitForTimeout(1000); 
    await refreshToggleAfterClick.waitFor({ state: 'visible', timeout: 10000 });

    classAttr = await refreshToggleAfterClick.getAttribute('class');
    console.log('After clicking, Toggle class:', classAttr);
  }
  // Check if toggle is now enabled (toggle-right)
  if (classAttr?.includes('toggle-right')) {
    // Toggle is enabled, pagination should not be present
    await expect(paginationRight).toHaveCount(0);
    await refreshToggleAfterClick.click();
  } else if (classAttr?.includes('toggle-left')) {
    // Toggle is disabled, pagination should be present
    await expect(paginationLeft).toHaveCount(1);
  } else {
    throw new Error(`Unexpected toggle class: ${classAttr}`);
  }
}

//this method is used to check for the Alarm image 'open' status by hovering and processor the alarm.
public async validateAlarmProcessingFunctionality() {

  const alarmImages = await this.findLocator(locators.openAlarmXpath); 
  const count = await alarmImages.count();
  for (let i = 0; i < count; i++) {
    const alarmImage = alarmImages.nth(i);
    await alarmImage.waitFor({ state: 'visible' });

    const image = alarmImage.locator('img');
    await image.hover();
    await this.page.waitForTimeout(2000); 

    const tooltip = await this.findLocator(locators.alarmTooltipXpath);
    const tooltipText = await tooltip.nth(i).textContent();
    console.log(`Tooltip text for alarm ${i}:`, tooltipText);

    if (tooltipText?.includes('Open')) {
      console.log(`Tooltip shows "Open" for alarm ${i}`);

      const row = alarmImage.locator('xpath=ancestor::tr'); 
      const typeText = await row.locator('td:nth-child(1) span').textContent();
      console.log('Type for this alarm:', typeText);

      const editBtn = await this.findLocator(locators.editButtonXpath);
      await editBtn.nth(i).waitFor({ state: "attached" });
      await editBtn.nth(i).click();
      await this.page.waitForTimeout(2000);

      const formLabel = await this.findLocator(locators.formlabelCSS);
      await formLabel.nth(1).waitFor({ state: 'visible' });

      const dropdownButton = await this.findLocator(locators.statusComboboxXpath);
      await dropdownButton.nth(3).waitFor({ state: "attached" });
      await dropdownButton.nth(3).click();
      await expect(dropdownButton.nth(3)).toHaveAttribute('aria-expanded', 'true');

      const optionToSelect = this.page.locator('[role="option"]', { hasText: 'Afgehandeld' });
      await optionToSelect.click();
      await expect(dropdownButton.locator('span').nth(3)).toHaveText('Afgehandeld');

      const closeBtn = await this.findLocator(locators.closeButton);
      await closeBtn.waitFor({state:"attached"});
      await closeBtn.click();
       await this.page.waitForLoadState("networkidle");

      break;
    } else {
      console.log(`Tooltip does not show "Open" for alarm ${i}`);
    }
  }
}

//this method click the columns dropdown and select all the unselected values.
public async validateColumnsDropdownFunctionalityInAlarmOverviewPage (){
    const residentColumnsLocator = await this.findLocator(locators.residentColumns);
    const lastModifiedLoc = await this.findLocator(locators.lastModifiedXpath);
    const locationLocator = await this.findLocator(locators.locationXpath);
    const escalatedLoc = await this.findLocator(locators.escalatedXpath);
    const activeFilters = await this.findLocator(locators.activeFiltersXpath);
    await residentColumnsLocator.nth(2).waitFor({state:"attached"});
    await residentColumnsLocator.nth(2).click();
    await this.page.waitForTimeout(1000);
    await lastModifiedLoc.waitFor({ state: "visible" });
    await lastModifiedLoc.click();
    await locationLocator.click();
    await escalatedLoc.click();
    await activeFilters.waitFor({state:"visible"});
    await activeFilters.click({ force: true });
}

//this method is used to validate the headers against the expected 
// after selecting all the options from the columns dropdown
public async getAllHeadersTextAfterColumnsSelectionInAlarmOverviewPage(): Promise<string[]> {
    const tableHeaders= await this.findLocator(locators.tableHeaders);
    await tableHeaders.last().waitFor({state:"visible"});
    await this.page.waitForLoadState('networkidle');
    const headersCount = await (tableHeaders).count();
    const headerTexts: string[] = [];
    for (let i = 1; i <= 9; i++) { 
     console.log(await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent());
     const headerText = await (await this.findLocator(locators.tableBeforeHeadersXpath + i + locators.tableAfterHeadersXpath)).textContent();
     headerTexts.push(headerText?.trim() || ''); 
    }
    return headerTexts;
}

}
  
  
