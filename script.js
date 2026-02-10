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
}

// LÓGICA RESISTENCIAS
function changeBandType() {
    const type = document.getElementById('num-bands').value;
    const container = document.getElementById('controls-container');
    container.innerHTML = "";
    const struct = type === "4" ? ["Banda 1", "Banda 2", "Multiplicador", "Tolerancia"] : ["Banda 1", "Banda 2", "Banda 3", "Multiplicador", "Tolerancia"];
    
    struct.forEach((label, i) => {
        let opt = "";
        colorMap.forEach((c, idx) => {
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
    const resDiv = document.getElementById('res-colors');
    document.getElementById('v-band3').style.display = (type === "4") ? "none" : "block";

    let v1 = colorMap[document.getElementById('sel-0').value];
    let v2 = colorMap[document.getElementById('sel-1').value];
    let colors = [];

    if(type === "4") {
        let mul = colorMap[document.getElementById('sel-2').value];
        let tol = colorMap[document.getElementById('sel-3').value];
        let val = (v1.val * 10 + v2.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, "transparent", mul.hex, tol.hex];
    } else {
        let v3 = colorMap[document.getElementById('sel-2').value];
        let mul = colorMap[document.getElementById('sel-3').value];
        let tol = colorMap[document.getElementById('sel-4').value];
        let val = (v1.val * 100 + v2.val * 10 + v3.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, v3.hex, mul.hex, tol.hex];
    }
    const ids = ['v-band1','v-band2','v-band3','v-mul','v-tol'];
    ids.forEach((id, i) => { if(colors[i]) document.getElementById(id).style.backgroundColor = colors[i]; });
}

function format(v) {
    if(v >= 1000000) return (v/1000000).toFixed(1) + " MΩ";
    if(v >= 1000) return (v/1000).toFixed(1) + " kΩ";
    return v.toFixed(0) + " Ω";
}

// LÓGICA INDUCTORES
function initInduct() {
    const container = document.getElementById('controls-induct');
    container.innerHTML = "";
    ["Banda 1", "Banda 2", "Multiplicador", "Tolerancia"].forEach((label, i) => {
        let opt = "";
        colorMap.forEach((c, idx) => {
            if(i < 2 && c.val === null) return;
            opt += `<option value="${idx}">${c.name}</option>`;
        });
        container.innerHTML += `<div class="control-group"><label>${label}</label><select id="sel-ind-${i}" onchange="calcInduct()"> ${opt} </select></div>`;
    });
}

function calcInduct() {
    let v1 = colorMap[document.getElementById('sel-ind-0').value].val;
    let v2 = colorMap[document.getElementById('sel-ind-1').value].val;
    let mul = colorMap[document.getElementById('sel-ind-2').value].mul;
    let tol = colorMap[document.getElementById('sel-ind-3').value].tol;
    let val = (v1 * 10 + v2) * mul;
    document.getElementById('res-induct').innerHTML = val.toFixed(1) + " µH ±" + tol + "%";
}

// CAPACITORES Y SMD
function calcCap() {
    let code = document.getElementById('cap-code').value;
    if(code.length === 3) {
        let val = parseInt(code.substring(0,2)) * Math.pow(10, parseInt(code.substring(2)));
        document.getElementById('res-capac').innerHTML = `${val} pF | ${val/1000} nF | ${val/1000000} µF`;
    }
}

function calcSMD() {
    let code = document.getElementById('smd-code').value.toUpperCase();
    let res = document.getElementById('res-smd');
    if(code.includes('R')) { res.innerHTML = code.replace('R','.') + " Ω"; return; }
    if(code.length >= 3) {
        let val = parseInt(code.slice(0,-1)) * Math.pow(10, parseInt(code.slice(-1)));
        res.innerHTML = format(val);
    }
}

// OHM Y WATT
function calcOhm() {
    let v = parseFloat(document.getElementById('v').value), i = parseFloat(document.getElementById('i').value), r = parseFloat(document.getElementById('r').value);
    if(v && i) document.getElementById('res-ohm').innerHTML = (v/i).toFixed(1) + " Ω";
    else if(v && r) document.getElementById('res-ohm').innerHTML = (v/r).toFixed(2) + " A";
    else if(i && r) document.getElementById('res-ohm').innerHTML = (i*r).toFixed(1) + " V";
}

function calcWatt() {
    let v = parseFloat(document.getElementById('w_v').value), i = parseFloat(document.getElementById('w_i').value);
    if(v && i) document.getElementById('res-watt').innerHTML = (v*i).toFixed(1) + " Watts";
}

function sendWhatsApp() {
    const active = document.querySelector('.calc-section:not([style*="display: none"])');
    let txt = active ? active.querySelector('.result').innerText : "Consulta";
    window.open(`https://wa.me/${MI_TELEFONO}?text=Hola Franko! Necesito: ${txt}`, '_blank');
}


