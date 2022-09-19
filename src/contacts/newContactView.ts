import { Browser } from 'webdriverio';
import BaseView from '../baseView';

export default class NewContactView extends BaseView {
    private readonly locators = {
        firstNameField: 'android=new UiSelector().text("First name")',
        lastNameField: 'android=new UiSelector().text("Last name")',
        phoneField: 'android=new UiSelector().text("Phone")',
        emailField: 'android=new UiSelector().text("Email")',
        phoneTypeSelect: '//android.widget.Spinner[@content-desc = "Phone"]',
        emailTypeSelect: '//android.widget.Spinner[@content-desc = "Email"]',
        saveBtn: 'id:com.android.contacts:id/editor_menu_save_button',
    };

    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    public async addNameToNewContact(firstName: string, lastName: string): Promise<void> {
        const elements = {
            firstName: await this.getElement(this.locators.firstNameField),
            lastName: await this.getElement(this.locators.lastNameField)
        }

        await elements.firstName.setValue(firstName);
        await this.driver.hideKeyboard();
        await elements.lastName.setValue(lastName);
        await this.driver.hideKeyboard();
    }

    public async addPhone(phoneNumber: string, phoneType: string) {
        const elements = {
            phoneTypeListToggle: await this.getElement(this.locators.phoneTypeSelect),
            phone: await this.getElement(this.locators.phoneField)
        };

        await elements.phoneTypeListToggle.click();
        await (await this.getElement(`//android.widget.ListView/android.widget.CheckedTextView[@text = "${phoneType}"]`)).click();
        await elements.phone.setValue(phoneNumber);
    }

    public async addEmail(emailAddress: string, emailType: string) {
        const elements = {
            emailTypeListToggle: await this.getElement(this.locators.emailTypeSelect),
            email: await this.getElement(this.locators.emailField)
        };

        await elements.emailTypeListToggle.click();
        await (await this.getElement(`//android.widget.ListView/android.widget.CheckedTextView[@text = "${emailType}"]`)).click();
        await elements.email.setValue(emailAddress);
    }

    public async saveNewContact(): Promise<void> {
        const saveBtnElement = await this.getElement(this.locators.saveBtn);
        await saveBtnElement.click();
    }
}