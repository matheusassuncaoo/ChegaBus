const cidades = [
    "Cuiabá, MT",
    "Sinop, MT",
    "Primavera do Leste, MT",
    "Alto Araguaia, MT",
    "Nobres, MT",
    "Rondonópolis, MT",
    "Barra do Garças, MT",
    "Chapada dos Guimarães, MT"
];

function configurarAutocomplete(inputId, sugestoesId) {
    const input = document.getElementById(inputId);
    const sugestoes = document.getElementById(sugestoesId);

    input.addEventListener("input", () => {
        const valor = input.value.toLowerCase();
        sugestoes.innerHTML = ""; // Limpa as sugestões anteriores
        sugestoes.classList.add("d-none");

        if (valor.length > 0) {
            const resultados = cidades.filter((cidade) =>
                cidade.toLowerCase().includes(valor)
            );

            resultados.forEach((resultado) => {
                const item = document.createElement("li");
                item.textContent = resultado;
                item.classList.add("list-group-item", "list-group-item-action");
                item.addEventListener("click", () => {
                    input.value = resultado;
                    sugestoes.innerHTML = "";
                    sugestoes.classList.add("d-none");
                });
                sugestoes.appendChild(item);
            });

            if (resultados.length > 0) {
                sugestoes.classList.remove("d-none");
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (!sugestoes.contains(event.target) && event.target !== input) {
            sugestoes.classList.add("d-none");
        }
    });
}

// Configura o autocompletar
configurarAutocomplete("pontoPartida", "sugestoesPartida");
configurarAutocomplete("pontoChegada", "sugestoesChegada");

// Evento de busca
document.getElementById("buscarPassagens").addEventListener("click", () => {
    const origem = document.getElementById("pontoPartida").value;
    const destino = document.getElementById("pontoChegada").value;
    const data = document.querySelector('input[type="date"]').value;

    if (!origem || !destino || !data) {
        alert("Por favor, preencha todos os campos antes de buscar passagens.");
        return;
    }

    // Salva no localStorage
    localStorage.setItem("viagemSelecionada", JSON.stringify({
        origem,
        destino,
        data
    }));

    // Redireciona
    window.location.href = "/Assets/Pages/passagens.html";
});

// Evento dos botões "Reservar"
document.querySelectorAll(".reservar-btn").forEach(botao => {
    botao.addEventListener("click", () => {
        const origem = botao.getAttribute("data-origem");
        const destino = botao.getAttribute("data-destino");
        const data = new Date().toISOString().split('T')[0]; // Data atual

        // Salva no localStorage
        localStorage.setItem("viagemSelecionada", JSON.stringify({
            origem,
            destino,
            data
        }));

        // Redireciona
        window.location.href = "/Assets/Pages/passagens.html";
    });
});