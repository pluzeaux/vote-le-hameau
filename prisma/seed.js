import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Créer 35 copropriétaires
  const total = 1000;
  const base = Math.floor(total / 35);
  let remainder = total - base * 35;

  for (let i = 1; i <= 35; i++) {
    const tantiemes = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;

    const owner = await prisma.owner.create({
      data: {
        name: `Copropriétaire ${i}`,
        email: `copro${i}@example.com`,
        tantiemes
      }
    });

    // créer un token unique pour ce propriétaire
    await prisma.token.create({
      data: {
        token: uuidv4(),
        ownerId: owner.id
      }
    });
  }

  // Créer 5 résolutions
  const resolutions = [
    ["Approbation des comptes", "Approbation des comptes de l'exercice N-1"],
    ["Budget prévisionnel", "Adoption du budget prévisionnel N+1"],
    ["Travaux toiture", "Travaux de réfection de la toiture"],
    ["Contrat d'entretien", "Renouvellement du contrat d'entretien"],
    ["Questions diverses", "Questions diverses"]
  ];

  for (const [title, desc] of resolutions) {
    await prisma.resolution.create({
      data: { title, description: desc }
    });
  }

  console.log("Seed terminé !");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

