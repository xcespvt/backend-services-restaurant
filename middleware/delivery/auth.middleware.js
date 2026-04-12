import jwt from "jsonwebtoken";
import Login from "../../models/restaurant/loginModel.js";

export const authMiddleware = async (request, reply) => {
  const token = request.cookies?.token;

  if (!token) {
    reply.code(401).send({ message: "Unauthorized: No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const login = await Login.findOne({ emailId: decoded.email, isActive: true });
    
    if (!login) {
      reply.code(403).send({ message: "Forbidden: Account not found or inactive" });
      return;
    }

    request.user = {
      email: decoded.email,
      role: login.role,
      referenceId: login.referenceId
    };
  } catch (error) {
    reply.code(401).send({ success: 0, message: "Not Authorized : Invalid token" });
  }
};

