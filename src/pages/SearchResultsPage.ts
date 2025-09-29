import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class SearchResultsPage extends BasePage {
  private readonly hotelCards: Locator;
  private readonly hotelNames: Locator;
  private readonly firstHotel: Locator;

  constructor(page: Page) {
    super(page);
    this.hotelCards = page.locator('.hotel-card, .accommodation-card, .result-item');
    this.hotelNames = page.locator('.hotel-name, .accommodation-name, .result-title');
    this.firstHotel = this.hotelCards.first();
  }

  async selectFirstHotel(): Promise<string> {
    await this.waitForElement(this.hotelCards);
    const hotelName = await this.getText(this.hotelNames.first());
    await this.clickElement(this.firstHotel);
    Logger.info(`Selected hotel: ${hotelName}`);
    return hotelName;
  }

  async getHotelCount(): Promise<number> {
    return await this.hotelCards.count();
  }
}