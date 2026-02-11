function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    window.scrollTo(0, 0);
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}
