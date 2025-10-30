# 📊 FinBoard - Dashboard Financeiro Inteligente

Dashboard financeiro moderno e responsivo desenvolvido com React, TypeScript, Tailwind CSS e Recharts. Permite análise completa de transações com filtros dinâmicos, visualizações interativas e design system profissional.

![FinBoard Dashboard](https://img.shields.io/badge/Status-Produção-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Características Principais

### 🎨 Design & UX
- ✅ **Dark Mode** - Alternância suave entre temas claro e escuro
- ✅ **Design Responsivo** - Otimizado para mobile, tablet e desktop
- ✅ **Animações Fluidas** - Microinterações e transições elegantes
- ✅ **Acessibilidade** - ARIA labels e navegação por teclado

### 📈 Funcionalidades
- ✅ **Cards Resumo** - Saldo, receitas, despesas e pendentes com tendências
- ✅ **Gráficos Interativos**
  - Gráfico de área com evolução diária do saldo
  - Gráfico de barras empilhadas (receitas vs despesas mensais)
- ✅ **Filtros Dinâmicos**
  - Por data (período específico)
  - Por contas (múltipla seleção)
  - Por indústrias (múltipla seleção)
  - Por estados (múltipla seleção)
  - Persistência de filtros no localStorage
- ✅ **Tabela de Transações**
  - Busca em tempo real
  - Ordenação por colunas
  - Paginação (10 itens por página)
  - Exportação para CSV
- ✅ **Autenticação**
  - Página de login com validação
  - Rotas protegidas
  - Persistência de sessão

### 🔒 Segurança & Performance
- ✅ **Rotas Protegidas** - Dashboard acessível apenas após login
- ✅ **Estado Global** - Gerenciamento com Zustand
- ✅ **Performance** - Memoização e lazy loading
- ✅ **SEO Otimizado** - Meta tags e React Helmet

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd innodev-finboard
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Adicione o arquivo de dados**
   - Coloque o arquivo `transactions.json` na pasta `public/data/`
   - O caminho deve ser: `public/data/transactions.json`

4. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da Build

```bash
npm run preview
# ou
yarn preview
```

## 📁 Estrutura do Projeto

```
innodev-finboard/
├── public/
│   ├── data/
│   │   └── transactions.json    # Arquivo de dados (não versionado)
│   ├── favicon.svg
│   └── og-cover.png
├── src/
│   ├── componenents/
│   │   ├── charts/
│   │   │   ├── LineVolume.tsx        # Gráfico de linha/área
│   │   │   └── StackedBars.tsx       # Gráfico de barras empilhadas
│   │   ├── common/
│   │   │   └── ThemeToggle.tsx       # Toggle dark/light mode
│   │   ├── dashboard/
│   │   │   ├── FiltersBar.tsx        # Filtros dinâmicos
│   │   │   ├── SummaryCards.tsx      # Cards de resumo
│   │   │   └── TransactionsTable.tsx # Tabela com paginação
│   │   └── layout/
│   │       ├── AppShell.tsx          # Layout principal
│   │       └── Sidebar.tsx           # Menu lateral
│   ├── hooks/
│   │   ├── useDarkMode.ts           # Hook para dark mode
│   │   ├── useLocalStorage.ts       # Hook para localStorage
│   │   └── useTransactions.ts       # Hook para carregar/filtrar dados
│   ├── pages/
│   │   ├── Dashboard.tsx            # Página principal
│   │   ├── Login.tsx                # Página de autenticação
│   │   └── NotFound.tsx             # Página 404
│   ├── router/
│   │   └── ProtectedRoute.tsx       # HOC para rotas protegidas
│   ├── store/
│   │   ├── authStore.ts             # Store de autenticação (Zustand)
│   │   └── filterStore.ts           # Store de filtros (Zustand)
│   ├── types/
│   │   └── index.ts                 # Tipos TypeScript
│   ├── utils/
│   │   ├── currency.ts              # Formatação de moeda
│   │   ├── dates.ts                 # Manipulação de datas
│   │   └── parse.ts                 # Parse de valores
│   ├── App.tsx                      # Componente raiz com rotas
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Estilos globais + Tailwind
├── index.html
├── package.json
├── tailwind.config.js               # Configuração Tailwind
├── tsconfig.json
├── vite.config.ts                   # Configuração Vite
└── README.md
```

## 🎯 Uso do Dashboard

### Login
- Acesse `/login`
- Digite qualquer e-mail e senha (autenticação fake para demonstração)
- Você será redirecionado para o dashboard

### Filtros
1. **Desktop**: Os filtros aparecem em cards acima do dashboard
2. **Mobile**: Clique no botão "Filtros" para abrir o modal
3. **Múltipla Seleção**: Use Ctrl/Cmd + clique para selecionar múltiplos itens
4. **Limpar**: Clique em "Limpar Filtros" para resetar

### Tabela
- **Busca**: Digite no campo de busca para filtrar em tempo real
- **Ordenação**: Clique nos cabeçalhos das colunas para ordenar
- **Exportar**: Clique em "Exportar CSV" para baixar os dados filtrados
- **Paginação**: Navegue entre as páginas com as setas

### Dark Mode
- Clique no botão de lua/sol na sidebar (desktop) ou no cabeçalho (mobile)
- A preferência é salva no localStorage

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.2** - Biblioteca UI
- **TypeScript 5.9** - Tipagem estática
- **Vite 7.1** - Build tool ultra-rápido
- **React Router 7.9** - Roteamento

### UI & Styling
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Lucide React** - Ícones modernos
- **Recharts 3.3** - Gráficos interativos

### Estado & Dados
- **Zustand 5.0** - Gerenciamento de estado global
- **date-fns 4.1** - Manipulação de datas

### SEO & Meta
- **React Helmet Async** - Gerenciamento de meta tags

## 📊 Estrutura de Dados

O arquivo `transactions.json` deve conter um array de objetos com a seguinte estrutura:

```typescript
{
  "date": number,              // EPOCH em milissegundos
  "amount": string,            // Valor sem decimais ("5565" = R$ 55,65)
  "transaction_type": string,  // "deposit" ou "withdraw"
  "currency": string,          // "BRL", "USD", etc.
  "account": string,           // Nome da empresa
  "industry": string,          // Categoria da indústria
  "state": string             // Sigla do estado (SP, RJ, etc.)
}
```

## 🎨 Design System

### Cores
- **Primary**: Blue (#3b82f6) → Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)

### Tipografia
- **Font**: Inter, system-ui
- **Sizes**: 0.875rem → 3rem (14px → 48px)

### Espaçamento
- Grid gap: 1rem (16px)
- Card padding: 1.5rem (24px)
- Border radius: 1rem (16px)

## 🔄 Fluxo de Dados

```
1. Usuario acessa /login
2. Login fake (qualquer credencial)
3. Token armazenado no Zustand + localStorage
4. Redirecionamento para /
5. ProtectedRoute verifica token
6. Dashboard carrega transactions.json
7. Filtros aplicados em useTransactions
8. Dados renderizados nos componentes
```

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Menu lateral → Menu hambúrguer no mobile
- Filtros em grid → Modal no mobile
- Tabela com scroll horizontal
- Cards empilhados verticalmente

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Adicione o arquivo `transactions.json` em `public/data/`
5. Deploy!

### Outras Plataformas
- **Netlify**: Mesmas configurações da Vercel
- **GitHub Pages**: Requer configuração de base path

## 📝 Observações Importantes

### ⚠️ Limitações Atuais
- Autenticação é fake (apenas demonstração)
- Não há backend real
- Dados carregados do JSON estático
- Transações "pendentes" são calculadas como valores < R$ 10

### 🎯 Possíveis Melhorias Futuras
- [ ] Integração com API real
- [ ] Autenticação JWT
- [ ] Mais tipos de gráficos (pizza, rosca)
- [ ] Filtros salvos
- [ ] Comparação de períodos
- [ ] Exportação em PDF
- [ ] Modo de impressão otimizado
- [ ] Testes unitários e E2E
- [ ] PWA (Progressive Web App)

## 👨‍💻 Desenvolvido por

**Joane Alves Ribeiro**
- Frontend Developer
- Stack: React + TypeScript + Tailwind CSS
- Email: joanealves2011@gmail.com

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para a Innodev.

---

## 🙏 Agradecimentos

Obrigada pela oportunidade de demonstrar minhas habilidades! Este projeto foi desenvolvido com atenção aos detalhes, seguindo as melhores práticas de desenvolvimento frontend moderno.

**Espero que gostem! 🚀**