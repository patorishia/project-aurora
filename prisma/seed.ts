import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const nike = await prisma.store.upsert({
    where: { slug: "nike" },
    update: {},
    create: {
      name: "Nike",
      slug: "nike",
      website: "https://www.nike.com",
    },
  });

  const amazon = await prisma.store.upsert({
    where: { slug: "amazon" },
    update: {},
    create: {
      name: "Amazon",
      slug: "amazon",
      website: "https://www.amazon.com",
    },
  });

  await prisma.coupon.createMany({
    data: [
      {
        storeId: nike.id,
        title: "20% off selected items",
        description: "Save 20% on selected Nike products.",
        code: "NIKE20",
        discount: "20%",
        url: nike.website ?? "https://www.nike.com",
        verified: true,
        source: "test",
      },
      {
        storeId: nike.id,
        title: "Free shipping",
        description: "Free standard shipping on eligible orders.",
        discount: "Free shipping",
        url: nike.website ?? "https://www.nike.com",
        verified: true,
        source: "test",
      },
      {
        storeId: amazon.id,
        title: "10€ off selected products",
        description: "Save 10€ on selected products.",
        code: "AMAZON10",
        discount: "10€",
        url: amazon.website ?? "https://www.amazon.com",
        verified: true,
        source: "test",
      },
    ],
  });

  console.log("Seed completed.");
  console.log(`Created/updated stores: ${nike.name}, ${amazon.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });