---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# Guia de Estilo: Padrões de Cores Clean (Light & Dark)

Este documento define a paleta de cores para interfaces minimalistas de alto padrão, focadas em contraste equilibrado e legibilidade.

---

## 1. Clean Light Mode
Ideal para interfaces que buscam clareza, frescor e uma estética de "galeria de arte".

| Elemento | Hex | Aplicação |
| :--- | :--- | :--- |
| **Background (Página)** | `#FBFBFB` | Fundo principal da aplicação. |
| **Surface (Cards/Containers)** | `#FFFFFF` | Áreas de conteúdo que precisam de destaque. |
| **Texto Primário** | `#1A1A1A` | Títulos e corpo de texto principal. |
| **Texto Secundário** | `#666666` | Legendas e textos de apoio. |
| **Destaque (Accent)** | `#000000` | Botões primários e ícones ativos. |
| **Bordas / Divisores** | `#E5E5E5` | Linhas de separação sutis. |

---

## 2. Clean Dark Mode
Uma versão moderna que reduz o cansaço visual, trocando o preto absoluto por tons de grafite profundo.

| Elemento | Hex | Aplicação |
| :--- | :--- | :--- |
| **Background (Página)** | `#0D0D0D` | Fundo principal da aplicação. |
| **Surface (Cards/Containers)** | `#1A1A1A` | Superfícies que "flutuam" sobre o fundo. |
| **Texto Primário** | `#F2F2F2` | Títulos e corpo de texto principal. |
| **Texto Secundário** | `#A0A0A0` | Descrições e elementos desativados. |
| **Destaque (Accent)** | `#FFFFFF` | Elementos de ação e estados de foco. |
| **Bordas / Divisores** | `#262626` | Delimitadores de seção no modo escuro. |

---

## 3. Implementação via Variáveis CSS

Copie o código abaixo para o seu arquivo de estilos global:

```css
:root {
  /* Configuração Light Mode (Default) */
  --bg-page: #FBFBFB;
  --bg-card: #FFFFFF;
  --text-main: #1A1A1A;
  --text-alt: #666666;
  --accent: #000000;
  --border: #E5E5E5;
}

[data-theme='dark'] {
  /* Configuração Dark Mode */
  --bg-page: #0D0D0D;
  --bg-card: #1A1A1A;
  --text-main: #F2F2F2;
  --text-alt: #A0A0A0;
  --accent: #FFFFFF;
  --border: #262626;
}