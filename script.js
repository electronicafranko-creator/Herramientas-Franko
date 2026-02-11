// Función para cambiar entre pantallas principales
function irA(seccionId) {
    // Ocultar todas las secciones del app
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('seccion-calculos').style.display = 'none';

    // Mostrar solo la que necesitamos
    document.getElementById(seccionId).style.display = 'block';
}

// Función para entrar a la configuración de R, C o L
function abrirConfiguracion(tipo) {
    document.getElementById('submenu-componentes').style.display = 'none';
    document.getElementById('configuracion-final').style.display = 'block';
    
    let nombre = "";
    if(tipo === 'R') nombre = "Configurar Resistencias";
    if(tipo === 'C') nombre = "Configurar Capacitores";
    if(tipo === 'L') nombre = "Configurar Bobinas";
    
    document.getElementById('titulo-componente').innerText = nombre;
}

// Función para retroceder un paso dentro de calculadoras
function volverAlSubmenu() {
    document.getElementById('configuracion-final').style.display = 'none';
    document.getElementById('submenu-componentes').style.display = 'block';
}

