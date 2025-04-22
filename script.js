const form = document.getElementById("form-gasto");
const lista = document.getElementById("lista-gastos");
const totalSpan = document.getElementById("total");

let total = 0;
let gastos = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);
  const categoria = document.getElementById("categoria").value;

  if (!nombre || !cantidad || !categoria) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const gasto = { nombre, cantidad, categoria };
  gastos.push(gasto);
  renderGasto(gasto);

  total += cantidad;
  totalSpan.textContent = total.toFixed(2);

  form.reset();
});

// Función para mostrar gasto + botón eliminar
function renderGasto({ nombre, cantidad, categoria }) {
  const li = document.createElement("li");
  li.classList.add("fade-in");
  li.innerHTML = `${nombre} - $${cantidad.toFixed(
    2
  )} [${categoria}] <button class="eliminar">❌</button>`;
  lista.appendChild(li);

  li.querySelector(".eliminar").addEventListener("click", () => {
    li.classList.add("fade-out");
    setTimeout(() => {
      lista.removeChild(li);
      total -= cantidad;
      totalSpan.textContent = total.toFixed(2);
      gastos = gastos.filter(
        (g) =>
          !(
            g.nombre === nombre &&
            g.cantidad === cantidad &&
            g.categoria === categoria
          )
      );
    }, 300); // espera a que termine la animación
  });
}

// Filtro de categoría
document.getElementById("filtro").addEventListener("change", function () {
  const categoriaSeleccionada = this.value;
  lista.innerHTML = "";
  total = 0;

  gastos
    .filter(
      (g) => !categoriaSeleccionada || g.categoria === categoriaSeleccionada
    )
    .forEach((g) => {
      renderGasto(g);
      total += g.cantidad;
    });

  totalSpan.textContent = total.toFixed(2);
});
