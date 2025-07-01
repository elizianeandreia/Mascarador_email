"use strict";
var _a, _b, _c;
const listaEmails = [];
function maskEmail(email) {
    const [name, domain] = email.split("@");
    if (!domain || name.length <= 2)
        return email;
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1] + "@" + domain;
}
function adicionarEmail() {
    const input = document.getElementById("emailInput");
    const alerta = document.getElementById("alerta");
    const email = input.value.trim();
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
    const ul = document.getElementById("listaEmails");
    ul.innerHTML = "";
    listaEmails.forEach((email, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        const span = document.createElement("span");
        span.textContent = maskEmail(email);
        const btn = document.createElement("button");
        btn.className = "btn btn-danger btn-sm";
        btn.textContent = "Excluir";
        btn.onclick = () => removerEmail(index);
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

  let csvContent = "data:text/csv;charset=utf-8,Email,Mascarado\n";

  listaEmails.forEach(email => {
    csvContent += `${email},${maskEmail(email)}\n`;
  });
     const _a, _b, _c;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emails_mascarados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
(_a = document.getElementById("btnAdicionar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", adicionarEmail);
(_b = document.getElementById("btnExportar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", exportarCSV);
(_c = document.getElementById("emailInput")) === null || _c === void 0 ? void 0 : _c.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        adicionarEmail();
    }
});
