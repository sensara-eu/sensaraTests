import {Page} from "@playwright/test";
import Wrapper from "../base/Wrapper";

export default class CommonPage extends Wrapper {
    private static generatedEmail: string;

    constructor(public page: Page){
        super(page);
    }

    public generatedEmailId(): string {
        if(!CommonPage.generatedEmail){
            CommonPage.generatedEmail = `user_${Math.random().toString(36).substring(2,7)}@sensara.eu`;   
        }
        return CommonPage.generatedEmail;
    }

    public getGeneratedEmail(): string {
        if(!CommonPage.generatedEmail){
            throw new Error("Email not generated yet. Call generatedRandomEMailId() first!");
        }
        return CommonPage.generatedEmail;
    }
}