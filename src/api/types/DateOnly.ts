import DayOfWeek from "./DayOfWeek";

export default interface DateOnly {
  year: number;

  month: number;

  day: number;

  dayOfWeek: DayOfWeek;

  readonly dayOfYear: number;

  readonly dayNumber: number;
}