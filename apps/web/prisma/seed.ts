import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create a test manufacturer
  const manufacturer = await prisma.manufacturer.create({
    data: {
      name: "Example Manufacturer",
      domain: "example.com",
      supportEmail: "support@example.com",
      returnsUrl: "https://example.com/returns",
      verified: true,
      madeInUsa: true,
    },
  });

  console.log("Created manufacturer:", manufacturer.name);

  // Create a test offer with ASIN
  const offer = await prisma.offer.create({
    data: {
      manufacturerId: manufacturer.id,
      title: "Example Product - Premium Quality",
      directUrl: "https://example.com/product/example-product",
      priceCents: 1999,
      currency: "USD",
      asin: "B000TESTAS1",
      identifiers: { asin: "B000TESTAS1" },
      active: true,
    },
  });

  console.log("Created offer:", offer.title, "with ASIN:", offer.asin);

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
