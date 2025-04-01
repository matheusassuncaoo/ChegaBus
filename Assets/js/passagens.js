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

// Filtra as passagens
function filtrarPassagens(passagens, origem, destino) {
    return passagens.filter(
        (passagem) =>
            passagem.origem.toLowerCase() === origem.toLowerCase() &&
            passagem.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Renderiza as passagens no HTML
function renderizarPassagens(passagens) {
    const ticketListings = document.getElementById("ticket-listings");
    ticketListings.innerHTML = "";

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

// Inicializa a página
function inicializarPagina() {
    const viagemSelecionada = JSON.parse(localStorage.getItem("viagemSelecionada"));

    if (!viagemSelecionada) {
        document.getElementById("ticket-listings").innerHTML = `<p class="text-center">Selecione uma rota no dashboard para ver as passagens.</p>`;
        return;
    }

    const passagensFiltradas = filtrarPassagens(
        passagens,
        viagemSelecionada.origem,
        viagemSelecionada.destino
    );
    renderizarPassagens(passagensFiltradas);
}

// Configura o formulário de busca no passagens.html
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const origem = document.querySelector('input[placeholder="Ponto de Partida"]').value;
    const destino = document.querySelector('input[placeholder="Ponto de Chegada"]').value;
    const data = document.querySelector('input[type="date"]').value;

    if (!origem || !destino || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Salva no localStorage
    localStorage.setItem("viagemSelecionada", JSON.stringify({ origem, destino, data }));

    // Filtra e renderiza
    const passagensFiltradas = filtrarPassagens(passagens, origem, destino);
    renderizarPassagens(passagensFiltradas);
});

// Chama a inicialização ao carregar a página
inicializarPagina();