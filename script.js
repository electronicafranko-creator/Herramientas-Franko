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
    // Inicializar filas
    if(id.includes('res')) { document.getElementById('lista-res').innerHTML = ''; agregarFila('res'); agregarFila('res'); }
    if(id.includes('bob')) { document.getElementById('lista-bob').innerHTML = ''; agregarFila('bob'); agregarFila('bob'); }
    if(id.includes('cap')) { document.getElementById('lista-cap').innerHTML = ''; agregarFila('cap'); agregarFila('cap'); }
    if(id.includes('fuentes')) { document.getElementById('lista-fnt').innerHTML = ''; agregarFilaFuente(); agregarFilaFuente(); }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    const esCalculadora = id === 'herram-ley-ohm';
    document.getElementById(esCalculadora ? 'cat-calculadoras' : 'cat-conexiones').style.display = 'block';
}

// GENÉRICO: Resistencias, Bobinas, Capacitores
function agregarFila(tipo) {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="${tipo}-input" placeholder="0"> <span>${tipo === 'res' ? 'Ω' : (tipo === 'bob' ? 'µH' : 'µF')}</span>`;
    document.getElementById(`lista-${tipo}`).appendChild(div);
}

function calcular(tipo) {
    let vals = [];
    document.querySelectorAll(`.${tipo}-input`).forEach(i => { if(i.value) vals.push(parseFloat(i.value)); });
    if(vals.length < 1) return;
    const modo = document.getElementById(`modo-${tipo}`).value;
    let total = 0;
    
    // Lógica especial para Capacitores (Inversa a Res/Bob)
    if(tipo === 'cap') {
        total = modo === 'paralelo' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    } else {
        total = modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    }
    document.getElementById(`${tipo}-total`).innerText = `Total: ${total.toFixed(2)}`;
}

// FUENTES
function agregarFilaFuente() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="f-v" placeholder="V"> <input type="number" class="f-a" placeholder="A">`;
    document.getElementById('lista-fnt').appendChild(div);
}

function calcularFuentes() {
    let vs = [], as = [];
    document.querySelectorAll('.f-v').forEach(v => { if(v.value) vs.push(parseFloat(v.value)); });
    document.querySelectorAll('.f-a').forEach(a => { if(a.value) as.push(parseFloat(a.value)); });
    const modo = document.getElementById('modo-fnt').value;
    let tv = modo === 'serie' ? vs.reduce((a,b)=>a+b,0) : Math.max(...vs);
    let ta = modo === 'serie' ? Math.min(...as) : as.reduce((a,b)=>a+b,0);
    document.getElementById('fnt-v-total').innerText = `V Total: ${tv.toFixed(2)} V`;
    document.getElementById('fnt-a-total').innerText = `A Total: ${ta.toFixed(2)} A`;
}

// OHM
function calcularOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);
    if(!isNaN(v) && !isNaN(i)) { document.getElementById('ohm-r').value = (v/i).toFixed(2); document.getElementById('ohm-p').value = (v*i).toFixed(2); }
    else if(!isNaN(v) && !isNaN(r)) { document.getElementById('ohm-i').value = (v/r).toFixed(2); document.getElementById('ohm-p').value = (v*v/r).toFixed(2); }
    else if(!isNaN(i) && !isNaN(r)) { document.getElementById('ohm-v').value = (i*r).toFixed(2); document.getElementById('ohm-p').value = (i*i*r).toFixed(2); }
}
