# Diário da IA - Desenvolvimento do PWA

## Objetivo

Transformar a aplicação ReCampus em uma Progressive Web App (PWA), permitindo instalação no dispositivo e funcionamento com recursos offline.

### Objetivo da sessão
Compreender o funcionamento de uma PWA e como implementá-la em um projeto React.

### Perguntas feitas à IA
- O que é uma Progressive Web App (PWA)?
- Quais são os requisitos para transformar uma aplicação React em PWA?
- Como funciona o arquivo `manifest.json`?
- O que é um Service Worker?
- Como instalar uma PWA criada com Vite?

### Resumo das respostas
A IA explicou que uma PWA é uma aplicação web que oferece uma experiência semelhante à de um aplicativo nativo. Para isso, são necessários:

- Manifest Web App (`manifest.json`);
- Service Worker;
- HTTPS;
- Ícones do aplicativo;
- Configuração para instalação.

### Aplicação no projeto
Com base nas orientações, foi escolhida a biblioteca `vite-plugin-pwa` para facilitar a implementação do PWA no projeto React.

### Aprendizado
Aprendi que o Manifest define as informações do aplicativo (nome, ícones, cores, modo de exibição) e que o Service Worker é responsável pelo cache e pelo funcionamento offline.

### Dificuldades encontradas
Inicialmente não compreendia a diferença entre Manifest e Service Worker. Após os exemplos apresentados pela IA, consegui entender a função de cada um.

### Objetivo da sessão

Configurar o PWA utilizando o Vite.

### Perguntas feitas à IA

- Como instalar o `vite-plugin-pwa`?
- Como configurar o plugin no `vite.config.ts`?
- Como criar os ícones do aplicativo?

### Resultado

Foi possível configurar o projeto para gerar automaticamente o Manifest e o Service Worker.

### Aprendizado

Compreendi que o plugin automatiza grande parte da configuração necessária para transformar uma aplicação React em PWA.

### Objetivo da sessão

Testar a instalação da aplicação.

### Perguntas feitas à IA

- Como verificar se o navegador reconhece a aplicação como PWA?
- Como testar o funcionamento offline?

### Resultado

A aplicação passou a ser instalável e foi possível validar o funcionamento offline utilizando as ferramentas de desenvolvedor do navegador.

### Aprendizado

Aprendi a utilizar o Lighthouse e o DevTools do Chrome para verificar se a aplicação atende aos requisitos de uma Progressive Web App.

## Reflexão Final
A IA foi utilizada como ferramenta de apoio para compreender os conceitos de PWA, configurar o ambiente e solucionar dúvidas durante a implementação. As decisões de arquitetura, testes e integração com o restante do sistema foram realizadas durante o desenvolvimento do projeto.