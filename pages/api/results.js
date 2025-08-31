import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { token, votes } = req.body;
  if (!token || !Array.isArray(votes)) return res.status(400).json({ error: "Payload invalide" });

  const t = await prisma.token.findUnique({ where: { token } });
  if (!t) return res.status(404).json({ error: "Token invalide" });
  if (t.usedAt) return res.status(403).json({ error: "Token déjà utilisé" });

  const now = new Date();
  for (const v of votes) {
    await prisma.vote.create({
      data: {
        choice: v.choice,
        resolutionId: v.resolutionId,
        tokenId: t.id,
        weight: v.weight
      }
    });
  }
  await prisma.token.update({ where: { id: t.id }, data: { usedAt: now } });

  res.json({ ok: true });
}

