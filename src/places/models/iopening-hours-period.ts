import { IOpeningHoursTime } from "./iopening-hours-time";

export interface IOpeningHoursPeriod {
  open : IOpeningHoursTime;
  close? : IOpeningHoursTime;
}
