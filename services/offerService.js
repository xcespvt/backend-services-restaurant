"use strict";

import DATA_MODEL from "../models/offerModel.js";


const services = {

    getData: async function (filter, select, sort, skip, limit) {
        let data = [];

        try {

            data = await DATA_MODEL.find(filter).read('secondaryPreferred').select(select).sort(sort).skip(skip).limit(limit).lean();

        } catch (e) {

            console.error(e);
        }

        return data;
    },

    getSingleDocument: async function (filter, select) {

        let data = null;

        try {

            data = await DATA_MODEL.findOne(filter).read('secondaryPreferred').select(select).lean();

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    getAggregationData: async function (aggPipeline) {

        let data = [];

        try {

            data = await DATA_MODEL.aggregate(aggPipeline).read('secondaryPreferred');

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    updateData: async (findFilter, updateData) => {

        let data = [];

        try {

            data = await DATA_MODEL.findOneAndUpdate(findFilter, updateData, { new: true }).lean();

        } catch (e) {

            console.error(e.message);
        }

        return data;
    },

    addData: async (data) => {

        let newDoc = null;

        try {

            let dataObj = new DATA_MODEL(data);
            let newDoc = await dataObj.save();
            return newDoc;

        } catch (e) {

            console.error(e.message);
        }

        return newDoc;
    },

};

export default services;