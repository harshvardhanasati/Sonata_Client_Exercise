import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class FlightSelectionPage extends BasePage {
  private readonly outboundFlights: Locator;
  private readonly returnFlights: Locator;
  private readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.outboundFlights = page.locator('.outbound-flight, .flight-option, .departure-flight');
    this.returnFlights = page.locator('.return-flight, .flight-option, .return-flight');
    this.continueBtn = page.locator('button:has-text("Continue"), button:has-text("Next"), .continue-button');
  }

  async selectFlights(): Promise<void> {
    await this.waitForElement(this.outboundFlights);
    await this.clickElement(this.outboundFlights.first());
    Logger.info('Selected outbound flight');
    
    await this.waitForElement(this.returnFlights);
    await this.clickElement(this.returnFlights.first());
    Logger.info('Selected return flight');
    
    await this.clickElement(this.continueBtn);
    Logger.info('Continued to passenger details');
  }

  async getFlightCount(): Promise<{ outbound: number; return: number }> {
    const outboundCount = await this.outboundFlights.count();
    const returnCount = await this.returnFlights.count();
    return { outbound: outboundCount, return: returnCount };
  }
}