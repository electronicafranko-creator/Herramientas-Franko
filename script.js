// --- FUNCIONES DE NAVEGACIÓN ---

// Abre una categoría desde el menú principal
function abrirSubventana(idSub) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(idSub).style.display = 'block';
}

// Cierra la categoría y vuelve al inicio
function cerrarSubventana(idSub) {
    document.getElementById(idSub).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

// Abre la herramienta final (Nivel 3)
function abrirHerramienta(idHerram) {
    // Buscamos la categoría abierta para ocultarla
    document.getElementById('cat-calculadoras').style.display = 'none';
    document.getElementById(idHerram).style.display = 'block';
}

// Cierra la herramienta y vuelve a su categoría (Nivel 2)
function cerrarHerramienta(idHerram) {
    document.getElementById(idHerram).style.display = 'none';
    document.getElementById('cat-calculadoras').style.display = 'block';
}
