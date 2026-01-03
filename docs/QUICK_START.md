# 🚀 Quick Start - Como Publicar um Estudo

**Tempo estimado**: 5 minutos do clique até o post ao vivo

---

## 📝 **Passo 1: Acessar o Painel Admin**

1. Acesse: `https://divine-insights.vercel.app/admin` (seu site em produção)
2. Você verá dois formulários: **Série** e **Capítulo**

---

## 📚 **Passo 2: Se for NOVA SÉRIE, crie ela primeiro**

### **Formulário: Criar / Atualizar Série**

Preencha apenas **5 campos**:

| Campo | Exemplo | Notas |
|-------|---------|-------|
| **Título** | `2 João` | Nome completo da série |
| **Slug Prefix** | `2joao` | Identificador único, sem acentos |
| **Descrição** | `Exposição de 2 João...` | Texto que aparece na homepage |
| **Cover Image** | `/assets/blog/capas/2joao.png` | URL da imagem |
| **Status** | `Em andamento` ou `Completo` | Progresso da série |

**Clique**: `Salvar série`

✅ Pronto! A série foi criada automaticamente com:
- Página índice (`2joao-00-indice.md`)
- Contagem de capítulos (calculada automaticamente)

---

## 📖 **Passo 3: Criar / Atualizar Capítulo**

### **Formulário: Criar / Atualizar Capítulo**

Preencha apenas **6 campos**:

| Campo | Exemplo | Notas |
|-------|---------|-------|
| **Série (prefixo)** | `tiago` | Deve existir primeiro |
| **Slug do capítulo** | `tiago-05-oração` | ⚠️ Sem acentos, apenas letras/números/hífens |
| **Título** | `Tiago \| Capítulo 5: Oração` | Será exibido no topo da página |
| **Resumo (excerpt)** | `Uma mensagem sobre...` | Aparece nos cards da homepage |
| **Data** | `2026-01-03` | Datepicker (ou hoje por padrão) |
| **Cover Image** | `/assets/blog/estudos/tiago-05.png` | URL da imagem de capa |
| **Conteúdo (markdown)** | Seu markdown aqui... | Suporta GFM: tabelas, strikethrough, etc |

**⚠️ Slug - Regras IMPORTANTES:**
- ✅ Correto: `tiago-05-oração` → convertido automaticamente para `tiago-05-oracao`
- ❌ Errado: Não use acentos manualmente (o sistema corrige)
- ❌ Errado: Não use espaços (use hífens)
- ❌ Errado: Não use caracteres especiais (@, #, $, etc)

**Clique**: `Salvar capítulo`

---

## ⏱️ **Passo 4: Aguardar Publicação**

Após clicar "Salvar capítulo":

```
1. Dados salvos no Supabase         [1s]  ✅
2. GitHub Actions detecta mudança   [5s]  ✅
3. Gera arquivo markdown            [10s] ✅
4. Faz commit automático            [5s]  ✅
5. Vercel detecta mudança           [5s]  ✅
6. Rebuild do site                  [30s] ⏳
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ~1 minuto até post estar 100% ao vivo
```

---

## ✨ **O que é Preenchido Automaticamente**

Você **NÃO precisa preencher** estes campos (o sistema cuida):

- **OG Image**: Usa a Cover Image automaticamente
- **Autor**: Guilherme Braga (padrão)
- **Foto do Autor**: `/assets/blog/authors/jj.jpeg`
- **Slug Índice da Série**: Gerado como `{serie}/{serie}-00-indice`
- **Contagem de Capítulos**: Calculada do banco de dados

---

## 🎯 **Checklist Antes de Publicar**

- [ ] Slug **sem acentos** (ex: `tiago-05-oracao` não `tiago-05-oração`)
- [ ] Série já existe ou estou criando ela primeiro
- [ ] Imagens estão hospedadas (URL funciona)
- [ ] Markdown está bem formatado (teste em editor local)
- [ ] Data está correta
- [ ] Título e resumo fazem sentido

---

## 🔗 **URLs Resultantes**

Após publicar um capítulo:

**Slug**: `tiago-05-oracao`
**URL Final**: `https://divine-insights.vercel.app/posts/tiago/tiago-05-oracao`

**Série Índice**:
**URL Final**: `https://divine-insights.vercel.app/posts/tiago/tiago-00-indice`

---

## 📱 **Mobile/Responsivo**

O formulário é totalmente responsivo! Funciona em:
- ✅ Desktop (melhor experiência)
- ✅ Tablet
- ✅ Mobile (textarea de markdown é menor, mas funciona)

---

## 🚀 **Pronto!**

Seu post está ao vivo! Compartilhe a URL e aproveite! 

Se tiver dúvidas, veja [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) ou [PUBLICATION_SYSTEM.md](./PUBLICATION_SYSTEM.md) para detalhes técnicos.
