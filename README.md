# Store Manager <img src="https://github.com/user-attachments/assets/1bb74fe2-1233-4581-bc94-5aac734f1c3f" alt="image" width="60"/>

## Sobre

O **Store Manager** é uma API RESTful criada para gerenciar produtos e vendas. A aplicação permite realizar operações de **CRUD** (criar, ler, atualizar e remover) tanto para produtos quanto para vendas. Ela foi desenvolvida utilizando a arquitetura **MSC (Model-Service-Controller)**, promovendo uma estrutura organizada e escalável. O projeto também inclui testes unitários para garantir a funcionalidade e qualidade do código.

## Funcionalidades

- **CRUD de Produtos**: Adicione, visualize, atualize e remova produtos do inventário.
- **CRUD de Vendas**: Gerencie vendas, incluindo adição, visualização, atualização e remoção de registros de vendas.
- **Validações**: Validações robustas utilizando a biblioteca **Joi** para garantir a integridade dos dados inseridos.
- **Testes Unitários**: Garantia de qualidade do código com testes implementados utilizando **Mocha**, **Chai** e **Sinon**.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução utilizado para o desenvolvimento da API.
- **Express**: Framework web para criação de rotas e manipulação de requisições HTTP.
- **MySQL**: Banco de dados relacional utilizado para armazenar os dados de produtos e vendas.
- **Joi**: Biblioteca utilizada para validação de dados de entrada.
- **Docker**: Ferramenta de containerização para garantir a consistência do ambiente de desenvolvimento.
- **docker-compose**: Utilizado para orquestrar os containers Docker.
- **Mocha, Chai e Sinon**: Ferramentas de teste para garantir que todas as funcionalidades da API estejam funcionando corretamente.

## Como Executar

### Pré-requisitos

- **Docker** e **docker-compose**: Certifique-se de que essas ferramentas estão instaladas.

### Passo a Passo

1. Clone o repositório:

    ```bash
    git clone https://github.com/SeuUsuario/store-manager.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd store-manager
    ```

3. Inicie os containers com o Docker:

    ```bash
    docker-compose up
    ```

4. Acesse a API através do endereço local fornecido e comece a gerenciar produtos e vendas.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **controllers/**: Responsáveis por tratar as requisições e enviar as respostas adequadas.
  - **models/**: Modelos que interagem diretamente com o banco de dados **MySQL**.
  - **services/**: Implementa a lógica de negócios da aplicação.
  - **routes/**: Define as rotas e mapeia os endpoints para produtos e vendas.
  - **middlewares/**: Validações e outros tratamentos intermediários, utilizando **Joi**.

## Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
npm test
```

Os testes são realizados para garantir a consistência e confiabilidade da aplicação, cobrindo funcionalidades principais como o CRUD de produtos e vendas.

<h3>Aplicação</h3>

![2022-08-15_22-08-13](https://user-images.githubusercontent.com/91297277/184774230-71e3aaa9-e283-4ae3-9d14-59fc6dc7c54e.gif)
