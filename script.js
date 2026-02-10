const MI_TELEFONO = "51956484667"; // <--- TU NÚMERO AQUÍ

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

// --- LOGICA DE CALCULADORAS ---

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
    let v1 = colorMap[document.getElementById('sel-0').value], v2 = colorMap[document.getElementById('sel-1').value];
    let colors = [];
    if(type === "4") {
        let mul = colorMap[document.getElementById('sel-2').value], tol = colorMap[document.getElementById('sel-3').value];
        let val = (v1.val * 10 + v2.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, "transparent", mul.hex, tol.hex];
    } else {
        let v3 = colorMap[document.getElementById('sel-2').value], mul = colorMap[document.getElementById('sel-3').value], tol = colorMap[document.getElementById('sel-4').value];
        let val = (v1.val * 100 + v2.val * 10 + v3.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, v3.hex, mul.hex, tol.hex];
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
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerHTML = (v/i).toFixed(1) + " Ω";
    else if(v && r) res.innerHTML = (v/r).toFixed(2) + " A";
    else if(i && r) res.innerHTML = (i*r).toFixed(1) + " V";
}

function calcWatt() {
    let v = parseFloat(document.getElementById('w_v').value), i = parseFloat(document.getElementById('w_i').value);
    if(v && i) document.getElementById('res-watt').innerHTML = (v*i).toFixed(1) + " W";
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
    document.getElementById('res-induct').innerHTML = ((v1*10+v2)*m).toFixed(1) + " µH ±" + t + "%";
}

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

function calcLED() {
    let vf = parseFloat(document.getElementById('v_fuente').value), vl = parseFloat(document.getElementById('v_led').value);
    if(vf > vl) document.getElementById('res-led').innerHTML = ((vf-vl)/0.02).toFixed(0) + " Ω (1/4W)";
}

function calcDivisor() {
    let v = parseFloat(document.getElementById('div_vin').value), r1 = parseFloat(document.getElementById('div_r1').value), r2 = parseFloat(document.getElementById('div_r2').value);
    if(v && r1 && r2) document.getElementById('res-divisor').innerHTML = (v * (r2/(r1+r2))).toFixed(2) + " V";
}

function calcLM317() {
    let r1 = parseFloat(document.getElementById('lm_r1').value), r2 = parseFloat(document.getElementById('lm_r2').value);
    if(r1 && r2) document.getElementById('res-lm').innerHTML = (1.25 * (1 + (r2/r1))).toFixed(2) + " V";
}

function sendWhatsApp() {
    const active = document.querySelector('.calc-section:not([style*="display: none"])');
    let txt = active ? active.querySelector('.result').innerText : "Consulta";
    window.open(`https://wa.me/${MI_TELEFONO}?text=Hola Franko! Consulto por: ${txt}`, '_blank');
}

