import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class HotelDetailsPage extends BasePage {
  private readonly continueBtn: Locator;
  private readonly hotelTitle: Locator;
  private readonly hotelRating: Locator;

  constructor(page: Page) {
    super(page);
    this.continueBtn = page.locator('button:has-text("Continue"), button:has-text("Book now"), .continue-button');
    this.hotelTitle = page.locator('.hotel-title, .accommodation-title, h1');
    this.hotelRating = page.locator('.hotel-rating, .star-rating, .rating');
  }

  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueBtn);
    Logger.info('Continued from hotel details page');
  }

  async getHotelDetails(): Promise<{ title: string; rating: string }> {
    const title = await this.getText(this.hotelTitle);
    const rating = await this.getText(this.hotelRating);
    return { title, rating };
  }
}