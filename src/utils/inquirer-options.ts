import { QuestionCollection } from "inquirer";

export const questions: QuestionCollection = [
  {
    type: "input",
    name: "token",
    message: "What's your access token?",
  },
  {
    type: "input",
    name: "taskDescription",
    message: "What's your task description?",
  },
  {
    type: "input",
    name: "startTime",
    message: "What's your start time?",
    default: "09:30",
  },
  {
    type: "input",
    name: "stopTime",
    message: "What's your stop time?",
    default: "17:30",
  },
];
