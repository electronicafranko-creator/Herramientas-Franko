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
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia();
        agregarFilaResistencia();
        cambiarEsquema(); // Asegura que empiece en serie
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

// Función clave para cambiar el esquema visual
function cambiarEsquema() {
    const modo = document.getElementById('modo-calculo').value;
    const boxSerie = document.getElementById('box-serie');
    const boxParalelo = document.getElementById('box-paralelo');

    if (modo === 'serie') {
        boxSerie.style.display = 'block';
        boxParalelo.style.display = 'none';
    } else {
        boxSerie.style.display = 'none';
        boxParalelo.style.display = 'block';
    }
    calcularResistencias();
}

function agregarFilaResistencia() {
    const contenedor = document.getElementById('lista-valores');
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `
        <input type="number" class="res-input" placeholder="0" oninput="calcularResistencias()" inputmode="decimal">
        <select class="unit-select" onchange="calcularResistencias()">
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
    const factorSalida = parseFloat(document.getElementById('unidad-resultado').value);
    
    let ohmios = [];
    filas.forEach(f => {
        const val = parseFloat(f.querySelector('.res-input').value);
        const uni = parseFloat(f.querySelector('.unit-select').value);
        if(!isNaN(val) && val > 0) ohmios.push(val * uni);
    });

    if(ohmios.length < 2) {
        document.getElementById('resultado-final').innerText = "Total: --";
        return;
    }

    let total = 0;
    if(modo === 'serie') {
        total = ohmios.reduce((a, b) => a + b, 0);
    } else {
        total = 1 / ohmios.reduce((a, b) => a + (1/b), 0);
    }

    let final = total / factorSalida;
    document.getElementById('resultado-final').innerText = `Total: ${final.toLocaleString(undefined, {maximumFractionDigits: 3})}`;
}
