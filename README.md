# Sistema de Controle de Ponto com Angular e Firebase

## Descrição
Este projeto é um sistema de controle de ponto desenvolvido respeitando alguns requisitos técnicos. Ele permite autenticação de usuários, cadastro e listagem de usuários, e marcação de ponto com captura do horário do servidor utilizando Firebase Cloud Functions.

## Funcionalidades

### Tela de Login
- Autenticação de usuários cadastrados com e-mail e senha.

### Tela de Cadastro e Listagem de Usuários
- Cadastro de novos usuários com os seguintes campos:
  - **Nome**
  - **CPF**
  - **E-mail**
  - **Password**
  - **Código** (4 dígitos numéricos)
- Listagem de usuários cadastrados para administração.

### Tela de Marçação de Ponto
- Entrada do código do usuário cadastrado para registrar o ponto.
- O horário de registro é capturado diretamente do servidor por meio de Firebase Cloud Functions.

## Tecnologias Utilizadas

### Frontend
- **Angular 17.+**
  - Framework utilizado para a construção da interface do usuário.
- **TypeScript**
  - Linguagem principal do desenvolvimento.

### Backend
*****Necessita do node na versão 18.+ para emular e instalar pacotes do ambiente*****
- **Firebase 10.+**
  - Autenticação de usuários.
  - Armazenamento de dados no Firestore.
  - Cloud Functions para captura do horário do servidor.
- **Firebase Tools**
  - Ferramenta CLI para configuração e deploy das funções no Firebase.

## Como Executar o Projeto

### Requisitos
- **Node.js** (recomendado: gerenciado via NVM)
- **Angular CLI** 17+
- **Firebase CLI** 10+

### Passos para Executar
1. Clone o repositório:
   ```bash
   git clone <URL-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Configure o Firebase no projeto:
   - Substitua os parâmetros do arquivo `environment.ts` com as credenciais do seu projeto Firebase.

4. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
5. Acesse o aplicativo em: [http://localhost:4200](http://localhost:4200)

6. Siga até o respositorio e instale as dependências. 
   ```bash
   cd <firerbase-functions\functions>
   npm install
   ```

7. Inicie as funções no Firebase utilizando o emulador:
   ```bash
   npm run serve
   ou
   firebase emulators:start
   ```


