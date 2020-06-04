const express = require("express"); // podemos começar a usar o express e usar o servidor
const server = express(); // Servidor express

// Configurar pasta pública - redirecionamentos
server.use(express.static("public"));

// Configurar caminhos da minha aplicação
// Página inicial
// O / via get vai responder a aplicação
// req = Requisição
// res = Resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

//Criando outras rotas
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html");
});

//Criando outras rotas
server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html");
});

// Ligar o servidor
server.listen(3000)