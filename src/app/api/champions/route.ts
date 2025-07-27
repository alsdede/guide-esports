import { NextRequest, NextResponse } from 'next/server';
import { getChampions } from '@/services/data-dragon.service';

// GET /api/champions?locale=pt_BR
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'pt_BR';

    const champions = await getChampions(locale);

    // Cache por 1 hora (dados não mudam frequentemente)
    return NextResponse.json(champions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error - Champions:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar campeões' },
      { status: 500 }
    );
  }
}
