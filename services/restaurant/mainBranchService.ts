"use strict";

import DATA_MODEL from "../../models/restaurant/mainBranch.ts";


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

    updateData: async (findFilter: any, updateData: any, options: any = {}) => {
        let data = null;
        try {
            data = await DATA_MODEL.findOneAndUpdate(findFilter, updateData, { 
                returnDocument: 'after',
                ...options 
            }).lean();
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

    toggleBranchOnlineStatus: async (branchId: any, email: string) => {
        try {
            // Find the branch first
            const branch = await DATA_MODEL.findOne({
                branchId,
                "contact.email": email
            });

            if (!branch) {
                throw new Error("Branch not found");
            }

            // Toggle the status
            (branch as any).isOnline = !(branch as any).isOnline;
            const updatedBranch = await branch.save();

            return {
                id: (updatedBranch as any).branchId,
                isOnline: (updatedBranch as any).isOnline,
                name: (updatedBranch as any).name
            };

        } catch (error: any) {
            console.error("Error in toggleBranchOnlineStatus:", error.message);
            throw error;
        }
    },

    toggleBranchRushHourStatus: async (branchId: any, email: string) => {
        try {
            // Find the branch first
            const branch = await DATA_MODEL.findOne({
                branchId,
                "contact.email": email
            });

            if (!branch) {
                throw new Error("Branch not found");
            }

            // Toggle the status
            (branch as any).isRushHour = !(branch as any).isRushHour;
            const updatedBranch = await branch.save();

            return {
                id: (updatedBranch as any).branchId,
                isRushHour: (updatedBranch as any).isRushHour,
                name: (updatedBranch as any).name
            };

        } catch (error: any) {
            console.error("Error in toggleBranchRushHourStatus:", error.message);
            throw error;
        }
    }

};

export default services;
