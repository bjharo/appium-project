import { Browser, Element } from 'webdriverio';

export default abstract class BaseView {
    protected driver: Browser<'async'>;

    constructor(driver: Browser<'async'>) {
        this.driver = driver;
    }

    protected async getElement(locator: string, timeout: number = 10000): Promise<Element<'async'>> {
        const element: Element<'async'> = await this.driver.$(locator);
        
        await element.waitForExist({
            timeout: timeout
        });

        return element;
    }
}