const MI_TELEFONO = "51987654321";

const colorMap = [
    { name: "Negro", val: 0, mul: 1, tol: null, hex: "#000000" },
    { name: "Marrón", val: 1, mul: 10, tol: 1, hex: "#8B4513" },
    { name: "Rojo", val: 2, mul: 100, tol: 2, hex: "#FF0000" },
    { name: "Naranja", val: 3, mul: 1000, tol: null, hex: "#FFA500" },
    { name: "Amarillo", val: 4, mul: 10000, tol: null, hex: "#FFFF00" },
    { name: "Verde", val: 5, mul: 100000, tol: 0.5, hex: "#008000" },
    { name: "Azul", val: 6, mul: 1000000, tol: 0.25, hex: "#0000FF" },
    { name: "Violeta", val: 7, mul: 10000000, tol: 0.1, hex: "#EE82EE" },
    { name: "Gris", val: 8, mul: null, tol: 0.05, hex: "#808080" },
    { name: "Blanco", val: 9, mul: null, tol: null, hex: "#FFFFFF" },
    { name: "Oro", val: null, mul: 0.1, tol: 5, hex: "#FFD700" },
    { name: "Plata", val: null, mul: 0.01, tol: 10, hex: "#C0C0C0" }
];

let componenteActual = "";
let camposContador = 0;

// Inicializar el botón "+" fuera de la función para que no se dupliquen eventos
document.getElementById('btn-add-val').addEventListener('click', agregarCampo);

function showDashboard() {
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById('dashboard').style.display = 'grid';
}

function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'colors') changeBandType();
    if(id === 'induct') initInduct();
    if(id === 'conexiones') backToSubMenu();
}

// LOGICA SERIE/PARALELO
function openSubCalc(tipo) {
    componenteActual = tipo;
    camposContador = 0;
    document.getElementById('sub-menu-conexiones').style.display = 'none';
    document.getElementById('ventana-calculo').style.display = 'block';
    document.getElementById('inputs-dinamicos').innerHTML = ""; // Limpiar
    
    document.getElementById('titulo-sub-calc').innerText = tipo === 'R' ? "Resistencias (Ω)" : (tipo === 'C' ? "Capacitores (µF)" : "Bobinas (µH)");
    
    agregarCampo(); // Campo 1
    agregarCampo(); // Campo 2
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
    div.id = `row-${camposContador}`;
    
    const input = document.createElement('input');
    input.type = "number";
    input.className = "val-input";
    input.placeholder = `Valor ${camposContador}`;
    
    div.appendChild(input);

    if (camposContador > 2) {
        const removeBtn = document.createElement('span');
        removeBtn.className = "remove-btn";
        removeBtn.innerHTML = "✕";
        removeBtn.onclick = function() { div.remove(); };
        div.appendChild(removeBtn);
    }

    container.appendChild(div);
}

function actualizarDiagrama(modo) {
    const container = document.getElementById('diagrama-container');
    if (modo === 'serie') {
        container.innerHTML = `<div class="esquema-linea"></div><div class="componente-dibujo"></div><div class="componente-dibujo"></div><div class="componente-dibujo"></div>`;
    } else {
        container.innerHTML = `<div class="esquema-linea" style="width:2px; height:50px; left:20%;"></div><div class="paralelo-dibujo"><div class="componente-dibujo"></div><div class="componente-dibujo"></div></div><div class="esquema-linea" style="width:2px; height:50px; right:20%;"></div>`;
    }
}

function ejecutarCalculoDinamico(modo) {
    actualizarDiagrama(modo);
    const inputs = document.querySelectorAll('.val-input');
    let vals = [];
    inputs.forEach(i => { if(i.value && !isNaN(i.value)) vals.push(parseFloat(i.value)); });
    
    if(vals.length < 2) {
        document.getElementById('res-circuito').innerHTML = "Mínimo 2 valores";
        return;
    }

    let total = 0;
    let u = componenteActual === 'R' ? " Ω" : (componenteActual === 'C' ? " µF" : " µH");

    if (componenteActual === 'R' || componenteActual === 'L') {
        total = (modo === 'serie') ? vals.reduce((a,b)=>a+b, 0) : 1 / vals.reduce((a,b)=>a+(1/b), 0);
    } else {
        total = (modo === 'serie') ? 1 / vals.reduce((a,b)=>a+(1/b), 0) : vals.reduce((a,b)=>a+b, 0);
    }
    document.getElementById('res-circuito').innerHTML = `Total ${modo}:<br>${total.toFixed(2)}${u}`;
}

// RESTO DE FUNCIONES (OHM, SMD, ETC.)
function changeBandType() {
    const type = document.getElementById('num-bands').value;
    const container = document.getElementById('controls-container'); container.innerHTML = "";
    const struct = type === "4" ? ["Banda 1", "Banda 2", "Multiplicador", "Tolerancia"] : ["Banda 1", "Banda 2", "Banda 3", "Multiplicador", "Tolerancia"];
    struct.forEach((label, i) => {
        let opt = ""; colorMap.forEach((c, idx) => {
            if(label.includes("Banda") && c.val === null) return;
            if(label === "Tolerancia" && c.tol === null) return;
            opt += `<option value="${idx}">${c.name}</option>`;
        });
        container.innerHTML += `<div class="control-group"><label>${label}</label><select id="sel-${i}" onchange="calculate()"> ${opt} </select></div>`;
    });
    calculate();
}

