let isWisher = false;

const modeSelect = document.getElementById("mode-select");
const wishArea = document.getElementById("wish-area");
const form = document.getElementById("wish-form");
const list = document.getElementById("wish-list");

document.getElementById("mode-wish").addEventListener("click", async () => {
  isWisher = true;
  wishArea.style.display = "block";
  modeSelect.style.display = "none";
  await loadWishes();
});

document.getElementById("mode-giver").addEventListener("click", async () => {
  isWisher = false;
  wishArea.style.display = "none";
  modeSelect.style.display = "none";
  await loadWishes();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const link = document.getElementById("link").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title || !link || !priority) return;

  const docRef = await db.collection("wishes").add({ title, link, priority });
  addWish(title, link, priority, docRef.id);
  form.reset();
});

async function loadWishes() {
  list.innerHTML = "";
  const snapshot = await db.collection("wishes").get();
  snapshot.forEach(doc => {
    const data = doc.data();
    addWish(data.title, data.link, data.priority, doc.id);
  });
}

function addWish(title, link, priority, id = null) {
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

    editBtn.addEventListener("click", async () => {
      const newTitle = prompt("Neuer Titel:", title);
      const newLink = prompt("Neuer Link:", link);
      const newPriority = prompt("Neue Wunschstärke (1–10):", priority);

      if (newTitle && newLink && newPriority >= 1 && newPriority <= 10) {
        await db.collection("wishes").doc(id).set({
          title: newTitle,
          link: newLink,
          priority: newPriority
        });
        location.reload();
      }
    });

    deleteBtn.addEventListener("click", async () => {
      if (confirm("Wirklich löschen?")) {
        await db.collection("wishes").doc(id).delete();
        li.remove();
      }
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
  }

  list.appendChild(li);
}
