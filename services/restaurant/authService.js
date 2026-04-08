import loginService from "./loginService.js";
import User from "../../models/restaurant/userModel.js";
import Employee from "../../models/restaurant/employeeModel.js";

const authService = {
  loginUser: async (email, password) => {
    try {
      const login = await loginService.findByEmail(email);
      
      if (!login || login.role !== 'USER') {
        throw new Error("Invalid credentials");
      }
      
      const isMatch = await loginService.verifyPassword(password, login.passwordHash);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw new Error("User details not found");
      }
      
      return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: login.role,
        referenceId: login.referenceId
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
  
  loginEmployee: async (email, password) => {
    try {
      const login = await loginService.findByEmail(email);
      
      const allowedRoles = ['MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER'];
      if (!login || !allowedRoles.includes(login.role)) {
        throw new Error("Invalid credentials");
      }
      
      const isMatch = await loginService.verifyPassword(password, login.passwordHash);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const employee = await Employee.findOne({ email }).lean();
      if (!employee) {
        throw new Error("Employee details not found");
      }
      
      return {
        employeeId: employee.employeeId,
        name: employee.name,
        role: login.role,
        branchId: employee.branchId,
        referenceId: login.referenceId
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
};

export default authService;