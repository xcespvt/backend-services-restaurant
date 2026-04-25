import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import Login from "../../models/restaurant/loginModel.ts";

export const authMiddleware = async (request: FastifyRequest | any, reply: FastifyReply) => {
  const token = request.cookies?.token;

  if (!token) {
    reply.code(401).send({ message: "Unauthorized: No token" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, (process.env.JWT_SECRET as string));
    const login = await Login.findOne({ emailId: decoded.email, isActive: true });
    
    if (!login) {
      reply.code(403).send({ message: "Forbidden: Account not found or inactive" });
      return;
    }

    request.user = {
      email: decoded.email,
      role: (login as any).role,
      referenceId: (login as any).referenceId
    };
  } catch (error: any) {
    reply.code(401).send({ success: 0, message: "Not Authorized : Invalid token" });
  }
};


