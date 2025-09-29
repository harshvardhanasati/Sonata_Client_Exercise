import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { HotelDetailsPage } from '../src/pages/HotelDetailsPage';
import { FlightSelectionPage } from '../src/pages/FlightSelectionPage';
import { PassengerDetailsPage } from '../src/pages/PassengerDetailsPage';
import { Logger } from '../src/utils/logger';
import { BookingData } from '../src/data/test-data';

test.describe('TUI Holiday Booking Tests', () => {
  test('E2E TUI Holiday Booking Journey', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const page = await context.newPage();
    Logger.info('Created incognito browser session');
    
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const hotelDetailsPage = new HotelDetailsPage(page);
    const flightSelectionPage = new FlightSelectionPage(page);
    const passengerDetailsPage = new PassengerDetailsPage(page);

    const bookingData: Partial<BookingData> = {};

    Logger.info('Starting TUI Holiday Booking Test');

    await homePage.navigateTo();
    await homePage.waitForLoadState();

    await homePage.acceptCookies();

    bookingData.departureAirport = await homePage.selectDepartureAirport();

    bookingData.destination = await homePage.selectDestination();

    bookingData.departureDate = await homePage.selectDepartureDate();

    const guestConfig = await homePage.configureRoomsAndGuests();
    bookingData.adults = guestConfig.adults;
    bookingData.children = guestConfig.children;
    bookingData.childAge = guestConfig.childAge;

    await homePage.searchHolidays();

    bookingData.hotelName = await searchResultsPage.selectFirstHotel();

    await hotelDetailsPage.clickContinue();

    await flightSelectionPage.selectFlights();

    await passengerDetailsPage.validateEmptyFields();

    Logger.logBookingData(bookingData);

    expect(bookingData.departureAirport).toBeTruthy();
    expect(bookingData.destination).toBeTruthy();
    expect(bookingData.hotelName).toBeTruthy();
    expect(bookingData.adults).toBe(2);
    expect(bookingData.children).toBe(1);
    expect(bookingData.childAge).toBeGreaterThan(0);

    Logger.info('TUI Holiday Booking Test completed successfully');
    
    await context.close();
  });
});