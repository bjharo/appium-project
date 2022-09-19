import { remote, RemoteOptions, Browser } from 'webdriverio';
import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import ProjectCapabilities from './projectCapabilities';
import ContactListView from './viewObjects/contacts/contactsListView';
import NewContactView from './viewObjects/contacts/newContactView';
import ContactCardView from './viewObjects/contacts/contactCardView';
import DialerContactsView from './viewObjects/dialer/dialerContactsView';
import DialerCallView from './viewObjects/dialer/dialerCallView';

interface Person {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    phoneType: string,
    email: string,
    emailType: string
}

describe('Appium Test', function () {
	let driver: Browser<'async'>;
	this.timeout(180000);

	before(async function () {
		const remoteOptions: RemoteOptions = ProjectCapabilities.androidBaseCapabilities();
		driver = await remote(remoteOptions);
	});

	it('Add new contact, call them and delete contact', async function () {
        const contact: Person = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName().replace('\'', ''), // last name is used in locators and a single quote can cause issues
            phoneNumber: faker.phone.number('(###) ###-####'),
            phoneType: 'Mobile',
            email: faker.internet.email(),
            emailType: 'Home'
        };

        await driver.startActivity(ProjectCapabilities.appInformation.contactsAppPackage, ProjectCapabilities.appInformation.contactsAppActivity);

        const views = {
            contactsList: new ContactListView(driver),
            newContact: new NewContactView(driver),
            contactCard: new ContactCardView(driver),
            dialerContacts: new DialerContactsView(driver),
            dialerCall: new DialerCallView(driver)
        }

        await views.contactsList.closeNotificationPrompt();
        await views.contactsList.openAddNewContactView();
        await views.newContact.addNameToNewContact(contact.firstName, contact.lastName);
        await views.newContact.addPhone(contact.phoneNumber, contact.phoneType);
        await views.newContact.addEmail(contact.email,contact.emailType);
        await views.newContact.saveNewContact();

        expect(await views.contactCard.getContactName()).to.equal(`${contact.firstName} ${contact.lastName}`);
        expect(await views.contactCard.isCommunicationTypeListed('Call', 'Mobile', contact.phoneNumber)).to.be.true;
        expect(await views.contactCard.isCommunicationTypeListed('Email', 'Home', contact.email)).to.be.true;

        await driver.startActivity(ProjectCapabilities.appInformation.dialerAppPackage, ProjectCapabilities.appInformation.dialerAppActivity);
        await views.dialerContacts.searchForContact(`${contact.firstName} ${contact.lastName}`);
        await views.dialerContacts.callContactFromSearchResults(contact.firstName, contact.lastName);
        
        expect(await views.dialerCall.getContactName()).to.equal(`${contact.firstName} ${contact.lastName}`);

        await views.dialerCall.hangUp();

        await driver.startActivity(ProjectCapabilities.appInformation.contactsAppPackage, ProjectCapabilities.appInformation.contactsAppActivity);

        await views.contactsList.searchForAndOpenContact(contact.firstName, contact.lastName);
        await views.contactCard.deleteContact();
        await views.contactsList.stopSearching();
        
        expect(await views.contactsList.isContactListed(contact.firstName, contact.lastName)).to.be.false;
	});

	after(async function () {
		await driver.deleteSession();
	});
});