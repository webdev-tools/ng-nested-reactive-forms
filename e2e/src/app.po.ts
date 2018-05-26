import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(): any | Promise<any> {
    return browser.get('/');
  }

  getParagraphText(): any | Promise<any> {
    return element(by.css('app-root h1')).getText();
  }

}
