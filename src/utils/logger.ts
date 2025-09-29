export class Logger {
  static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  }

  static logBookingData(data: any): void {
    console.log('\n=== BOOKING SUMMARY ===');
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log('========================\n');
  }
}