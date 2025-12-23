# 🎨 Guia Completo: Sistema de Temas

**Última atualização**: 23 de dezembro de 2025

## 📁 Arquivos do Sistema de Temas

### 1. **`src/app/globals.css`** ⚡ PRINCIPAL
Define as cores de fundo e texto para cada tema:
- **Dark mode**: `#0f1116` (preto/cinza escuro)
- **Darkblue mode**: `#0f1116` (mesmo preto do dark, diferença no glow do botão)
- **Light mode**: `#fafaf8` (branco creme)

### 2. **`src/app/_components/theme-switcher.tsx`**
Lógica de troca entre temas (light → dark → darkblue)

### 3. **`src/app/_components/switch.module.css`**
Estilos visuais do botão switcher (emoji e glow de cada tema)

### 4. **`src/lib/theme-constants.ts`**
Constantes de cores reutilizáveis (não afeta o background, apenas para componentes)

### 5. **`tailwind.config.ts`**
Paleta completa de cores do Tailwind (neutral, accent-blue, accent-purple)

---

## 🎨 Como Alterar Cores dos Temas

### **1. Cor de Fundo Principal**
📁 **Arquivo**: `src/app/globals.css`

```css
/* Light Mode - Cor de fundo branca/creme */
:root {
  --background-start-rgb: 250, 250, 249; /* Mude aqui */
}

/* Dark Mode - Cor de fundo preta */
html.dark,
html.dark body,
html.dark #__next,
html.dark .min-h-screen {
  background-color: #0f1116; /* ← MUDE AQUI */
  background-image: none;
  color: #e5e7eb; /* ← Cor do texto */
}

/* Darkblue Mode - Cor de fundo (agora igual ao dark) */
html.darkblue,
html.darkblue body,
html.darkblue #__next,
html.darkblue .min-h-screen {
  background-color: #0f1116; /* ← MUDE AQUI */
  background-image: none;
  color: #e5e7eb; /* ← Cor do texto */
}
```

---

### **2. Cor dos Cards (Série, Capítulos, etc)**
📁 **Arquivo**: `src/app/globals.css`

```css
/* Light Mode - Cards brancos */
.theme-card {
  background: #ffffff; /* ← Fundo do card */
  border-color: #e5e7eb; /* ← Borda */
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.25);
}

/* Dark Mode - Cards pretos */
.dark .theme-card {
  background: #0f1116; /* ← Fundo do card */
  border-color: #1f2937; /* ← Borda */
  box-shadow: 0 12px 36px -16px rgba(0, 0, 0, 0.6);
}

/* Darkblue Mode - Cards pretos */
.darkblue .theme-card {
  background: #0f1116; /* ← Fundo do card */
  border-color: #1f2937; /* ← Borda */
  box-shadow: 0 12px 36px -16px rgba(0, 0, 0, 0.6);
}
```

---

### **3. Botão Switcher (Emoji e Glow)**
📁 **Arquivo**: `src/app/_components/switch.module.css`

```css
/* Light Mode - Sol amarelo */
[data-mode="light"] .switch::after {
  content: "☀️";
}

[data-mode="light"] .switch {
  box-shadow: 0 0 50px 10px #fbbf24; /* ← Glow amarelo */
  background-color: #fbbf24; /* ← Fundo amarelo */
  border: 1px solid #f59e0b;
}

/* Dark Mode - Lua preta */
[data-mode="dark"] .switch::after {
  content: "🌑";
}

[data-mode="dark"] .switch {
  box-shadow: calc(var(--size) / 4) calc(var(--size) / -4) calc(var(--size) / 8) inset #fff;
  background: transparent;
  border: none;
}

/* Darkblue Mode - Lua azul */
[data-mode="darkblue"] .switch::after {
  content: "🌙";
}

[data-mode="darkblue"] .switch {
  box-shadow: 0 0 30px 5px #3b82f6; /* ← Glow azul */
  background-color: #1e40af; /* ← Fundo azul escuro */
  border: 1px solid #3b82f6;
}
```

---

### **4. Paleta Completa do Tailwind**
📁 **Arquivo**: `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      // Neutros (cinza/preto/branco)
      "neutral-50": "#fafaf8",  // ← Branco creme (light mode)
      "neutral-100": "#f3f0ed", // Creme claro
      "neutral-200": "#e8e3de", // Creme
      "neutral-300": "#d4ccc4", // Cinza chumbo claro
      "neutral-400": "#a89e92",
      "neutral-500": "#8b8178",
      "neutral-600": "#6b5f54",
      "neutral-700": "#4a3f38",
      "neutral-800": "#2d2622",
      "neutral-900": "#1a1410", // ← Preto (dark mode)

      // Acentos azuis (botões, links)
      "accent-blue": {
        50: "#eff7ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",  // ← Azul padrão
        600: "#2563eb",  // ← Azul escuro (usado em gradientes)
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      
      // Acentos roxos (gradientes)
      "accent-purple": {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",  // ← Roxo padrão (usado em gradientes)
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
      },
    }
  }
}
```

