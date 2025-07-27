# 🧹 Correção dos Schemas do Sanity

## ✅ Problemas Corrigidos

### 1. **ESLint Rule: import/no-anonymous-default-export**
- ❌ **Antes**: `export default { ... }` (objetos anônimos)
- ✅ **Depois**: Criação de variáveis nomeadas antes do export

### 2. **Tipagem TypeScript**
- ✅ Adicionado `import type { Rule } from '@sanity/types'` onde necessário
- ✅ Substituído `(Rule: any)` por `(Rule: Rule)` no game.ts
- ✅ Removido imports não utilizados

### 3. **Estrutura Organizada**
- ✅ Criado `index.ts` para centralizar exports
- ✅ Exports nomeados para cada schema
- ✅ Array `schemaTypes` para configuração do Sanity

## 📁 Estrutura dos Schemas

```
sanity-schemas/
├── index.ts          # Barrel export
├── game.ts           # Schema de jogos (LoL, Valorant, etc.)
├── match.ts          # Schema de partidas/matches
├── team.ts           # Schema de times/equipes
└── tournament.ts     # Schema de torneios
```

## 🎯 Schemas Corrigidos

### game.ts
```typescript
const gameSchema = {
  name: 'game',
  title: 'Jogo/Game',
  // ... campos
};
export default gameSchema;
```

### match.ts
```typescript
const matchSchema = {
  name: 'match', 
  title: 'Partida/Match',
  // ... campos
};
export default matchSchema;
```

### team.ts
```typescript
const teamSchema = {
  name: 'team',
  title: 'Time/Team', 
  // ... campos
};
export default teamSchema;
```

### tournament.ts
```typescript
const tournamentSchema = {
  name: 'tournament',
  title: 'Torneio/Tournament',
  // ... campos
};
export default tournamentSchema;
```

## 📦 Como Usar

```typescript
// Importar todos os schemas
import { schemaTypes } from './sanity-schemas';

// Ou importar schemas individuais
import { gameSchema, matchSchema } from './sanity-schemas';

// Para configuração do Sanity
import { schemaTypes } from './sanity-schemas';

export default defineConfig({
  // ...
  schema: {
    types: schemaTypes,
  },
});
```

## ✅ Status Final

- ✅ **0 erros de ESLint**
- ✅ **0 erros de TypeScript** 
- ✅ **Exports organizados**
- ✅ **Código limpo e padronizado**
- ✅ **Pronto para uso com Sanity Studio**

Todos os schemas agora seguem as melhores práticas e estão prontos para integração com o Sanity CMS! 🚀
