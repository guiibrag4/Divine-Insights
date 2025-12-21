# 🚀 Configuração do Supabase - Guia Passo a Passo

Este guia te ajudará a configurar o Supabase para o sistema de CMS do Divine Insights.

---

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com) (gratuita)
- Node.js 22+ instalado
- Projeto Divine Insights clonado

---

## 🔧 Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `divine-insights` (ou nome de sua escolha)
   - **Database Password**: Escolha uma senha forte (você não precisará dela diretamente)
   - **Region**: Escolha a região mais próxima (ex: South America - São Paulo)
4. Clique em **"Create new project"**
5. Aguarde 1-2 minutos até o projeto ser provisionado

---

## 🗄️ Passo 2: Executar Script SQL

1. No dashboard do Supabase, vá em **SQL Editor** (menu lateral esquerdo)
2. Clique em **"New Query"**
3. Abra o arquivo `supabase-setup.sql` na raiz do projeto
4. **Copie todo o conteúdo** do arquivo
5. **Cole** no editor SQL do Supabase
6. Clique em **"Run"** (ou pressione `Ctrl+Enter`)
7. Você deve ver: ✅ **"Success. No rows returned"**

Isso criará:
- Tabela `series` (séries de estudos)
- Tabela `posts` (capítulos)
- Índices para performance
- Policies de segurança (RLS)
- Triggers automáticos

---

## 🔑 Passo 3: Copiar Credenciais do Supabase

1. No dashboard, vá em **Settings** > **API** (menu lateral)
2. Você verá uma seção **"Project API keys"**
3. Copie as seguintes chaves:

### 🌐 Project URL
```
https://xyzabc123.supabase.co
```
(Está na parte superior da página)

### 🔓 anon / public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```
(Esta é a chave **anon** - é segura para uso público)

### 🔒 service_role key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```
(Esta é a chave **service_role** - ⚠️ NUNCA compartilhe ou exponha no frontend!)

---

## 📝 Passo 4: Configurar Variáveis de Ambiente

1. **No projeto Divine Insights**, copie o arquivo de exemplo:

```powershell
Copy-Item .env.local.example .env.local
```

2. **Abra** o arquivo `.env.local` criado

3. **Substitua** os valores de exemplo pelas suas credenciais:

```env
SUPABASE_URL=https://SEU-PROJETO-AQUI.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...SUA-CHAVE-ANON-AQUI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...SUA-CHAVE-SERVICE-AQUI...
```

4. **Salve** o arquivo

5. ⚠️ **IMPORTANTE**: O arquivo `.env.local` já está no `.gitignore` - nunca commite ele!

---

## 🧪 Passo 5: Testar Conexão

1. Reinicie o servidor de desenvolvimento:

```powershell
npm run dev:clean
```

2. Abra o navegador em `http://localhost:3000`

3. A página deve carregar normalmente (ainda mostrando dados de `_posts` como fallback)

4. Para testar a conexão com Supabase, abra o terminal do Node e verifique os logs:
   - Se houver erro de conexão, você verá mensagens de "Erro ao buscar..."
   - Se não houver erros, a conexão está OK (mesmo sem dados ainda)

---

## 📦 Passo 6: Migrar Dados Existentes (Opcional)

Agora você tem duas opções:

### Opção A: Usar o Painel Admin para adicionar manualmente
1. Acesse `http://localhost:3000/admin`
2. Preencha os formulários de série e capítulos
3. Vantagem: você controla exatamente o que vai
4. Desvantagem: trabalhoso para muitos capítulos

### Opção B: Rodar script de migração automática
1. Execute o script de migração (vou criar a seguir)
2. Todos os posts de `_posts` serão importados automaticamente
3. Vantagem: rápido
4. Desvantagem: precisa revisar os dados depois

**Qual opção você prefere?** (Vou criar o script de migração se quiser a opção B)

---

## 📊 Passo 7: Verificar no Supabase

1. Volte ao dashboard do Supabase
2. Vá em **Table Editor** (menu lateral)
3. Selecione a tabela **series** - você deve ver as séries criadas
4. Selecione a tabela **posts** - você deve ver os capítulos

---

## 🎨 Passo 8: Configurar Storage (Imagens) - OPCIONAL

Se quiser hospedar as imagens no Supabase em vez de `/public`:

1. No dashboard, vá em **Storage** (menu lateral)
2. Clique em **"Create a new bucket"**
3. Nome: `estudos`
4. **Public bucket**: Marque como **ON** (público)
5. Clique em **"Create bucket"**
6. Organize as pastas: `estudos/series/{slug}/cover.png`, etc.
7. Atualize os caminhos no painel admin para URLs do Supabase

---

## ✅ Checklist Final

- [ ] Projeto Supabase criado
- [ ] Script SQL executado com sucesso
- [ ] Credenciais copiadas
- [ ] Arquivo `.env.local` configurado
- [ ] Servidor rodando sem erros
- [ ] Dados migrados (manual ou automático)
- [ ] Tabelas visíveis no Table Editor

---

## 🆘 Problemas Comuns

### Erro: "Env ausente: SUPABASE_URL"
- Verifique se o arquivo `.env.local` está na **raiz do projeto**
- Reinicie o servidor após criar/editar `.env.local`

### Erro: "Invalid API key"
- Verifique se copiou as chaves corretas (anon e service_role)
- As chaves são diferentes - não troque uma pela outra

### Erro: "relation 'series' does not exist"
- O script SQL não foi executado
- Volte ao SQL Editor e execute `supabase-setup.sql` novamente

### Build falha com erro de tipo
- Execute `npm run build` para verificar erros de TypeScript
- Veja os logs e me avise se precisar de ajuda

---

## 🚀 Próximos Passos

Depois de configurar tudo:

1. Acesse `/admin` para criar séries e capítulos
2. Teste a navegação entre capítulos
3. Faça deploy na Vercel e adicione as env vars lá também
4. (Opcional) Configure autenticação para proteger o `/admin`

---

## 📞 Precisa de Ajuda?

Se encontrar qualquer problema durante o setup, me avise com:
- Mensagem de erro completa
- Passo onde travou
- Screenshot se possível

Vou te ajudar a resolver! 🙏
