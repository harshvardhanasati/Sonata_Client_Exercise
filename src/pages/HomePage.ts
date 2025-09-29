import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { RandomHelper } from '../utils/random-helper';

export class HomePage extends BasePage {
  private readonly acceptCookiesBtn: Locator;
  private readonly departureDropdown: Locator;
  private readonly destinationDropdown: Locator;
  private readonly departureDatePicker: Locator;
  private readonly roomsGuestsBtn: Locator;
  private readonly searchBtn: Locator;
  private readonly airportOptions: Locator;
  private readonly destinationOptions: Locator;
  private readonly availableDates: Locator;
  private readonly adultsPlus: Locator;
  private readonly childrenPlus: Locator;
  private readonly childAgeDropdown: Locator;
  private readonly ageOptions: Locator;
  private readonly roomsGuestsDone: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler, button:has-text("Accept All Cookies"), button:has-text("Accept")');
    this.departureDropdown = page.locator('input[placeholder*="departure"], input[placeholder*="From"], .departure-input');
    this.destinationDropdown = page.locator('input[placeholder*="destination"], input[placeholder*="To"], .destination-input');
    this.departureDatePicker = page.locator('input[placeholder*="date"], input[placeholder*="Departure"], .date-input');
    this.roomsGuestsBtn = page.locator('button:has-text("rooms"), button:has-text("guests"), .rooms-guests-button');
    this.searchBtn = page.locator('button[type="submit"]:has-text("Search"), button:has-text("Find holidays"), .search-button');
    this.airportOptions = page.locator('.airport-option, .dropdown-option, li[role="option"]');
    this.destinationOptions = page.locator('.destination-option, .dropdown-option, li[role="option"]');
    this.availableDates = page.locator('.available-date, .calendar-day:not(.disabled), td[role="gridcell"]:not(.disabled)');
    this.adultsPlus = page.locator('button[aria-label*="adults"][aria-label*="increase"], .adults .plus-button');
    this.childrenPlus = page.locator('button[aria-label*="children"][aria-label*="increase"], .children .plus-button');
    this.childAgeDropdown = page.locator('select[name*="age"], .child-age-select');
    this.ageOptions = page.locator('option[value], .age-option');
    this.roomsGuestsDone = page.locator('button:has-text("Done"), button:has-text("Apply"), .apply-button');
  }

  async acceptCookies(): Promise<void> {
    try {
      await this.page.waitForLoadState('networkidle');
      
      const cookieSelectors = [
        '#onetrust-accept-btn-handler',
        'button:has-text("Accept all")',
        'button:has-text("Accept")',
        '[id*="accept"][id*="cookie"]',
        '.cookie-accept',
        '[aria-label*="Accept"]'
      ];
      
      let cookieAccepted = false;
      
      for (const selector of cookieSelectors) {
        try {
          const cookieBtn = this.page.locator(selector);
          if (await cookieBtn.isVisible({ timeout: 2000 })) {
            await cookieBtn.click();
            Logger.info(`Cookies accepted using selector: ${selector}`);
            cookieAccepted = true;
            break;
          }
        } catch {
          continue;
        }
      }
      
      if (!cookieAccepted) {
        Logger.info('No cookie banner found or already accepted');
      }
      
      await this.page.waitForTimeout(1000);
      
    } catch (error) {
      Logger.error(`Cookie acceptance failed: ${error}`);
    }
  }

  async selectDepartureAirport(): Promise<string> {
    await this.clickElement(this.departureDropdown);
    const count = await this.airportOptions.count();
    const randomIndex = RandomHelper.getRandomIndex(count);
    const selectedAirport = this.airportOptions.nth(randomIndex);
    const airportName = await this.getText(selectedAirport);
    await this.clickElement(selectedAirport);
    Logger.info(`Selected departure airport: ${airportName}`);
    return airportName;
  }

  async selectDestination(): Promise<string> {
    await this.clickElement(this.destinationDropdown);
    const count = await this.destinationOptions.count();
    const randomIndex = RandomHelper.getRandomIndex(count);
    const selectedDestination = this.destinationOptions.nth(randomIndex);
    const destinationName = await this.getText(selectedDestination);
    await this.clickElement(selectedDestination);
    Logger.info(`Selected destination: ${destinationName}`);
    return destinationName;
  }

  async selectDepartureDate(): Promise<string> {
    await this.clickElement(this.departureDatePicker);
    const count = await this.availableDates.count();
    const randomIndex = RandomHelper.getRandomIndex(count);
    const selectedDate = this.availableDates.nth(randomIndex);
    const dateText = await this.getText(selectedDate);
    await this.clickElement(selectedDate);
    Logger.info(`Selected departure date: ${dateText}`);
    return dateText;
  }

  async configureRoomsAndGuests(): Promise<{ adults: number; children: number; childAge: number }> {
    await this.clickElement(this.roomsGuestsBtn);
    
    await this.clickElement(this.adultsPlus);
    await this.clickElement(this.childrenPlus);
    
    await this.clickElement(this.childAgeDropdown);
    const ageCount = await this.ageOptions.count();
    const randomAgeIndex = RandomHelper.getRandomIndex(ageCount);
    const selectedAge = this.ageOptions.nth(randomAgeIndex);
    const childAge = parseInt(await this.getText(selectedAge));
    await this.clickElement(selectedAge);
    
    await this.clickElement(this.roomsGuestsDone);
    
    const guestConfig = { adults: 2, children: 1, childAge };
    Logger.info(`Guest configuration: ${guestConfig.adults} adults, ${guestConfig.children} child (age ${guestConfig.childAge})`);
    return guestConfig;
  }

  async searchHolidays(): Promise<void> {
    await this.clickElement(this.searchBtn);
    Logger.info('Holiday search initiated');
  }
}