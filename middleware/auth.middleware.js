import jwt from "jsonwebtoken";
import mainBranchModel from "../models/mainBranch.js";


export const authMiddleware = async (request, reply) => {
  const token = request.cookies?.token; // Fastify way

  if (!token) {
    reply.code(401).send({ message: "Unauthorized: No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = await mainBranchModel.findOne({ "contact.email": decoded.email });
    if (!email) {
      reply.code(403).send({ message: "Forbidden" });
      return;
    } 
    console.log(request.user);
    request.user = decoded; // attach user (Fastify)
  } catch (error) {
    reply.code(401).send({ success: 0, message: "Not Authorized : Invalid token" });
  }
};
