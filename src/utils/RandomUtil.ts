export class RandomUtil {
  /**
   * Generates a random alphabetic string
   * @param length Length of the generated string
   */
  static getRandomString(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generates a random number in a given range [min, max]
   * @param min Minimum value
   * @param max Maximum value
   */
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random email address
   */
  static getRandomEmail(): string {
    return `test_${this.getRandomString(6).toLowerCase()}@example.com`;
  }

  /**
   * Generates a random 5-digit postal code
   */
  static getRandomPostalCode(): string {
    return this.getRandomNumber(10000, 99999).toString();
  }
}
