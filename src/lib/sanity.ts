import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configuração do cliente Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // `false` se você quiser garantir dados atualizados
  apiVersion: '2024-07-27', // Use a versão da API atual
  token: process.env.SANITY_API_TOKEN, // Token para operações autenticadas
});

// Builder para URLs de imagens
const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// Tipos de consulta para conteúdo multilíngue
export const getLocalizedContent = async (query: string, locale: string) => {
  const localizedQuery = `
    ${query} {
      ...,
      "title": coalesce(title_${locale}, title_pt, title),
      "description": coalesce(description_${locale}, description_pt, description),
      "content": coalesce(content_${locale}, content_pt, content),
    }
  `;
  
  return await client.fetch(localizedQuery);
};

// Exemplo de consulta para buscar jogos/partidas
export const getGames = async (locale: string = 'pt') => {
  const query = `
    *[_type == "game"] | order(_createdAt desc)
  `;
  return await getLocalizedContent(query, locale);
};

// Exemplo de consulta para buscar torneios
export const getTournaments = async (locale: string = 'pt') => {
  const query = `
    *[_type == "tournament"] | order(startDate desc)
  `;
  return await getLocalizedContent(query, locale);
};

// Exemplo de consulta para buscar partidas ao vivo
export const getLiveMatches = async (locale: string = 'pt') => {
  const query = `
    *[_type == "match" && status == "live"] | order(startTime asc)
  `;
  return await getLocalizedContent(query, locale);
};