---

## 🎯 Resumo: Onde Mudar Cada Cor

| Elemento | Arquivo | Seção |
|----------|---------|-------|
| 🌍 **Fundo geral (light/dark/darkblue)** | `globals.css` | `html.dark { background-color: ... }` |
| 🃏 **Cards (séries, capítulos)** | `globals.css` | `.theme-card { background: ... }` |
| 🔘 **Botão switcher (emoji/glow)** | `switch.module.css` | `[data-mode="..."] .switch { ... }` |
| 🎨 **Paleta Tailwind (componentes)** | `tailwind.config.ts` | `theme.extend.colors { ... }` |

---

## 🔄 Como Funciona a Troca de Temas

### Lógica (theme-switcher.tsx)
1. **Ordem de ciclo**: light → dark → darkblue → light
2. **Storage**: Tema salvo em `localStorage` com chave `"nextjs-blog-starter-theme"`
3. **Classes aplicadas**:
   - Light: nenhuma classe
   - Dark: `<html class="dark">`
   - Darkblue: `<html class="dark darkblue">`

### NoFOUC Script
- Executa **antes do render** para evitar flash de tema errado
- Lê localStorage e aplica classe `dark` ou `darkblue` imediatamente
- Injected em `layout.tsx` via `dangerouslySetInnerHTML`

---

## 🎨 Cores Atuais

### Light Mode
- Fundo: `#fafaf8` (branco creme)
- Texto: `#1a1410` (preto)
- Cards: `#ffffff` (branco puro)

### Dark Mode
- Fundo: `#0f1116` (preto/cinza escuro)
- Texto: `#e5e7eb` (cinza claro)
- Cards: `#0f1116` (mesmo preto do fundo)

### Darkblue Mode
- Fundo: `#0f1116` (mesmo preto do dark)
- Texto: `#e5e7eb` (cinza claro)
- Cards: `#0f1116` (mesmo preto)
- **Diferença**: Glow azul no botão switcher

---

## 🛠️ Exemplo: Como Adicionar um Novo Tema

### 1. Adicionar ao theme-switcher.tsx
```typescript
const modes = ["light", "dark", "darkblue", "novotema"] as const;
```

### 2. Adicionar estilos em globals.css
```css
html.novotema,
html.novotema body,
html.novotema #__next,
html.novotema .min-h-screen {
  background-color: #sua-cor-aqui;
  background-image: none;
  color: #cor-texto;
}

.novotema .theme-card {
  background: #cor-card;
  border-color: #cor-borda;
}
```

### 3. Adicionar botão em switch.module.css
```css
[data-mode="novotema"] .switch::after {
  content: "🎨";
}

[data-mode="novotema"] .switch {
  box-shadow: 0 0 30px 5px #cor-glow;
  background-color: #cor-fundo;
}
```

---

## ⚠️ Problemas Comuns

### 1. **Tema não muda ao clicar no botão**
- Verificar se `theme-switcher.tsx` está importado corretamente
- Verificar se `NoFOUCScript` está em `layout.tsx`

### 2. **Flash de tema errado ao recarregar**
- Verificar se `suppressHydrationWarning` está em `<html>` e `<body>`
- Verificar se `NoFOUCScript` está sendo injetado antes do render

### 3. **Cores não aplicam em modo dark**
- Verificar se `darkMode: "class"` está em `tailwind.config.ts`
- Verificar se classes `dark:` estão sendo usadas nos componentes

### 4. **Linha estranha no topo (gradiente)**
- Adicionar `background-image: none` em todos os elementos do tema
- Remover `@apply` classes que podem adicionar gradientes

---

## 📝 Notas Importantes

1. **Sempre use `background-image: none`** ao definir cores sólidas de fundo
2. **Darkblue aplica DUAS classes**: `dark` + `darkblue` (para Tailwind `dark:` variants)
3. **Ordem de ciclo importa**: Alterar em `theme-switcher.tsx` linha `const modes = [...]`
4. **FOUC Prevention**: `NoFOUCScript` é crítico - não remover de `layout.tsx`
5. **Cards precisam `.theme-card`**: Adicionar classe em todos os componentes de card

---

## 🔗 Arquivos Relacionados

- `src/app/layout.tsx` - Injeta NoFOUCScript
- `src/app/page.tsx` - Usa `suppressHydrationWarning`
- `src/app/_components/header.tsx` - Contém o theme switcher
- `src/app/_components/series-card.tsx` - Usa `.theme-card`
- `src/app/_components/latest-chapter-card.tsx` - Usa `.theme-card`
- `src/app/_components/hero-bento.tsx` - Usa `.theme-card`
