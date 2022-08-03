import { PlaceResponse } from './models/iplace.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import { constants } from "../constants"
import { StatusGoogle } from './models/iplace.status.enum';
import { IPlaceResult } from './models/iplace-result';
import { IPlaceItem } from './models/iplace-item';
import { PriceEnum } from './models/price-enum';


dotenv.config();

if (!process.env.GOOGLE_API) {
    process.exit(1);
}
const GOOGLE_API: string = process.env.GOOGLE_API as string;


export const find = async (location: string, radius: string, type: string, keyword: string, language: string, pagetoken: string): Promise<PlaceResponse> => {
    //Prepare the request for places
    var config: AxiosRequestConfig<any> = {
        method: 'get',
        url: constants.urlGoogle,
        params: {
            location: location,
            radius: radius,
            type: type,
            language: language,
            keyword: keyword,
            key: GOOGLE_API,
            pagetoken: pagetoken
        },
        headers: {}
    };
    //Send the request for places
    const resp: PlaceResponse = await axios(config).then(function (response) {
        var resp: PlaceResponse = {} as PlaceResponse;
        resp.error_message = response.data.error_message;
        resp.status = [];
        resp.status.push(response.data.status);
        resp.status.push(StatusGoogle[response.data.status]);
        resp.results = response.data.results;
        resp.html_attributions = response.data.html_attributions;
        resp.next_page_token = response.data.next_page_token;
        resp.info_messages = response.data.info_messages;
        return resp;
    });

    // return the response
    return resp;
}

export const findPhoto = (photoReference: string, photoWith: string, photoHeight: string): String => {
    //Prepare the request for photos
    return constants.urlGooglePictures + "?photo_reference=" + photoReference + "&maxheight=" + photoWith + "&maxwidth=" + photoHeight + "&key=" + GOOGLE_API;
}


export const convertToIPlaceResult = (response: PlaceResponse): IPlaceResult => {
    var resp: IPlaceResult = {} as IPlaceResult;


    resp.results = convertTOIPlaceItem(response.results);
    resp.next_page_token = response.next_page_token ? response.next_page_token : '';



    return resp;

}

const convertTOIPlaceItem = (response: any[]): IPlaceItem[] => {
    var resps: IPlaceItem[] = [];

    for (var result of response) {
        var resp: IPlaceItem = {} as IPlaceItem;
        resp.place_id = result.place_id;
        resp.types = result.types;
        resp.rating = result.rating;
        resp.icon = result.icon;
        resp.icon_background_color = result.icon_background_color;
        resp.icon_mask_base_uri = result.icon_mask_base_uri;
        resp.international_phone_number = result.international_phone_number;
        resp.name = result.name;
        resp.opening_hours = result.opening_hours;
        resp.photos = result.photos;
        resp.price_level = PriceEnum[result.price_level];
        resp.url = result.url;
        resp.website = result.website;
        resps.push(resp);
    }

    return resps;


}

