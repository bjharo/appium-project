import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class DialerContactsView extends BaseView {
    private readonly locators = {
        contactsTab: '~Contacts',
        searchBar: '//android.widget.EditText[@resource-id, "com.google.android.dialer:id/open_search_bar"]/android.widget.ImageButton',
        searchField: 'id:com.google.android.dialer:id/open_search_view_edit_text'
    }
    
    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    public async openContactsTab(): Promise<void> {
        const element = await this.getElement(this.locators.contactsTab);
        await element.click();
    }

    public async searchForContact(searchTerm: string): Promise<void> {
        const searchBar = await this.getElement(this.locators.searchBar);
        await searchBar.click();
        const searchField = await this.getElement(this.locators.searchField);
        await searchField.setValue(searchTerm);
    }

    public async callContactFromSearchResults(firstName: string, lastName: string): Promise<void> {
        const element = await this.getElement(`//android.widget.TextView[@text, '${firstName} ${lastName}']/following-sibling::android.widget.ImageView[@contact-desc, 'Call']`);
        await element.click();
    }
}