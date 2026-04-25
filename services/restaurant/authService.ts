import loginService from "./loginService.ts";
import User from "../../models/restaurant/userModel.ts";
import Employee from "../../models/restaurant/employeeModel.ts";

const authService = {
  loginUser: async (email: string, password: any) => {
    try {
      const login = await loginService.findByEmail(email);
      
      if (!login || (login as any).role !== 'USER') {
        throw new Error("Invalid credentials");
      }
      
      const isMatch = await loginService.verifyPassword(password, (login as any).passwordHash);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw new Error("User details not found");
      }
      
      return {
        userId: (user as any).userId,
        email: (user as any).email,
        name: (user as any).name,
        role: (login as any).role,
        referenceId: (login as any).referenceId
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  },
  
  loginEmployee: async (email: string, password: any) => {
    try {
      const login = await loginService.findByEmail(email);
      
      const allowedRoles = ['MANAGER', 'STAFF', 'CASHIER', 'CHEF', 'WAITER'];
      if (!login || !allowedRoles.includes((login as any).role)) {
        throw new Error("Invalid credentials");
      }
      
      const isMatch = await loginService.verifyPassword(password, (login as any).passwordHash);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const employee = await Employee.findOne({ email }).lean();
      if (!employee) {
        throw new Error("Employee details not found");
      }
      
      return {
        employeeId: (employee as any).employeeId,
        name: (employee as any).name,
        role: (login as any).role,
        branchId: (employee as any).branchId,
        referenceId: (login as any).referenceId
      };
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
};

export default authService;

