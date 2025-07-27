import { NextRequest, NextResponse } from 'next/server';
import { getChampion } from '@/services/data-dragon.service';

// GET /api/champions/[name]?locale=pt_BR
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'pt_BR';

    const champion = await getChampion(name, locale);

    // Cache por 2 horas (dados específicos de campeão)
    return NextResponse.json(champion, {
      headers: {
        'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error - Champion:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Campeão não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao buscar campeão' },
      { status: 500 }
    );
  }
}
