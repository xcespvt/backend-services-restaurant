import jwt from "jsonwebtoken";

export const authMiddleware = async (request, reply) => {
  const token = request.cookies?.token; // Fastify way

  if (!token) {
    reply.code(401).send({ message: "Unauthorized: No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional check
    if (decoded.email !== "amanatprakash@gmail.com") {
      reply.code(403).send({ message: "Forbidden" });
      return;
    }


    request.user = decoded; // attach user (Fastify)
  } catch (error) {
    reply.code(401).send({ message: "Unauthorized: Invalid token" });
  }
};
