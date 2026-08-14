import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@/config/env.js";
import bcrypt from "bcrypt"


import { PrismaClient } from '../generated/prisma/client.js';
console.log(process.env.DATABASE_URL);
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({
  adapter
});


async function superadminSeed(): Promise<void> {
  const email = env.superAdminEmail
  const password = env.superAdminPwd

  if (!email) throw new Error("Email is not defined")
  if (!password) throw new Error("Password is not defined")

  const seed = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, seed)
  await prisma.user.upsert({
    create: {
      email,
      passwordHash,
      role: "ADMIN"
    },
    update: {},
    where: { email }
  })
}
// console.log(Object.keys(prisma));
async function main() {
  // upsert plutôt que create : le seed reste rejouable sans dupliquer les données
  await prisma.airport.upsert({
    create: { iataCode: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
    update: {},
    where: { iataCode: 'CDG' },
  });
  await prisma.airport.upsert({
    create: { iataCode: 'BRU', name: 'Brussels Airport', city: 'Bruxelles', country: 'Belgique' },
    update: {},
    where: { iataCode: 'BRU' },
  });
  await prisma.airport.upsert({
    create: { iataCode: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'États-Unis' },
    update: {},
    where: { iataCode: 'JFK' },
  });

  await prisma.airline.upsert({
    create: { icaoCode: 'AFR', name: 'Air France', country: 'France', foundedIn: 1933 },
    update: {},
    where: { icaoCode: 'AFR' },
  });

  await superadminSeed()

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });