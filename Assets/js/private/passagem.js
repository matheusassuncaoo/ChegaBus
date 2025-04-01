// Dados de exemplo para as passagens
const passagens = [
    {
        empresa: "Satélite Azul",
        modelo: "Volvo Multi Axle Semi Sleeper (2+2)",
        partida: "6:50AM",
        chegada: "12:15PM",
        origem: "Cuiabá, MT",
        destino: "Sinop, MT",
        preco: "135",
        desconto: "-40% OFF"
    },
    {
        empresa: "Satélite Azul",
        modelo: "Marcopolo Paradiso 1800 DD",
        partida: "6:50AM",
        chegada: "14:55PM",
        origem: "Cuiabá, MT",
        destino: "Primavera do Leste, MT",
        preco: "245",
        desconto: "-20% OFF"
    },
    {
        empresa: "Rio Novo",
        modelo: "Volvo B9R 340",
        partida: "17:50PM",
        chegada: "23:50PM",
        origem: "Nobres, MT",
        destino: "Sinop, MT",
        preco: "115",
        desconto: "-10% OFF"
    }
];

// Função para filtrar passagens por origem e destino
function filtrarPassagens(origem, destino) {
    // Se não houver origem e destino, retorna todas as passagens
    if (!origem || !destino) {
        return passagens;
    }
    
    // Caso contrário, filtra as passagens
    return passagens.filter(passagem => 
        passagem.origem.toLowerCase() === origem.toLowerCase() &&
        passagem.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Função para renderizar as passagens
function renderizarPassagens(passagensFiltradas) {
    const container = document.getElementById("ticket-listings");
    container.innerHTML = "";

    if (passagensFiltradas.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <h4>Nenhuma passagem encontrada para esta rota.</h4>
            </div>
        `;
        return;
    }

    passagensFiltradas.forEach(passagem => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${passagem.origem} → ${passagem.destino}</h5>
                    <p class="text-muted mb-2">${passagem.empresa} - ${passagem.modelo}</p>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <p class="mb-0"><strong>Partida:</strong> ${passagem.partida}</p>
                            <p class="mb-0"><strong>Chegada:</strong> ${passagem.chegada}</p>
                        </div>
                        <div class="text-end">
                            <p class="mb-0 text-success">${passagem.desconto}</p>
                            <p class="mb-0"><strong>R$ ${passagem.preco}</strong></p>
                        </div>
                    </div>
                    <button class="btn btn-primary w-100">Comprar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Função para capturar parâmetros da URL
function obterParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        origem: params.get("origem"),
        destino: params.get("destino"),
        data: params.get("data")
    };
}

// Inicializa a página
function inicializarPagina() {
    const parametros = obterParametrosURL();
    
    // Filtra e exibe as passagens (mesmo sem parâmetros)
    const passagensFiltradas = filtrarPassagens(parametros.origem, parametros.destino);
    renderizarPassagens(passagensFiltradas);

    // Atualiza os campos do formulário apenas se houver parâmetros
    if (parametros.origem) {
        document.querySelector('input[placeholder="Ponto de Partida"]').value = parametros.origem;
    }
    if (parametros.destino) {
        document.querySelector('input[placeholder="Ponto de Chegada"]').value = parametros.destino;
    }
    if (parametros.data) {
        document.querySelector('input[type="date"]').value = parametros.data;
    }
}

// Inicia a página quando carregar
document.addEventListener("DOMContentLoaded", inicializarPagina);