export class RandomHelper {
  static getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomAge(min: number = 2, max: number = 17): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}