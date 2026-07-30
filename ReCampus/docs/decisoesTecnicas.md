# Decisões Técnicas

## Objetivo

Este documento descreve as principais decisões técnicas adotadas durante o desenvolvimento do ReCampus e os motivos que levaram à escolha de cada tecnologia e abordagem

# Arquitetura da Aplicação

O projeto foi dividido em duas aplicações:

* Frontend
* Backend

Essa separação facilita a organização do código, a manutenção da aplicação e permite que cada camada evolua de forma independente

# Frontend

Foi utilizado **React** com **TypeScript**.

### Motivos da escolha

* desenvolvimento baseado em componentes reutilizáveis
* grande comunidade e documentação
* facilidade de integração com APIs REST
* melhor organização do projeto utilizando TypeScript

# Backend

Foi utilizado **Node.js** com **Express**

### Motivos da escolha

* criação rápida de APIs REST
* simplicidade na definição de rotas
* ampla utilização no mercado
* boa integração com Prisma ORM

# Banco de Dados

Foi utilizado **PostgreSQL**

### Motivos da escolha

* banco de dados relacional robusto
* suporte a relacionamentos entre tabelas
* excelente integração com Prisma
* facilidade de hospedagem em serviços na nuvem

# ORM

Foi utilizado **Prisma ORM**

### Motivos da escolha

* geração automática de consultas
* tipagem com TypeScript
* facilidade para modelagem do banco
* redução da escrita de SQL manual

# Upload de Imagens

Foi utilizado o **Supabase Storage**.

### Motivos da escolha

* armazenamento em nuvem
* geração de URLs públicas
* integração simples com aplicações Node.js
* facilidade para substituir imagens futuramente

# Autenticação

Foi utilizada autenticação baseada em **JSON Web Token (JWT)**

### Motivos da escolha

* autenticação sem estado (stateless)
* amplamente utilizada em APIs REST
* facilidade de integração com o frontend
* proteção das rotas privadas

# Interface

Foi utilizado **Tailwind CSS**

### Motivos da escolha

* desenvolvimento rápido da interface
* classes utilitárias
* facilidade para criar layouts responsivos
* redução da quantidade de CSS personalizado

# Comunicação entre Frontend e Backend

Foi utilizada a biblioteca **Axios**

### Motivos da escolha

* simplifica requisições HTTP
* tratamento de erros mais organizado
* configuração centralizada da API


# Progressive Web App

O frontend foi configurado como **PWA** utilizando **Vite Plugin PWA**

### Motivos da escolha

* instalação da aplicação no dispositivo
* experiência semelhante a um aplicativo nativo
* atendimento aos requisitos do desafio técnico

# Organização do Projeto

O frontend foi organizado em:

* components
* pages
* contexts
* hooks
* services
* types

O backend foi organizado em:

* controllers
* routes
* middlewares
* services
* prisma
* config

Essa organização facilita a separação de responsabilidades e torna o projeto mais escalável

# Principais Desafios Técnicos

Durante o desenvolvimento foram enfrentados alguns desafios, entre eles:

* configuração do Prisma ORM
* integração entre PostgreSQL e Supabase
* upload de imagens
* configuração do Progressive Web App
* gerenciamento das rotas do React Router
* resolução de erros de TypeScript

Esses desafios foram solucionados por meio de testes, consultas à documentação oficial das tecnologias e utilização consciente de ferramentas de Inteligência Artificial

# Considerações Finais

As tecnologias escolhidas permitiram desenvolver uma aplicação moderna, organizada e compatível com os requisitos do desafio proposto
As decisões técnicas buscaram equilibrar facilidade de desenvolvimento, boas práticas de engenharia de software e possibilidade de evolução futura do projeto
