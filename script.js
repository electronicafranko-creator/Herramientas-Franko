const MI_TELEFONO = "51987654321";
let componenteActual = "";
let camposContador = 0;

const colorMap = [
    { name: "Negro", val: 0, mul: 1, tol: 20, hex: "#000000" },
    { name: "Marrón", val: 1, mul: 10, tol: 1, hex: "#8B4513" },
    { name: "Rojo", val: 2, mul: 100, tol: 2, hex: "#FF0000" },
    { name: "Naranja", val: 3, mul: 1000, tol: 3, hex: "#FFA500" },
    { name: "Amarillo", val: 4, mul: 10000, tol: 4, hex: "#FFFF00" },
    { name: "Verde", val: 5, mul: 100000, tol: 0.5, hex: "#008000" },
    { name: "Azul", val: 6, mul: 1000000, tol: 0.25, hex: "#0000FF" },
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
}

// --- LÓGICA SERIE/PARALELO ---
function openSubCalc(tipo) {
    componenteActual = tipo;
    camposContador = 0;
    document.getElementById('sub-menu-conexiones').style.display = 'none';
    document.getElementById('ventana-calculo').style.display = 'block';
    document.getElementById('inputs-dinamicos').innerHTML = ""; 
    agregarCampo(); agregarCampo();
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
    
    let unit = componenteActual === 'R' ? 'Ω' : (componenteActual === 'C' ? 'µF' : 'µH');

    div.innerHTML = `
        <input type="number" class="val-input" placeholder="Valor ${camposContador}" inputmode="decimal">
        <span class="unit-label">${unit}</span>
        ${camposContador > 2 ? `<span class="remove-btn" onclick="this.parentElement.remove()">✕</span>` : ''}
    `;
    container.appendChild(div);
}

function formatearUnidades(valor) {
    if (componenteActual === 'R') {
        if (valor >= 1000000) return (valor / 1000000).toFixed(2) + " MΩ";
        if (valor >= 1000) return (valor / 1000).toFixed(2) + " kΩ";
        return valor.toFixed(2) + " Ω";
    } 
    else if (componenteActual === 'C') {
        if (valor >= 1000) return (valor / 1000).toFixed(2) + " mF";
        if (valor < 1) {
            let nf = valor * 1000;
            if (nf < 1) return (nf * 1000).toFixed(1) + " pF";
            return nf.toFixed(1) + " nF";
        }
        return valor.toFixed(2) + " µF";
    }
    else if (componenteActual === 'L') {
        if (valor >= 1000000) return (valor / 1000000).toFixed(3) + " H";
        if (valor >= 1000) return (valor / 1000).toFixed(2) + " mH";
        return valor.toFixed(2) + " µH";
    }
}

function ejecutarCalculoDinamico(modo) {
    const inputs = document.querySelectorAll('.val-input');
    let vals = [];
    inputs.forEach(i => { if(i.value !== "" && !isNaN(i.value)) vals.push(parseFloat(i.value)); });

    if(vals.length < 2) { alert("Ingresa al menos 2 valores"); return; }

    let total = 0;
    if (componenteActual === 'R' || componenteActual === 'L') {
        total = (modo === 'serie') ? vals.reduce((a, b) => a + b, 0) : 1 / vals.reduce((a, b) => a + (1 / b), 0);
    } else {
        total = (modo === 'serie') ? 1 / vals.reduce((a, b) => a + (1 / b), 0) : vals.reduce((a, b) => a + b, 0);
    }
    
    document.getElementById('res-circuito').innerHTML = `Resultado ${modo.toUpperCase()}:<br>${formatearUnidades(total)}`;
}

// --- BOBINAS POR COLORES ---
function initInduct() {
    const container = document.getElementById('controls-induct'); 
    container.innerHTML = "";
    ["1ra Banda", "2da Banda", "Multiplicador", "Tolerancia"].forEach((label, i) => {
        let opt = ""; 
        colorMap.forEach((c, idx) => { 
            if(i < 2 && c.val === null) return;
            opt += `<option value="${idx}">${c.name}</option>`; 
        });
        container.innerHTML += `<div style="margin-bottom:10px;"><label>${label}</label><select id="si-${i}" onchange="calcInd()" style="width:100%; padding:10px; border-radius:8px;"> ${opt} </select></div>`;
    });
    calcInd();
}

function calcInd() {
    let v1 = colorMap[document.getElementById('si-0').value].val;
    let v2 = colorMap[document.getElementById('si-1').value].val;
    let m = colorMap[document.getElementById('si-2').value].mul;
    let t = colorMap[document.getElementById('si-3').value].tol;
    let total = (v1 * 10 + v2) * m;
    let unit = total >= 1000 ? (total/1000).toFixed(2) + " mH" : total.toFixed(1) + " µH";
    document.getElementById('res-induct').innerText = `${unit} ±${t}%`;
}

function calcOhm() {
    let v = parseFloat(document.getElementById('v').value), i = parseFloat(document.getElementById('i').value), r = parseFloat(document.getElementById('r').value);
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerText = (v/i).toFixed(2) + " Ω";
    else if(v && r) res.innerText = (v/r).toFixed(2) + " A";
    else if(i && r) res.innerText = (i*r).toFixed(2) + " V";
}

function sendWhatsApp() {
    const txt = document.getElementById('res-circuito').innerText;
    window.open(`https://wa.me/${MI_TELEFONO}?text=Hola Franko! Necesito estos componentes. Mi cálculo dio: ${encodeURIComponent(txt)}`, '_blank');
}



