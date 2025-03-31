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

// Função para obter os parâmetros da URL
function obterParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        partida: params.get("partida"),
        chegada: params.get("chegada"),
        data: params.get("data")
    };
}

// Filtra as passagens com base nos parâmetros
function filtrarPassagens(passagens, partida, chegada) {
    return passagens.filter(
        (passagem) =>
            passagem.origem.toLowerCase().includes(partida.toLowerCase()) &&
            passagem.destino.toLowerCase().includes(chegada.toLowerCase())
    );
}

// Renderiza as passagens no HTML
function renderizarPassagens(passagens) {
    const ticketListings = document.getElementById("ticket-listings");
    ticketListings.innerHTML = ""; // Limpa o conteúdo existente

    if (passagens.length === 0) {
        ticketListings.innerHTML = `<p class="text-center">Nenhuma passagem encontrada para os critérios selecionados.</p>`;
        return;
    }

    passagens.forEach((passagem) => {
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${passagem.origem} → ${passagem.destino}</h5>
                    <p class="text-muted small">${passagem.empresa} - ${passagem.modelo}</p>
                    <p class="mb-1"><strong>Partida:</strong> ${passagem.partida}</p>
                    <p class="mb-1"><strong>Chegada:</strong> ${passagem.chegada}</p>
                    <p class="mb-1"><strong>Preço:</strong> R$ ${passagem.preco}</p>
                    <button class="btn btn-primary w-100">Reservar</button>
                </div>
            </div>
        `;

        ticketListings.appendChild(card);
    });
}

// Inicializa a página de passagens
function inicializarPagina() {
    const parametros = obterParametrosURL();
    const passagensFiltradas = filtrarPassagens(
        passagens,
        parametros.partida,
        parametros.chegada
    );
    renderizarPassagens(passagensFiltradas);
}

// Chama a função de inicialização
inicializarPagina();