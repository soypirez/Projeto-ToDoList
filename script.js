let agora = new Date();
let saudacao = document.getElementById("saudacao");
let hora = agora.getHours();

if (hora >= 0 && hora < 12) {
    saudacao.innerHTML = "Bom dia, <strong>Rafael Pires</strong> 👋";
} else if (hora >= 12 && hora < 18) {
    saudacao.innerHTML = "Boa tarde, <strong>Rafael Pires</strong> 👋";
} else {
    saudacao.innerHTML = "Boa noite, <strong>Rafael Pires</strong> 👋";
}

let tarefas = [];
let form = document.getElementById("form");
let listaTarefas = document.getElementById("listaTarefas");
let contador = document.getElementById("contador");
let noTasks = document.getElementById("noTasks");
let headerTarefas = document.getElementById("headerTarefas");

headerTarefas.style.display = "flex";
headerTarefas.classList.add("show");

contador.style.display = "none";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nomeTarefa").value.trim();
    if (nome === "") return;

    let data = new Date();
    let dataFormatada = `Criada em: ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;

    const tarefa = {
        nome,
        data: dataFormatada,
        concluida: false
    };

    tarefas.push(tarefa);
    atualizarLista();
    form.reset();
});

function atualizarLista() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        noTasks.style.display = "block";
        contador.style.display = "none"; 
    } else {
        noTasks.style.display = "none";
        contador.style.display = "block"; 
    }

    tarefas.forEach((tarefa, index) => {
        let div = document.createElement("div");
        div.classList.add("tarefa-box");
        if (tarefa.concluida) div.classList.add("concluida");

        div.innerHTML = `
            <div class="tarefa-info">
                <input type="checkbox" ${tarefa.concluida ? "checked" : ""} onclick="alternarConclusao(${index})">
                <div>
                    <span>${tarefa.nome}</span>
                    <small>${tarefa.data}</small>
                </div>
            </div>
            <button onclick="removerTarefa(${index})">🗑️</button>
        `;

        listaTarefas.appendChild(div);
    });

    atualizarContador();
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    atualizarLista();
}

function alternarConclusao(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    atualizarLista();
}

function atualizarContador() {
    let total = tarefas.length;
    let concluidas = tarefas.filter(t => t.concluida).length;

    if (total > 0) {
        contador.innerHTML = `<span style="color:#000;">${concluidas} de ${total}</span> <span style="color:#27ae60;">concluídas</span>`;
    } else {
        contador.innerHTML = "";
    }
}
