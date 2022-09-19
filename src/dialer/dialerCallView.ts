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
            timeout: 20000,
            reverse: true
        });
    }

    public async getContactName(): Promise<string> {
        const element = await this.getElement(this.locators.contactName);
        
        // the dialer can be slow to load so wait until this element has some text
        await this.driver.waitUntil(
            async() => (await element.getText() !== ''),
            {
                timeout: 10000,
                timeoutMsg: 'The contact name label never populated with a name.' 
            }
        );

        return await element.getText();
    }
}