function enviarTexto() {
    // Obtém o valor do input e remove espaços em branco no início e no fim
    const texto = document.getElementById('textoInput').value.trim();
  
    // Verifica se o texto está vazio
    if (!texto) {
        // Exibe um alerta solicitando uma palavra válida
        alert('Por favor, digite uma palavra válida.');
        return; // Sai da função se o texto estiver vazio
    }
  
    // Cria um objeto com o texto digitado
    const data = { texto };
  
    // Envia uma requisição POST para a API
    fetch('http://13.58.131.75:3000/api/manipulacao-string', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data), // Converte o objeto em JSON e envia no corpo da requisição
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(resposta => {
        // Verifica se a palavra é um palíndromo e atribui uma mensagem correspondente
        const ehPalindromo = resposta.PALINDROMO ? 'é um palíndromo!' : 'não é um palíndromo!';
  
        // Atualiza o conteúdo da div 'div-eh-palindromo' com a resposta sobre ser palíndromo ou não
        const divEhPalindromo = document.querySelector('.div-eh-palindromo');
        if (divEhPalindromo) {
            divEhPalindromo.innerHTML = `<h2>A palavra "${texto}" ${ehPalindromo}</h2>`;
        }
  
        // Obtém a referência da div 'div-numero-ocorrencias'
        const divOcorrencias = document.querySelector('.div-numero-ocorrencias');
        if (divOcorrencias) {
            divOcorrencias.innerHTML = ''; // Limpa o conteúdo anterior
  
            // Cria uma tabela para exibir as ocorrências de caracteres
            const tabela = document.createElement('table');
            tabela.classList.add('table', 'table-striped'); // Adiciona classes à tabela
            tabela.style.maxWidth = '800px'; // Define a largura máxima da tabela
            divOcorrencias.appendChild(tabela); // Adiciona a tabela à div
  
            // Cria o cabeçalho da tabela
            const cabecalho = document.createElement('thead');
            const cabecalhoLinha = document.createElement('tr');
            const cabecalhoCelula = document.createElement('th');
            cabecalhoCelula.textContent = 'Letra';
            cabecalhoLinha.appendChild(cabecalhoCelula);
            const cabecalhoCelula2 = document.createElement('th');
            cabecalhoCelula2.textContent = 'Ocorrências';
            cabecalhoLinha.appendChild(cabecalhoCelula2);
            cabecalho.appendChild(cabecalhoLinha);
            tabela.appendChild(cabecalho);
  
            // Cria o corpo da tabela
            const corpo = document.createElement('tbody');
            tabela.appendChild(corpo);
  
            const ocorrencias = resposta.OCORRENCIAS_CARACTERES;
            for (const [caractere, quantidade] of Object.entries(ocorrencias)) {
                // Ignora espaços na tabela de ocorrências
                if (caractere.trim() === '') continue;
  
                // Cria uma linha na tabela para cada caractere e sua quantidade de ocorrências
                const linha = document.createElement('tr');
                const celulaCaractere = document.createElement('td');
                celulaCaractere.textContent = caractere;
                linha.appendChild(celulaCaractere);
                const celulaQuantidade = document.createElement('td');
                celulaQuantidade.textContent = quantidade;
                linha.appendChild(celulaQuantidade);
                corpo.appendChild(linha);
            }
        }
    })
    .catch(error => {
        // Exibe um erro no console caso haja algum problema na requisição
        console.error('Erro:', error);
        const divResposta = document.getElementById('resposta');
        if (divResposta) {
            divResposta.innerText = 'Erro ao processar a solicitação.';
        }
    });
}
