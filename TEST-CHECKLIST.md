## 📋 Checklist de Validação - Novo Tom de Engajamento

### ✅ Correções Realizadas

1. **App.tsx**: Corrigido erro de variável `showTestScript` não declarada
2. **TestScriptGenerator.tsx**: Adicionada análise automática de engajamento
3. **Métricas automáticas implementadas**:
   - Contador de perguntas (meta: 5-7)
   - Contador de emojis (meta: 4-5)
   - Detector de CTAs (meta: 3+)
   - Detector de linguagem informal (meta: 5+)
   - Análise de tamanho de parágrafos

---

### 🎯 Checklist de Validação Automática

#### ✅ Requisitos Obrigatórios

| Critério | Meta | Validação | Descrição |
|----------|------|-----------|-----------|
| **Perguntas Diretas** | 5-7 | Automática | "E aí, você...", "Imagina se...", "Qual foi..." |
| **Linguagem Jovem** | 5+ termos | Automática | "mano/a", "sério isso?", "é tipo...", "bagulho", "trip" |
| **Emojis Estratégicos** | 4-5 | Automática | 🤔 🚀 ✨ 🤯 😅 (não exagerar) |
| **Parágrafos Curtos** | < 400 chars | Automática | Máximo 3-4 linhas por parágrafo |
| **CTAs Fortes** | 3+ | Automática | "Salva", "Marca", "Me conta", "Testa" |
| **Mini-Desafio** | 1+ | Manual | "Testa isso hoje...", "Aposto que 90%..." |
| **Tom Conversacional** | - | Manual | Amigo próximo, não palestra formal |

---

### 🧪 Como Testar

1. **Acessar interface de teste**:
   ```
   Clique no botão "🧪 Teste de Script" no App principal
   ```

2. **Gerar roteiro de teste**:
   - Ideia pré-configurada: "A IA Vai Nos Levar Para as Estrelas ou Para o Abismo?"
   - Clique em "Gerar Roteiro de Teste"
   - Aguarde 15-30 segundos

3. **Verificar resultados automáticos**:
   - ✅ **Verde**: Script aprovado (todas as métricas atingidas)
   - ⚠️ **Amarelo**: Script precisa de ajustes (alguma métrica abaixo da meta)

4. **Métricas exibidas**:
   ```
   Perguntas: X (meta: 5-7)
   Emojis: X (meta: 4-5)
   CTAs: X (meta: 3+)
   Expressões Jovens: X (meta: 5+)
   ```

5. **Checklist visual**:
   - ✓ Checkboxes marcados automaticamente para critérios validados
   - □ Checkboxes manuais para validação humana (tom, desafios)

---

### 🔍 Análise Detalhada

#### Expressões Detectadas

**Linguagem Jovem**:
- "mano" / "mana"
- "sério isso?"
- "é tipo..."
- "imagina só"
- "bagulho"
- "trip"

**CTAs**:
- "salva" (esse vídeo/post)
- "marca" (um amigo)
- "comenta" / "me conta"
- "compartilha"
- "testa" (isso hoje)
- "responde"

**Perguntas Retóricas**:
- Qualquer frase terminada em "?"
- Distribuídas ao longo do texto

---

### 📊 Critérios de Aprovação

Para o script ser **aprovado automaticamente**, deve atingir:

1. ✅ Mínimo 5 perguntas diretas
2. ✅ Mínimo 4 emojis estratégicos
3. ✅ Mínimo 3 CTAs explícitos
4. ✅ Mínimo 5 expressões jovens/informais
5. ✅ Parágrafos com média < 400 caracteres

**Status Final**:
- 🟢 **Aprovado**: Todas as métricas atingidas
- 🟡 **Precisa Ajustes**: 1+ métricas abaixo da meta

---

### 🚀 Próximos Passos

Após aprovação do teste:

1. Integrar análise automática no pipeline principal
2. Adicionar métricas ao dashboard de analytics
3. Criar alertas para scripts fora do padrão
4. Treinar modelo com scripts aprovados
5. Implementar sugestões automáticas de melhoria

---

### 📝 Exemplo de Saída Esperada

```json
{
  "analysis": {
    "questions": 7,
    "emojis": 5,
    "ctas": 4,
    "informalWords": 8,
    "paragraphCount": 25,
    "avgParagraphLength": 280,
    "passed": true
  }
}
```

**Interpretação**:
- ✅ 7 perguntas (acima da meta de 5-7)
- ✅ 5 emojis (na meta perfeita)
- ✅ 4 CTAs (acima da meta de 3+)
- ✅ 8 expressões jovens (muito acima da meta de 5+)
- ✅ 280 chars/parágrafo (abaixo do limite de 400)
- 🟢 **APROVADO**

---

### ⚙️ Configurações Técnicas

**Função Deno**: `script-writer`
- Modelo: `gemini-2.0-flash-exp`
- Prompt: Atualizado com 115 linhas de diretrizes de engajamento
- Output: JSON estruturado com timestamps

**Componente Frontend**: `TestScriptGenerator.tsx`
- Framework: React + TypeScript
- Análise: Regex patterns + contadores
- UI: Tailwind CSS + Framer Motion

**Rota de Teste**: 
```
/test-script (via botão no App principal)
```

---

✅ **TESTE PRONTO PARA EXECUÇÃO**
