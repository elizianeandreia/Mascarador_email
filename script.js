var _a, _b, _c;
var listaEmails = [];
function maskEmail(email) {
    var _a = email.split("@"), name = _a[0], domain = _a[1];
    if (!domain || name.length <= 2)
        return email;
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1] + "@" + domain;
}
function adicionarEmail() {
    var input = document.getElementById("emailInput");
    var alerta = document.getElementById("alerta");
    var email = input.value.trim();
    if (!email.includes("@") || email.length < 5) {
        alerta.textContent = "Digite um e-mail válido.";
        alerta.classList.remove("d-none");
        return;
    }
    alerta.classList.add("d-none");
    listaEmails.push(email);
    input.value = "";
    renderizarLista();
}
function removerEmail(index) {
    listaEmails.splice(index, 1);
    renderizarLista();
}
function renderizarLista() {
    var ul = document.getElementById("listaEmails");
    ul.innerHTML = "";
    listaEmails.forEach(function (email, index) {
        var li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        var span = document.createElement("span");
        span.textContent = maskEmail(email);
        var btn = document.createElement("button");
        btn.className = "btn btn-danger btn-sm";
        btn.textContent = "Excluir";
        btn.onclick = function () { return removerEmail(index); };
        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}
function exportarCSV() {
    if (listaEmails.length === 0) {
        alert("Nenhum email para exportar.");
        return;
    }
    var csvContent = "data:text/csv;charset=utf-8,Email Mascarado\n";
    listaEmails.forEach(function (email) {
        csvContent += maskEmail(email) + "\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emails_mascarados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
(_a = document.getElementById("btnAdicionar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", adicionarEmail);
(_b = document.getElementById("btnExportar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", exportarCSV);
(_c = document.getElementById("emailInput")) === null || _c === void 0 ? void 0 : _c.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarEmail();
    }
});
