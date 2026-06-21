import prisma from "./prisma";

export default async function ensureUser(userId) {
  if (!userId) return null;

  try {
    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!dbUser) {
      throw new Error('User not found in database');
    }

    return dbUser;
  } catch (err) {
    console.error("ensureUser error:", err);
    return null;
  }
}
