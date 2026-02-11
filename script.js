const MI_TELEFONO = "51987654321";

let componenteActual = "";
let camposContador = 0;

// FUNCIONES DE NAVEGACIÓN
function showDashboard() {
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById('dashboard').style.display = 'grid';
}

function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// LOGICA SERIE/PARALELO DINÁMICO
function openSubCalc(tipo) {
    componenteActual = tipo;
    camposContador = 0;
    document.getElementById('sub-menu-conexiones').style.display = 'none';
    document.getElementById('ventana-calculo').style.display = 'block';
    document.getElementById('inputs-dinamicos').innerHTML = ""; 
    
    const titulos = { 'R': 'Resistencias (Ω)', 'C': 'Capacitores (µF)', 'L': 'Bobinas (µH)' };
    document.getElementById('titulo-sub-calc').innerText = titulos[tipo];
    
    agregarCampo();
    agregarCampo();
    actualizarDiagrama('serie');
}

function backToSubMenu() {
    document.getElementById('sub-menu-conexiones').style.display = 'block';
    document.getElementById('ventana-calculo').style.display = 'none';
}

function agregarCampo() {
    camposContador++;
    const container = document.getElementById('inputs-dinamicos');
    
    const div = document.createElement('div');
    div.className = "input-row";
    div.id = "row-" + camposContador;
    
    const input = document.createElement('input');
    input.type = "number";
    input.inputMode = "decimal";
    input.className = "val-input";
    input.placeholder = "Valor " + camposContador;
    
    div.appendChild(input);

    if (camposContador > 2) {
        const removeBtn = document.createElement('div');
        removeBtn.className = "remove-btn";
        removeBtn.innerHTML = "✕";
        removeBtn.onclick = function() { div.remove(); };
        div.appendChild(removeBtn);
    }

    container.appendChild(div);
}

function ejecutarCalculoDinamico(modo) {
    actualizarDiagrama(modo);
    const inputs = document.querySelectorAll('.val-input');
    let vals = [];
    
    inputs.forEach(i => {
        if(i.value !== "" && !isNaN(i.value)) {
            vals.push(parseFloat(i.value));
        }
    });

    if(vals.length < 2) {
        alert("Ingresa al menos 2 valores para calcular");
        return;
    }

    let total = 0;
    let u = componenteActual === 'R' ? " Ω" : (componenteActual === 'C' ? " µF" : " µH");

    if (componenteActual === 'R' || componenteActual === 'L') {
        if(modo === 'serie') {
            total = vals.reduce((a, b) => a + b, 0);
        } else {
            total = 1 / vals.reduce((a, b) => a + (1 / b), 0);
        }
    } else {
        if(modo === 'serie') {
            total = 1 / vals.reduce((a, b) => a + (1 / b), 0);
        } else {
            total = vals.reduce((a, b) => a + b, 0);
        }
    }
    
    document.getElementById('res-circuito').innerHTML = `Total ${modo.toUpperCase()}:<br>${total.toFixed(3)}${u}`;
}

function actualizarDiagrama(modo) {
    const cont = document.getElementById('diagrama-container');
    if(modo === 'serie') {
        cont.innerHTML = '<div style="width:70%; height:2px; background:#333; display:flex; justify-content:space-around; align-items:center;"><div style="width:15px; height:15px; border:2px solid #333; background:white;"></div><div style="width:15px; height:15px; border:2px solid #333; background:white;"></div></div>';
    } else {
        cont.innerHTML = '<div style="display:flex; flex-direction:column; gap:8px;"><div style="width:40px; height:12px; border:2px solid #333; background:white;"></div><div style="width:40px; height:12px; border:2px solid #333; background:white;"></div></div>';
    }
}

// OTRAS CALCULADORAS
function calcOhm() {
    let v = parseFloat(document.getElementById('v').value);
    let i = parseFloat(document.getElementById('i').value);
    let r = parseFloat(document.getElementById('r').value);
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerText = (v/i).toFixed(2) + " Ω";
    else if(v && r) res.innerText = (v/r).toFixed(2) + " A";
    else if(i && r) res.innerText = (i*r).toFixed(2) + " V";
}

function calcCap() {
    let c = document.getElementById('cap-code').value;
    if(c.length === 3) {
        let v = parseInt(c.substring(0,2)) * Math.pow(10, parseInt(c.substring(2)));
        document.getElementById('res-capac').innerText = v + " pF | " + (v/1000) + " nF";
    }
}

function calcSMD() {
    let c = document.getElementById('smd-code').value.toUpperCase();
    if(c.includes('R')) {
        document.getElementById('res-smd').innerText = c.replace('R', '.') + " Ω";
    } else if(c.length >= 3) {
        let v = parseInt(c.slice(0,-1)) * Math.pow(10, parseInt(c.slice(-1)));
        document.getElementById('res-smd').innerText = v >= 1000 ? (v/1000) + " kΩ" : v + " Ω";
    }
}

function sendWhatsApp() {
    const active = document.querySelector('.calc-section:not([style*="display: none"])');
    let msg = "Hola Franko, necesito ayuda con un cálculo.";
    if(active) {
        let res = active.querySelector('.result').innerText;
        msg = "Hola Franko! El resultado de mi cálculo es: " + res;
    }
    window.open(`https://wa.me/${MI_TELEFONO}?text=${encodeURIComponent(msg)}`, '_blank');
}


