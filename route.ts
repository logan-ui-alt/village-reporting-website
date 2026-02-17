
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const location_lat = formData.get('location_lat') ? parseFloat(formData.get('location_lat') as string) : null;
        const location_lng = formData.get('location_lng') ? parseFloat(formData.get('location_lng') as string) : null;
        const address = formData.get('address') as string;
        const contact_email = formData.get('contact_email') as string;
        const file = formData.get('image') as File | null;

        let image_url = '';

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${uuidv4()}_${file.name.replace(/\s/g, '_')}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads');

            // Ensure directory exists (you might want to check this or create it on startup)
            // await mkdir(uploadDir, { recursive: true }); 

            await writeFile(path.join(uploadDir, filename), buffer);
            image_url = `/uploads/${filename}`;
        }

        const id = uuidv4();
        const stmt = db.prepare(`
      INSERT INTO complaints (id, title, description, category, location_lat, location_lng, address, contact_email, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(id, title, description, category, location_lat, location_lng, address, contact_email, image_url);

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error submitting complaint:', error);
        return NextResponse.json({ success: false, error: 'Failed to submit complaint' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        // Basic filter by ID if provided (for public tracking)
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            const complain = db.prepare('SELECT * FROM complaints WHERE id = ?').get(id);
            if (!complain) {
                return NextResponse.json({ success: false, error: 'Complaint not found' }, { status: 404 });
            }
            // Fetch updates for this complaint
            const updates = db.prepare('SELECT * FROM updates WHERE complaint_id = ? ORDER BY created_at DESC').all(id);
            return NextResponse.json({ success: true, data: { ...complain, updates } });
        }

        // Admin: List all (could add pagination/filtering later)
        // NOTE: In a real app, check for Auth here!
        const complaints = db.prepare('SELECT * FROM complaints ORDER BY created_at DESC').all();
        return NextResponse.json({ success: true, data: complaints });

    } catch (error) {
        console.error('Error fetching complaints:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch complaints' }, { status: 500 });
    }
}
