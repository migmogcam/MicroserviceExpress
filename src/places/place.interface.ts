import { Status } from "./place.status.enum";

export interface PlaceResponse {
    html_attributions: string[];
    results: any[];
    status: Status;
    error_message: string;
    info_messages: string[];
    next_page_token: string
  }
  