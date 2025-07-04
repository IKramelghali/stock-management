// ========== Class Product ==========
class Product {
  constructor(nom, marque, prix, date, type, promo) {
    this.name = nom;
    this.brand = marque;
    this.price = prix;
    this.date = date;
    this.type = type;
    this.discount = promo;
  }

  getInfoHtml() {
    return `Nom : ${this.name} <br> Marque : ${this.brand} <br> Prix : ${this.price} <br> Date : ${this.date}`;
  }

  toTableRowHTML(index) {
    return [
      this.name,
      this.brand,
      this.price,
      this.date,
      this.type,
      `<button id="remove${index}" onclick="confirmationDelete(this)">
         <i class="fa-solid fa-trash"></i>
       </button>
       <button onclick="productUpdate(this)">
         <i class="fa-solid fa-pen-to-square"></i>
       </button>`
    ];
  }
}

// ========== Inputs ==========
const getInputValues = () => {
  const nom = document.getElementById("nom").value;
  const marque = document.getElementById("marque").value;
  const prix = document.getElementById("prix").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;
  const promo = document.querySelector("input[name='promotion']:checked")?.value || '';
  return new Product(nom, marque, prix, date, type, promo);
};

const getInputs = () => ({
  nom: document.getElementById("nom"),
  marque: document.getElementById("marque"),
  prix: document.getElementById("prix"),
  date: document.getElementById("date"),
  type: document.getElementById("type")
});

// ========== Validation ==========
const setError = (input, message) => {
  const formControl = input.closest("div");
  const small = formControl.querySelector("p");
  small.classList.remove("text-green-500");
  small.classList.add("text-red-500");
  input.classList.remove("border-green-500");
  input.classList.add("border-red-500");
  small.textContent = message;
};

const setSuccess = (input) => {
  const formControl = input.closest("div");
  const small = formControl.querySelector("p");
  small.classList.remove("text-red-500");
  small.classList.add("text-green-500");
  input.classList.remove("border-red-500");
  input.classList.add("border-green-500");
  small.textContent = "";
};

const validateInput = (input, regex, message) => {
  regex.test(input.value.trim()) ? setSuccess(input) : setError(input, message);
};

const checkDate = () => {
  const { date } = getInputs();
  const today = new Date();
  const enteredDate = new Date(date.value);
  (!date.value || enteredDate > today) ? setError(date, "Date invalide") : setSuccess(date);
};

const checkInputs = () => {
  const { nom, marque, prix, type } = getInputs();
  validateInput(nom, /^[a-zA-Z\s'-]+$/, "Nom invalide");
  validateInput(marque, /^[a-zA-Z\s'-]+$/, "Marque invalide");
  validateInput(prix, /^\d+([,.]?\d+)?$/, "Prix invalide");
  checkDate();
  type.selectedIndex < 1 ? setError(type, "Champ obligatoire") : setSuccess(type);
};

const isFormValid = () =>
  ![...document.querySelectorAll("input, select")].some(el => el.classList.contains("border-red-500"));

// ========== Table + Local Storage ==========
let count = 0;
const tableBody = document.getElementById("productList");

const addProductToTable = (product) => {
  const row = document.createElement("tr");
  row.id = `tr${count}`;
  product.toTableRowHTML(count).forEach((value, i) => {
    const td = document.createElement("td");
    td.id = `td${count}${i}`;
    td.innerHTML = value;
    row.appendChild(td);
  });
  tableBody.appendChild(row);
  count++;
};

const loadStoredProducts = () => {
  Object.keys(localStorage).forEach(key => {
    const data = JSON.parse(localStorage.getItem(key));
    const product = new Product(...data.slice(0, 6));
    addProductToTable(product);
  });
};

// ========== Update ==========
let rowToUpdate = null;
let keyToUpdate = null;

window.productUpdate = (btn) => {
  rowToUpdate = btn.closest("tr");
  keyToUpdate = rowToUpdate.querySelector("td:nth-child(2)").innerText;
  const cells = rowToUpdate.querySelectorAll("td");
  const inputs = getInputs();

  inputs.nom.value = cells[0].innerText;
  inputs.marque.value = cells[1].innerText;
  inputs.prix.value = cells[2].innerText;
  inputs.date.value = cells[3].innerText;
  inputs.type.value = cells[4].innerText;

  document.getElementById("ajouter").value = "Modifier";
};

const updateProduct = () => {
  const updated = getInputValues();
  const cells = rowToUpdate.querySelectorAll("td");
  updated.toTableRowHTML(0).forEach((val, i) => cells[i].innerHTML = val);
  localStorage.setItem(keyToUpdate, JSON.stringify(updated.toTableRowHTML(0)));
  clearForm();
};

// ========== Modals ==========
const modal = document.getElementById("modal");
const modal1 = document.getElementById("modal1");

window.showModal1 = () => {
  modal1.classList.remove("hidden");
  document.getElementById("modal1-text").innerHTML = getInputValues().getInfoHtml();
};

window.closeModal1 = () => modal1.classList.add("hidden");

let rowToDelete = null;
let keyToDelete = null;

window.confirmationDelete = (btn) => {
  rowToDelete = btn.closest("tr");
  keyToDelete = rowToDelete.querySelector("td:nth-child(2)").innerText;
  modal.classList.remove("hidden");
};

window.closeModal = () => modal.classList.add("hidden");

window.deleteProduct = () => {
  rowToDelete.remove();
  localStorage.removeItem(keyToDelete);
  closeModal();
};

// ========== Add Product ==========
const btnAdd = document.getElementById("ajouter");

btnAdd.addEventListener("click", () => {
  checkInputs();
  if (isFormValid()) {
    if (btnAdd.value === "AJOUTER") {
      const product = getInputValues();
      addProductToTable(product);
      localStorage.setItem(product.brand, JSON.stringify(product.toTableRowHTML(count)));
      showModal1();
      clearForm();
    } else {
      updateProduct();
      btnAdd.value = "AJOUTER";
    }
  }
});

const clearForm = () => {
  document.getElementById("form").reset();
  document.querySelectorAll("input, select").forEach(input => {
    input.classList.remove("border-red-500", "border-green-500");
  });
};

// ========== Load Data ==========
window.addEventListener("DOMContentLoaded", loadStoredProducts);
