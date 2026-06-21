import prisma from '../lib/prisma.js'

const authAdmin = async (userId) => {
    try {
        // Check if userId exists
        if (!userId) return false;

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true }
        });

        if (!user) return false;

        const raw = process.env.ADMIN_EMAIL || '';
        const list = raw.replace(/['"]/g, '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        const userEmail = user.email.toLowerCase();
        return list.includes(userEmail);
    } catch (error) {
        console.error(error)
        return false
    }
}

export default authAdmin;