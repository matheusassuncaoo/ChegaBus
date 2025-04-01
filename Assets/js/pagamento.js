// Função para alternar entre as abas
function mostrarAba(abaId) {
    const tab = new bootstrap.Tab(document.querySelector(`#${abaId}-tab`));
    tab.show();
}

// Manipula o formulário da Etapa 1 (Identificação)
document.getElementById("form-identificacao").addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    if (!nome) {
        alert("Por favor, preencha o nome.");
        return;
    }
    localStorage.setItem("dadosPagamento", JSON.stringify({ nome }));
    mostrarAba("dados-boleto");
});

// Manipula o formulário da Etapa 2 (Dados do Boleto)
document.getElementById("form-dados-boleto").addEventListener("submit", (event) => {
    event.preventDefault();
    const celular = document.getElementById("celular").value;
    if (!celular) {
        alert("Por favor, preencha o celular.");
        return;
    }
    const dadosPagamento = JSON.parse(localStorage.getItem("dadosPagamento")) || {};
    dadosPagamento.celular = celular;
    localStorage.setItem("dadosPagamento", JSON.stringify(dadosPagamento));
    mostrarAba("pagamento");
});

// Manipula o formulário da Etapa 3 (Pagamento)
document.getElementById("form-pagamento").addEventListener("submit", (event) => {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value;
    if (!cpf) {
        alert("Por favor, preencha o CPF.");
        return;
    }
    const dadosPagamento = JSON.parse(localStorage.getItem("dadosPagamento")) || {};
    dadosPagamento.cpf = cpf;
    localStorage.setItem("dadosPagamento", JSON.stringify(dadosPagamento));
    alert("Pagamento concluído com sucesso!");
    // Aqui você pode redirecionar para uma página de confirmação ou limpar o localStorage
    localStorage.removeItem("passagemSelecionada");
    localStorage.removeItem("dadosPagamento");
    window.location.href = "/Assets/Pages/dashboard.html";
});

// Manipula os botões "Voltar"
document.querySelector(".voltar-identificacao").addEventListener("click", (event) => {
    event.preventDefault();
    mostrarAba("identificacao");
});

document.querySelector(".voltar-dados-boleto").addEventListener("click", (event) => {
    event.preventDefault();
    mostrarAba("dados-boleto");
});

// Preenche os campos com dados salvos, se existirem
function preencherCampos() {
    const dadosPagamento = JSON.parse(localStorage.getItem("dadosPagamento")) || {};
    if (dadosPagamento.nome) {
        document.getElementById("nome").value = dadosPagamento.nome;
    }
    if (dadosPagamento.celular) {
        document.getElementById("celular").value = dadosPagamento.celular;
    }
    if (dadosPagamento.cpf) {
        document.getElementById("cpf").value = dadosPagamento.cpf;
    }
}

// Inicializa a página
preencherCampos();