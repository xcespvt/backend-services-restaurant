"use strict";

import DATA_MODEL from "../../models/restaurant/offerModel.ts";


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

    updateData: async (findFilter: any, updateData: any, options = { new: true }) => {

        let data: any = null;

        try {

            data = await DATA_MODEL.findOneAndUpdate(findFilter, updateData, options).lean();

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
            const result = await DATA_MODEL.findOneAndDelete(filter).lean();
            return result;
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    },
    addCategory: async (branchId: any, name: any) => {
        try {
            // Placeholder implementation
            return { branchId, name };
        } catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }
};

export default services;
