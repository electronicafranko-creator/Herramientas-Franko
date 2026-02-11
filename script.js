const MI_TELEFONO = "51987654321";
let componenteActual = "";
let camposContador = 0;

const colorMap = [
    { name: "Negro", val: 0, mul: 1, tol: 20, hex: "#000" },
    { name: "Marrón", val: 1, mul: 10, tol: 1, hex: "#8B4513" },
    { name: "Rojo", val: 2, mul: 100, tol: 2, hex: "#F00" },
    { name: "Naranja", val: 3, mul: 1000, tol: 3, hex: "#FFA500" },
    { name: "Amarillo", val: 4, mul: 10000, tol: 4, hex: "#FF0" },
    { name: "Verde", val: 5, mul: 100000, tol: 0.5, hex: "#008000" },
    { name: "Azul", val: 6, mul: 1000000, tol: 0.25, hex: "#00F" },
    { name: "Violeta", val: 7, mul: 10000000, tol: 0.1, hex: "#EE82EE" },
    { name: "Oro", val: null, mul: 0.1, tol: 5, hex: "#FFD700" },
    { name: "Plata", val: null, mul: 0.01, tol: 10, hex: "#C0C0C0" }
];

function showDashboard() {
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById('dashboard').style.display = 'grid';
}

function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'colors') initColores('res');
    if(id === 'induct') initColores('ind');
}

// --- 1. LÓGICA DE REDES (Serie/Paralelo con Unidades) ---
const unidadesConfig = {
    'R': [ {l: 'Ω', m: 1}, {l: 'kΩ', m: 1000}, {l: 'MΩ', m: 1000000} ],
    'C': [ {l: 'pF', m: 1e-6}, {l: 'nF', m: 0.001}, {l: 'µF', m: 1} ],
    'L': [ {l: 'µH', m: 1}, {l: 'mH', m: 1000}, {l: 'H', m: 1000000} ]
};

function openSubCalc(tipo) {
    componenteActual = tipo;
    camposContador = 0;
    document.getElementById('sub-menu-conexiones').style.display = 'none';
    document.getElementById('ventana-calculo').style.display = 'block';
    document.getElementById('inputs-dinamicos').innerHTML = ""; 
    agregarCampo(); agregarCampo();
}

function agregarCampo() {
    camposContador++;
    const container = document.getElementById('inputs-dinamicos');
    const div = document.createElement('div');
    div.className = "input-row";
    let opciones = unidadesConfig[componenteActual].map(u => `<option value="${u.m}">${u.l}</option>`).join('');
    div.innerHTML = `<input type="number" class="val-input" placeholder="Valor ${camposContador}" inputmode="decimal"><select class="unit-select">${opciones}</select>`;
    container.appendChild(div);
}

function ejecutarCalculoDinamico(modo) {
    const filas = document.querySelectorAll('.input-row');
    let vals = [];
    filas.forEach(f => {
        let n = parseFloat(f.querySelector('.val-input').value);
        let m = parseFloat(f.querySelector('.unit-select').value);
        if(!isNaN(n)) vals.push(n * m);
    });
    if(vals.length < 2) return alert("Mínimo 2 valores");
    let total = 0;
    if(componenteActual === 'R' || componenteActual === 'L') {
        total = (modo === 'serie') ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0);
    } else {
        total = (modo === 'serie') ? 1/vals.reduce((a,b)=>a+(1/b),0) : vals.reduce((a,b)=>a+b,0);
    }
    document.getElementById('res-circuito').innerHTML = `Total ${modo.toUpperCase()}:<br>${total.toFixed(2)}`;
}

// --- 2. LEY DE OHM ---
function calcOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerText = (v/i).toFixed(2) + " Ω";
    else if(v && r) res.innerText = (v/r).toFixed(2) + " A";
    else if(i && r) res.innerText = (i*r).toFixed(2) + " V";
}

// --- 3. SMD ---
function calcSMD() {
    let code = document.getElementById('smd-code').value.toUpperCase();
    let res = document.getElementById('res-smd');
    if(code.includes('R')) res.innerText = code.replace('R', '.') + " Ω";
    else {
        let val = parseInt(code.slice(0,-1)) * Math.pow(10, parseInt(code.slice(-1)));
        res.innerText = val >= 1000 ? (val/1000) + " kΩ" : val + " Ω";
    }
}

// --- 4. LED ---
function calcLED() {
    let vcc = parseFloat(document.getElementById('led-vcc').value);
    let vf = parseFloat(document.getElementById('led-vf').value);
    let imA = parseFloat(document.getElementById('led-if').value);
    let r = (vcc - vf) / (imA / 1000);
    document.getElementById('res-led').innerText = r.toFixed(1) + " Ω";
}

// --- 5. DIVISOR ---
function calcDivisor() {
    let vin = parseFloat(document.getElementById('div-vin').value);
    let r1 = parseFloat(document.getElementById('div-r1').value);
    let r2 = parseFloat(document.getElementById('div-r2').value);
    let vout = vin * (r2 / (r1 + r2));
    document.getElementById('res-divisor').innerText = vout.toFixed(2) + " V";
}

// --- 6. WATT ---
function calcWatt() {
    let v = parseFloat(document.getElementById('w-v').value);
    let i = parseFloat(document.getElementById('w-i').value);
    document.getElementById('res-watt').innerText = (v * i).toFixed(2) + " Watts";
}

// --- 7. COLORES ---
function initColores(target) {
    const cont = document.getElementById(target === 'res' ? 'controls-res' : 'controls-ind');
    cont.innerHTML = "";
    for(let i=0; i<4; i++) {
        let opt = colorMap.map((c,idx) => `<option value="${idx}">${c.name}</option>`).join('');
        cont.innerHTML += `<select id="${target}-${i}" onchange="actualizarColores('${target}')">${opt}</select>`;
    }
}

function actualizarColores(t) {
    let v1 = colorMap[document.getElementById(`${t}-0`).value].val;
    let v2 = colorMap[document.getElementById(`${t}-1`).value].val;
    let m = colorMap[document.getElementById(`${t}-2`).value].mul;
    let res = (v1*10 + v2) * m;
    document.getElementById(`res-${t === 'res' ? 'colors' : 'ind'}`).innerText = res + (t === 'res' ? " Ω" : " µH");
}

function backToSubMenu() {
    document.getElementById('sub-menu-conexiones').style.display = 'block';
    document.getElementById('ventana-calculo').style.display = 'none';
}

function sendWhatsApp() {
    window.open(`https://wa.me/${MI_TELEFONO}?text=Consulta desde la App Franko`, '_blank');
}



