const main = document.querySelector("main"); 
const categories = ["metal", "metalloid", "nonmetal", "noble", "alkali", "alkaline", "transition", "lanthanide", "actinide"]; 
let activeElement = null; 
loadElements().then(outputElements); 



function loadElements() {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    let url = "https://raw.githubusercontent.com/Dlaby23/InteractivePeriodicTable/main/Elements.json"; // Json on git
    req.open("GET", url);
    req.onload = function () {
      console.log(JSON.parse(req.response));
      resolve(JSON.parse(req.response).elements);
    };
    req.send();
  }); 

} 
function outputElements(elements) {
  let a = [];
  elements.forEach(elem => {
    let table = document.createElement("table");
    table.textContent = elem.symbol;
    table.style.gridColumn = elem.xpos;
    table.style.gridRow = elem.ypos;
    table.classList.add(elem.category.split(/[ ,]/).filter(c => {
      let i = categories.indexOf(c);
      return i >= 0;
    })[0]);
    table.addEventListener("click", () => {
      if (activeElement) activeElement.classList.remove("focus");
      table.classList.add("focus");
      activeElement = table;
      showInfo(elem);
    });
    main.appendChild(table);
    a.push(table);
  });
  let i = Math.floor(Math.random() * a.length); //obnovení stránky = random element
  a[i].click();
}
function u(s) {
  return s ? s : "---";
}

const elName = document.getElementById("name");
const elSummary = document.getElementById("summary");
const elDiscoveredBy = document.getElementById("discovered-by");
const elNameGivenBy = document.getElementById("name-given-by");
const elAtomicMass = document.getElementById("atomic-mass");
const elDensity = document.getElementById("density");
const elappearance = document.getElementById("appearance");
const elboil = document.getElementById("boil");
const elcolor = document.getElementById("color");
const elmolar_heat = document.getElementById("molar_heat");
const elnumber = document.getElementById("number");
const elperiod = document.getElementById("period");
const elphase = document.getElementById("phase");
const elsource = document.getElementById("source");
const elspectral_img = document.getElementById("spectral_img");
const elsymbol = document.getElementById("symbol");
const elxpos = document.getElementById("xpos");
const elypos = document.getElementById("ypos");
const elshells = document.getElementById("shells");

function showInfo(element) {
  elName.textContent = element.number + " " + element.name;
  elName.href = element.source;
  elSummary.textContent = element.summary;
  elDiscoveredBy.textContent = u(element.discovered_by);
  elNameGivenBy.textContent = u(element.named_by);
  elAtomicMass.textContent = u(element.atomic_mass) + " u";
  elDensity.textContent = u(element.density) + " g/L";
  elappearance.textContent = u(element.appearance);
  elboil.textContent = u(element.boil);
  elcolor.textContent = u(element.color);
  elmolar_heat.textContent = u(element.molar_heat);
  elnumber.textContent = u(element.number);
  elperiod.textContent = u(element.period);
  elphase.textContent = u(element.phase);
  elsource.textContent = u(element.source);
  elspectral_img.textContent = u(element.spectral_img);
  elsymbol.textContent = u(element.symbol);
  elxpos.textContent = u(element.xpos);
  elypos.textContent = u(element.ypos);
  elshells.textContent = "[" + u(element.shells) + "]";
}