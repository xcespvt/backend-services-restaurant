"use strict";
import mainBranchService from "../services/mainBranchService.js";


// Rest of your controller code...

const mainBranchController = {
  getMainBranches: async (req, res) => {
try {
    const data = await mainBranchService.getData({});
    return res.status(200).json({
        success: true,
        message: "Main Branches retrieved successfully",
        data
    });
} catch (error) {
    console.error(error.message);
    return res.status(500).json({
        success: false,
        message: "Error retrieving main branches",
        error: error.message
    });
}    

},

  addMenuItem: async (req, res) => {
  

  },

  
};

export default mainBranchController;