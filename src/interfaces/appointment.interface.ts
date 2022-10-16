export enum TrackOptions {
  START_AND_END = "start_and_end",
}

export enum Source {
  MANUAL = "manual",
}

export interface IAppointment {
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
}
