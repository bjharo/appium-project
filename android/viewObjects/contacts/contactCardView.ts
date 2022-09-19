import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class ContactCardView extends BaseView {
    private readonly locators = {
        title: 'id:com.android.contacts:id/large_title',
        moreOptionsBtn: '~More options',
        deleteOption: 'android=new UiSelector().text("Delete")',
        confirmDeleteBtn: 'android=new UiSelector().text("DELETE")'
    };

    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    public async getContactName(): Promise<string> {
        const element = await this.getElement(this.locators.title);
        return await element.getText();
    }

    public async isCommunicationTypeListed(commType: string, commSubType: string, commValue: string): Promise<boolean> {
        const locator = `~${commType} ${commSubType} ${commValue}`;

        try {
            await this.getElement(locator);
            return true;
        } catch {
            return false;
        }
    }

    public async deleteContact(): Promise<void> {
        const optionsMenu = await this.getElement(this.locators.moreOptionsBtn);
        await optionsMenu.click();

        const deleteOption = await this.getElement(this.locators.deleteOption);
        await deleteOption.click();

        const confirmDelete = await this.getElement(this.locators.confirmDeleteBtn);
        await confirmDelete.click();
    }
}