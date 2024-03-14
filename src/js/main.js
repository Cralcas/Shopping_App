import "../css/style.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-c718c-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFIeldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFIeldEl.value;

  push(shoppingListInDB, inputValue);

  clearInputField();
  addItemToShoppingList(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  for (let i = 0; i < itemsArray.length; i++) {
    addItemToShoppingList(itemsArray[i]);
  }
});

function clearInputField() {
  inputFIeldEl.value = "";
}

function addItemToShoppingList(itemValue) {
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}
