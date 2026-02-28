# 📺 Guia Completo: Como o Canal IAALÉM Recebe os Uploads

## 🔐 Passo 1: Autorização OAuth do YouTube

### O Que Acontece:
O sistema precisa de permissão para fazer upload de vídeos **diretamente no seu canal IAALÉM**.

### Como Funciona:
1. **Clique em "Autorizar YouTube"** no card azul (PublisherAgent)
2. Você será redirecionado para o **Google OAuth**
3. **CRÍTICO**: Faça login com a conta Google que é proprietária do canal IAALÉM
4. Autorize as permissões solicitadas:
   - ✅ `youtube.upload` - Fazer upload de vídeos
   - ✅ `youtube.readonly` - Ler dados do canal
   - ✅ `youtube` - Gerenciar vídeos

### O Que é Salvo:
```json
{
  "accessToken": "ya29.a0...", // Token temporário (expira em 1h)
  "refreshToken": "1//0g...", // Token permanente (renova automaticamente)
  "expiresAt": "2025-02-25T20:00:00Z",
  "userId": "u362423817010606080",
  "scope": "youtube.upload youtube.readonly youtube"
}
```

---

## 🚀 Passo 2: Upload Automático

### Quando Você Clica em "Agendar Upload":

#### 1️⃣ **Validação de Token**
```typescript
// functions/youtube-scheduler/index.ts (linhas 43-105)
async function getAccessToken() {
  // Busca token do banco de dados
  const tokensResult = await lumi.entities.youtubeTokens.list({
    filter: { userId: user.userId }
  })
  
  // Se expirou, renova automaticamente
  if (expiresAt <= now) {
    // Chama Google OAuth Refresh Token API
    const refreshResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: { refresh_token, grant_type: "refresh_token" }
    })
    // Salva novo access_token no banco
  }
  
  return accessToken
}
```

#### 2️⃣ **Upload via YouTube Data API v3**
```typescript
// functions/youtube-scheduler/index.ts (linhas 116-146)
const youtubeUploadUrl = "https://www.googleapis.com/upload/youtube/v3/videos"

const videoMetadata = {
  snippet: {
    title: "🚀 A IA Descobriu o Segredo das Estrelas...",
    description: "...",
    tags: ["IA", "espaço", "NASA", ...],
    categoryId: "28" // Ciência e Tecnologia
  },
  status: {
    privacyStatus: "public",
    publishAt: "2025-02-25T22:00:00Z", // 19:00 -03 (Brasília)
    selfDeclaredMadeForKids: false
  }
}

const uploadResponse = await fetch(youtubeUploadUrl, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${accessToken}`, // ← Usa token do canal IAALÉM
    "Content-Type": "application/json"
  },
  body: JSON.stringify(videoMetadata)
})
```

#### 3️⃣ **Salvar no Banco de Dados**
```typescript
// functions/youtube-scheduler/index.ts (linhas 157-170)
await lumi.entities.videos.create({
  title: "🚀 A IA Descobriu...",
  youtubeVideoId: "dQw4w9WgXcQ", // ← ID do vídeo no YouTube
  status: "scheduled",
  publishDate: "2025-02-25T22:00:00Z"
})
```

---

## 📊 Passo 3: Monitoramento Automático

### Após Publicação:
```typescript
// functions/youtube-scheduler/index.ts (linhas 183-264)
// Busca métricas reais do YouTube Analytics API
const metricsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}`

const metricsResponse = await fetch(metricsUrl, {
  headers: { "Authorization": `Bearer ${accessToken}` }
})

const metrics = {
  views: 1247,
  likes: 89,
  comments: 23,
  ctr: 6.8,
  retention: 67
}

// Atualiza no banco automaticamente
await lumi.entities.videos.update(videoDbId, { metrics })
```

---

## ✅ Checklist de Configuração

