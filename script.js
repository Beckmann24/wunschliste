const form = document.getElementById("wish-form");
const list = document.getElementById("wish-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const link = document.getElementById("link").value;
  const priority = document.getElementById("priority").value;

  const li = document.createElement("li");
  li.innerHTML = `
    <a href="${link}" target="_blank">${title}</a>
    <div class="priority">Wunschstärke: ${priority}/10</div>
  `;
  list.appendChild(li);

  form.reset();
});
