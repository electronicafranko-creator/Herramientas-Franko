// 1. FUNCIONES DE NAVEGACIÓN (Controlan todas las ventanas)
function abrirHerramienta(id) {
    // Oculta todas las capas para que no se encimen
    const capas = document.querySelectorAll('.ventana-capa');
    capas.forEach(capa => {
        capa.style.display = 'none';
    });

    // Muestra la ventana que elegiste (Inicio, Conexiones o Calculadoras)
    const destino = document.getElementById(id);
    if (destino) {
        destino.style.display = 'block';
        window.scrollTo(0,0);
        
        // Si es la calculadora de colores, que calcule el valor inicial
        if(id === 'calc-colores') {
            calcularResistenciaColor();
        }
    } else {
        console.error("No se encontró la ventana: " + id);
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    
    // Lógica de retorno:
    // Si cierras una calculadora específica, vuelve al menú de calculadoras
    if(id === 'calc-colores') {
        document.getElementById('cat-calculadoras').style.display = 'block';
    } else {
        // Si cierras el menú principal o conexiones, vuelve al inicio
        // Asegúrate de que tu pantalla de inicio tenga el ID 'menu-principal' o similar
        const inicio = document.getElementById('cat-calculadoras'); 
        if(inicio) inicio.style.display = 'none';
    }
}

// 2. LÓGICA DE LA CALCULADORA DE COLORES (Sin simplificar resistencia)
function calcularResistenciaColor() {
    // Obtenemos los valores de los selectores
    const b1 = document.getElementById('band1').value;
    const b2 = document.getElementById('band2').value;
    const m = document.getElementById('multi').value;
    const t = document.getElementById('tol').value;

    // Cálculo matemático puro
    const resultado = (parseInt(b1 + b2)) * parseFloat(m);
    
    // Formateo de unidades (Ω, kΩ, MΩ)
    let unidad = " Ω";
    let valorFinal = resultado;

    if (resultado >= 1000000) {
        valorFinal = resultado / 1000000;
        unidad = " MΩ";
    } else if (resultado >= 1000) {
        valorFinal = resultado / 1000;
        unidad = " kΩ";
    }

    // Mostramos el resultado en el cuadro azul
    const cajaRes = document.getElementById('res-color-total');
    if(cajaRes) {
        cajaRes.innerHTML = `<strong>Valor: ${valorFinal}${unidad}</strong><br>Tolerancia: ±${t}%`;
    }
    
    // Actualizamos los colores del dibujo visual
    actualizarColoresDibujo();
}

function actualizarColoresDibujo() {
    const bands = ['band1', 'band2', 'multi', 'tol'];
    const visuals = ['v-band1', 'v-band2', 'v-multi', 'v-tol'];
    
    visuals.forEach((vId, index) => {
        const select = document.getElementById(bands[index]);
        const visual = document.getElementById(vId);
        if(select && visual) {
            visual.style.backgroundColor = select.options[select.selectedIndex].style.backgroundColor;
        }
    });
}
