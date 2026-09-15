import { connectDB } from "@/lib/mongodb";
import { seedDatabase } from "@/lib/dataseed";

async function main() {
  await connectDB();
  await seedDatabase();
}

main()
  .catch((error) => {
    console.error("❌ Database seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });