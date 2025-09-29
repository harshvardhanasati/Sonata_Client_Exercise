import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../config/test-config';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  protected page: Page;
  protected readonly baseURL = TestConfig.baseURL;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url?: string): Promise<void> {
    const targetUrl = url || this.baseURL;
    await this.page.goto(targetUrl);
    Logger.info(`Navigated to: ${targetUrl}`);
  }

  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator: Locator, timeout: number = TestConfig.timeout): Promise<void> {
    await locator.waitFor({ timeout });
  }

  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  async fillText(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }
}