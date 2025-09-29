# TUI Holiday Booking Automation

This project automates the TUI holiday booking journey using TypeScript and Playwright with Page Object Model pattern.

## Test Scenario

The automation covers the following journey on https://www.tui.co.uk/:
1. Open homepage and accept cookies
2. Select random departure airport and destination
3. Select available departure date
4. Configure 2 adults + 1 child (random age)
5. Search for holidays and select first hotel
6. Continue through hotel details and flight selection
7. Validate passenger details form with error handling

## Project Structure

```
src/
├── pages/
│   ├── BasePage.ts          # Base page with common functionality
│   ├── HomePage.ts          # Homepage interactions
│   ├── SearchResultsPage.ts # Hotel search results
│   ├── HotelDetailsPage.ts  # Hotel details page
│   ├── FlightSelectionPage.ts # Flight selection
│   └── PassengerDetailsPage.ts # Passenger form validation
tests/
└── tui-booking.spec.ts      # Main test file
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Execute the test:
```bash
npx playwright test
```

Run with UI mode:
```bash
npx playwright test --ui
```

Run with headed browser:
```bash
npx playwright test --headed
```

## Features

- **Page Object Model**: Clean separation of page logic and test logic
- **Random Data Selection**: Randomly selects airports, destinations, dates, and child age
- **Console Logging**: Prints all selected test data and booking details
- **Error Validation**: Validates passenger form fields with proper error handling
- **TypeScript**: Full type safety and IntelliSense support

## Test Output

The test logs all selected data including:
- Departure airport
- Destination
- Travel date
- Hotel name
- Guest configuration (adults/children/child age)

## Configuration

Update `playwright.config.ts` to modify browser settings, timeouts, or other test configurations.