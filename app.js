// Importa as bibliotecas necessárias
const express = require('express'); // Express é um framework para Node.js que simplifica a criação de aplicativos web
const bodyParser = require('body-parser'); // Body-parser é um middleware para o Express que facilita o processamento de dados recebidos no corpo das requisições
const cors = require('cors'); // Cors é um middleware para o Express que permite requisições de origens diferentes (Cross-Origin Resource Sharing)

// Criação de um aplicativo Express
const app = express(); // Inicializa o aplicativo Express
const port = 3000; // Define a porta em que o servidor irá rodar

// Utilização de middlewares no aplicativo Express
app.use(bodyParser.json()); // Adiciona o middleware bodyParser para lidar com dados JSON enviados nas requisições
app.use(cors()); // Adiciona o middleware Cors para permitir requisições de origens diferentes

// Função para verificar se uma string é um palíndromo
function verificarPalindromo(texto) {
  texto = texto.toLowerCase().replace(/\s/g, ''); // Remove espaços e converte para minúsculas
  return texto === texto.split('').reverse().join(''); // Verifica se a string é igual à sua versão invertida
}

// Função para contar as ocorrências de caracteres em uma string
function contarOcorrenciasCaracteres(texto) {
  const ocorrencias = {}; // Objeto para armazenar as ocorrências de caracteres
  for (let char of texto) { // Loop sobre cada caractere na string
    ocorrencias[char] = (ocorrencias[char] || 0) + 1; // Incrementa a contagem de ocorrências para cada caractere
  }
  return ocorrencias; // Retorna o objeto com as contagens de ocorrências
}

// Rota POST para o endpoint '/api/manipulacao-string'
app.post('/api/manipulacao-string', (req, res) => {
  try {
    const { texto } = req.body; // Obtém o texto enviado no corpo da requisição

    if (!texto || texto.trim().length === 0) { // Verifica se o texto é vazio ou nulo
      return res.status(400).json({ error: "O campo 'texto' não pode ser vazio." }); // Retorna erro 400 se o texto for inválido
    }

    // Verificar se é palíndromo
    const palindromo = verificarPalindromo(texto); // Chama a função para verificar se é palíndromo

    // Contar ocorrências de cada caractere
    const ocorrencias = contarOcorrenciasCaracteres(texto); // Chama a função para contar as ocorrências de caracteres

    // Montar resposta
    const resposta = {
      PALINDROMO: palindromo, // Adiciona a informação se é palíndromo ou não
      OCORRENCIAS_CARACTERES: ocorrencias, // Adiciona as contagens de ocorrências de caracteres
    };

    res.json(resposta); // Envia a resposta em formato JSON
  } catch (error) { // Tratamento de erro caso ocorra alguma exceção
    res.status(500).json({ error: error.message }); // Retorna erro 500 com a mensagem de erro
  }
});

// Inicia o servidor Express na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Exibe uma mensagem indicando que o servidor está rodando
});
