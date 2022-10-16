import {
  IAppointment,
  Source,
  TrackOptions,
} from "../interfaces/appointment.interface";

export class Appointment implements IAppointment {
  user: string;

  toDo: boolean;

  project: string;

  task_description: string;

  track_option: TrackOptions;

  source: Source;

  start: string;

  stop: string;

  customer: string;

  day: string;

  constructor(data: IAppointment) {
    Object.assign(this, data);
  }
}
