import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class ContactListView extends BaseView {
    private readonly locators = {
        allowNotificationPermissionBtn: 'id:com.android.permissioncontroller:id/permission_allow_button',
        newContactBtn: '~Create new contact',
        searchContactsBtn: '~Search contacts',
        searchField: 'id:com.android.contacts:id/search_view',
        stopSearchArrow: '~stop searching',
        contactsMessage: 'id:com.android.contacts:id/message'
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
        this.closeNotificationPrompt();
        
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

    public async isContactListed(firstName: string, lastName: string): Promise<boolean> {
        // if there are no contact, the search button won't be displayed
        if (await this.driver.$(this.locators.searchContactsBtn).isDisplayed() === false) {
            const messageElement = await this.getElement(this.locators.contactsMessage);

            if (await messageElement.getText() === 'Your contacts list is empty') {
                return false;
            } else {
                throw new Error(`Could not properly determine the presence of a contact with the name: ${firstName} ${lastName}`);
            }
        }

        const searchBtn = await this.getElement(this.locators.searchContactsBtn);
        
        await searchBtn.click();

        const searchField = await this.getElement(this.locators.searchField);
        await searchField.setValue(`${firstName} ${lastName}`);

        try {
            await this.driver.$(`~${firstName} ${lastName}`).waitForExist({ timeout: 2500 });
            return true;
        } catch {
            return false;
        }
    }
}