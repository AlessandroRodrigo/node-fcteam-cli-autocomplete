import { DateUtils } from "../../src/utils/date-utils";
import { Holiday } from "../../src/interfaces/holiday.interface";

describe("DateUtils.getCurrentYear method", () => {
  test("should return current year", () => {
    const currentYear = new Date().getFullYear();
    const returnedCurrentYear = DateUtils.getCurrentYear();

    expect(returnedCurrentYear).toBe(currentYear);
  });
});

describe("DateUtils.getHolidays method", () => {
  test("should return an array of holidays", async () => {
    const currentYear = new Date().getFullYear();

    const holidays = await DateUtils.getHolidays(currentYear);

    expect(holidays).toBeInstanceOf(Array<Holiday>);
  });

  test("should return an array of holidays with length greater than 0", async () => {
    const currentYear = new Date().getFullYear();

    const holidays = await DateUtils.getHolidays(currentYear);

    expect(holidays.length).toBeGreaterThan(0);
  });

  test("should return more faster when the holidays are already loaded", async () => {
    const currentYear = new Date().getFullYear();

    const firstCall = await DateUtils.getHolidays(currentYear);
    const secondCall = await DateUtils.getHolidays(currentYear);

    expect(firstCall).toStrictEqual(secondCall);
  });
});

describe("DateUtils.setDateTimezone method", () => {
  test("should return a date with time", () => {
    const date = new Date();
    const time = "08:00";

    const dateWithTime = DateUtils.setDateTimezone(date, time);

    expect(dateWithTime.getHours()).toBe(8);
    expect(dateWithTime.getMinutes()).toBe(0);
  });

  test("should throw error when time param is invalid", () => {
    const date = new Date();
    const time = "25:00";

    expect(() => DateUtils.setDateTimezone(date, time)).toThrowError();
  });
});

describe("DateUtils.getListOfDatesOfMonth method", () => {
  test("should return an array of dates", () => {
    const dates = DateUtils.getListOfDatesOfMonth();

    expect(dates).toBeInstanceOf(Array<Date>);
  });

  test("should return an array of dates with length greater than 0", () => {
    const dates = DateUtils.getListOfDatesOfMonth();

    expect(dates.length).toBeGreaterThan(0);
  });
});

describe("DateUtils build pattern", () => {
  test("should return an array of dates with length greater than 0", async () => {
    const dates = await DateUtils.getListOfDatesUntilToday()
      .removeWeekends()
      .removeHolidays()
      .then((result) => result.build());

    expect(dates.length).toBeGreaterThan(0);
  });

  test("should return an array of dates", async () => {
    const dates = await DateUtils.getListOfDatesUntilToday()
      .removeWeekends()
      .removeHolidays()
      .then((result) => result.build());

    expect(dates).toBeInstanceOf(Array<Date>);
  });

  test("should not have weekends", async () => {
    const dates = await DateUtils.getListOfDatesUntilToday()
      .removeWeekends()
      .removeHolidays()
      .then((result) => result.build());

    dates.forEach((date) => {
      expect(date.getDay()).not.toBe(0);
      expect(date.getDay()).not.toBe(6);
    });
  });

  test("should not have holidays", async () => {
    const dates = await DateUtils.getListOfDatesUntilToday()
      .removeWeekends()
      .removeHolidays()
      .then((result) => result.build());

    const holidays = await DateUtils.getHolidays(new Date().getFullYear());

    dates.forEach((date) => {
      const foundHoliday = holidays.find((holiday) => {
        const holidayDay = Number(holiday.date.split("-")[2]);
        const holidayMonth = Number(holiday.date.split("-")[1]);

        const isSameDay = date.getDate() === holidayDay;
        // The month in the date object starts at 0
        const isSameMonth = date.getMonth() + 1 === holidayMonth;

        return isSameDay && isSameMonth;
      });

      expect(foundHoliday).toBeUndefined();
    });
  });
});
