1. Estrutura Geral do Projeto
O projeto é dividido em duas aplicações principais:

backend
API responsável pelas regras de negócio,
autenticação, banco de dados e arquivos

frontend
Interface responsável pela interação
do usuário com o sistema

2. Backend

O backend foi desenvolvido utilizando Node.js com TypeScript e Express
Ele é responsável por:
Criar a API REST
Controlar usuários
Autenticar usuários
Gerenciar anúncios
Fazer comunicação com o banco
Realizar upload de imagens

Estrutura:

backend

     src

     controllers
     routes
     middlewares
     services
     config
     validations
     server.ts

    prisma
    schema.prisma
3. Arquivo server.ts
Local:
src/server.ts

Responsável por iniciar o servidor da aplicação.

Funções:

Criar a aplicação Express;
Configurar middlewares;
Registrar rotas;
Definir a porta do servidor.

Fluxo:

server.ts
    ↓
Express
    ↓
Routes
    ↓
Controllers
    ↓

Banco de dados
4. Configuração do Prisma
Local:

src/config/prisma.ts

Responsável pela conexão com o banco de dados através do Prisma ORM.

O Prisma é utilizado para:

Criar consultas
Inserir dados
Atualizar registros
Excluir informações

Exemplo de utilização:

prisma.user.findMany()

Busca usuários cadastrados.

5. Banco de Dados
Arquivo:

prisma/schema.prisma

Define as tabelas e relacionamentos do sistema.

Model User

Representa os usuários cadastrados.

Responsável por armazenar:

Identificação
Nome
Email
Senha
Relacionamento com anúncios

Relacionamento:

User

Ads

Um usuário pode possuir vários anúncios.

Model Ad

Representa os anúncios cadastrados.

Armazena:

Nome do produto
Descrição
Categoria
Preço
Localização
Imagem
Usuário proprietário

6. Controllers

Local:

src/controllers

Os controllers recebem as requisições da API e executam as ações necessárias.

Eles fazem a ligação entre:

Request
 ↓
Controller
 ↓
Service / Prisma
 ↓
Response

7. AuthController
Arquivo:

controllers/AuthController.ts

Responsável pela autenticação dos usuários.

Possui funções como:

register()

Responsável pelo cadastro.

Fluxo:
Usuário envia dados
↓
Validação
↓
Senha criptografada
↓
Usuário salvo no banco
↓
Resposta enviada

login()
Responsável pelo acesso do usuário.

Fluxo:
Email e senha
↓
Verificação no banco
↓
Criação do JWT
↓
Token enviado ao usuário

8. AdController

Arquivo:

controllers/AdController.ts

Responsável pelo gerenciamento dos anúncios.

Principais funções:

create()

Cria um novo anúncio.

Processo:
Recebe dados
↓
Valida informações
↓
Recebe imagem
↓
Envia imagem para Storage
↓
Salva anúncio no banco

list()

Lista anúncios disponíveis.

Responsável por:

Buscar anúncios
Retornar informações dos usuários
Aplicar filtros
Organizar resultados.

findById()

Busca um anúncio específico.

Exemplo:

GET /ads/123

Retorna somente o anúncio solicitado

update()

Atualiza informações de um anúncio existente

Permite alterar:

Título
Descrição
Categoria
Preço
Imagem
delete()

Remove um anúncio.

Processo:
Recebe ID
↓
Verifica proprietário
↓
Remove imagem
↓
Remove anúncio do banco

9. Rotas da API
Local:

src/routes

As rotas definem os endereços disponíveis da aplicação.

Rotas de autenticação

Arquivo:

auth.routes.ts
Cadastro
POST /auth/register

Cria um usuário.

Login
POST /auth/login

Realiza autenticação.

Rotas de anúncios

Arquivo:

ad.routes.ts
Listar anúncios
GET /ads

Retorna anúncios públicos.

Buscar anúncio
GET /ads/:id

Retorna um anúncio específico.

Criar anúncio
POST /ads

Necessita autenticação.

Atualizar anúncio
PUT /ads/:id

Atualiza um anúncio existente.

Excluir anúncio
DELETE /ads/:id

Remove um anúncio.

10. Middleware de Autenticação

Arquivo:

middlewares/auth.ts

Responsável por proteger rotas privadas.

Funcionamento:

Usuário envia Token JWT
↓
Middleware verifica token
↓
Token válido?

     Sim

      ↓

Continua requisição


Caso contrário:

401 Unauthorized

11. Upload de Imagens

Arquivos:

config/multer.ts

services/uploadImage.ts

services/deleteImage.ts
Multer

Responsável por receber arquivos enviados pelo usuário.

Ele transforma a imagem em um buffer temporário.

uploadImage()

Responsável por enviar a imagem para o Supabase Storage.

Fluxo:

Imagem
↓
Multer
↓
Upload Service
↓
Supabase Storage
↓
URL pública
↓
Banco de dados

deleteImage()

Remove imagens quando um anúncio é excluído.

12. Validações

Local:
validations

Utiliza validação de dados antes de salvar informações.

Exemplos:
Email válido
Campos obrigatórios
Valores corretos

Evita salvar dados incorretos no banco.

13. Frontend

O frontend foi desenvolvido com React e TypeScript.

Responsável por:
Interface do usuário
Formulários
Navegação
Comunicação com API

Estrutura:
frontend

     src

    components  
    pages
    services
    contexts
    main.tsx
14. main.tsx

Arquivo inicial do React.

Responsável por:

Criar a aplicação
Renderizar o componente principal
Configurar providers

15. Components

Local:

src/components

São componentes reutilizáveis:
Navbar
Cards de anúncios
Botões
Formulários

16. Pages
Local:

src/pages

Representam as telas da aplicação.

Exemplos:

Home
Login
Cadastro
Anúncios
Perfil
Meus anúncios

17. AuthContext

Arquivo:
contexts/AuthContext.tsx
Controla o estado de autenticação.

Responsável por:
Guardar usuário logado
Salvar token
Fazer logout
Disponibilizar usuário para toda aplicação

Fluxo:
Login
↓
Token recebido
↓
Context salva usuário
↓
Rotas privadas liberadas

18. Comunicação Frontend → Backend

A comunicação acontece através de requisições HTTP

Exemplo:
React
↓
Axios
↓
API Express
↓
Controller
↓
Banco

19. Fluxo Completo de Criação de Anúncio
Usuário preenche formulário
↓
Frontend envia POST /ads
↓
Backend recebe requisição
↓
Middleware verifica JWT
↓
Controller valida dados
↓
Imagem é enviada ao Storage
↓
Prisma salva anúncio
↓
Resposta retorna ao frontend
↓
Novo anúncio aparece na tela

20. Resumo da Arquitetura
Usuário
↓
React Frontend
↓
Axios
↓
Express API
↓
Controllers
↓
Prisma ORM
↓
PostgreSQL
↓
Supabase Storage