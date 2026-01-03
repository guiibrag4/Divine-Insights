# 🔄 Configuração do Webhook Supabase → GitHub Actions

Este documento explica como configurar o webhook do Supabase para disparar o GitHub Actions automaticamente quando um post ou série for criado/atualizado.

---

## 📋 **Resumo do Fluxo**

```
Admin UI → Supabase → Webhook → GitHub Actions → Gera .md → Commit → Vercel Deploy
   [3s]      [1s]       [5s]        [20s]         [10s]     [5s]     [30s]
                                                                    
Total: ~1 minuto para post estar ao vivo ✨
```

---

## 🔧 **Passo 1: Criar Personal Access Token no GitHub**

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Configurações:
   - **Note**: `Supabase Webhook - Divine Insights`
   - **Expiration**: `No expiration` (ou 1 year)
   - **Scopes**: Marque apenas:
     - ✅ `repo` (Full control of private repositories)
4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (você não verá novamente!)

---

## 🗃️ **Passo 2: Criar Database Function no Supabase**

1. Acesse o **SQL Editor** no dashboard do Supabase
2. Execute o seguinte SQL:

```sql
-- Função para disparar webhook quando post for inserido/atualizado
CREATE OR REPLACE FUNCTION notify_github_post_change()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://api.github.com/repos/SEU_USUARIO/Divine-Insights/dispatches';
  github_token TEXT := 'SEU_GITHUB_TOKEN_AQUI';
  event_type TEXT;
BEGIN
  -- Define o tipo de evento
  IF TG_OP = 'INSERT' THEN
    event_type := 'supabase-post-created';
  ELSE
    event_type := 'supabase-post-updated';
  END IF;

  -- Faz requisição HTTP para o GitHub
  PERFORM net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || github_token,
      'Accept', 'application/vnd.github+json',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'event_type', event_type,
      'client_payload', jsonb_build_object(
        'series_slug', NEW.series_slug,
        'slug', NEW.slug,
        'title', NEW.title
      )
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para posts
DROP TRIGGER IF EXISTS post_change_trigger ON posts;
CREATE TRIGGER post_change_trigger
AFTER INSERT OR UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION notify_github_post_change();

-- Função para séries
CREATE OR REPLACE FUNCTION notify_github_series_change()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://api.github.com/repos/SEU_USUARIO/Divine-Insights/dispatches';
  github_token TEXT := 'SEU_GITHUB_TOKEN_AQUI';
BEGIN
  PERFORM net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || github_token,
      'Accept', 'application/vnd.github+json',
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'event_type', 'supabase-series-created',
      'client_payload', jsonb_build_object(
        'slug_prefix', NEW.slug_prefix,
        'title', NEW.title
      )
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para séries
DROP TRIGGER IF EXISTS series_change_trigger ON series;
CREATE TRIGGER series_change_trigger
AFTER INSERT OR UPDATE ON series
FOR EACH ROW
EXECUTE FUNCTION notify_github_series_change();
```

**⚠️ IMPORTANTE**: Substitua:
- `SEU_USUARIO` pelo seu usuário do GitHub
- `SEU_GITHUB_TOKEN_AQUI` pelo token gerado no Passo 1

---

## 🔐 **Passo 3: Configurar Secrets no GitHub**

1. Acesse: `https://github.com/SEU_USUARIO/Divine-Insights/settings/secrets/actions`
2. Adicione os seguintes secrets:

| Nome | Valor |
|------|-------|
| `SUPABASE_URL` | Sua URL do Supabase (ex: `https://xxx.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role Key do Supabase (Dashboard > Settings > API) |

**Nota**: `GITHUB_TOKEN` já existe automaticamente (não precisa criar).

---

## ✅ **Passo 4: Testar o Webhook**

1. Acesse `/admin` no seu site em produção
2. Crie um novo post de teste
3. Acompanhe:
   - **Supabase Logs**: Database > Logs (deve mostrar HTTP POST)
   - **GitHub Actions**: Actions tab (deve iniciar workflow automaticamente)
   - **Vercel**: Deve iniciar deploy após commit

---

## 🔍 **Troubleshooting**

### Webhook não está disparando?
1. Verifique se habilitou `pg_net` extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_net;
   ```
2. Confira logs no Supabase: `Database > Logs > postgres`

### GitHub Actions não inicia?
- Verifique se o token tem permissão `repo`
- Confira se a URL está correta (seu usuário e nome do repo)

### Commit não aparece?
- Verifique se há mudanças reais nos arquivos
- Olhe logs no Actions: "Check for changes"

---

## 🚀 **Alternativa: Execução Manual**

Se o webhook não funcionar, você pode executar manualmente:

1. Acesse: `https://github.com/SEU_USUARIO/Divine-Insights/actions`
2. Clique em **"Sync Supabase to Markdown"**
3. Clique em **"Run workflow"**
4. Aguarde ~30 segundos

**Ou execute a cada 15 minutos automaticamente** (já configurado no workflow via `schedule`).

---

## 📊 **Monitoramento**

Acompanhe os deploys em:
- **GitHub**: https://github.com/SEU_USUARIO/Divine-Insights/actions
- **Vercel**: https://vercel.com/seu-usuario/divine-insights/deployments

Tempo médio total: **~1 minuto** do clique em "Salvar" até o post estar ao vivo! 🎉
