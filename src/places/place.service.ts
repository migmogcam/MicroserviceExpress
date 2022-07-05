import { PlaceResponse } from './place.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import { constants } from "../constants"


dotenv.config();

if (!process.env.GOOGLE_API) {
    process.exit(1);
}
const GOOGLE_API: string = process.env.GOOGLE_API as string;


export const find = async (): Promise<PlaceResponse> => {
    var config: AxiosRequestConfig<any> = {
        method: 'get',
        url: constants.urlGoogle,
        params: {
            location: '-33.8670522,151.1957362',
            radius: "1500",
            type: "restaurant",
            keyword: "cruise",
            key: GOOGLE_API
        },
        headers: {}
    };
    const resp: PlaceResponse = await axios(config).then(function (response) {
        var resp: PlaceResponse = {} as PlaceResponse;
        resp.error_message = response.data.error_message;
        resp.status = response.data.status;
        resp.results = response.data.results;
        resp.html_attributions = response.data.html_attributions;
        resp.next_page_token = response.data.next_page_token;
        resp.info_messages = response.data.info_messages;
        return response.data as PlaceResponse;
    });
    return resp;
}
