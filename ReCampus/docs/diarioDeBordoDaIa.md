# Diário de Bordo da Inteligência Artificial

## 1. Ferramenta utilizada
Durante o desenvolvimento do ReCampus, utilizei principalmente o ChatGPT como
ferramenta de apoio técnico e de aprendizagem
A inteligência artificial foi usada para:
- compreender o funcionamento de uma PWA
- investigar erros de instalação e de ícones
- revisar configurações do Vite
- interpretar mensagens de erro
- sugerir testes para verificar se a aplicação poderia ser instalada
A IA foi utilizada como ferramenta de orientação

## 2. Uso da IA na implementação da PWA
O frontend do ReCampus foi desenvolvido com React, TypeScript e Vite. Um dos
requisitos do desafio era transformar a aplicação em uma Progressive Web App
Inicialmente, utilizei a IA para entender as diferenças entre um site responsivo e
uma PWA. Com isso, compreendi que apenas adaptar a interface para dispositivos
móveis não era suficiente
Para que a aplicação pudesse ser reconhecida como PWA, também seriam necessários:
- um manifesto de aplicativo válido;
- nome e descrição da aplicação;
- ícones nos tamanhos adequados;
- definição da cor do tema;
- modo de exibição `standalone`;
- um Service Worker registrado;
- execução da aplicação por HTTPS em produção.

A IA também ajudou na configuração do `vite-plugin-pwa`, responsável por gerar o
manifesto e o Service Worker durante o processo de build
Depois da configuração, realizei testes no navegador para verificar:

- se o manifesto estava sendo carregado
- se os ícones eram encontrados
- se a opção de instalar a aplicação aparecia
- se a aplicação abria como uma janela independente
- se os arquivos essenciais continuavam disponíveis após o carregamento inicial

## 3. Estratégia de engenharia de prompts

Os prompts abaixo foram reconstruídos a partir das dúvidas e dos problemas
enfrentados durante o desenvolvimento.

### Prompt 1 — Estruturação da PWA
> Tenho um frontend desenvolvido com React, TypeScript e Vite para um marketplace
 universitário chamado ReCampus. Preciso transformá-lo em uma PWA instalável.
> Explique quais dependências devo instalar, como configurar o vite-plugin-pwa,
> quais informações devo colocar no manifesto, onde devem ficar os ícones e como verificar no navegador se o Service Worker está funcionando.
Esse prompt foi utilizado para compreender a estrutura necessária para transformar
o frontend em uma aplicação instalável.

### Prompt 2 — Investigação dos ícones

> Minha aplicação React com Vite está funcionando, mas o navegador não reconhece corretamente o ícone da PWA ou não mostra a opção de instalação. Analise quais erros podem existir.
> manifest e na configuração do vite-plugin-pwa. Mostre também como testar cada hipótese no DevTools.

Esse prompt ajudou a organizar a investigação do problema, em vez de alterar vários
arquivos sem saber a causa do erro.

### Prompt 3 — Testes de instalação e Service Worker

> Como posso testar se minha PWA realmente está funcionando depois do deploy?
> Quero verificar manifesto, Service Worker, instalação, cache e funcionamento em
> dispositivos móveis. Apresente um passo a passo usando o DevTools e explique
> quais resultados indicam que a configuração está correta.

Esse prompt foi usado para definir uma sequência de testes após a implementação e
o deploy

## 4. Reflexão crítica

Um dos principais aprendizados foi perceber que as respostas da IA nem sempre
consideravam exatamente a estrutura do meu projeto
Em uma das orientações, a configuração apresentada era genérica e não verificava
se os caminhos dos ícones realmente correspondiam aos arquivos existentes na
pasta pública do frontend. Apenas adicionar os nomes dos ícones ao manifesto não
resolveria o problema caso os arquivos estivessem ausentes, tivessem outro nome
ou não fossem copiados durante o build
Identifiquei o problema ao verificar o manifesto e as requisições no DevTools.
Alguns caminhos precisaram ser comparados com a estrutura real das pastas do
projeto
Depois disso, passei a fornecer mais contexto para a IA, incluindo:
- a estrutura das pastas
- o conteúdo do `vite.config.ts`
- os nomes exatos dos arquivos
- as mensagens completas apresentadas pelo navegador
- os resultados do build
Essa mudança tornou as respostas mais específicas e reduziu sugestões incompatíveis
com o projeto
Também aprendi que não deveria copiar configurações sem compreender o que cada
propriedade fazia. Passei a testar as alterações individualmente e a confirmar os
resultados no navegador.

## 5. Avaliação do uso da inteligência artificial
A inteligência artificial acelerou a pesquisa e ajudou a interpretar erros que eu
ainda não conhecia. Entretanto, ela não substituiu os testes nem a análise do
projeto.
Durante o desenvolvimento, foi necessário:
1. apresentar o problema com contexto
2. analisar a solução sugerida
3. adaptar o código à estrutura do ReCampus
4. executar o projeto
5. observar os erros
6. retornar à IA com as mensagens completas
7. testar novamente
Portanto, a IA foi usada como uma ferramenta de aprendizagem, revisão e apoio à
resolução de problemas, e não como uma substituição da compreensão técnica.

## 6. Resultado
Ao final do processo, o ReCampus passou a possuir a estrutura necessária para ser
apresentado como uma aplicação web progressiva, front e back end, responsividade e suporte à instalação.

O processo também contribuiu para meu aprendizado sobre:
- arquitetura de aplicações web
- funcionamento de uma PWA
- estratégias de cache
- investigação de erros pelo DevTools
- importância dos caminhos de arquivos no build
- necessidade de testar criticamente códigos fornecidos por IA
