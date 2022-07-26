import { PriceEnum } from "./price-enum";
import { IOpeningHours } from "./iopening-hours";
import { IPlacePhoto } from "./iplace-photo";

export interface IPlaceItem {
  place_id? : string;
  types? : Array<string>;
  rating? : number;
  icon? : string;
  icon_background_color?: string;
  icon_mask_base_uri? : string;
  international_phone_number? : string;
  name? : string;
  opening_hours? : IOpeningHours;
  photos? : Array<IPlacePhoto>;
  price_level? : string;
  url? : string;
  website? : string;
}
