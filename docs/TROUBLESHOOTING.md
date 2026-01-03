# 🔧 Troubleshooting - Solução de Problemas

Guia completo para resolver problemas na publicação de posts.

---

## ❓ **"Post dá 404 Not Found"**

### Causa 1: Slug com acento
```
Você salvou: tiago-cáp05
Deveria ser: tiago-cap05
```

**Solução:**
1. Acesse Supabase: `posts` table
2. Encontre o post com slug errado
3. Edite: `tiago-cáp05` → `tiago-cap05`
4. Execute workflow: GitHub Actions → "Sync Supabase to Markdown" → Run workflow
5. Aguarde ~1 min e teste novamente

### Causa 2: Série não existe
```
Você salvou post com série: "2joao"
Mas série "2joao" não foi criada ainda
```

**Solução:**
1. Acesse `/admin`
2. Crie a série **primeiro** (formulário de cima)
3. Depois crie o capítulo

### Causa 3: Ainda está em rebuild
Você publicou a menos de 1 minuto atrás.

**Solução:**
- Aguarde mais 30 segundos e recarregue a página

### Causa 4: Vercel ainda não fez deploy
O GitHub Actions criou o arquivo, mas Vercel ainda não completou o build.

**Solução:**
1. Acesse: https://vercel.com/seu-usuario/divine-insights/deployments
2. Veja se há um deploy "Building" em progresso
3. Aguarde concluir (geralmente ~30s)

---

## ❓ **"Erro ao salvar capítulo"**

### Erro: "Slug do capítulo é obrigatório"
Você não preencheu o campo "Slug do capítulo".

**Solução:**
- Preencha com slug sem acentos (ex: `tiago-05-oracao`)

### Erro: "Série deve ter pelo menos 2 caracteres"
O slug da série é muito curto.

**Solução:**
- Use slug com mínimo 2 caracteres (ex: `2joao` não `2j`)

### Erro: "Resumo deve ter pelo menos 10 caracteres"
Você escreveu resumo muito curto.

**Solução:**
- Escreva um resumo mais longo (mínimo 10 caracteres)

### Erro: "Conteúdo deve ter pelo menos 10 caracteres"
Seu markdown está vazio ou muito curto.

**Solução:**
- Escreva o conteúdo completo do capítulo

---

## ❓ **"GitHub Actions deu erro"**

### Erro: "Variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias"

**Solução:**
1. Acesse: https://github.com/seu-usuario/Divine-Insights/settings/secrets/actions
2. Verifique se tem:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Se não tiver, adicione (valores em `.env.local`)
4. Execute workflow novamente

### Erro: "Permission denied to github-actions[bot]"

**Solução:**
- Verifique se `.github/workflows/sync-supabase.yml` tem:
  ```yaml
  permissions:
    contents: write
  ```
- Se não tiver, adicione acima de `jobs:`

### Erro: "Markdown file generation failed"

**Solução:**
1. Verificar logs do workflow (detalhes no Actions)
2. Verificar se Supabase está online
3. Verificar se credenciais de Supabase estão corretas
4. Tentar executar manualmente:
   ```bash
   node scripts/sync-supabase-to-markdown.js
   ```

---

## ❓ **"Post aparece no admin mas não no site"**

### Causa: Arquivo markdown não foi criado
GitHub Actions não executou ou falhou.

**Solução:**
1. Acesse: https://github.com/seu-usuario/Divine-Insights/actions
2. Clique em "Sync Supabase to Markdown"
3. Clique em "Run workflow"
4. Aguarde ~30s
5. Recarregue seu site

---

## ❓ **"Imagem não aparece no post"**

### Causa 1: URL errada
Você copiou a URL de forma incorreta.

**Solução:**
```
❌ Errado: `https://example.com/image.png` (site externo talvez bloqueado)
✅ Correto: `/assets/blog/estudos/tiago-05.png` (arquivo local)
```

### Causa 2: Arquivo não existe
A imagem que você referencia não existe em `/public/`.

**Solução:**
1. Upload a imagem em: `/public/assets/blog/estudos/`
2. Use URL relativa: `/assets/blog/estudos/nome-da-imagem.png`

---

## ❓ **"Markdown não renderiza corretamente"**

### Problema: Tabelas, strikethrough ou listas não aparecem

**Solução:**
Você pode usar GFM (GitHub Flavored Markdown):

```markdown
# Tabela
| Coluna 1 | Coluna 2 |
|----------|----------|
| Valor 1  | Valor 2  |

# Strikethrough
~~texto riscado~~

# Checklist
- [x] Tarefa completa
- [ ] Tarefa pendente

# Código
\`\`\`javascript
console.log('Hello');
\`\`\`
```

---

## ❓ **"GitHub Actions executa a cada 15 minutos mas post não aparece"**

### Causa: Alterações duplicadas
Seu post foi criado, mas arquivo markdown também foi criado, criando conflitos.

**Solução:**
1. Acesse: https://github.com/seu-usuario/Divine-Insights/commits/main
2. Veja se há commits duplicados
3. Se houver, delete um dos arquivos duplicados em:
   - `_posts/seu-arquivo.md` (mantenha a cópia correta)

---

## ❓ **"Como atualizar um post já publicado?"**

### Solução: Use o mesmo slug

1. Acesse `/admin`
2. Preencha o **mesmo slug** do post anterior
3. Modifique o conteúdo
4. Clique "Salvar capítulo"
5. Aguarde ~1 min

**Resultado:**
- Supabase atualiza o registro
- Markdown é regenerado com conteúdo novo
- Site é rebuildo com versão atualizada

---

## ❓ **"Quero deletar um post"**

### Solução: Deletar no Supabase E em Git

1. **Supabase**: Acesse `posts` table → delete a linha
2. **GitHub**: Delete arquivo em `_posts/serie/slug.md`
3. Faça commit: `git commit -m "docs: delete old post"`
4. Execute workflow novamente para sincronizar

---

## 📞 **Ainda não resolveu?**

### Verificar logs em 3 lugares:

1. **GitHub Actions**: https://github.com/seu-usuario/Divine-Insights/actions
   - Ver logs completos do workflow

2. **Vercel**: https://vercel.com/seu-usuario/divine-insights/deployments
   - Ver logs do build

3. **Supabase**: https://btctugfrzjpukfbbswuc.supabase.co/project/btctugfrzjpukfbbswuc/logs
   - Ver erros do banco de dados

### Informações que ajudam a debugar:

- Qual era o slug que você usou?
- A série já existia?
- Qual erro específico apareceu?
- Em qual etapa (admin, GitHub, Vercel)?

---

## ✅ **Checklist de Debug Rápido**

```
[ ] Post foi salvo no Supabase? (verificar tabela posts)
[ ] Slug está sem acentos?
[ ] GitHub Actions executou? (ver último workflow)
[ ] Arquivo markdown foi criado? (verificar _posts/)
[ ] Vercel fez rebuild? (ver deployments)
[ ] URL está correta? (/posts/serie/slug)
[ ] Página foi recarregada (Ctrl+Shift+R)?
```

Se tudo acima foi checado e ainda não funciona, verifique os logs de cada plataforma.
