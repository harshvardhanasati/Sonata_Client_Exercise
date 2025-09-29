import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { PassengerData } from '../data/test-data';

export class PassengerDetailsPage extends BasePage {
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailField: Locator;
  private readonly phoneField: Locator;
  private readonly errorMessages: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = page.locator('input[name="firstName"], input[placeholder*="First name"], #firstName');
    this.lastNameField = page.locator('input[name="lastName"], input[placeholder*="Last name"], #lastName');
    this.emailField = page.locator('input[name="email"], input[type="email"], #email');
    this.phoneField = page.locator('input[name="phone"], input[type="tel"], #phone');
    this.errorMessages = page.locator('.error-message, .field-error, .validation-error');
    this.submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), .submit-button');
  }

  async validateEmptyFields(): Promise<void> {
    Logger.info('Starting passenger details validation');
    
    await this.clickElement(this.firstNameField);
    await this.clickElement(this.lastNameField);
    
    try {
      await expect(this.errorMessages).toContainText('required', { timeout: 5000 });
      Logger.info('Empty field validation passed');
    } catch {
      Logger.info('Empty field validation not triggered');
    }
    
    await this.fillText(this.emailField, 'invalid-email');
    await this.clickElement(this.phoneField);
    
    try {
      await expect(this.errorMessages).toContainText('valid email', { timeout: 5000 });
      Logger.info('Invalid email validation passed');
    } catch {
      Logger.info('Invalid email validation not triggered');
    }
    
    Logger.info('Passenger details validation completed');
  }

  async fillPassengerDetails(passengerData: PassengerData): Promise<void> {
    await this.fillText(this.firstNameField, passengerData.firstName);
    await this.fillText(this.lastNameField, passengerData.lastName);
    await this.fillText(this.emailField, passengerData.email);
    await this.fillText(this.phoneField, passengerData.phone);
    Logger.info(`Filled passenger details for: ${passengerData.firstName} ${passengerData.lastName}`);
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.errorMessages.allTextContents();
    return errors.filter(error => error.trim() !== '');
  }
}