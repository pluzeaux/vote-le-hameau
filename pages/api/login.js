import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token manquant" });

  const t = await prisma.token.findUnique({
    where: { token },
    include: { owner: true }
  });

  if (!t) return res.status(404).json({ error: "Token invalide" });
  if (t.usedAt) return res.status(403).json({ error: "Token déjà utilisé" });

  res.json({ tokenId: t.id, weight: t.owner.tantiemes });
}

