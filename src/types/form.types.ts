
export enum FormKeys {
  TITLE = "title",
  DESCRIPTION = "description",
  HOURS = "hours",
  MINUTES = "minutes",
  SECONDS = "seconds",
}

export type AddTimerFormSchema = {
  [FormKeys.TITLE]: string;
  [FormKeys.DESCRIPTION]: string;
  [FormKeys.HOURS]: number;
  [FormKeys.MINUTES]: number;
  [FormKeys.SECONDS]: number;
}