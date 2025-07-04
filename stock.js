class product {
  constructor(nom,marque,prix,date,type,promo){
    this.name=nom;
    this.brand=marque;
    this.price=prix;
    this.dat=date;
    this.typ=type;
    this.discount=promo;
  }
  getproduct()
  {
    return `nom :${this.name} <br> marque :${this.brand} <br> prix :${this.price} <br> date :${this.dat} <br> `
  }
  table() {
    return [this.name, this.brand, this.price, this.dat, this.typ, `<button id="remove${count}" onclick='confirmationdelete(this);' ><i class="fa-solid fa-trash"></i></button><button onclick='productUpdate(this);'><i class="fa-solid fa-pen-to-square"></i></button>`]
  } 
}
// ---------- function return value of input ------------
function getinputvalue() {
  const nom = document.getElementById("nom").value;
  const marque = document.getElementById("marque").value;
  const prix = document.getElementById("prix").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;
  return new product(nom,marque,prix,date,type);
}
// ---------- function return  input ------------
function getinput()
{
  const nom = document.getElementById("nom");
  const marque = document.getElementById("marque");
  const prix = document.getElementById("prix");
  const date = document.getElementById("date");
  const type = document.getElementById("type");
  return new product(nom,marque,prix,date,type);
}
// ---------- function  for regex test input value ------------
function validinput(input, regex, message) {
  regex.test(input.value) == true ? (setsucces(input)) : (setError(input, message), input.focus())
}
// ---------- function  for check date ------------
function checkdate()
{
  const today = new Date();
  const date1=new Date(getinput().dat.value)
  if(getinput().dat.value =="")
  {
    setError(getinput().dat,"champ no valid")
  }
  else{
    if(today < date1 )
    {
      setError(getinput().dat,"champ no valid")
    }
    else
    {
      setsucces(getinput().dat)
    }
  }
}
// ---------- function  for error ------------
function setError(input, message) {
    const formcontrol = input.closest("div");
    const small = formcontrol.querySelector("p");
    if (small.classList.contains("text-green-500")) {
        small.classList.remove("text-green-500");
        input.classList.remove("border-green-500");

    }
    small.classList.add("text-red-500");
    input.classList.add("border-red-500");
    small.textContent = message;
}
// ---------- function  for succes ------------
function setsucces(input, message) {
    const formcontrol = input.closest("div");
    const small = formcontrol.querySelector("p");
    if (small.classList.contains("text-red-500")) {
        small.classList.remove("text-red-500");
        input.classList.remove("border-red-500");

    }
    small.classList.add("text-green-500");
    input.classList.add("border-green-500");
    small.textContent = '';
}
// ---------- function validate inputs ------------
function checkinputs() {
  validinput(getinput().name, /^(^[a-z]+['-\s]?[a-z]+)$/, "champ no valid")
  validinput(getinput().brand, /^(^[a-z]+['-\s]?[a-z]+)$/, "champ no valid")
  validinput(getinput().price, /^(^\d+([,.]?\d+$)?)$/, "champ no valid")
  checkdate()
   if (getinput().typ.selectedIndex < 1) {
    setError(getinput().typ, "champ obligatoire");
  } else {
    setsucces(getinput().typ);
  }
}
// ---------- function  for reset form ------------
function clearinput() {
  document.getElementById("form").reset();
  var formcontrol = document.querySelectorAll(".form-control");
  formcontrol.forEach((ele) => {
    if (ele.classList.contains("form-control-succes")) {
      ele.classList.remove("form-control-succes");
    }
  });
}
// ---------- check  input  ------------
getinput().name.addEventListener('input', function () {
  validinput(getinput().name, /^(^[a-z]+['-\s]?[a-z]+)$/gi, "champ no valid")
})
getinput().brand.addEventListener('input', function () {
  validinput(getinput().brand, /^(^[a-z]+['-\s]?[a-z]+)$/gi, "champ no valid")
})
getinput().price.addEventListener('input', function () {
  validinput(getinput().price, /^(^\d+([,.]?\d+$)?)$/gi, "champ no valid")
})
getinput().typ.addEventListener('input', function () {
  if (getinput().typ.selectedIndex < 1) {
    setError(getinput().typ, "champ obligatoire");
  } else {
    setsucces(getinput().typ);
  }
})
getinput().dat.addEventListener('input', function () {
 checkdate()
})
// ---------- function return if input has a error ------------
function isFormValid() {
  const inputs =Array.from(document.getElementById("form").elements).filter(el => el.tagName === 'INPUT') ;
  let result = true;
  inputs.forEach(input => {    
    if (input.classList.contains("border-red-500")) {
        result = false;
    }
    });

  return result;
}
// ---------- function for add product ------------
function add(tabl) {
  var row = document.createElement("tr");
  row.setAttribute("id", "tr" + count);
  tableau.appendChild(row);
  for (let i = 0; i < tabl.length; i++) {
    var row1 = document.getElementById("tr" + count);
    var cell = document.createElement("td");
    cell.setAttribute("id", "td" + count + i);
    cell.innerHTML = tabl[i];
    row1.appendChild(cell);
  }
}
// ---------- function for getdata from local storage ------------
function getdata()
{
  let items=[]
  keys = Object.keys(localStorage)
  for (let i = 0; i < keys.length; i++) {
    items.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return items
}
// ---------- function for set value in input ------------
let idrowforupdat
let keyforupdat
function productUpdate(idrow) {
  keyforupdat = window.localStorage.key(idrow)
  var row = idrow.closest("tr");
  var cols = row.querySelectorAll("td");
  for (let i = 0; i < getinput().table().length; i++) {
    getinput().table()[i].value=cols[i].innerHTML
  }

  btnadd.value = "Modifier";
  idrowforupdat = row;
}
// ---------- function for updat product ------------
function updatein() {
  var cols = idrowforupdat.querySelectorAll("td");
  for (let i = 0; i < cols.length; i++) {
    cols[i].innerHTML = getinputvalue().table()[i];
    console.log(getinputvalue().table()[i]);
  }
  localStorage.setItem(keyforupdat, JSON.stringify(getinputvalue().table()));
  clearinput();
  btnadd.value = "AJOUTER";
}
// ---------- add onclick to buttn add ------------
var tableau = document.getElementById("productList");
let count=0
var btnadd = document.getElementById("ajouter");
btnadd.addEventListener("click", checkproduct);
function checkproduct() {
  if (btnadd.value === "AJOUTER") {
    checkinputs();
    if (isFormValid() == true) {
      count++;
      showModal1()
      add(getinputvalue().table());
      window.localStorage.setItem(getinputvalue().brand, JSON.stringify(getinputvalue().table()))
      clearinput();
    } 
  } 
  else if (btnadd.value === "Modifier") {
    checkinputs();
    if (isFormValid() == true) {
      updatein();
    } 
  }
}
// ---------- put data in table ------------
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < getdata().length; i++) {
    add(getdata()[i]);
    count++;
  }
})

// ---------- function for execut modal ------------
const modal = document.querySelector("#modal");
const modal1 = document.querySelector("#modal1");
const closeButton = document.querySelector("#cancel");
const okeyButton = document.querySelector("#okey");
const deletButton = document.querySelector("#delete");
let getrow
let KeyName
function showModal1() {
  if (modal1.classList.contains("hidden")) {
    modal1.classList.remove("hidden");
  }
  document.querySelector("#modal1-text").innerHTML=getinputvalue().getproduct();
}
function closeModal1() {

  modal1.classList.add("hidden");
}
function confirmationdelete(idrow) {
  KeyName = window.localStorage.key(idrow)
  getrow = idrow.closest("tr")
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
  }
}
function deleteproduct() {
  getrow.remove();
  window.localStorage.removeItem(KeyName);
  closeModal();
}
function closeModal() {
  modal.classList.add("hidden");
}
function deleteProduct() {
  getrow.remove();
  window.localStorage.removeItem(KeyName);
  closeModal();
}