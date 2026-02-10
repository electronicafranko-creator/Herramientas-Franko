const MI_TELEFONO = "51956484667"; // REEMPLAZA CON TU NÚMERO

function showSection(id) {
    document.getElementById('dashboard').style.display = 'none';
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if(id === 'colors') changeBandType();
}

function showDashboard() {
    document.querySelectorAll('.calc-section').forEach(s => s.style.display = 'none');
    document.getElementById('dashboard').style.display = 'grid';
}

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

function changeBandType() {
    const type = document.getElementById('num-bands').value;
    const container = document.getElementById('controls-container');
    container.innerHTML = "";
    const struct = { 
        "4":["Banda 1", "Banda 2", "Multiplicador", "Tolerancia"], 
        "5":["Banda 1", "Banda 2", "Banda 3", "Multiplicador", "Tolerancia"], 
        "6":["Banda 1", "Banda 2", "Banda 3", "Multiplicador", "Tolerancia", "Temp"] 
    };
    
    struct[type].forEach((label, i) => {
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
    document.getElementById('v-temp').style.display = (type === "6") ? "block" : "none";

    let v1 = colorMap[document.getElementById('sel-0').value];
    let v2 = colorMap[document.getElementById('sel-1').value];
    let colors = [];

    if(type === "4") {
        let mul = colorMap[document.getElementById('sel-2').value];
        let tol = colorMap[document.getElementById('sel-3').value];
        let val = (v1.val * 10 + v2.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, "transparent", mul.hex, tol.hex, "transparent"];
    } else {
        let v3 = colorMap[document.getElementById('sel-2').value];
        let mul = colorMap[document.getElementById('sel-3').value];
        let tol = colorMap[document.getElementById('sel-4').value];
        let val = (v1.val * 100 + v2.val * 10 + v3.val) * mul.mul;
        resDiv.innerHTML = format(val) + " ±" + tol.tol + "%";
        colors = [v1.hex, v2.hex, v3.hex, mul.hex, tol.hex];
    }
    updateBands(colors);
}

function updateBands(c) {
    const ids = ['v-band1','v-band2','v-band3','v-mul','v-tol','v-temp'];
    ids.forEach((id, i) => { if(c[i]) document.getElementById(id).style.backgroundColor = c[i]; });
}

function format(v) {
    if(v >= 1000000) return (v/1000000).toFixed(1) + " MΩ";
    if(v >= 1000) return (v/1000).toFixed(1) + " kΩ";
    return v.toFixed(0) + " Ω";
}

function calcOhm() {
    let v = parseFloat(document.getElementById('v').value);
    let i = parseFloat(document.getElementById('i').value);
    let r = parseFloat(document.getElementById('r').value);
    let res = document.getElementById('res-ohm');
    if(v && i) res.innerHTML = "Resistencia: " + (v/i).toFixed(1) + " Ω";
    else if(v && r) res.innerHTML = "Corriente: " + (v/r).toFixed(2) + " A";
    else if(i && r) res.innerHTML = "Voltaje: " + (i*r).toFixed(1) + " V";
}

function calcWatt() {
    let v = parseFloat(document.getElementById('w_v').value);
    let i = parseFloat(document.getElementById('w_i').value);
    if(v && i) document.getElementById('res-watt').innerHTML = "Potencia: " + (v*i).toFixed(1) + " Watts";
}

function sendWhatsApp() {
    const activeSection = document.querySelector('.calc-section:not([style*="display: none"])');
    let result = activeSection ? activeSection.querySelector('.result').innerText : "Consulta general";
    const msg = `Hola Franko! Consulto por: ${result}`;
    window.open(`https://wa.me/${MI_TELEFONO}?text=${encodeURIComponent(msg)}`, '_blank');
}

