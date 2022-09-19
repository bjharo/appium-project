import { RemoteOptions } from 'webdriverio';

class ProjectCapabilities {
 
    private static webDriverPath: string = '/wd/hub';
    private static webDriverPort: number = 4723;
 
    static androidBaseCapabilities(appPackage: string = '', appActivity: string = '', additionalCaps?: object): RemoteOptions {
        const desiredCapabilities = {
            platformName: 'Android',
            deviceName: 'Android Emulator',
            appPackage: appPackage,
            appActivity: appActivity,
            automationName: 'UiAutomator2',
            ...additionalCaps
        };

        return {
            path: this.webDriverPath,
            port: this.webDriverPort,
            capabilities: desiredCapabilities
        }
    }

    static readonly appInformation = {
        contactsAppPackage: 'com.android.contacts',
        contactsAppActivity: 'com.android.contacts.activities.PeopleActivity',
        dialerAppPackage: 'com.google.android.dialer',
        dialerAppActivity: 'com.google.android.dialer.extensions.GoogleDialtactsActivity'
    }
}

export default ProjectCapabilities;