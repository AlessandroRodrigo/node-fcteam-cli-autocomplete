import chalk from "chalk";
import inquirer from "inquirer";

import { Source, TrackOptions } from "./interfaces/appointment.interface";
import { CLIAnswers } from "./interfaces/cli-answers.interface";
import { Appointment } from "./models/appointment.model";
import { DateUtils } from "./utils/date-utils";
import { fcteamApi } from "./utils/fcteam-api";
import { questions } from "./utils/inquirer-options";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const workedDays = await DateUtils.getListOfDatesUntilToday()
  .removeWeekends()
  .removeHolidays()
  .then((result) => result.build());

const createAppointments = (
  dates: Date[],
  taskDescription: string,
  startTime: string,
  stopTime: string
) => {
  const appointments = dates.map(
    (date) =>
      new Appointment({
        customer: "590c95d8a81d20002ff3570d",
        project: "590c95d9a81d20002ff3570e",
        source: Source.MANUAL,
        task_description: taskDescription,
        toDo: false,
        track_option: TrackOptions.START_AND_END,
        user: "61c29da8d35ccb08a067ef37",
        day: date.toISOString(),
        start: DateUtils.setDateTimezone(date, startTime).toISOString(),
        stop: DateUtils.setDateTimezone(date, stopTime).toISOString(),
      })
  );
  return appointments;
};

console.log(chalk.green.bold("Hi, welcome to FCTeam lazy autocomplete!"));

inquirer.prompt(questions).then(async (answers: CLIAnswers) => {
  const appointments = createAppointments(
    workedDays,
    answers.taskDescription,
    answers.startTime,
    answers.stopTime
  );

  for (let i = 0; i < appointments.length; i += 1) {
    const appointment = appointments[i];

    console.log(chalk.blue.bold("creating appointment..."));

    fcteamApi
      .post(
        "/appointments",
        { appointment, appointmentType: "single" },
        {
          headers: {
            Authorization: `Bearer ${answers.token}`,
          },
        }
      )
      .then(() => {
        console.log(chalk.green.bold("Appointment created!"));
      })
      .catch((error) => {
        console.log(chalk.red.bold("Error creating appointment!", error));
      });
  }
});
