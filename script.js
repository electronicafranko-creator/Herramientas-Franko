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
    if(id === 'herram-resistencias') {
        document.getElementById('lista-valores').innerHTML = '';
        agregarFilaResistencia(); agregarFilaResistencia();
    }
}

function cerrarHerramienta(id) {
    document.getElementById(id).style.display = 'none';
    const esDeCalculadora = ['herram-ley-ohm'].includes(id);
    document.getElementById(esDeCalculadora ? 'cat-calculadoras' : 'cat-conexiones').style.display = 'block';
}

// Lógica Ohm
function calcularLeyOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let p = parseFloat(document.getElementById('ohm-p').value);

    if (!isNaN(v) && !isNaN(i)) {
        document.getElementById('ohm-r').value = (v / i).toFixed(2);
        document.getElementById('ohm-p').value = (v * i).toFixed(2);
    } else if (!isNaN(v) && !isNaN(r)) {
        document.getElementById('ohm-i').value = (v / r).toFixed(2);
        document.getElementById('ohm-p').value = ((v * v) / r).toFixed(2);
    } else if (!isNaN(i) && !isNaN(r)) {
        document.getElementById('ohm-v').value = (i * r).toFixed(2);
        document.getElementById('ohm-p').value = ((i * i) * r).toFixed(2);
    }
}

// Lógica Resistencias
function agregarFilaResistencia() {
    const div = document.createElement('div');
    div.className = 'fila-valor';
    div.innerHTML = `<input type="number" class="res-input" placeholder="0"> <span>Ω</span>`;
    document.getElementById('lista-valores').appendChild(div);
}

function calcularResistencias() {
    let vals = [];
    document.querySelectorAll('.res-input').forEach(inp => {
        if(inp.value) vals.push(parseFloat(inp.value));
    });
    if(vals.length < 1) return;
    let total = vals.reduce((a, b) => a + b, 0);
    document.getElementById('resultado-final').innerText = `Total: ${total.toFixed(2)} Ω`;
}

