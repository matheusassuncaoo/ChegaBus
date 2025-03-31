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

document.getElementById("buscarPassagens").addEventListener("click", () => {
    const pontoPartida = document.getElementById("pontoPartida").value;
    const pontoChegada = document.getElementById("pontoChegada").value;
    const dataViagem = document.querySelector('input[type="date"]').value;

    if (!pontoPartida || !pontoChegada || !dataViagem) {
        alert("Por favor, preencha todos os campos antes de buscar passagens.");
        return;
    }

    // Redireciona para a página de passagens com os parâmetros na URL
    window.location.href = `/Assets/Pages/passagens.html?partida=${encodeURIComponent(
        pontoPartida
    )}&chegada=${encodeURIComponent(pontoChegada)}&data=${encodeURIComponent(dataViagem)}`;
});

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
                    input.value = resultado; // Define o valor selecionado no campo
                    sugestoes.innerHTML = ""; // Limpa as sugestões
                    sugestoes.classList.add("d-none");
                });
                sugestoes.appendChild(item);
            });

            if (resultados.length > 0) {
                sugestoes.classList.remove("d-none");
            }
        }
    });

    // Esconde as sugestões ao clicar fora
    document.addEventListener("click", (event) => {
        if (!sugestoes.contains(event.target) && event.target !== input) {
            sugestoes.classList.add("d-none");
        }
    });
}

// Configura o autocompletar para os campos de partida e chegada
configurarAutocomplete("pontoPartida", "sugestoesPartida");
configurarAutocomplete("pontoChegada", "sugestoesChegada");

// Adiciona evento aos botões "Reservar"
document.querySelectorAll(".reservar-btn").forEach((botao) => {
    botao.addEventListener("click", () => {
        const origem = botao.getAttribute("data-origem");
        const destino = botao.getAttribute("data-destino");

        // Armazena os dados no localStorage
        localStorage.setItem("rotaSelecionada", JSON.stringify({ origem, destino }));

        // Redireciona para a página de passagens
        window.location.href = "/Assets/Pages/passagens.html";
    });
});





