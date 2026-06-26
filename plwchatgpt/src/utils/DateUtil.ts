export class DateUtil {
  /**
   * Gets the current date formatted as string
   * @param format 'YYYY-MM-DD' | 'MM/DD/YYYY'
   */
  static getCurrentDateString(format: 'YYYY-MM-DD' | 'MM/DD/YYYY' = 'YYYY-MM-DD'): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    if (format === 'MM/DD/YYYY') {
      return `${mm}/${dd}/${yyyy}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Gets a future date by adding a number of days to the current date
   * @param daysAhead Number of days to add
   * @param format 'YYYY-MM-DD' | 'MM/DD/YYYY'
   */
  static getFutureDateString(daysAhead: number, format: 'YYYY-MM-DD' | 'MM/DD/YYYY' = 'YYYY-MM-DD'): string {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysAhead);
    
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');

    if (format === 'MM/DD/YYYY') {
      return `${mm}/${dd}/${yyyy}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }
}
