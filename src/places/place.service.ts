import { PlaceResponse } from './place.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import { constants } from "../constants"
import { StatusGoogle } from './place.status.enum';


dotenv.config();

if (!process.env.GOOGLE_API) {
    process.exit(1);
}
const GOOGLE_API: string = process.env.GOOGLE_API as string;


export const find = async (location: string, radius: string, type: string, keyword: string, language: string, pagetoken: string): Promise<PlaceResponse> => {
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
    const resp: PlaceResponse = await axios(config).then(function (response) {
        var resp: PlaceResponse = {} as PlaceResponse;
        resp.error_message = response.data.error_message;
        resp.status =  [];
        resp.status.push(response.data.status);
        resp.status.push(StatusGoogle[response.data.status]);
        resp.results = response.data.results;
        resp.html_attributions = response.data.html_attributions;
        resp.next_page_token = response.data.next_page_token;
        resp.info_messages = response.data.info_messages;
        return resp;
    });
    return resp;
}
