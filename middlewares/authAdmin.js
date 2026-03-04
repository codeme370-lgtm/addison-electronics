import { clerkClient } from "@clerk/nextjs/server"


const authAdmin =async (userId) => {
    try {
        //let's check user
        if(!userId) return false;

        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        const raw = process.env.ADMIN_EMAIL || '';
        const list = raw.replace(/['"]/g, '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        const userEmail = (user.emailAddresses?.[0]?.emailAddress || '').toLowerCase();
        return list.includes(userEmail);
    } catch (error) {
        console.error(error)
        return false
        
    }
    
}
export default authAdmin;