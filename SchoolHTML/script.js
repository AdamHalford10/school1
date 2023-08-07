const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("nameInput");
const nameList = document.getElementById("nameList");

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  if (name !== "") {
    saveName(name);
    nameInput.value = "";
  }
});

function saveName(name) {
  fetch("/api/names", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      appendNameToList(name);
    }
  });
}

function appendNameToList(name) {
  const listItem = document.createElement("li");
  listItem.textContent = name;
  nameList.appendChild(listItem);
}

fetch("/api/names")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      data.names.forEach((name) => {
        appendNameToList(name);
      });
    }
  });
