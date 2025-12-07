import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const notebookPath = path.join(process.cwd(), 'resources', 'neural networks 01.ipynb');

        if (!fs.existsSync(notebookPath)) {
            return NextResponse.json({ error: 'Notebook file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(notebookPath, 'utf-8');
        const notebook = JSON.parse(fileContent);

        return NextResponse.json(notebook);
    } catch (error) {
        console.error('Error reading notebook:', error);
        return NextResponse.json({ error: 'Failed to load notebook' }, { status: 500 });
    }
}
