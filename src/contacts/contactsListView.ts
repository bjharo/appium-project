import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class ContactListView extends BaseView {
    private readonly locators = {
        allowNotificationPermissionBtn: 'id:com.android.permissioncontroller:id/permission_allow_button',
        newContactBtn: '~Create new contact',
        searchContactsBtn: '~Search contacts',
        searchField: 'id:com.android.contacts:id/search_view',
        stopSearchArrow: '~stop searching',
        totalContactsLabel: 'id:com.android.contacts:id/totalContactsText'
    };

    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    public async closeNotificationPrompt(): Promise<void> {
        if (await this.driver.$(this.locators.allowNotificationPermissionBtn).isDisplayed()) {
            const notificationBtn = await this.getElement(this.locators.allowNotificationPermissionBtn);
            await notificationBtn.click();
        }
    }

    public async openAddNewContactView(): Promise<void> {
        const newContactBtn = await this.getElement(this.locators.newContactBtn);
        await newContactBtn.click();
    }

    public async searchForAndOpenContact(firstName: string, lastName: string): Promise<void> {
        const searchBtn = await this.getElement(this.locators.searchContactsBtn);
        await searchBtn.click();

        const searchField = await this.getElement(this.locators.searchField);
        await searchField.setValue(`${firstName} ${lastName}`);

        const contactRow = await this.getElement(`~${firstName} ${lastName}`);
        await contactRow.click();
    }

    public async stopSearching(): Promise<void> {
        const element = await this.getElement(this.locators.stopSearchArrow);
        await element.click();
    }

    public async getTotalContactsLabel(): Promise<string> {
        const element = await this.getElement(this.locators.totalContactsLabel);
        return await element.getText();
    }
}