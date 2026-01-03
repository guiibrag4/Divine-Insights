# ✅ Checklist de Publicação - Divine Insights

Use este checklist antes de publicar cada novo capítulo para garantir qualidade.

---

## 📋 **Antes de Escrever (Planejamento)**

- [ ] Série já existe? Se não, criar primeira
- [ ] Capítulo faz parte de qual série?
- [ ] Qual será o número/ordem do capítulo?
- [ ] Imagem de capa já foi preparada?
- [ ] Resumo já foi definido?

---

## ✍️ **Preparação do Conteúdo**

### **Slug do Capítulo**
- [ ] Slug segue padrão: `{serie}-{ordem}-{descricao}`
  - Exemplo: `tiago-05-oração`
- [ ] Apenas letras minúsculas, números e hífens
- [ ] **SEM acentos** (será convertido automaticamente)
- [ ] Mínimo 3 caracteres
- [ ] Sem espaços (use hífens)
- [ ] Sem caracteres especiais (@, #, $, etc)

### **Título**
- [ ] Título segue padrão: `Série | Capítulo X: Assunto`
  - Exemplo: `Tiago | Capítulo 5: Oração Eficaz`
- [ ] Título é claro e descritivo
- [ ] Título não tem erros ortográficos

### **Resumo (Excerpt)**
- [ ] Resumo tem **mínimo 10 caracteres**
- [ ] Resumo descreve bem o conteúdo do capítulo
- [ ] Resumo é atrativo (será visto em cards)
- [ ] Resumo não tem erros ortográficos

### **Conteúdo (Markdown)**
- [ ] Conteúdo tem **mínimo 10 caracteres**
- [ ] Conteúdo tem formatação correta (headings, listas, etc)
- [ ] Imagens foram testadas (links funcionam)
- [ ] Código-fonte está bem formatado
- [ ] Referências biblícas estão corretas
- [ ] Não há typos ou erros gramaticais
- [ ] Indentação está consistente

### **Imagens**
- [ ] Imagem de capa existe em `/public/assets/blog/estudos/`
- [ ] URL da imagem está correta
- [ ] Imagem tem tamanho adequado (>500px width)
- [ ] Imagem é relevante ao capítulo
- [ ] Imagem foi comprimida/otimizada

### **Data**
- [ ] Data está em formato correto: `YYYY-MM-DD`
- [ ] Data faz sentido (não é data futura)
- [ ] Data é consistente com cronologia de capítulos

---

## 🎯 **Preenchimento do Formulário Admin**

### **Se for NOVA SÉRIE:**

- [ ] Títlo: Nome completo da série
- [ ] Slug Prefix: ID único, sem acentos
  - Exemplo: `2joao` (não `2 João`)
- [ ] Descrição: Breve resumo da série (2-3 frases)
- [ ] Cover Image: URL da imagem de capa
- [ ] Status: `Em andamento` ou `Completo`
- [ ] **Clique**: "Salvar série"
- [ ] Aguarde confirmação (rápido)

### **Capítulo:**

- [ ] Série (prefixo): Usar série correta
- [ ] Slug: Sem acentos, formato correto
- [ ] Título: Completo e descritivo
- [ ] Resumo: Mínimo 10 caracteres
- [ ] Data: Usar datepicker (hoje por padrão)
- [ ] Cover Image: URL válida
- [ ] Conteúdo: Markdown bem formatado
- [ ] **Revisar**: Tudo está correto antes de clicar
- [ ] **Clique**: "Salvar capítulo"

---

## ⏱️ **Após Publicar**

- [ ] Aguardar ~1 minuto para rebuild
- [ ] Recarregar página principal (`Ctrl+Shift+R`)
- [ ] Acessar post via URL direta: `/posts/{serie}/{slug}`
- [ ] Verificar se post aparece corretamente
- [ ] Verificar se imagem renderiza
- [ ] Verificar se markdown está formatado
- [ ] Verificar se navegação anterior/próximo funciona
- [ ] Testar em mobile também

---

## 🔗 **Publicação em Redes Sociais**

Após confirmar que post está ao vivo:

- [ ] Copiar URL do post
- [ ] Criar post no Twitter/X com:
  - [ ] Título do capítulo
  - [ ] Resumo ou destaque
  - [ ] URL do post
  - [ ] Emojis relevantes
- [ ] Criar post no LinkedIn com:
  - [ ] Descrição mais formal
  - [ ] URL do post
  - [ ] Hashtags: `#Bíblia #Estudos #DivineInsights`
- [ ] Compartilhar em grupos do WhatsApp/Telegram (se aplicável)

---

## 📊 **Depois de Publicar (Monitoramento)**

- [ ] Verificar Google Analytics (tráfego)
- [ ] Verificar Vercel Analytics (performance)
- [ ] Responder comentários (se houver)
- [ ] Nota: Usar para melhorar próximos posts

---

## 🎓 **Boas Práticas**

### **Markdown**
✅ Use formatação clara:
```markdown
# Título principal
## Subtítulo
### Sub-subtítulo

Parágrafo com **negrito** e *itálico*.

- Lista de pontos
- Segundo ponto
  - Sub-ponto

| Tabela | Exemplo |
|--------|---------|
| Dado   | Valor   |

> Citação em destaque

\`\`\`javascript
Código formatado
\`\`\`
```

### **Estrutura**
✅ Siga estrutura consistente:
1. Introdução do tema
2. Versículos/Referências principais
3. Análise/Explicação
4. Aplicação prática
5. Conclusão

### **Conteúdo**
✅ Boas práticas:
- Sempre cite a Bíblia com versão (ex: ARC, NVI)
- Use títulos descritivos
- Quebra o texto em parágrafos pequenos
- Highlighted points importantes com **negrito**
- Use listas para organizar ideias
- Inclua exemplos práticos quando possível

❌ Evite:
- Textos muito longos sem quebra
- Acentos em slugs/URLs
- Imagens quebradas
- Links mortos
- Erros gramaticais/ortográficos

---

## 🚀 **Checklist Rápido (Antes de Clicar "Salvar")**

```
[ ] Slug sem acentos?
[ ] Títlo está bom?
[ ] Resumo tem >10 caracteres?
[ ] Imagem URL está correta?
[ ] Markdown renderiza bem?
[ ] Data está correta?
[ ] Série existe?
[ ] Tudo revisado?

✅ Tudo certo? Clique "Salvar capítulo"!
```

---

## 📞 **Dúvidas?**

Veja os documentos:
- [QUICK_START.md](./QUICK_START.md) - Como publicar (passo a passo)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problemas e soluções
- [PUBLICATION_SYSTEM.md](./PUBLICATION_SYSTEM.md) - Detalhes técnicos

---

**Versão**: 1.0  
**Última atualização**: 3 de janeiro de 2026
