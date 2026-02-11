// --- NAVEGACIÓN ---
function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    document.getElementById('cat-conexiones').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    if(id === 'herram-resistencias') {
        // Al abrir, empezamos con 2 filas vacías
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia();
        agregarFilaResistencia();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

// --- LÓGICA DE RESISTENCIAS ---

function agregarFilaResistencia() {
    const contenedor = document.getElementById('lista-valores');
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `
        <input type="number" class="res-input" placeholder="Valor" inputmode="decimal">
        <select class="unit-select">
            <option value="1">Ω</option>
            <option value="1000">kΩ</option>
            <option value="1000000">MΩ</option>
        </select>
    `;
    contenedor.appendChild(div);
}

function calcularResistencias() {
    const filas = document.querySelectorAll('.fila-valor');
    const modo = document.getElementById('modo-calculo').value;
    const factorResultado = parseFloat(document.getElementById('unidad-resultado').value);
    
    let valoresEnOhmios = [];

    filas.forEach(fila => {
        const num = parseFloat(fila.querySelector('.res-input').value);
        const multi = parseFloat(fila.querySelector('.unit-select').value);
        if (!isNaN(num) && num > 0) {
            valoresEnOhmios.push(num * multi);
        }
    });

    if (valoresEnOhmios.length < 2) {
        document.getElementById('resultado-final').innerText = "Mínimo 2 valores";
        return;
    }

    let resultadoFinalOhmios = 0;

    if (modo === 'serie') {
        resultadoFinalOhmios = valoresEnOhmios.reduce((a, b) => a + b, 0);
    } else {
        // Fórmula paralelo: 1 / (1/R1 + 1/R2 + ...)
        let sumaInversas = valoresEnOhmios.reduce((a, b) => a + (1 / b), 0);
        resultadoFinalOhmios = 1 / sumaInversas;
    }

    // Convertir a la unidad de salida elegida
    let totalConvertido = resultadoFinalOhmios / factorResultado;
    
    // Formatear para no mostrar demasiados decimales
    let textoResultado = totalConvertido.toLocaleString(undefined, { maximumFractionDigits: 3 });
    
    document.getElementById('resultado-final').innerText = `Total: ${textoResultado}`;
}
