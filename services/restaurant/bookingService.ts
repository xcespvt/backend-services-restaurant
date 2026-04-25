"use strict";

import DATA_MODEL from "../../models/restaurant/bookingModel.ts";


const services = {

    getData: async function (filter: any, select?: any, sort: any = {}, skip: any = {}, limit: any = {}) {
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

            data = await DATA_MODEL.findOneAndUpdate(findFilter, updateData, { returnDocument: 'after' }).lean();

        } catch (e: any) {

            console.error(e.message);
        }

        return data;
    },

    addData: async (data: any) => {
        try {
            // If multiple tables → use insertMany
            if (Array.isArray(data)) {
                return await DATA_MODEL.insertMany(data, { ordered: true });
            }

            // Single insert fallback
            return await DATA_MODEL.create(data);

        } catch (e: any) {
            console.error("addData ERROR:", e);
            throw e;
        }
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

};

export default services;
