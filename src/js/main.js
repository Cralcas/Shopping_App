import "./../css/style.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-c718c-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFIeldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFIeldEl.value;
  if (inputValue === "") {
    inputFIeldEl.placeholder = "Enter item...";
  } else {
    push(shoppingListInDB, inputValue);

    clearInputField();
  }
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];

      addItemToShoppingList(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "Cart is empty...";
  }
});

function clearShoppingList() {
  shoppingListEl.innerHTML = "";
}

function clearInputField() {
  inputFIeldEl.value = "";
}

function addItemToShoppingList(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let listItem = document.createElement("li");

  listItem.textContent = itemValue;

  listItem.addEventListener("dblclick", function () {
    let selectedItem = ref(database, `shoppingList/${itemID}`);

    remove(selectedItem);
  });

  shoppingListEl.append(listItem);
}
