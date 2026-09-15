import bcrypt from "bcryptjs";

import User from "@/models/User";
import AppSetting from "@/models/AppSetting";

export async function seedDatabase(): Promise<void> {
  const seeded = await AppSetting.findOne({
    key: "database_seeded",
  });

  if (seeded) {
    console.log("🌱 Seed already executed.");
    return;
  }

  const userExists = await User.findOne({
    email: "admin@compilot.app",
  });

  if (userExists) {
    console.log("👤 Default user already exists.");
    return;
  }

  await User.create({
    name: "Admin",
    email: "admin@compilot.app",
    password: await bcrypt.hash("@dM1nCompilot2026", 10),
  });

  await AppSetting.create({
    key: "database_seeded",
    value: true,
  });

  console.log("🌱 First-time seed completed.");
}