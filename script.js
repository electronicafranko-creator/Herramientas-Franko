function abrirSubventana(id) {
    document.getElementById('ventana-inicio').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}

function cerrarSubventana(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('ventana-inicio').style.display = 'block';
}

function abrirHerramienta(id) {
    document.querySelectorAll('.ventana-capa').forEach(v => v.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'herram-resistencias') { document.getElementById('lista-valores').innerHTML = ''; agregarFilaResistencia(); agregarFilaResistencia(); }
    if(id === 'herram-fuentes') { document.getElementById('lista-valores-fnt').innerHTML = ''; agregarFilaFuente(); agregarFilaFuente(); }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    const calcs = ['herram-ley-ohm'];
    document.getElementById(calcs.includes(id) ? 'cat-calculadoras' : 'cat-conexiones').style.display = 'block';
}

// LEY DE OHM (CON REDONDEO)
function calcularLeyOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);

    if(!isNaN(v) && !isNaN(i)) {
        document.getElementById('ohm-r').value = (v/i).toFixed(2);
        document.getElementById('ohm-p').value = (v*i).toFixed(2);
    } else if(!isNaN(v) && !isNaN(r)) {
        document.getElementById('ohm-i').value = (v/r).toFixed(2);
        document.getElementById('ohm-p').value = (v*v/r).toFixed(2);
    } else if(!isNaN(i) && !isNaN(r)) {
        document.getElementById('ohm-v').value = (i*r).toFixed(2);
        document.getElementById('ohm-p').value = (i*i*r).toFixed(2);
    }
}
function limpiarOhm() { document.querySelectorAll('.form-ohm input').forEach(inp => inp.value = ''); }

// FUENTES (CON REDONDEO)
function agregarFilaFuente() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="f-v" placeholder="V"><input type="number" class="f-a" placeholder="A">`;
    document.getElementById('lista-valores-fnt').appendChild(div);
}
function calcularFuentes() {
    let vs = [], as = [];
    document.querySelectorAll('.f-v').forEach(inp => { if(inp.value) vs.push(parseFloat(inp.value)); });
    document.querySelectorAll('.f-a').forEach(inp => { if(inp.value) as.push(parseFloat(inp.value)); });
    const modo = document.getElementById('modo-calculo-fnt').value;
    let tV = modo === 'serie' ? vs.reduce((a,b)=>a+b,0) : Math.max(...vs);
    let tA = modo === 'serie' ? Math.min(...as) : as.reduce((a,b)=>a+b,0);
    document.getElementById('resultado-v').innerText = `V Total: ${tV.toFixed(2)} V`;
    document.getElementById('resultado-a').innerText = `A Total: ${tA.toFixed(2)} A`;
}

// RESISTENCIAS
function agregarFilaResistencia() {
    const div = document.createElement('div'); div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="r-val" placeholder="0">`;
    document.getElementById('lista-valores').appendChild(div);
}
function calcularResistencias() {
    let vals = [];
    document.querySelectorAll('.r-val').forEach(inp => { if(inp.value) vals.push(parseFloat(inp.value)); });
    if(vals.length < 2) return;
    const modo = document.getElementById('modo-calculo').value;
    let total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    document.getElementById('resultado-final').innerText = `Total: ${total.toFixed(2)} Ω`;
}
