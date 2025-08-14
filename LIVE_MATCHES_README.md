# Página de Partidas ao Vivo

## Visão Geral

Foi criada uma nova funcionalidade para visualização de partidas ao vivo no eSports app. A página permite acompanhar partidas em tempo real com detalhes completos dos jogadores, estatísticas e stream integrada.

## Estrutura de Arquivos

### Página Principal
- `/src/app/[locale]/live/[id]/page.tsx` - Página principal de visualização da partida

### Componentes Criados
- `/src/components/live/MatchHeader.tsx` - Cabeçalho com times e placar
- `/src/components/live/GameTabs.tsx` - Abas para navegar entre os jogos da série
- `/src/components/live/GameDetails.tsx` - Detalhes completos do jogo com estatísticas dos jogadores
- `/src/components/live/StreamPlayer.tsx` - Player de stream integrado
- `/src/components/live/UpcomingMatches.tsx` - Próximas partidas na sidebar  
- `/src/components/live/RecentResults.tsx` - Resultados recentes na sidebar

### Arquivos de Assets
- `/public/images/dragon-*.svg` - Ícones dos dragões elementais
- `/public/objectives/*@blue.png` e `*@red.png` - Ícones de objetivos do jogo

## Funcionalidades

### 1. Visualização da Partida
- **Cabeçalho da partida**: Mostra os dois times, logos, recordes e placar atual
- **Navegação por jogos**: Abas para alternar entre os jogos da série (MD3/MD5)
- **Detalhes do jogo**: 
  - Duração da partida
  - Kills por time
  - Distribuição de ouro com barra visual
  - Objetivos conquistados (torres, inibidores, barões, dragões)
  - Tabela completa de jogadores com:
    - Champion jogado e nível
    - Vida atual/máxima com barra visual
    - Items equipados
    - CS (creep score) e CS por minuto
    - KDA (kills/deaths/assists)
    - Ouro acumulado
    - Diferença de ouro (+/-)

### 2. Stream Integrada
- Player de Twitch incorporado
- Suporte para streams ao vivo e VODs
- Interface responsiva

### 3. Sidebar Informativa
- **Próximas partidas**: Links para outras partidas programadas
- **Resultados recentes**: Histórico de partidas finalizadas

### 4. Navegação Inteligente
- Links automáticos no Schedule para partidas ao vivo ou finalizadas
- Indicador visual "🔴 Clique para assistir" para partidas em andamento
- Indicador "📺 Ver detalhes" para partidas finalizadas

## Como Acessar

### Via Schedule
1. Vá para `/schedule`
2. Clique em qualquer partida com status "Ao Vivo" ou "Finalizada"
3. Será redirecionado para `/live/[id]`

### Diretamente via URL
- Acesse `/live/[id]` onde `[id]` é o ID da partida
- Exemplo: `/live/113487190606782008`

## Exemplo de Dados

A página utiliza dados mockados para demonstração, incluindo:
- Partida entre 100 Thieves vs FlyQuest
- Jogo finalizado em 29:43
- Estatísticas completas de todos os 10 jogadores
- Objetivos conquistados por ambos os times
- Stream da LTA North no Twitch

## Tecnologias Utilizadas

- **Next.js 15** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **next/image** para otimização de imagens
- **Internacionalização** com next-intl

## Responsividade

A página foi desenvolvida para ser totalmente responsiva:
- **Desktop**: Layout em grid com sidebar
- **Mobile**: Layout em coluna única com componentes empilhados
- **Tablet**: Layout adaptativo

## Próximos Passos

1. **Integração com API Real**: Substituir dados mockados por API real
2. **WebSocket**: Implementar atualizações em tempo real
3. **Chat ao Vivo**: Adicionar chat da Twitch integrado
4. **Favoritos**: Permitir salvar partidas favoritas
5. **Notificações**: Push notifications para partidas importantes
6. **Replay System**: Sistema de replays e highlights

## Estrutura de URLs

- `/live/[id]` - Página principal da partida
- `/schedule` - Lista de partidas com links para live
- `/` - Homepage com partidas em destaque
