import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const resolutions = await prisma.resolution.findMany({ orderBy: { id: 'asc' } });
  res.json(resolutions);
}

