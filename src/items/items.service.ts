// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as dotenv from "dotenv";
import { constants } from "../constants"


dotenv.config();

if (!process.env.GOOGLE_API) {
    process.exit(1);
}
const GOOGLE_API: string = process.env.GOOGLE_API as string;

/**
 * In-Memory Store
 */
let items: Items = {
    1: {
        id: 1,
        name: "Burger",
        price: 599,
        description: "Tasty",
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 299,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
    },
    3: {
        id: 3,
        name: "Tea",
        price: 199,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
};

/**
 * Service Methods
 * 
 */

export const findAll = async (): Promise<any> => {
    var config: AxiosRequestConfig<any> = {
        method: 'get',
        url: constants.urlGoogle,
        params: {
            location: '-33.8670522%2C151.1957362',
            radius: "1500",
            type: "restaurant",
            keyword: "cruise",
            key: GOOGLE_API
          },
        headers: {}
    };
    const item: any = await axios(config).then(function (response) {
        return response.data.results;
    });
    return item;
}

export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newItem: BaseItem): Promise<Item> => {
    const id = new Date().valueOf();

    items[id] = {
        id,
        ...newItem,
    };

    return items[id];
};

export const update = async (
    id: number,
    itemUpdate: BaseItem
): Promise<Item | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    items[id] = { id, ...itemUpdate };

    return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete items[id];
};