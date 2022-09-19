import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class DialerCallView extends BaseView {
    private readonly locators = {
        hangUpBtn: 'id:com.google.android.dialer:id/incall_end_call',
        contactName: 'id:com.google.android.dialer:id/contactgrid_contact_name'
    }
    
    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    public async hangUp(): Promise<void> {
        const element = await this.getElement(this.locators.hangUpBtn);
        await element.click();
        await element.waitForExist( {
            timeout: 10000,
            reverse: true
        });
    }

    public async getContactName(): Promise<string> {
        const element = await this.getElement(this.locators.contactName);
        return await element.getText();
    }
}