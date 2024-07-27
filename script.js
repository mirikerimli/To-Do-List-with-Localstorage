const form = document.querySelector("form");
const input = document.querySelector("#userinput");
const ul = document.querySelector(".tasks-list");
const submitBtn = document.querySelector("#enter");
const sortBtn = document.querySelector(".sort_btn");
const sortChoice = document.querySelector(".sort_list");
const nameOrder = document.querySelector(".name-order");
const nameOrderReverse = document.querySelector(".name-order-reverse");
const timeOrder = document.querySelector(".time-order");
const timeOrderReverse = document.querySelector(".time-order-reverse");

sortBtn.addEventListener("click", () => {
  sortChoice.classList.toggle("active");
});

function createListElement() {
  const li = document.createElement("li");
  li.classList.add("taskLi");
  const dateId = new Date().getTime();
  li.setAttribute("date-id", dateId);
  li.innerHTML = input.value;
  ul.appendChild(li);
  const liBtns = document.createElement("div");
  liBtns.classList.add("li_btns");
  li.append(liBtns);
  const deleteItem = document.createElement("a");
  deleteItem.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteItem.classList.add("btn");
  const editItem = document.createElement("a");
  editItem.classList.add("edit");
  editItem.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  liBtns.append(deleteItem, editItem);
  input.value = "";
}

form.addEventListener("submit", function addListAfterClick(event) {
  event.preventDefault();
  if (input.value == "") {
    alert("You must write something!");
  } else {
    createListElement();
    saveData();
  }
});

ul.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.parentElement.parentElement.remove();
    saveData();
  }
  if (e.target.classList.contains("fa-pen-to-square")) {
    input.value =
      e.target.parentElement.parentElement.parentElement.textContent;
    e.target.parentElement.parentElement.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", ul.innerHTML);
}

function showItem() {
  ul.innerHTML = localStorage.getItem("data");
}

showItem();

function sortByName() {
  const liNL = document.querySelectorAll(".taskLi");

  const liArray = Array.from(liNL);

  const orderedLi = liArray.sort((a, b) =>
    a.textContent.localeCompare(b.textContent)
  );

  orderedLi.forEach((item) => ul.append(item));
}

function sortByNameReverse() {
  const liNL = document.querySelectorAll(".taskLi");

  const liArray = Array.from(liNL);

  const orderedLi = liArray.sort((a, b) =>
    b.textContent.localeCompare(a.textContent)
  );

  orderedLi.forEach((item) => ul.append(item));
}

function sortByTime() {
  const liNL = document.querySelectorAll(".taskLi");

  const liArray = Array.from(liNL);

  const orderedLi = liArray.sort(
    (a, b) => a.getAttribute("date-id") - b.getAttribute("date-id")
  );

  orderedLi.forEach((item) => ul.append(item));
}

function sortByTimeReverse() {
  const liNL = document.querySelectorAll(".taskLi");

  const liArray = Array.from(liNL);

  const orderedLi = liArray.sort(
    (a, b) => b.getAttribute("date-id") - a.getAttribute("date-id")
  );

  orderedLi.forEach((item) => ul.append(item));
}

nameOrder.addEventListener("click", (event) => {
  sortByName();
  event.target.classList.toggle("toggle");
  nameOrderReverse.classList.toggle("toggle");
  sortChoice.classList.toggle("active");
});

nameOrderReverse.addEventListener("click", (event) => {
  sortByNameReverse();
  event.target.classList.toggle("toggle");
  nameOrder.classList.toggle("toggle");
  sortChoice.classList.toggle("active");
});

timeOrder.addEventListener("click", (event) => {
  sortByTime();
  event.target.classList.toggle("toggle");
  timeOrderReverse.classList.toggle("toggle");
  sortChoice.classList.toggle("active");
});

timeOrderReverse.addEventListener("click", (event) => {
  sortByTimeReverse();
  event.target.classList.toggle("toggle");
  timeOrder.classList.toggle("toggle");
  sortChoice.classList.toggle("active");
});
