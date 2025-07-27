# 🎯 Guia de Arquitetura: Hooks React vs API Routes

## 📋 Resumo da Decisão

Refatoramos de **classes** para **hooks funcionais** e criamos **duas abordagens** para consumir dados:

### 🚀 Client-side Services (Hooks diretos)
```typescript
import { useChampions } from '@/hooks/use-data-dragon';

function MyComponent() {
  const { champions, loading, error } = useChampions();
  // ...
}
```

### 🛡️ API Routes (Server-side cache)
```typescript
import { useApiChampions } from '@/hooks/use-api-routes';

function MyComponent() {
  const { champions, loading, error } = useApiChampions();
  // ...
}
```

---

## 🤔 Quando usar cada abordagem?

### ✅ Use **Client-side Services** quando:

- **Interações rápidas em tempo real**
  - Live matches, odds em tempo real
  - Atualizações frequentes (a cada 10-30 segundos)
  - Chat, notificações, timers

- **APIs públicas sem autenticação**
  - Data Dragon (campeões, itens, runas)
  - APIs que não precisam de API keys

- **Menor latência**
  - Dados que mudam frequentemente
  - Experiência mais responsiva

- **Menos carga no servidor**
  - Evita passar pelo servidor Next.js
  - Conexão direta com APIs externas

### ✅ Use **API Routes** quando:

- **SEO é importante**
  - Dados renderizados no servidor
  - Meta tags dinâmicas
  - Páginas que precisam ser indexadas

- **Proteção de API keys**
  - Riot Games API key
  - APIs de betting houses
  - Credenciais sensíveis

- **Cache server-side**
  - Dados que não mudam frequentemente
  - Redução de requests para APIs externas
  - Rate limiting compliance

- **Validação server-side**
  - Dados de usuário
  - Operações sensíveis
  - Compliance e auditoria

---

## 📊 Comparativo Prático

| Aspecto | Client-side | API Routes |
|---------|-------------|------------|
| **Latência** | ⚡ Menor | 🐢 Maior |
| **SEO** | ❌ Limitado | ✅ Completo |
| **Cache** | 📱 Local | 🏗️ Servidor |
| **Segurança** | ⚠️ Exposta | 🔒 Protegida |
| **Rate Limits** | ⚠️ Por usuário | ✅ Centralizada |
| **Recursos** | 💻 Cliente | 🖥️ Servidor |

---

## 🏗️ Estrutura dos Arquivos

```
src/
├── services/                    # Lógica de negócio (sem classes)
│   ├── data-dragon.service.ts   # ✅ Funções puras
│   ├── lol-esports.service.ts   # ✅ Exports nomeados
│   └── http-client.ts           # ✅ Functional approach
├── hooks/                       # React hooks customizados
│   ├── use-data-dragon.ts       # 🚀 Client-side hooks
│   └── use-api-routes.ts        # 🛡️ API routes hooks
├── app/api/                     # Next.js API routes
│   ├── champions/route.ts       # 🛡️ Server cache
│   ├── champions/[name]/route.ts
│   └── patch/route.ts
└── components/
    └── champions-example.tsx    # 📱 Exemplo de uso
```

---

## 💡 Exemplo Real: League of Legends

### 🚀 Client-side: Data Dragon (Público)
```typescript
// Acesso direto - mais rápido
const { champions } = useChampions();
const { items } = useItems();
const { runes } = useRunes();
```

**Por quê?**
- Data Dragon é público (sem API key)
- Dados mudam só com patches (quinzenal)
- Latência importa para UX

### 🛡️ API Routes: Riot Games API (Privado)
```typescript
// Via servidor - mais seguro
const matches = await fetch('/api/matches/live');
const rankings = await fetch('/api/rankings/challenger');
```

**Por quê?**
- Precisa de API key secreta
- Rate limits restritivos
- Cache server-side é essencial
- Dados sensíveis de jogadores

---

## 🔄 Padrão de Migração

### ❌ Antes (Classes)
```typescript
class DataDragonService {
  private currentPatch = '14.24.1';
  
  async getChampions() {
    // ...
  }
}
```

### ✅ Depois (Functional)
```typescript
let currentPatch = '14.24.1';

export const getChampions = async () => {
  // ...
};

export const getCurrentPatch = async () => {
  // ...
};
```

### 🎣 Hook Customizado
```typescript
export const useChampions = (locale = 'pt_BR') => {
  const [champions, setChampions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChampions = useCallback(async () => {
    try {
      const data = await getChampions(locale);
      setChampions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchChampions();
  }, [fetchChampions]);

  return { champions, loading, error, refetch: fetchChampions };
};
```

---

## 🎯 Recomendações Específicas

### Para o projeto LoL Esports Betting:

1. **Data Dragon** → Client-side
   - Campeões, itens, runas
   - Públicos e estáveis

2. **Live Matches** → Client-side
   - Tempo real é crucial
   - Polling frequente

3. **Betting Houses** → API Routes
   - Dados regulamentados
   - Cache importante
   - SEO necessário

4. **Player Stats** → API Routes
   - API key do Riot
   - Rate limits

5. **User Data** → API Routes
   - Sempre server-side
   - Validação obrigatória

---

## 🚀 Próximos Passos

1. ✅ Refatorar outros services para functional
2. ✅ Criar mais hooks customizados
3. ✅ Implementar API routes para dados sensíveis
4. ⏳ Adicionar middleware de cache
5. ⏳ Implementar rate limiting
6. ⏳ Configurar Image optimization

**A arquitetura está preparada para escalar mantendo performance e segurança! 🎉**
