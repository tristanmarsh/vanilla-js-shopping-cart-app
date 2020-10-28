/**
 * Utility Format class with common static methods
 * @class Format
 */
export class Format {
  static centsToDollars(cents = 0) {
    return Number(cents / 100).toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
    })
  }
}
