/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as PlaceService from "./place.service";
import { PlaceResponse } from './place.interface';
import { Status } from './place.status.enum';


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
        const resp: PlaceResponse = await PlaceService.find();
        res.status(200).send(resp.results);
    } catch (e: unknown) {
        let errorMessage = "Failed to do something exceptional";
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send(errorMessage);
        }
    }
});
