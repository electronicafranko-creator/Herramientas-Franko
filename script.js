const MI_TELEFONO = "51987654321";
let componenteActual = "";
let camposContador = 0;

const colorMap = [
    { name: "Negro", val: 0, mul: 1, tol: 20 },
    { name: "Marrón", val: 1, mul: 10, tol: 1 },
    { name: "Rojo", val: 2, mul: 100, tol: 2 },
    { name: "Naranja", val: 3, mul: 1000, tol: null },
    { name: "Amarillo", val: 4, mul: 10000, tol: null },
    { name: "Verde", val: 5, mul: 100000, tol: 0.5 },
    { name: "Azul", val: 6, mul: 1000000, tol: 0.25 },
    { name: "Violeta", val: 7, mul: 10000000, tol: 0.1 },
    { name: "Oro", val: null, mul: 0.1, tol: 5 },
    { name: "Plata", val: null, mul: 0.01, tol: 10 }
];

// NAVEGACIÓN
function showDashboard() {
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById('dashboard').style.display = 'grid';
}

function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'colors') initSelectorColores('res');
    if(id === 'induct') initSelectorColores('ind');
}

// 1. REDES SERIE/PARALELO (MEJORADO)
const unidadesConfig = {
    'R': [{l:'Ω', m:1}, {l:'kΩ', m:1000}, {l:'MΩ', m:1000000}],
    'C': [{l:'pF', m:1e-6}, {l:'nF', m:0.001}, {l:'µF', m:1}],
    'L': [{l:'µH', m:1}, {l:'mH', m:1000}, {l:'H', m:1000000}]
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
    let opts = unidadesConfig[componenteActual].map(u => `<option value="${u.m}">${u.l}</option>`).join('');
    div.innerHTML = `<input type="number" class="val-input" placeholder="Valor ${camposContador}" inputmode="decimal"><select class="unit-select">${opts}</select>`;
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
    if(vals.length < 2) return alert("Ingresa al menos 2 valores");
    let total = (componenteActual === 'C') 
        ? (modo === 'serie' ? 1/vals.reduce((a,b)=>a+(1/b),0) : vals.reduce((a,b)=>a+b,0))
        : (modo === 'serie' ? vals.reduce((a,b)=>a+b,0) : 1/vals.reduce((a,b)=>a+(1/b),0));
    
    document.getElementById('res-circuito').innerHTML = `Total ${modo.toUpperCase()}:<br>${total.toFixed(3)}`;
}

// 2. LEY DE OHM
function calcOhm() {
    let v = parseFloat(document.getElementById('ohm-v').value);
    let i = parseFloat(document.getElementById('ohm-i').value);
    let r = parseFloat(document.getElementById('ohm-r').value);
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerText = (v/i).toFixed(2) + " Ω";
    else if(v && r) res.innerText = (v/r).toFixed(2) + " A";
    else if(i && r) res.innerText = (i*r).toFixed(2) + " V";
}

// 3. SMD
function calcSMD() {
    let c = document.getElementById('smd-code').value.toUpperCase();
    let res = document.getElementById('res-smd');
    if(c.includes('R')) res.innerText = c.replace('R', '.') + " Ω";
    else {
        let v = parseInt(c.slice(0,-1)) * Math.pow(10, parseInt(c.slice(-1)));
        res.innerText = v >= 1000 ? (v/1000) + " kΩ" : v + " Ω";
    }
}

// 4. LED
function calcLED() {
    let vcc = parseFloat(document.getElementById('led-vcc').value);
    let vf = parseFloat(document.getElementById('led-vf').value);
    let imA = parseFloat(document.getElementById('led-if').value);
    let r = (vcc - vf) / (imA / 1000);
    document.getElementById('res-led').innerText = r.toFixed(2) + " Ω";
}

// 5. DIVISOR
function calcDivisor() {
    let vin = parseFloat(document.getElementById('div-vin').value);
    let r1 = parseFloat(document.getElementById('div-r1').value);
    let r2 = parseFloat(document.getElementById('div-r2').value);
    document.getElementById('res-divisor').innerText = (vin * (r2/(r1+r2))).toFixed(2) + " V";
}

// 6. POTENCIA
function calcWatt() {
    let v = parseFloat(document.getElementById('w-v').value);
    let i = parseFloat(document.getElementById('w-i').value);
    document.getElementById('res-watt').innerText = (v * i).toFixed(2) + " Watts";
}

// 7. CAPACITORES (104)
function calcCapacitorCode() {
    let c = document.getElementById('cap-code').value;
    let v = parseInt(c.slice(0,2)) * Math.pow(10, parseInt(c.slice(2)));
    document.getElementById('res-cap-code').innerText = v + " pF | " + (v/1000) + " nF";
}

// 8. COLORES (RES E IND)
function initSelectorColores(t) {
    const cont = document.getElementById(t === 'res' ? 'controls-res' : 'controls-ind');
    cont.innerHTML = "";
    for(let i=0; i<4; i++) {
        let opt = colorMap.map((c,idx) => `<option value="${idx}">${c.name}</option>`).join('');
        cont.innerHTML += `<select id="${t}-${i}" onchange="calcColores('${t}')">${opt}</select>`;
    }
}

function calcColores(t) {
    let v1 = colorMap[document.getElementById(`${t}-0`).value].val;
    let v2 = colorMap[document.getElementById(`${t}-1`).value].val;
    let m = colorMap[document.getElementById(`${t}-2`).value].mul;
    let final = (v1*10 + v2) * m;
    document.getElementById(t === 'res' ? 'res-colors' : 'res-ind').innerText = final + (t === 'res' ? " Ω" : " µH");
}

function backToSubMenu() {
    document.getElementById('sub-menu-conexiones').style.display = 'block';
    document.getElementById('ventana-calculo').style.display = 'none';
}

function sendWhatsApp() {
    window.open(`https://wa.me/${MI_TELEFONO}?text=Consulta técnica`, '_blank');
}



