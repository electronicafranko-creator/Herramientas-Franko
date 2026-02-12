// === SECCIÓN NAVEGACIÓN ===
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
    document.querySelectorAll('.ventana-capa').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    if(id === 'herram-resistencias') {
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia(); agregarFilaResistencia();
        cambiarEsquema();
    } else if(id === 'herram-bobinas') {
        document.getElementById('lista-valores-bobina').innerHTML = '';
        agregarFilaBobina(); agregarFilaBobina();
        cambiarEsquemaBobina();
    } else if(id === 'herram-capacitores') {
        document.getElementById('lista-valores-cap').innerHTML = '';
        agregarFilaCapacitor(); agregarFilaCapacitor();
        cambiarEsquemaCapacitor();
    } else if(id === 'herram-fuentes') {
        document.getElementById('lista-valores-fnt').innerHTML = '';
        agregarFilaFuente(); agregarFilaFuente();
        cambiarEsquemaFuente();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('cat-conexiones').style.display = 'block';
}

// === LÓGICA CONEXIONES (RESISTENCIAS/BOBINAS/CAPS) ===
function calcularResistencias() {
    const filas = document.querySelectorAll('#lista-valores .fila-valor');
    const modo = document.getElementById('modo-calculo').value;
    const factor = parseFloat(document.getElementById('unidad-resultado').value);
    let vals = [];
    filas.forEach(f => {
        let v = parseFloat(f.querySelector('.res-input').value);
        let u = parseFloat(f.querySelector('.unit-select').value);
        if(!isNaN(v) && v > 0) vals.push(v * u);
    });
    if(vals.length < 2) { document.getElementById('resultado-final').innerText = "Total: --"; return; }
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final').innerText = `Total: ${(total/factor).toLocaleString()}`;
}
function agregarFilaResistencia() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="res-input" oninput="calcularResistencias()"><select class="unit-select" onchange="calcularResistencias()"><option value="1">Ω</option><option value="1000">kΩ</option></select>`;
    document.getElementById('lista-valores').appendChild(div);
}
function cambiarEsquema() { calcularResistencias(); }

// === SECCIÓN NUEVA: CALCULADORAS (AISLADA) ===
function navCalc(ocultar, mostrar) {
    document.getElementById(ocultar).style.display = 'none';
    document.getElementById(mostrar).style.display = 'block';
    if(mostrar === 'calc-colores') ejecutarCalculoColores();
}

function ejecutarCalculoColores() {
    const b1 = document.getElementById('band1').value;
    const b2 = document.getElementById('band2').value;
    const m = parseFloat(document.getElementById('multi').value);
    const resultado = (parseInt(b1 + b2) * m);
    let unidad = " Ω", valor = resultado;
    if (resultado >= 1000000) { valor = resultado / 1000000; unidad = " MΩ"; }
    else if (resultado >= 1000) { valor = resultado / 1000; unidad = " kΩ"; }
    document.getElementById('resultado-colores').innerHTML = "Total: " + valor + unidad;
}