function calculate() {
    const type = document.getElementById('num-bands').value;
    document.getElementById('v-band3').style.display = (type === "4") ? "none" : "block";
    let v1 = colorMap[document.getElementById('sel-0').value], v2 = colorMap[document.getElementById('sel-1').value];
    let res = 0, colors = [];
    if(type === "4") {
        let mul = colorMap[document.getElementById('sel-2').value], tol = colorMap[document.getElementById('sel-3').value];
        res = (v1.val * 10 + v2.val) * mul.mul;
        colors = [v1.hex, v2.hex, "transparent", mul.hex, tol.hex];
        document.getElementById('res-colors').innerText = format(res) + " ±" + tol.tol + "%";
    } else {
        let v3 = colorMap[document.getElementById('sel-2').value], mul = colorMap[document.getElementById('sel-3').value], tol = colorMap[document.getElementById('sel-4').value];
        res = (v1.val * 100 + v2.val * 10 + v3.val) * mul.mul;
        colors = [v1.hex, v2.hex, v3.hex, mul.hex, tol.hex];
        document.getElementById('res-colors').innerText = format(res) + " ±" + tol.tol + "%";
    }
    ['v-band1','v-band2','v-band3','v-mul','v-tol'].forEach((id, i) => { if(colors[i]) document.getElementById(id).style.backgroundColor = colors[i]; });
}

function format(v) {
    if(v >= 1000000) return (v/1000000).toFixed(1) + " MΩ";
    if(v >= 1000) return (v/1000).toFixed(1) + " kΩ";
    return v.toFixed(0) + " Ω";
}

function calcOhm() {
    let v = parseFloat(document.getElementById('v').value), i = parseFloat(document.getElementById('i').value), r = parseFloat(document.getElementById('r').value);
    if(v && i) document.getElementById('res-ohm').innerText = (v/i).toFixed(1) + " Ω";
    else if(v && r) document.getElementById('res-ohm').innerText = (v/r).toFixed(2) + " A";
    else if(i && r) document.getElementById('res-ohm').innerText = (i*r).toFixed(1) + " V";
}

function initInduct() {
    const container = document.getElementById('controls-induct'); container.innerHTML = "";
    ["B1", "B2", "Mult", "Tol"].forEach((label, i) => {
        let opt = ""; colorMap.forEach((c, idx) => { if(i < 2 && c.val === null) return; opt += `<option value="${idx}">${c.name}</option>`; });
        container.innerHTML += `<div class="control-group"><label>${label}</label><select id="si-${i}" onchange="calcInd()"> ${opt} </select></div>`;
    });
}
function calcInd() {
    let v1 = colorMap[document.getElementById('si-0').value].val, v2 = colorMap[document.getElementById('si-1').value].val, m = colorMap[document.getElementById('si-2').value].mul, t = colorMap[document.getElementById('si-3').value].tol;
    document.getElementById('res-induct').innerText = ((v1*10+v2)*m).toFixed(1) + " µH ±" + t + "%";
}

function calcCap() {
    let c = document.getElementById('cap-code').value;
    if(c.length === 3) {
        let v = parseInt(c.substring(0,2)) * Math.pow(10, parseInt(c.substring(2)));
        document.getElementById('res-capac').innerText = `${v} pF | ${v/1000} nF`;
    }
}

function calcSMD() {
    let c = document.getElementById('smd-code').value.toUpperCase();
    if(c.includes('R')) { document.getElementById('res-smd').innerText = c.replace('R','.') + " Ω"; return; }
    if(c.length >= 3) {
        let v = parseInt(c.slice(0,-1)) * Math.pow(10, parseInt(c.slice(-1)));
        document.getElementById('res-smd').innerText = format(v);
    }
}

function calcLED() {
    let vf = parseFloat(document.getElementById('v_fuente').value), vl = parseFloat(document.getElementById('v_led').value);
    if(vf > vl) document.getElementById('res-led').innerText = ((vf-vl)/0.02).toFixed(0) + " Ω";
}

function calcDivisor() {
    let v = parseFloat(document.getElementById('div_vin').value), r1 = parseFloat(document.getElementById('div_r1').value), r2 = parseFloat(document.getElementById('div_r2').value);
    if(v && r1 && r2) document.getElementById('res-divisor').innerText = (v * (r2/(r1+r2))).toFixed(2) + " V";
}

function calcLM317() {
    let r1 = parseFloat(document.getElementById('lm_r1').value), r2 = parseFloat(document.getElementById('lm_r2').value);
    if(r1 && r2) document.getElementById('res-lm').innerText = (1.25 * (1 + (r2/r1))).toFixed(2) + " V";
}

function sendWhatsApp() {
    const active = document.querySelector('.calc-section:not([style*="display: none"])');
    let txt = active ? active.querySelector('.result').innerText : "Consulta";
    window.open(`https://wa.me/${MI_TELEFONO}?text=Hola Franko! Consulto por: ${txt}`, '_blank');
}

