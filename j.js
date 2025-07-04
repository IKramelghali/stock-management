



// ---------- function for execut modal ------------
// const modal = document.querySelector(".modal");
// const modal1 = document.querySelector(".modal1");
// const closeButton = document.querySelector("#cancel");
// const okeyButton = document.querySelector("#okey");
// const deletButton = document.querySelector("#delete");
// let getrow
// let KeyName
// function confirmationdelete(idrow) {
//   KeyName = window.localStorage.key(idrow)
//   getrow = idrow.closest("tr")
//   if (modal.classList.contains("close-modal")) {
//     modal.classList.remove("close-modal");
//   }
//   modal.classList.add("show-modal");
// }
// function deleteproduct() {
//   getrow.remove();
//   window.localStorage.removeItem(KeyName);
//   closeModal();
// }
// function closeModal() {
//   if (modal.classList.contains("show-modal")) {
//     modal.classList.remove("show-modal");
//   }
//   modal.classList.add("close-modal");
// }
// function closeModal1() {
//   if (modal1.classList.contains("show-modal")) {
//     modal1.classList.remove("show-modal");
//   }
//   modal1.classList.add("close-modal");
// }
// function showModal1() {
//   if (modal1.classList.contains("close-modal")) {
//     modal1.classList.remove("close-modal");
//   }
//   document.querySelector(".modal1-text").innerHTML=getinputvalue().getproduct();
//   modal1.classList.add("show-modal");
// }
// okeyButton.addEventListener("click", closeModal1);
// closeButton.addEventListener("click", closeModal);
// deletButton.addEventListener("click", deleteproduct);
//--------search a product------
// var btnsearch = document.getElementById("btnsearch");
// var inputsearch = document.getElementById("search");
// btnsearch.addEventListener('click', function () {
//   const tr = tableau.querySelectorAll("tr")
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td.innerHTML == inputsearch.value) {
//       console.log("mzian 3lik");
//       alert('find')
//     }
//     else {
//       alert("don't find it")
//     }
//   }
// })
