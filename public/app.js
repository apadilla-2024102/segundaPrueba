const estado = { categoria: "todos", categorias: [], productos: [] };
const { escapar, precioHTML, sinFotoHTML, textoBoton, ordenar, tarjetaHTML, categoriaHTML, contadorTexto } = window.Plantillas;
const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
const punteroFino = window.matchMedia("(hover: hover) and (pointer: fine)");
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
window.movimientoListo = true;

// ---------- Entradas escalonadas al aparecer en pantalla ----------
const observador = "IntersectionObserver" in window
    ? new IntersectionObserver((entradas) => {
        entradas.filter((e) => e.isIntersecting).forEach((e, i) => {
            // 50 ms entre tarjetas, con tope para que nunca se sienta lento
            e.target.style.transitionDelay = Math.min(i * 50, 300) + "ms";
            e.target.classList.add("visible");
            observador.unobserve(e.target);
        });
    }, { rootMargin: "0px 0px -40px 0px" })
    : null;

// "yaVistos" evita que lo que ya estaba en pantalla (lo pintó el servidor)
// desaparezca y vuelva a entrar cuando llegan los datos.
function revelar(elementos, yaVistos) {
    elementos.forEach((el, i) => {
        el.classList.add("revelar");
        if (!observador || (yaVistos && yaVistos(el, i))) el.classList.add("visible");
        else observador.observe(el);
    });
}

function claveTarjeta(el) {
    const b = el.querySelector("[data-detalle]");
    return b ? b.dataset.detalle : "";
}

// ---------- Categorías y filtros ----------
function pintarCategorias() {
    const lista = document.getElementById("categorias");
    const vistas = Array.from(lista.querySelectorAll("li"), (li) => li.classList.contains("visible"));
    lista.innerHTML = estado.categorias.map(categoriaHTML).join("");
    revelar(lista.querySelectorAll("li"), (el, i) => vistas[i]);

    const contar = (id) => estado.productos.filter((p) => p.categoria === id).length;
    const filtros = [{ id: "todos", nombre: "Todos", total: estado.productos.length }]
        .concat(estado.categorias.map((c) => ({ id: c.id, nombre: c.nombre, total: contar(c.id) })));

    // Dos pistas encimadas: la de botones reales y una copia oscura recortada
    // sobre el filtro activo (ver .filtros-activo en styles.css).
    const etiqueta = (f) => escapar(f.nombre) + '<span>' + f.total + '</span>';
    document.getElementById("filtros").innerHTML =
        '<div class="filtros-pista">' + filtros.map((f) =>
            '<button class="filtro" data-categoria="' + f.id + '" aria-pressed="false">' + etiqueta(f) + '</button>'
        ).join("") + '</div>' +
        '<div class="filtros-pista filtros-activo" aria-hidden="true">' + filtros.map((f) =>
            '<span class="filtro">' + etiqueta(f) + '</span>'
        ).join("") + '</div>';

    document.querySelectorAll("[data-categoria]").forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.categoria;
            // Tocar una categoría ya activa en la fila de fotos vuelve a "Todos"
            const elegida = boton.classList.contains("categoria") && estado.categoria === id ? "todos" : id;
            filtrar(elegida);
            if (boton.classList.contains("categoria")) {
                document.getElementById("productos").scrollIntoView();
            }
        });
    });
}

function moverPildora(sinTransicion) {
    const activo = document.querySelector(".filtros-activo");
    const boton = document.querySelector('.filtros-pista .filtro[aria-pressed="true"]');
    if (!activo || !boton) return;
    const izquierda = boton.offsetLeft;
    const derecha = boton.parentElement.offsetWidth - izquierda - boton.offsetWidth;
    if (sinTransicion) activo.style.transition = "none";
    activo.style.clipPath = "inset(0 " + derecha + "px 0 " + izquierda + "px round 999px)";
    if (sinTransicion) {
        activo.offsetWidth; // aplica el recorte antes de devolver la transición
        activo.style.transition = "";
    }
}

