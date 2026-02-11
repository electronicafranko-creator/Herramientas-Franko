/**
 * LÓGICA DE NAVEGACIÓN
 */
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
    
    // Al abrir resistencias, inicializamos con dos filas
    if(id === 'herram-resistencias') {
        const contenedor = document.getElementById('lista-valores');
        contenedor.innerHTML = '';
        agregarFilaResistencia();
        agregarFilaResistencia();
        cambiarEsquema(); // Carga el esquema inicial (Serie)
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

/**
 * LÓGICA DE INTERCAMBIO DE IMÁGENES DE ESQUEMA
 */
function cambiarEsquema() {
    const modo = document.getElementById('modo-calculo').value;
    const imgSerie = document.getElementById('img-serie');
    const imgParalelo = document.getElementById('img-paralelo');

    if (modo === 'serie') {
        imgSerie.style.display = 'block';
        imgParalelo.style.display = 'none';
    } else {
        imgSerie.style.display = 'none';
        imgParalelo.style.display = 'block';
    }
    
    // Recalcula automáticamente al cambiar el modo
    calcularResistencias();
}

/**
 * LÓGICA DE CÁLCULOS MATEMÁTICOS
 */

function agregarFilaResistencia() {
    const contenedor = document.getElementById('lista-valores');
    const divFila = document.createElement('div');
    divFila.className = 'fila-valor';
    
    divFila.innerHTML = `
        <input type="number" class="res-input" placeholder="Valor" oninput="calcularResistencias()" inputmode="decimal">
        <select class="unit-select" onchange="calcularResistencias()">
            <option value="1">Ω</option>
            <option value="1000">kΩ</option>
            <option value="1000000">MΩ</option>
        </select>
    `;
    contenedor.appendChild(divFila);
}

function calcularResistencias() {
    const filas = document.querySelectorAll('.fila-valor');
    const modo = document.getElementById('modo-calculo').value;
    const factorSalida = parseFloat(document.getElementById('unidad-resultado').value);
    
    let valoresEnOhmios = [];

    // Recolectar datos de los inputs
    filas.forEach(fila => {
        const inputVal = parseFloat(fila.querySelector('.res-input').value);
        const multiplicador = parseFloat(fila.querySelector('.unit-select').value);
        
        if (!isNaN(inputVal) && inputVal > 0) {
            valoresEnOhmios.push(inputVal * multiplicador);
        }
    });

    // Validar que haya al menos dos resistencias para calcular
    if (valoresEnOhmios.length < 2) {
        document.getElementById('resultado-final').innerText = "Total: --";
        return;
    }

    let resistenciaTotalOhmios = 0;

    if (modo === 'serie') {
        // SERIE: RT = R1 + R2 + ... + Rn
        resistenciaTotalOhmios = valoresEnOhmios.reduce((acc, val) => acc + val, 0);
    } else {
        // PARALELO: RT = 1 / ( (1/R1) + (1/R2) + ... + (1/Rn) )
        let sumaInversas = valoresEnOhmios.reduce((acc, val) => acc + (1 / val), 0);
        resistenciaTotalOhmios = 1 / sumaInversas;
    }

    // Conversión a la unidad seleccionada para el resultado
    let resultadoFinal = resistenciaTotalOhmios / factorSalida;

    // Formateo de texto
    let textoFinal = resultadoFinal.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    });

    document.getElementById('resultado-final').innerText = `Total: ${textoFinal}`;
}