### Pré-requisitos (Google Cloud Console):
- [x] Projeto Google Cloud criado
- [x] YouTube Data API v3 ativada
- [x] OAuth 2.0 Client ID configurado
- [x] Redirect URI: `https://youtube-agent-system.lumi.new/oauth/callback`
- [x] Credenciais baixadas (client_id + client_secret)
- [x] Variáveis de ambiente configuradas no sistema:
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `GOOGLE_OAUTH_CLIENT_SECRET`

### Pré-requisitos (Canal YouTube):
- [ ] **Conta Google** conectada ao canal **IAALÉM**
- [ ] **Permissões de proprietário** ou gerente do canal
- [ ] Canal verificado (para uploads > 15 minutos)

---

## 🎯 Fluxo Completo Simplificado

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuário clica "Autorizar YouTube"                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Google OAuth pergunta: "Permitir acesso ao canal?"  │
│    → Usuário faz login com conta do canal IAALÉM       │
│    → Autoriza permissões                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Sistema salva tokens OAuth no banco de dados        │
│    ✓ accessToken (válido 1h)                           │
│    ✓ refreshToken (permanente, renova automaticamente) │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Usuário clica "Agendar Upload"                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Sistema busca token válido (renova se expirado)     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Faz upload via YouTube Data API v3                  │
│    → POST /youtube/v3/videos                            │
│    → Authorization: Bearer {token_do_canal_IAALÉM}      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Vídeo aparece no canal IAALÉM                       │
│    → Agendado para 19:00 (horário Brasília)            │
│    → Público                                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ 8. Sistema monitora métricas automaticamente           │
│    → Atualiza views, likes, comments a cada 5 min      │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting

### Erro: "User not authenticated"
**Causa**: Usuário não fez login no sistema Lumi  
**Solução**: Faça login antes de autorizar YouTube

### Erro: "YouTube not authorized"
**Causa**: OAuth não foi completado ou tokens expiraram  
**Solução**: Clique novamente em "Autorizar YouTube"

### Erro: "Failed to refresh token"
**Causa**: Refresh token inválido ou permissões revogadas  
**Solução**: 
1. Vá em https://myaccount.google.com/permissions
2. Revogue acesso do app
3. Autorize novamente no sistema

### Vídeo não aparece no canal IAALÉM
**Causa**: Login foi feito com conta Google errada  
**Solução**: 
1. Verifique qual conta está logada no Google
2. Certifique-se que é a conta proprietária do canal IAALÉM
3. Revogue e re-autorize com a conta correta

### Upload falha com "Quota exceeded"
**Causa**: Limite diário da YouTube API atingido (10,000 units/dia)  
**Solução**: 
- Aguarde reset de quota (00:00 PST)
- Solicite aumento de quota no Google Cloud Console

---

## 🔒 Segurança

### Dados Armazenados:
- ✅ Tokens OAuth criptografados no banco MongoDB
- ✅ Refresh automático sem intervenção manual
- ✅ Tokens vinculados ao userId (multi-usuário seguro)

### Dados NÃO Armazenados:
- ❌ Senha da conta Google
- ❌ Arquivos de vídeo (apenas metadados)
- ❌ Client Secret em código frontend

---

## 📝 Resumo Executivo

**Para o canal IAALÉM receber uploads automaticamente:**

1. **Autorize uma única vez** com a conta Google do canal IAALÉM
2. **Tokens são salvos permanentemente** e renovados automaticamente
3. **Cada upload usa esses tokens** para publicar diretamente no canal
4. **Não precisa autorizar novamente** (até revogar permissões manualmente)
5. **Sistema monitora métricas** automaticamente após publicação

**URL do Vídeo Final**: `https://youtube.com/watch?v={youtubeVideoId}`

---

## 🎬 Próximos Passos

1. [ ] Autorizar YouTube OAuth no PublisherAgent
2. [ ] Testar upload de vídeo de teste
3. [ ] Verificar vídeo no canal IAALÉM
4. [ ] Confirmar métricas sendo atualizadas
5. [ ] Configurar upload diário automático (19:00 -03)
