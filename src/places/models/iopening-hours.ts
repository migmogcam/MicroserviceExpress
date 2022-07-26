import { IOpeningHoursPeriod } from "./iopening-hours-period";

export interface IOpeningHours {
  open_now? : boolean;
  periods? : IOpeningHoursPeriod[];
  weekday_text? : string[];
}
