# ReCampus

## Marketplace Universitário

O **ReCampus** é uma plataforma de marketplace desenvolvida para facilitar a compra, venda e doação de produtos entre estudantes universitários.

A proposta é criar um ambiente seguro e organizado onde alunos possam anunciar materiais, livros, eletrônicos, móveis e outros itens relacionados à vida acadêmica.

# Funcionalidades

## Usuários

* Cadastro de usuários
* Login com autenticação JWT
* Perfil do usuário
* Logout
* Controle de acesso por autenticação

##  Anúncios

* Criar anúncios
* Editar anúncios próprios
* Excluir anúncios próprios
* Visualizar detalhes de anúncios
* Listagem de anúncios
* Busca por anúncios
* Filtros por categoria
* Suporte para produtos à venda ou doação

##  Imagens

* Upload de imagens dos anúncios
* Armazenamento utilizando Supabase Storage
* Exibição das imagens diretamente nos anúncios

##  Progressive Web App (PWA)

O ReCampus possui suporte a PWA, permitindo:

* Instalação em dispositivos móveis
* Execução como aplicativo
* Experiência semelhante a um aplicativo nativo

#  Tecnologias utilizadas

## Frontend   https://marketplace-vortex-one.vercel.app/

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Axios

## Backend  https://marketplace-vortex-z6g4.onrender.com

* Node.js
* Express
* TypeScript
* Prisma ORM
* JWT
* Multer


## Banco de dados e armazenamento

* PostgreSQL
* Supabase Database
* Supabase Storage



#  Arquitetura do projeto

```
ReCampus

    frontend
        src
         components
         pages
         services
         contexts
         types

     backend
        src
         controllers
         routes
         services
         middlewares
         config
```

#  Como executar o projeto

## Pré-requisitos

Antes de iniciar, tenha instalado:

* Node.js
* PostgreSQL e acesso ao Supabase
* Git


# Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL=sua_connection_string
JWT_SECRET=sua_chave_secreta

SUPABASE_URL=sua_url
SUPABASE_SERVICE_KEY=sua_chave
```

Execute as migrações:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

# Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite.


#  Autenticação

O sistema utiliza autenticação baseada em JWT.

Fluxo:

```
Usuário
   ↓
Login
   ↓
Backend valida dados
   ↓
Token JWT
   ↓
Frontend salva token
   ↓
Acesso às rotas protegidas
```

#  Demonstração

## Tela inicial

Marketplace com anúncios disponíveis.

## Cadastro e login

Usuários podem criar uma conta e acessar funcionalidades privadas.

## Criação de anúncio

Usuários podem publicar produtos com imagens e informações detalhadas.

## Gerenciamento

Usuários podem editar e remover seus próprios anúncios.

#  Objetivo do projeto

O ReCampus tem como objetivo aplicar conhecimentos de desenvolvimento Full Stack, integrando:

* Desenvolvimento frontend moderno;
* Construção de APIs REST;
* Banco de dados relacional;
* Autenticação;
* Upload de arquivos;
* Desenvolvimento de aplicações instaláveis com PWA.


#  Melhorias futuras

Algumas funcionalidades planejadas:

* Sistema de favoritos
* Chat entre usuários
* Avaliação de vendedores
* Notificações
* Dashboard administrativo
* Recomendações inteligentes utilizando IA


#  Desenvolvimento

Projeto desenvolvido como aplicação Full Stack utilizando tecnologias modernas de desenvolvimento web.

# Licença

Este projeto foi desenvolvido para fins acadêmicos e de estudo.

