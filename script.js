// --- SISTEMA DE NAVEGACIÓN DE FRANKO ---

// Función para entrar a una categoría (Nivel 2)
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

// Función para volver al Menú Principal
function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

// Función para entrar a la herramienta final (Nivel 3)
function abrirHerramienta(id) {
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

// Función para volver a la categoría de Conexiones
function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}
