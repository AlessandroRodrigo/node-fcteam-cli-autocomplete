import { Holiday } from "../interfaces/holiday.interface";
import { brasilApi } from "./brasil-api";

export class DateUtils {
  private static holidays: Holiday[] = [];

  private static finalListDates: Date[] = [];

  public static getHolidays = async (year: number): Promise<Holiday[]> => {
    if (this.holidays.length > 0) {
      return this.holidays;
    }

    const { data } = await brasilApi.get<Holiday[]>(`/feriados/v1/${year}`);

    this.holidays = data;

    return data;
  };

  public static getCurrentYear(): number {
    return new Date().getFullYear();
  }

  public static getListOfDatesOfMonth = (): Date[] => {
    const dates: Date[] = [];
    const numberOfDaysInCurrentMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= numberOfDaysInCurrentMonth; i += 1) {
      dates.push(new Date(new Date().getFullYear(), new Date().getMonth(), i));
    }

    return dates;
  };

  public static setDateTimezone(date: Date, time: string): Date {
    const hour = time.split(":")[0];
    const minute = time.split(":")[1];

    const isValidHour = hour >= "00" && hour <= "23";
    const isValidMinute = minute >= "00" && minute <= "59";

    if (!isValidHour || !isValidMinute) {
      throw new Error("Invalid time");
    }

    const newDate = new Date(date);
    newDate.setHours(Number(hour), Number(minute), 0, 0);
    return newDate;
  }

  public static getListOfDatesUntilToday = () => {
    const dates = DateUtils.getListOfDatesOfMonth();
    const today = new Date().getDate();
    this.finalListDates = dates.filter((date) => date.getDate() <= today);
    return this;
  };

  public static removeWeekends = () => {
    this.finalListDates = this.finalListDates.filter(
      (day) => day.getDay() !== 0 && day.getDay() !== 6
    );
    return this;
  };

  public static removeHolidays = async () => {
    const holidays = await this.getHolidays(this.getCurrentYear());

    this.finalListDates = this.finalListDates.filter((date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const dateString = `${year}-${month}-${day}`;
      const isHoliday = holidays.find((holiday) => holiday.date === dateString);
      return !isHoliday;
    });
    return this;
  };

  public static build(): Date[] {
    return this.finalListDates;
  }
}
