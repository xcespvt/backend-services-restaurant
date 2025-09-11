"use strict";

class MenuService {
    constructor(modelName) {
        this.modelName = modelName;
        this.dataModel = null;
        
        switch (modelName) {
            case "MenuItem":
                this.dataModel = require("../models/menuSchema").default;
                break;
            case "Category":
                this.dataModel = require("../models/categoryModel").default;
                break;
            default:
                throw new Error("Invalid model name");
        }
    }

    async getData(filter = {}, select = '', sort = {}, skip = 0, limit = 100) {
        try {
            return await this.dataModel.find(filter)
                .select(select)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getSingleDocument(filter = {}, select = '') {
        try {
            return await this.dataModel.findOne(filter)
                .select(select)
                .lean();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addData(data) {
        try {
            const newDoc = new this.dataModel(data);
            return await newDoc.save();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async updateData(filter, updateData, options = { new: true }) {
        try {
            return await this.dataModel.findOneAndUpdate(
                filter, 
                updateData, 
                { ...options, runValidators: true }
            ).lean();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async deleteData(filter) {
        try {
            return await this.dataModel.findOneAndUpdate(
                filter,
                { isActive: false },
                { new: true }
            ).lean();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getAggregationData(pipeline = []) {
        try {
            return await this.dataModel.aggregate(pipeline);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

// Export the class directly
export default MenuService;