function filtrar(id, inicial) {
    const cambio = estado.categoria !== id;
    estado.categoria = id;
    document.querySelectorAll("[data-categoria]").forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.categoria === id));
    });
    moverPildora(inicial);
    pintarProductos(inicial || !cambio);
}

window.addEventListener("resize", () => moverPildora(true));
if (document.fonts) document.fonts.ready.then(() => moverPildora(true));

// ---------- Productos ----------
function pintarProductos(conservar) {
    const lista = ordenar(estado.categoria === "todos"
        ? estado.productos
        : estado.productos.filter((p) => p.categoria === estado.categoria));

    const categoria = estado.categorias.find((c) => c.id === estado.categoria);
    document.getElementById("contador").textContent = contadorTexto(lista.length, categoria);
    const rejilla = document.getElementById("rejilla");
    const vistos = new Set(Array.from(rejilla.querySelectorAll(".producto.visible, .producto:not(.revelar)"), claveTarjeta));
    rejilla.innerHTML = lista.map(tarjetaHTML).join("");
    revelar(rejilla.querySelectorAll(".producto"), conservar ? (el) => vistos.has(claveTarjeta(el)) : null);

    document.querySelectorAll("[data-detalle]").forEach((b) => {
        b.addEventListener("click", () => abrirDetalle(Number(b.dataset.detalle)));
    });
}

// ---------- Detalle del producto ----------
const detalle = document.getElementById("detalle");
const galeria = { fotos: [], actual: 0, nombre: "" };

function verFoto(i, animar) {
    const total = galeria.fotos.length;
    if (!total) return;
    galeria.actual = (i + total) % total;
    const imagen = document.getElementById("detalle-imagen");
    imagen.src = galeria.fotos[galeria.actual];
    // Un leve desenfoque une la foto vieja con la nueva en vez de "saltar"
    if (animar && imagen.animate) {
        imagen.animate(reducido.matches
            ? [{ opacity: 0.6 }, { opacity: 1 }]
            : [{ opacity: 0.6, filter: "blur(3px)", transform: "scale(1.015)" }, { opacity: 1, filter: "blur(0)", transform: "none" }],
            { duration: 260, easing: EASE_OUT });
    }
    imagen.alt = galeria.nombre + ", foto " + (galeria.actual + 1) + " de " + total;
    document.getElementById("foto-contador").textContent = (galeria.actual + 1) + " / " + total;
    document.querySelectorAll("#detalle-miniaturas button").forEach((b, j) => {
        b.setAttribute("aria-current", String(galeria.actual === j));
    });
}

function abrirDetalle(id) {
    const p = estado.productos.find((x) => x.id === id);
    if (!p) return;

    galeria.fotos = p.imagenes;
    galeria.nombre = p.nombre;
    galeria.actual = 0;
    const hayFotos = p.imagenes.length > 0;
    const variasFotos = p.imagenes.length > 1;

    document.getElementById("detalle-imagen").hidden = !hayFotos;
    const sinFoto = document.getElementById("detalle-sin-foto");
    sinFoto.hidden = hayFotos;
    sinFoto.innerHTML = sinFotoHTML();
    ["foto-anterior", "foto-siguiente", "foto-contador"].forEach((id) => {
        document.getElementById(id).hidden = !variasFotos;
    });

    const miniaturas = document.getElementById("detalle-miniaturas");
    miniaturas.innerHTML = variasFotos
        ? p.imagenes.map((src, i) =>
            '<button aria-label="Ver foto ' + (i + 1) + ' de ' + p.imagenes.length + '"><img src="' + src + '" alt=""></button>'
        ).join("")
        : "";
    miniaturas.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => verFoto(i, true)));

    const categoria = estado.categorias.find((c) => c.id === p.categoria);
    const filas = []
        .concat(p.marca ? [["Marca", p.marca]] : [])
        .concat(p.specs || [])
        .concat(categoria ? [["Categoría", categoria.nombre]] : [])
        .concat(p.cantidad ? [["Disponibles", p.cantidad === 1 ? "1 pieza" : p.cantidad + " piezas"]] : []);
    document.getElementById("detalle-specs").innerHTML = filas.map(([nombre, valor]) =>
        '<div><dt>' + escapar(nombre) + '</dt><dd>' + escapar(valor) + '</dd></div>'
    ).join("");

    document.getElementById("detalle-marca").textContent = p.marca || "";
    document.getElementById("detalle-nombre").textContent = p.nombre;
    document.getElementById("detalle-desc").textContent = p.desc;
    document.getElementById("detalle-precio").innerHTML = precioHTML(p);
    document.getElementById("detalle-pedir").href = p.whatsapp;
    document.getElementById("detalle-pedir").textContent = textoBoton(p);
    document.getElementById("detalle-cantidad").textContent = p.cantidad === 1 ? "Última pieza disponible" : "";
    verFoto(0);

    if (bienvenida.open) bienvenida.close();
    detalle.classList.remove("cerrando");
    if (!detalle.open) detalle.showModal();
    detalle.scrollTop = 0;
}

