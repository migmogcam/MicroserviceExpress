/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { PlaceResponse } from './models/iplace.interface';
import * as PlaceService from "./place.service";


/**
 * Router Definition
 */

export const placeRoute = express.Router();

/**
 * Controller Definitions
 */

// GET place

placeRoute.get("/", async (req: Request, res: Response) => {
    try {
        let location: string, radius: string, type: string, keyword: string, language: string, pagetoken: string;
        location = req.query.location as string || "";
        radius = req.query.radius as string || "";
        type = req.query.type as string || "";
        keyword = req.query.keyword as string || "";
        language = req.query.language as string || "es";
        pagetoken = req.query.pagetoken as string || "";
        const resp: PlaceResponse = await PlaceService.find(location, radius, type, keyword, language, pagetoken);
        if(resp.status[0] === "OK") {
            res.status(200).send(PlaceService.convertToIPlaceResult(resp));
        } else {
            res.status(400).send({
                errorStatus: resp.status[0],
                errorMeaning: resp.status[1],
                errorMessage: resp.error_message,
                errorInfo: resp.info_messages
            });
        }
    } catch (e: unknown) {
        let errorMessage = "Failed to do something exceptional";
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send(errorMessage);
        }
    }
});
