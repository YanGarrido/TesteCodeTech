# **README: Como Rodar a Aplicação**

## **Pré-requisitos**

Antes de começar, você precisará de:

- **Node.js** instalado na sua máquina (versão recomendada: 14.x ou superior).
- **MongoDB Atlas** configurado para acesso à sua base de dados.

## **Como Rodar o Backend Localmente**

### **1. Clonar o Repositório**

Primeiro, clone o repositório para a sua máquina:

git clone <URL do seu repositório>
cd <diretório do repositório>

### 2. Instalar Dependências
No diretório raiz do projeto, execute o comando abaixo para instalar as dependências do projeto:

npm install

###3. Configuração do MongoDB Atlas
Crie uma conta no MongoDB Atlas e configure um cluster (você pode usar o plano gratuito).
Após a criação do cluster, crie um usuário para acessar o banco de dados e adicione seu IP à whitelist para permitir conexões externas.
Copie as credenciais do MongoDB Atlas e configure as variáveis de ambiente.

###4. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do seu projeto e adicione as seguintes variáveis de ambiente com as informações fornecidas pelo MongoDB Atlas:

DB_USER=seu_usuario_do_banco
DB_PASS=sua_senha_do_banco

###5. Executar a Aplicação
Com as variáveis de ambiente configuradas, inicie o servidor localmente:

npm start
O servidor estará rodando localmente na porta 3000 (ou em outra porta, se configurada de forma diferente).
para rodar o front:

npm run dev

###6. Acessando a Aplicação
Abra o navegador e vá para o endereço:

http://localhost:3000
Agora, você pode interagir com a aplicação.


Registro de Usuários: A API permite criar novos usuários através de um endpoint de registro. Não há uma tela de frontend para esse registro, mas você pode criar um novo usuário fazendo uma requisição à API.

Exemplo de Requisição para Criar Novo Usuário:

Método: POST
URL: /api/register
Corpo da Requisição:

{
  "email": "novoemail@teste.com",
  "senha": "novasenha"
}
Login com Usuário Existente: Caso não queira criar um novo usuário, você pode usar um login já existente:

Email: yan@teste.com
Senha: 1234

Esse usuário está cadastrado previamente e você pode utilizá-lo para fazer login na aplicação.

Detalhes Técnicos
Banco de Dados: MongoDB Atlas (nuvem)
Bibliotecas Utilizadas:
Express
Mongoose (ODM para MongoDB)
dotenv (para carregar variáveis de ambiente)
Observações Importantes:
Segurança: As credenciais do MongoDB Atlas devem ser mantidas seguras, portanto, não compartilhe o arquivo .env com outros ou publique em repositórios públicos.
Permissões: Certifique-se de que o usuário que você configurar no MongoDB Atlas tenha permissões de leitura e escrita para acessar o banco de dados.

