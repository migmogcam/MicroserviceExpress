/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import basicAuth from 'express-basic-auth';
import compression from "compression";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { placeRoute } from "./places/place.router";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT || !process.env.PASSAPI) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const PASSAPI: string = process.env.PASSAPI as string;


const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression())
app.use(basicAuth({
    users: { 'admin': PASSAPI }
}));

// Part of the guide
// app.use("/api/menu/items", itemsRouter);

app.use("/apiv1/places", placeRoute);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});