import { NextResponse } from 'next/server';
import { getCurrentPatch } from '@/services/data-dragon.service';

// GET /api/patch
export async function GET() {
  try {
    const patch = await getCurrentPatch();

    // Cache por 30 minutos (patch muda com menos frequência)
    return NextResponse.json({ patch }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('API Error - Patch:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar versão do patch' },
      { status: 500 }
    );
  }
}
