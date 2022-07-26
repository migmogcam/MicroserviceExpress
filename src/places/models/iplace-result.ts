import { IPlaceItem } from "./iplace-item";

export interface IPlaceResult {
  results : IPlaceItem[];
  next_page_token : string;
}
