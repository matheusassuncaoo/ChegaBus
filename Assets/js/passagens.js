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

// Filtra as passagens com base nos dados da rota
function filtrarPassagens(passagensArray, origem, destino) {
    return passagensArray.filter((passagem) =>
        passagem.origem.toLowerCase() === origem.toLowerCase() &&
        passagem.destino.toLowerCase() === destino.toLowerCase()
    );
}

// Renderiza as passagens no HTML
function renderizarPassagens(passagensFiltradas) {
    const ticketListings = document.getElementById("ticket-listings");
    ticketListings.innerHTML = ""; // Limpa o conteúdo existente

    if (passagensFiltradas.length === 0) {
        ticketListings.innerHTML = `<p class="text-center">Nenhuma passagem encontrada para os critérios selecionados.</p>`;
        return;
    }

    passagensFiltradas.forEach((passagem, index) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "mb-3");

        // Cria um ID único para o botão "Reservar"
        const buttonId = `reservar-btn-${index}`;

        card.innerHTML = `
            <div class="card shadow-sm rounded-3">
                <div class="card-body p-3">
                    <!-- Cabeçalho: Empresa, Modelo e Desconto -->
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h6 class="mb-0">${passagem.empresa}</h6>
                            <small class="text-muted">${passagem.modelo}</small>
                        </div>
                        <span class="badge bg-success rounded-pill">${passagem.desconto}</span>
                    </div>

                    <!-- Horários e Cidades -->
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="text-center">
                            <h5 class="mb-0">${passagem.partida}</h5>
                            <small class="text-muted">${passagem.origem}</small>
                        </div>
                        <div class="text-center">
                            <i class="bi bi-arrow-right"></i>
                        </div>
                        <div class="text-center">
                            <h5 class="mb-0">${passagem.chegada}</h5>
                            <small class="text-muted">${passagem.destino}</small>
                        </div>
                        <div class="text-end">
                            <h5 class="mb-0">R$ ${passagem.preco}</h5>
                            <button class="btn btn-primary btn-sm mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAssentos${index}" aria-expanded="false" aria-controls="collapseAssentos${index}">
                                Selecionar
                            </button>
                        </div>
                    </div>

                    <!-- Seção de Assentos (Collapse) -->
                    <div class="collapse" id="collapseAssentos${index}">
                        <hr>
                        <div class="card card-body border-0">
                            <h6>Retire o seu assento</h6>
                            <div class="d-flex flex-wrap gap-2 mb-3">
                                <button class="btn btn-outline-success btn-sm" style="width: 40px;">1</button>
                                <button class="btn btn-outline-success btn-sm" style="width: 40px;">2</button>
                                <button class="btn btn-outline-danger btn-sm" style="width: 40px;">3</button>
                                <button class="btn btn-outline-danger btn-sm" style="width: 40px;">4</button>
                                <button class="btn btn-outline-secondary btn-sm" style="width: 40px;">5</button>
                                <button class="btn btn-outline-secondary btn-sm" style="width: 40px;">6</button>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="badge bg-success me-2">Disponível</span>
                                    <span class="badge bg-danger me-2">Reservado</span>
                                    <span class="badge bg-secondary">Mulher</span>
                                </div>
                                <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseAssentos${index}" aria-expanded="false" aria-controls="collapseAssentos${index}">
                                    Fechar
                                </button>
                            </div>
                            <button class="btn btn-primary w-100 mt-3" id="${buttonId}">Reservar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        ticketListings.appendChild(card);

        // Adiciona o evento de clique ao botão "Reservar" (na seção de assentos)
        const reservarButton = document.getElementById(buttonId);
        if (reservarButton) {
            reservarButton.addEventListener("click", () => {
                // Salva os dados da passagem selecionada no localStorage
                localStorage.setItem("passagemSelecionada", JSON.stringify(passagem));
                // Redireciona para a página de pagamento
                window.location.href = "/Assets/Pages/pagamento.html";
            });
        }
    });
}

// Inicializa a página de passagens
function inicializarPagina() {
    // Recupera os dados da rota que foram salvos no Dashboard
    const viagemSelecionada = JSON.parse(localStorage.getItem("viagemSelecionada"));

    if (!viagemSelecionada) {
        document.getElementById("ticket-listings").innerHTML = `<p class="text-center">Selecione uma rota no dashboard para ver as passagens.</p>`;
        return;
    }

    // Filtra as passagens com base na origem e destino selecionados
    const passagensFiltradas = filtrarPassagens(passagens, viagemSelecionada.origem, viagemSelecionada.destino);
    renderizarPassagens(passagensFiltradas);
}

// Configura o formulário de busca na página de passagens
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const origem = document.querySelector('#pontoPartida').value;
    const destino = document.querySelector('#pontoChegada').value;
    const data = document.querySelector('#dataViagem').value;

    if (!origem || !destino || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Salva os dados da busca no localStorage
    localStorage.setItem("viagemSelecionada", JSON.stringify({ origem, destino, data }));

    // Filtra e renderiza as passagens
    const passagensFiltradas = filtrarPassagens(passagens, origem, destino);
    renderizarPassagens(passagensFiltradas);
});

// Chama a função de inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", inicializarPagina);