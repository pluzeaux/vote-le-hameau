import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { stringify } from 'csv-stringify/sync';

const prisma = new PrismaClient();

async function main() {
  // Récupérer tous les tokens avec les propriétaires
  const tokens = await prisma.token.findMany({
    include: { owner: true },
    orderBy: { id: 'asc' }
  });

  // Affichage console
  console.log("Liste des tokens :");
  tokens.forEach(t => {
    console.log(`Token: ${t.token}, Owner: ${t.owner.name}, UsedAt: ${t.usedAt || 'non utilisé'}`);
  });

  // Export CSV
  const data = [
    ['Token', 'Owner', 'Email', 'UsedAt'],
    ...tokens.map(t => [t.token, t.owner.name, t.owner.email, t.usedAt || ''])
  ];

  const csv = stringify(data, { header: false });
  fs.writeFileSync('tokens.csv', csv);

  console.log("\nFichier CSV 'tokens.csv' créé !");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

