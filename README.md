# 🎮 Bet Esports - Plataforma de Apostas Esportivas

Uma plataforma moderna de apostas esportivas construída com Next.js 15, next-intl para internacionalização e integração com Sanity CMS.

## 🌍 Recursos Multilíngue

- ✅ Suporte completo para **Português** e **Inglês**
- ✅ Roteamento automático baseado no idioma (`/pt/`, `/en/`)
- ✅ Troca de idioma em tempo real
- ✅ SEO otimizado para múltiplos idiomas

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **next-intl** - Internacionalização completa
- **Tailwind CSS 4** - Estilização moderna
- **TypeScript** - Tipagem estática
- **Sanity** - CMS headless para conteúdo
- **React 19** - Última versão do React

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repo>
cd bet-esports
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite o `.env.local` com suas credenciais do Sanity:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

4. Execute o projeto:
```bash
npm run dev
```

## 🏗️ Configuração do Sanity

### 1. Criar Projeto no Sanity

1. Acesse [sanity.io](https://sanity.io) e crie uma conta
2. Crie um novo projeto
3. Anote o Project ID
4. Gere um token de API

### 2. Configurar Esquemas

Os esquemas estão na pasta `sanity-schemas/`. Você precisará:

1. Instalar Sanity CLI:
```bash
npm install -g @sanity/cli
```

2. Inicializar Sanity no projeto:
```bash
sanity init
```

3. Copiar os esquemas da pasta `sanity-schemas/` para `schemas/` no seu projeto Sanity

4. Fazer deploy dos esquemas:
```bash
sanity deploy
```

### 3. Estrutura de Dados

O sistema suporta os seguintes tipos de conteúdo multilíngue:

- **Games** (Jogos) - LOL, CS2, Valorant, etc.
- **Teams** (Times) - Times de esports
- **Tournaments** (Torneios) - Competições
- **Matches** (Partidas) - Partidas individuais

Cada tipo suporta campos em português e inglês:
- `title_pt` / `title_en`
- `description_pt` / `description_en`

## 🌐 Como Funciona a Internacionalização

### Estrutura de Arquivos
```
src/
├── app/
│   └── [locale]/          # Páginas localizadas
│       ├── layout.tsx     # Layout com provider i18n
│       └── page.tsx       # Página inicial
├── i18n/
│   ├── routing.ts         # Configuração de rotas
│   ├── navigation.ts      # Navegação localizada
│   └── request.ts         # Configuração de request
├── middleware.ts          # Middleware de detecção de idioma
└── lib/
    └── sanity.ts          # Cliente Sanity com suporte multilíngue
```

### Arquivos de Tradução
```
messages/
├── pt.json               # Traduções em português
└── en.json               # Traduções em inglês
```

### Como Usar Traduções

```tsx
// Em Server Components (async)
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}

// Em Client Components  
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

### Links Localizados

```tsx
import { Link } from '@/i18n/navigation';

// Automaticamente adiciona o prefixo do idioma
<Link href="/about">Sobre</Link>
// Resulta em: /pt/about ou /en/about

// Trocar idioma
<Link href="/" locale="en">English</Link>
```

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de roteamento multilíngue
- ✅ Página inicial com design responsivo
- ✅ Troca de idioma dinâmica
- ✅ Integração com Sanity preparada
- ✅ Tipagem TypeScript completa
- ✅ Layout moderno para apostas esportivas
- ✅ Componentes para jogos, torneios e partidas

## 🔄 Próximos Passos

1. **Configurar Sanity Studio** completo
2. **Implementar autenticação** de usuários
3. **Criar sistema de apostas** real
4. **Adicionar pagamentos** (Stripe/PayPal)
5. **Implementar odds** dinâmicas
6. **Adicionar streaming** ao vivo
7. **Sistema de notificações**

## 📱 Responsividade

O projeto está totalmente responsivo usando Tailwind CSS:
- ✅ Mobile First
- ✅ Tablet otimizado  
- ✅ Desktop completo
- ✅ Dark theme nativo

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm run start

# Linting
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 📄 Licença

Este projeto está sob a licença MIT.
