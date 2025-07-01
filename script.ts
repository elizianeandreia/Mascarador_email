const listaEmails: string[] = [];

function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain || name.length <= 2) return email;
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1] + "@" + domain;
}

function adicionarEmail(): void {
  const input = document.getElementById("emailInput") as HTMLInputElement;
  const alerta = document.getElementById("alerta") as HTMLDivElement;
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

function removerEmail(index: number): void {
  listaEmails.splice(index, 1);
  renderizarLista();
}

function renderizarLista(): void {
  const ul = document.getElementById("listaEmails") as HTMLUListElement;
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

function exportarCSV(): void {
  if (listaEmails.length === 0) {
    alert("Nenhum email para exportar.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,Email Mascarado\n";
  listaEmails.forEach(email => {
    csvContent += maskEmail(email) + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "emails_mascarados.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("btnAdicionar")?.addEventListener("click", adicionarEmail);
document.getElementById("btnExportar")?.addEventListener("click", exportarCSV);
document.getElementById("emailInput")?.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    adicionarEmail();
  }
});