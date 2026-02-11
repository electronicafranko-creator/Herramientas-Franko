const MI_TELEFONO = "51987654321"; // <--- TU NÚMERO AQUÍ

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

// LÓGICA CONEXIONES (SUB-MENÚ)
function openSubCalc(tipo) {
    componenteActual = tipo;
    document.getElementById('sub-menu-conexiones').style.display = 'none';
    document.getElementById('ventana-calculo').style.display = 'block';
    const titulo = document.getElementById('titulo-sub-calc');
    const nota = document.getElementById('nota-tecnica');
    if(tipo === 'R') { titulo.innerText = "Resistencias (Ω)"; nota.innerText = "Serie: Suma directa | Paralelo: Inverso"; }
    else if(tipo === 'C') { titulo.innerText = "Capacitores (µF)"; nota.innerText = "Serie: Inverso | Paralelo: Suma directa"; }
    else { titulo.innerText = "Bobinas (µH)"; nota.innerText = "Serie: Suma directa | Paralelo: Inverso"; }
}

function backToSubMenu() {
    document.getElementById('sub-menu-conexiones').style.display = 'block';
    document.getElementById('ventana-calculo').style.display = 'none';
}

function ejecutarCalculo(modo) {
    let v1 = parseFloat(document.getElementById('c_val1').value), v2 = parseFloat(document.getElementById('c_val2').value);
    if(isNaN(v1) || isNaN(v2)) return;
    let total = 0;
    if(componenteActual === 'R' || componenteActual === 'L') total = (modo === 'serie') ? (v1+v2) : ((v1*v2)/(v1+v2));
    else total = (modo === 'serie') ? ((v1*v2)/(v1+v2)) : (v1+v2);
    document.getElementById('res-circuito').innerHTML = `Total: ${total.toFixed(2)}`;
}

// RESTO DE FUNCIONES (SMD, LED, OHM, ETC)
function calcCap() {
    let c = document.getElementById('cap-code').value;
    if(c.length === 3) {
        let v = parseInt(c.substring(0,2)) * Math.pow(10, parseInt(c.substring(2)));
        document.getElementById('res-capac').innerHTML = `${v} pF | ${v/1000} nF`;
    }
}

function calcSMD() {
    let c = document.getElementById('smd-code').value.toUpperCase();
    if(c.includes('R')) { document.getElementById('res-smd').innerHTML = c.replace('R','.') + " Ω"; return; }
    if(c.length >= 3) {
        let v = parseInt(c.slice(0,-1)) * Math.pow(10, parseInt(c.slice(-1)));
        document.getElementById('res-smd').innerHTML = format(v);
    }
}

function calcOhm() {
    let v = parseFloat(document.getElementById('v').value), i = parseFloat(document.getElementById('i').value), r = parseFloat(document.getElementById('r').value);
    if(v && i) document.getElementById('res-ohm').innerHTML = (v/i).toFixed(2) + " Ω";
    else if(v && r) document.getElementById('res-ohm').innerHTML = (v/r).toFixed(2) + " A";
    else if(i && r) document.getElementById('res-ohm').innerHTML = (i*r).toFixed(2) + " V";
}

function calcLED() {
    let vf = parseFloat(document.getElementById('v_fuente').value), vl = parseFloat(document.getElementById('v_led').value);
    if(vf > vl) document.getElementById('res-led').innerHTML = ((vf-vl)/0.02).toFixed(0) + " Ω";
}

// (Omití por brevedad el código de bandas de colores que ya tienes, asegúrate de pegarlo o mantenerlo si ya estaba completo)
// ... funciones calculate(), changeBandType(), format(), sendWhatsApp(), initInduct() ...

function format(v) {
    if(v >= 1000000) return (v/1000000).toFixed(1) + " MΩ";
    if(v >= 1000) return (v/1000).toFixed(1) + " kΩ";
    return v.toFixed(0) + " Ω";
}

function sendWhatsApp() {
    const active = document.querySelector('.calc-section:not([style*="display: none"])');
    let txt = active ? active.querySelector('.result').innerText : "Consulta";
    window.open(`https://wa.me/${MI_TELEFONO}?text=Hola Franko! Consulto por: ${txt}`, '_blank');
}

