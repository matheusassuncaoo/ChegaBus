// Renderiza as passagens no HTML
function renderizarPassagens(passagens) {
    const ticketListings = document.getElementById("ticket-listings");
    ticketListings.innerHTML = ""; // Limpa o conteúdo existente

    if (passagens.length === 0) {
        ticketListings.innerHTML = `<p class="text-center">Nenhuma passagem encontrada para os critérios selecionados.</p>`;
        return;
    }

    passagens.forEach((passagem, index) => {
        const card = document.createElement("div");
        card.classList.add("col-12", "mb-3");

        // Adiciona um ID único ao botão "Reservar" para facilitar a manipulação
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

        // Adiciona o evento de clique ao botão "Reservar"
        const reservarButton = document.getElementById(buttonId);
        if (reservarButton) {
            reservarButton.addEventListener("click", () => {
                try {
                    localStorage.setItem("passagemSelecionada", JSON.stringify(passagem));
                    window.location.href = "/Assets/Pages/pagamento.html";
                } catch (error) {
                    console.error("Erro ao salvar a passagem no localStorage:", error);
                    alert("Ocorreu um erro ao tentar reservar a passagem. Tente novamente.");
                }
            });
        }
    });
}