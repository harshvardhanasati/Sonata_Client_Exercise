import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { TestConfig } from '../config/test-config';
import { Logger } from './logger';

export class BrowserHelper {
  static async createIncognitoContext(browser: Browser): Promise<BrowserContext> {
    const context = await browser.newContext({
      viewport: TestConfig.viewport,
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      permissions: ['geolocation'],
      extraHTTPHeaders: {
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
      }
    });
    
    Logger.info('Created incognito browser context');
    return context;
  }

  static async createPage(context: BrowserContext): Promise<Page> {
    const page = await context.newPage();
    
    // Set user agent to avoid bot detection
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    Logger.info('Created new page with custom headers');
    return page;
  }
}