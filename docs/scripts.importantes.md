### Se voltar a travar o carregamento do site
Esse script a seguir `dev:clean` mata processos node, remove cache .next, libera execução no PowerShell e inicia npm run dev.
- Arquivo: package.json

```
cd c:\Users\Guilherme\Desktop\vercel\divine-insights
npm run dev:clean
```

### Correção de dados
npx tsx scripts/fix-series-counts.ts