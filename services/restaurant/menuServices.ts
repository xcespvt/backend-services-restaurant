"use strict";

import DATA_MODEL from "../../models/restaurant/menuSchema.ts";


const services = {

    getData: async function (filter: any, select?: any, sort: any = {}, skip: any = 0, limit: any = 10) {
        let data: any[] = [];

        try {

            data = await DATA_MODEL.find(filter).read('secondaryPreferred').select(select).sort(sort).skip(skip).limit(limit).lean();

        } catch (e: any) {

            console.error(e);
        }

        return data;
    },

    getSingleDocument: async function (filter: any, select?: any) {

        let data = null;

        try {

            data = await DATA_MODEL.findOne(filter).read('secondaryPreferred').select(select).lean();

        } catch (e: any) {

            console.error(e.message);
        }

        return data;
    },

    getAggregationData: async function (aggPipeline: any[]) {

        let data: any[] = [];

        try {

            data = await DATA_MODEL.aggregate(aggPipeline).read('secondaryPreferred');

        } catch (e: any) {

            console.error(e.message);
        }

        return data;
    },

    updateData: async (findFilter: any, updateData: any) => {

        let data: any = null;

        try {

            data = await DATA_MODEL.findOneAndUpdate(findFilter, updateData, { new: true }).lean();

        } catch (e: any) {

            console.error(e.message);
        }

        return data;
    },

    addData: async (data: any) => {

        let newDoc = null;

        try {

            let dataObj = new DATA_MODEL(data);

            let newDoc = await dataObj.save();

            return newDoc;

        } catch (e: any) {

            console.error(e.message);
        }

        return newDoc;
    },
    getCountDocument: async (filter: any) => {

        let count = 0;

        try {

            count = await DATA_MODEL.countDocuments(filter).read('secondaryPreferred');

        } catch (e: any) {

            console.error(e.message);
        }

        return count;
    },
    deleteData: async (filter: any) => {
        try {
            return await DATA_MODEL.deleteOne(filter);
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    },
    toggleMenuItemAvailability: async (branchId: any, itemId: any) => {
        try {
            const item = await DATA_MODEL.findOne({ restaurantId: branchId, itemId });
            if (!item) throw new Error("Menu item not found");
            (item as any).available = !(item as any).available;
            await item.save();
            return item;
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    },
    addCategory: async (branchId: any, name: any) => {
        try {
            // This might need a separate Category model, but for now we just return something
            return { branchId, name };
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }
};

export default services;
