# 🎯 Instruções Rápidas - Setup Supabase

Siga estes passos na ordem:

## ✅ **PASSO 1: Criar conta e projeto no Supabase**

1. Acesse: https://supabase.com
2. Clique em **"Start your project"** ou **"Sign in"** (se já tiver conta)
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: `divine-insights`
   - **Database Password**: Crie uma senha forte (guarde ela!)
   - **Region**: South America (São Paulo) ou a mais próxima
5. Clique em **"Create new project"**
6. ⏳ Aguarde ~2 minutos (o Supabase vai provisionar o banco)

---

## ✅ **PASSO 2: Executar script SQL**

1. No dashboard do Supabase, clique em **"SQL Editor"** (menu lateral esquerdo, ícone `</>`)
2. Clique em **"New Query"**
3. Volte aqui no VS Code e abra o arquivo: **`supabase-setup.sql`** (está na raiz do projeto)
4. Copie **TODO** o conteúdo do arquivo (`Ctrl+A` → `Ctrl+C`)
5. Volte ao Supabase e cole no editor (`Ctrl+V`)
6. Clique em **"Run"** (botão verde inferior direito) ou pressione `Ctrl+Enter`
7. Você deve ver: ✅ **"Success. No rows returned"**

**✨ Pronto!** As tabelas `series` e `posts` foram criadas.

---

## ✅ **PASSO 3: Copiar suas credenciais**

1. No dashboard do Supabase, clique em **"Settings"** (⚙️ ícone no menu lateral)
2. Clique em **"API"** (submenu)
3. Você verá uma tela com várias informações. Copie:

### 📍 **Project URL** (no topo da página)
```
https://xyzabc123.supabase.co
```

### 🔓 **anon / public key** (na seção "Project API keys")
Clique no ícone de copiar ao lado de **"anon public"**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

### 🔒 **service_role key** (logo abaixo do anon)
Clique no ícone de copiar ao lado de **"service_role"**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

⚠️ **CUIDADO:** A chave `service_role` é SECRETA - nunca compartilhe!

---

## ✅ **PASSO 4: Configurar o arquivo .env.local**

1. **No VS Code**, clique no arquivo **`.env.local.example`** (está na raiz)
2. Pressione `Ctrl+Shift+P` e digite **"Duplicate"** (ou copie manualmente)
3. Salve o novo arquivo como **`.env.local`** (sem o `.example`)
4. Abra o arquivo **`.env.local`** e substitua pelos seus valores:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...COLE-SUA-CHAVE-ANON-AQUI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...COLE-SUA-CHAVE-SERVICE-AQUI...
```

5. **Salve** o arquivo (`Ctrl+S`)

---

## ✅ **PASSO 5: Migrar os dados existentes**

Execute este comando no terminal:

```powershell
npx tsx scripts/migrate-to-supabase.ts
```

Você verá:
```
🚀 Iniciando migração de _posts para Supabase...
📂 Lendo arquivos de _posts/...
   Encontrados X arquivos markdown
📖 Parseando posts...
   X posts válidos parseados
📦 Migrando séries para Supabase...
✅ Série migrada: 1 João
✅ Série migrada: Tiago
📄 Migrando posts para Supabase...
   ✅ Post migrado: 1joao-00-indice
   ✅ Post migrado: 1joao-01-capitulo-1
   ...
✅ Migração concluída com sucesso!
```

---

## ✅ **PASSO 6: Verificar se funcionou**

### Verificar no Supabase:
1. Volte ao dashboard do Supabase
2. Clique em **"Table Editor"** (menu lateral, ícone de tabela)
3. Selecione **"series"** - você deve ver 2 linhas (1 João e Tiago)
4. Selecione **"posts"** - você deve ver todos os capítulos

### Verificar no seu site:
1. No terminal, rode:
```powershell
npm run dev:clean
```

2. Abra o navegador em: http://localhost:3000
3. A página deve carregar normalmente (agora lendo do Supabase!)

---

## ✅ **PASSO 7: Testar o painel admin**

1. Abra: http://localhost:3000/admin
2. Você verá dois formulários:
   - **Criar Série**: Para adicionar uma nova série de estudos
   - **Criar Capítulo**: Para adicionar um novo capítulo a uma série existente

3. Teste criando um capítulo de exemplo:
   - **Série (slug prefix)**: `tiago`
   - **Slug do capítulo**: `tiago-05-teste`
   - **Título**: `Tiago | Capítulo 5: Teste`
   - **Resumo**: `Capítulo de teste`
   - **Conteúdo**: `# Teste\n\nEste é um teste.`
   - **Data**: `2025-12-21`
   - **URL da Capa**: `/assets/blog/estudos/tiago-cover.png`
   - **Nome do Autor**: `Guilherme Braga`
   - **Foto do Autor**: `/assets/blog/authors/jj.jpeg`

4. Clique em **"Salvar Capítulo"**
5. Volte para a home (`http://localhost:3000`) - o novo capítulo deve aparecer!

---

## 🎉 **PRONTO! Tudo configurado!**

Agora você pode:
- ✅ Criar séries e capítulos pelo painel admin
- ✅ Ver tudo funcionando em tempo real
- ✅ Dados salvos no Supabase (cloud)
- ✅ Sem mais edição manual de arquivos markdown!

---

## 🆘 **Algo deu errado?**

### Erro: "Env ausente: SUPABASE_URL"
→ O arquivo `.env.local` não está na raiz ou está com nome errado  
→ Reinicie o servidor após criar o `.env.local`

### Erro: "Invalid API key"
→ Você copiou a chave errada  
→ Certifique-se de copiar **anon** e **service_role** corretas

### Erro no script de migração
→ Verifique se instalou as dependências: `npm install --save-dev tsx dotenv`  
→ Verifique se o `.env.local` está correto

### Posts não aparecem no site
→ Limpe o cache: `npm run dev:clean`  
→ Verifique no Table Editor do Supabase se os dados estão lá

---

**Me avise quando terminar cada passo ou se encontrar algum erro!** 👍