document.getElementById("foto-anterior").addEventListener("click", () => verFoto(galeria.actual - 1, true));
document.getElementById("foto-siguiente").addEventListener("click", () => verFoto(galeria.actual + 1, true));

// Flechas del teclado (sin animación: el teclado se usa rápido y seguido)
// y deslizar con el dedo para cambiar de foto
detalle.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") verFoto(galeria.actual - 1);
    if (e.key === "ArrowRight") verFoto(galeria.actual + 1);
});

let toqueInicio = null;
const escenario = document.getElementById("detalle-escenario");
escenario.addEventListener("touchstart", (e) => { toqueInicio = e.touches[0].clientX; }, { passive: true });
escenario.addEventListener("touchend", (e) => {
    if (toqueInicio === null) return;
    const distancia = e.changedTouches[0].clientX - toqueInicio;
    if (Math.abs(distancia) > 40) verFoto(galeria.actual + (distancia < 0 ? 1 : -1), true);
    toqueInicio = null;
});

// ---------- Ventanas: cerrar con el botón, Escape o tocando afuera ----------
// Con el botón o tocando afuera la ventana sale con una animación corta;
// con Escape cierra al instante, como espera quien usa el teclado.
function cerrarVentana(d) {
    if (!d.open || d.classList.contains("cerrando")) return;
    d.classList.add("cerrando");
    const terminar = () => {
        clearTimeout(respaldo);
        d.removeEventListener("animationend", alTerminar);
        if (!d.classList.contains("cerrando")) return; // se volvió a abrir a medio cierre
        d.classList.remove("cerrando");
        d.close();
    };
    const alTerminar = (e) => { if (e.target === d) terminar(); };
    const respaldo = setTimeout(terminar, 400);
    d.addEventListener("animationend", alTerminar);
}

document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
        if (e.target === d || e.target.closest("[data-cerrar]")) cerrarVentana(d);
    });
});

// ---------- Bienvenida con mensaje de interés (una vez por visita) ----------
const bienvenida = document.getElementById("bienvenida");

function yaSeMostro() {
    try { return sessionStorage.getItem("bienvenida") === "1"; } catch (e) { return false; }
}

setTimeout(() => {
    if (yaSeMostro() || detalle.open) return;
    bienvenida.showModal();
    try { sessionStorage.setItem("bienvenida", "1"); } catch (e) { /* sin almacenamiento */ }
}, 1500);

// ---------- Aviso al abrir WhatsApp (al estilo de Sonner) ----------
const avisoWA = document.createElement("div");
avisoWA.className = "aviso-wa";
avisoWA.setAttribute("role", "status");
avisoWA.innerHTML = '<p><strong>Abriendo WhatsApp</strong><span>Tu mensaje ya va escrito, solo envíalo.</span></p>';
avisoWA.prepend(document.querySelector(".wa-fijo svg").cloneNode(true));
document.body.appendChild(avisoWA);

