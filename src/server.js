const express = require("express"); // podemos começar a usar o express e usar o servidor
const server = express(); // Servidor express

// Configurar pasta pública - redirecionamentos
server.use(express.static("public"));


// Utilizando template engina nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});




// Configurar caminhos da minha aplicação
// Página inicial
// O / via get vai responder a aplicação
// req = Requisição
// res = Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos"});
});

//Criando outras rotas
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

//Criando outras rotas
server.get("/search", (req, res) => {
    return res.render("search-results.html");
});

// Ligar o servidor
server.listen(3000)