const form = document.getElementById("wish-form");
const list = document.getElementById("wish-list");
const wishArea = document.getElementById("wish-area");
const modeSelect = document.getElementById("mode-select");

let isWisher = false;

// Funktion zum Hinzufügen eines Wunsches
function addWish(title, link, priority) {
  const li = document.createElement("li");

  const linkElem = document.createElement("a");
  linkElem.href = link;
  linkElem.textContent = title;
  linkElem.target = "_blank";

  const priorityElem = document.createElement("div");
  priorityElem.className = "priority";
  priorityElem.textContent = `Wunschstärke: ${priority}/10`;

  li.appendChild(linkElem);
  li.appendChild(priorityElem);

  if (isWisher) {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Bearbeiten";
    editBtn.className = "edit-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.className = "delete-btn";

    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Neuer Titel:", title);
      const newLink = prompt("Neuer Link (https://...):", link);
      const newPriority = prompt("Neue Wunschstärke (1–10):", priority);

      if (newTitle && newLink && newPriority >= 1 && newPriority <= 10) {
        linkElem.textContent = newTitle;
        linkElem.href = newLink;
        priorityElem.textContent = `Wunschstärke: ${newPriority}/10`;
      }
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("Wirklich löschen?")) {
        li.remove();
      }
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
  }

  list.appendChild(li);
}

// Formular absenden
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const link = document.getElementById("link").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title || !link || !priority) return;

  addWish(title, link, priority);
  form.reset();
});

// Moduswahl
document.getElementById("mode-wish").addEventListener("click", () => {
  isWisher = true;
  wishArea.style.display = "block";
  modeSelect.style.display = "none";
});

document.getElementById("mode-giver").addEventListener("click", () => {
  isWisher = false;
  wishArea.style.display = "none";
  modeSelect.style.display = "none";
});
