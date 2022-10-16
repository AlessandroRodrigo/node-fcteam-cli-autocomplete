import {
  Source,
  TrackOptions,
} from "../../src/interfaces/appointment.interface";
import { Appointment } from "../../src/models/appointment.model";

describe("Appointment model", () => {
  test("should create an appointment", async () => {
    const appointment = new Appointment({
      customer: "",
      day: "",
      project: "",
      source: Source.MANUAL,
      start: "",
      stop: "",
      task_description: "",
      toDo: false,
      track_option: TrackOptions.START_AND_END,
      user: "",
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });

  test("should create an appointment with toDo true", async () => {
    const appointment = new Appointment({
      customer: "",
      day: "",
      project: "",
      source: Source.MANUAL,
      start: "",
      stop: "",
      task_description: "",
      toDo: true,
      track_option: TrackOptions.START_AND_END,
      user: "",
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });
});
