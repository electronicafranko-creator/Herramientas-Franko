// --- SISTEMA DE NAVEGACIÓN POR CAPAS ---

// 1. Abrir una categoría (Nivel 2) desde el Inicio
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0); // Sube al inicio de la página
}

// 2. Volver al Inicio desde una categoría
function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

// 3. Abrir herramienta específica (Nivel 3)
function abrirHerramienta(id) {
    // Ocultamos la categoría de calculadoras
    document.getElementById('cat-calculadoras').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

// 4. Volver a la categoría desde la herramienta
function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-calculadoras').style.display = 'block';
}
