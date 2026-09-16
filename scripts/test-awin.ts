import dotenv from "dotenv";
import { fetchAwinPromotions } from "../lib/awin/client";

dotenv.config({ path: ".env.local" });

async function main() {
  const promotions = await fetchAwinPromotions();

  console.log(`Awin returned ${promotions.length} promotions.`);

  console.dir(promotions.slice(0, 3), { depth: null });
}

main().catch((error) => {
  console.error("Awin test failed:");
  console.error(error);
  process.exit(1);
});