const aviso = { restante: 0, inicio: 0, temporizador: null };

function correrAviso() {
    clearTimeout(aviso.temporizador);
    aviso.inicio = Date.now();
    aviso.temporizador = setTimeout(() => avisoWA.classList.remove("visible"), aviso.restante);
}

document.addEventListener("click", (e) => {
    if (!e.target.closest('a[href^="https://wa.me/"]')) return;
    avisoWA.classList.add("visible");
    aviso.restante = 3200;
    correrAviso();
});

// Al abrir WhatsApp la pestaña queda oculta: el aviso espera a que vuelvas.
document.addEventListener("visibilitychange", () => {
    if (!avisoWA.classList.contains("visible")) return;
    if (document.hidden) {
        clearTimeout(aviso.temporizador);
        aviso.restante = Math.max(1200, aviso.restante - (Date.now() - aviso.inicio));
    } else {
        correrAviso();
    }
});

// ---------- Barra superior: sombra al desplazarse ----------
const barra = document.querySelector(".barra");
const marcarBarra = () => barra.classList.toggle("desplazada", window.scrollY > 8);
window.addEventListener("scroll", marcarBarra, { passive: true });
marcarBarra();

// ---------- Vitrina: los arcos siguen al cursor con inercia ----------
// Es decorativo, por eso solo con ratón y sin movimiento reducido.
(function () {
    const vitrina = document.querySelector(".vitrina");
    if (!vitrina || !punteroFino.matches || reducido.matches) return;
    const arcos = Array.from(vitrina.querySelectorAll(".arco"));
    const fuerza = [12, 26, 20];
    const meta = { x: 0, y: 0 };
    const actual = { x: 0, y: 0 };
    let corriendo = false;

    function paso() {
        actual.x += (meta.x - actual.x) * 0.08;
        actual.y += (meta.y - actual.y) * 0.08;
        arcos.forEach((a, i) => {
            a.style.transform = "translate3d(" + (-actual.x * fuerza[i]).toFixed(2) + "px, " + (-actual.y * fuerza[i]).toFixed(2) + "px, 0)";
        });
        corriendo = Math.abs(meta.x - actual.x) + Math.abs(meta.y - actual.y) > 0.001;
        if (corriendo) requestAnimationFrame(paso);
    }

    function empujar() { if (!corriendo) { corriendo = true; requestAnimationFrame(paso); } }

    const portada = document.querySelector(".portada");
    portada.addEventListener("pointermove", (e) => {
        const r = vitrina.getBoundingClientRect();
        meta.x = (e.clientX - (r.left + r.width / 2)) / r.width;
        meta.y = (e.clientY - (r.top + r.height / 2)) / r.height;
        empujar();
    });
    portada.addEventListener("pointerleave", () => { meta.x = 0; meta.y = 0; empujar(); });
})();

// Lo que pintó el servidor entra escalonado mientras llegan los datos
revelar(document.querySelectorAll("#categorias li"));
revelar(document.querySelectorAll("#rejilla .producto"));

// ---------- Cargar datos del servidor ----------
Promise.all([
    fetch("/api/categorias").then((r) => r.json()),
    fetch("/api/productos").then((r) => r.json()),
    fetch("/api/contacto").then((r) => r.json())
]).then(([categorias, productos, contactos]) => {
    estado.categorias = categorias;
    estado.productos = productos;
    pintarCategorias();
    filtrar("todos", true);

    document.querySelectorAll("[data-numero]").forEach((a) => {
        const c = contactos.find((x) => x.numero === a.dataset.numero);
        if (!c) return;
        a.href = c.whatsapp;
        a.target = "_blank";
        a.rel = "noopener";
    });
}).catch(() => {
    document.getElementById("contador").textContent =
        "No se pudo cargar el catálogo. Recarga la página o escríbenos por WhatsApp.";
});

document.getElementById("anio").textContent = new Date().getFullYear();
