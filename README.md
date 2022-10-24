# CRUD com Express, REST API, e MongoDB

Desenvolvido por: Wílian Ansanello (https://linkedin.com/in/wiliansanello)[LinkedIn]

## Descrição 

Esta aplicação é um CRUD que permite o gerenciamento de um cadastro de universidades.
 Os dados das universidades são obtidos através da API de endereço http://universities.hipolabs.com/search
, e a partir do momento em que os dados são obtidos, a aplicação filtra do resultado as universidades que estão situadas nos países Argentina, Brasil, Chile, Colômbia, Paraguai, Peru, Suriname e Uruguai.

## Requisitos necessários para executar a aplicação

Para que a aplicação possa ser consumida, é necessário ter instalado no computador servidor o Node.JS (a partir da **versão 16.18.0** ), e o banco de dados **MongoDB** . 

Também será necessário criar um arquivo **.env** para passar os dados das variáveis de ambiente usadas pela aplicação. Há um exemplo na raiz do projeto, chamado **.env.example** , que contém os dados abaixo:
```
PORT=<porta_onde_a_aplicação_irá_rodar>
DB_URL=<url_do_banco_de_dados_(ex.:_mongodb://localhost/<porta>/<nome_banco>)>
```

## Instruções para executar a aplicação

Com os requisitos necessários atendidos (vide sessão **Requisitos necessários para executar a aplicação**), é necessário executar o comando **npm install**, para que todas as dependências do projeto sejam instalados. Na sequência, executar o comando **npm run dev** para inicializar a aplicação.

## Estrutura do projeto

A seguir, é detalhada a estrutura do projeto:

```
src: pasta que contém todos os códigos
--jobs: são scripts executados em segundo plano em um determinado momento da aplicação.
--routes: guarda os arquivos que contém as rotas da aplicação, a serem utilizadas por um roteador chamado por um middleware no script inicial da aplicação (index.js).
--services: contém as regras de negócio da aplicação
```

## Rotas da aplicação 

```
/ : É a rota inicial da aplicação. Ao ser carregada, ela checa se as vagas da API já foram armazenadas no banco de dados. Se não foram, o banco será alimentado com os dados obtidos pela API.
/universities: Esta rota é chamada em diversos momentos da aplicação, de acordo com os métodos utilizados:
    * GET: lista todas as universidades cadastradas, lista todas as universidades de um país passada como query param, e lista uma específica quando é informado o id da mesma no query param;
    * POST: insere uma universidade
    * PUT: Altera os dados de uma universidade
    * DELETE: Remove uma universidade
```


