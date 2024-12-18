const body = document.getElementById("theme-body");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const toggle = document.getElementById("toggle-theme");

// Cambiar el tema al hacer clic en el interruptor
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    // Eliminar clases de tema oscuro y aplicar tema claro
    body.classList.remove("from-[#12222B]", "via-[#12222B]", "to-[#df4554]");
    body.classList.add("from-[#B4B4B5]", "via-[#B4B4B5]", "to-[#df4554]");

    header.classList.remove("bg-[#12222B]");
    header.classList.add("bg-[#B4B4B5]");

    menu.classList.add("bg-[#B4B4B5]");
    menu.classList.remove("bg-[#12222B]");
  } else {
    // Eliminar clases de tema claro y aplicar tema oscuro
    body.classList.remove("from-[#B4B4B5]", "via-[#B4B4B5]", "to-[#df4554]");
    body.classList.add("from-[#12222B]", "via-[#12222B]", "to-[#df4554]");

    header.classList.remove("bg-[#B4B4B5]");
    header.classList.add("bg-[#12222B]");

    menu.classList.add("bg-[#12222B]");
    menu.classList.remove("bg-[#B4B4B5]");
  }
});

// Función para abrir y cerrar el menú
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Cargar las imágenes de los agentes
fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
  .then((response) => response.json())
  .then((data) => {
    const agentsContainer = document.getElementById("agents-container");
    const agents = data.data;

    agents.forEach((agent) => {
      const img = document.createElement("img");
      img.src = agent.displayIcon;
      img.alt = agent.displayName;

      img.className =
        "w-20 h-20 cursor-pointer md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-md";

      const link = document.createElement("a");
      link.href = `agent.html?id=${agent.uuid}`;
      link.appendChild(img);

      agentsContainer.appendChild(link);
    });
  });
