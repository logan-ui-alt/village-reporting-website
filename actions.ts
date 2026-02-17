
'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;

    // Simple env check
    if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', { httpOnly: true, path: '/' });
        redirect('/admin/dashboard');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function updateComplaintStatus(id: string, status: string, comment: string) {
    // Verify session
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_session')) {
        return { error: 'Unauthorized' };
    }

    try {
        const updateStmt = db.prepare('UPDATE complaints SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        updateStmt.run(status, id);

        const logStmt = db.prepare('INSERT INTO updates (complaint_id, status_change, comment) VALUES (?, ?, ?)');
        logStmt.run(id, status, comment);

        revalidatePath(`/track/${id}`);
        revalidatePath('/admin/complaints');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to update' };
    }
}
