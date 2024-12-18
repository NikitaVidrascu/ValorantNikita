const body = document.getElementById("theme-body");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const toggle = document.getElementById("toggle-theme");

function cambiarTema() {
  const agentDescription = document.getElementById("agentDescription");
  if (toggle.checked) {
    // Tema claro
    body.classList.remove("from-[#12222B]", "via-[#12222B]", "to-[#df4554]");
    body.classList.add("from-[#B4B4B5]", "via-[#B4B4B5]", "to-[#df4554]");

    header.classList.remove("bg-[#12222B]");
    header.classList.add("bg-[#B4B4B5]");

    menu.classList.remove("bg-[#12222B]");
    menu.classList.add("bg-[#B4B4B5]");

    agentDescription.classList.remove("text-[#B4B4B5]");
    agentDescription.classList.add("text-[#12222B]");
  } else {
    // Tema oscuro
    body.classList.remove("from-[#B4B4B5]", "via-[#B4B4B5]", "to-[#df4554]");
    body.classList.add("from-[#12222B]", "via-[#12222B]", "to-[#df4554]");

    header.classList.remove("bg-[#B4B4B5]");
    header.classList.add("bg-[#12222B]");

    menu.classList.remove("bg-[#B4B4B5]");
    menu.classList.add("bg-[#12222B]");

    agentDescription.classList.remove("text-[#12222B]");
    agentDescription.classList.add("text-[#B4B4B5]");
  }
}

// Cambiar el tema al hacer clic en el interruptor
toggle.addEventListener("change", cambiarTema);

// Función para abrir y cerrar el menú
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Obtener el parámetro 'id' de la URL
const params = new URLSearchParams(window.location.search);
const agentId = params.get("id");

// Cargar informacion del agente en base al id
if (agentId) {
  fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
    .then((response) => response.json())
    .then((data) => {
      const agents = data.data;
      const agent = agents.find((a) => a.uuid === agentId);

      if (agent) {
        const agentNameContainer = document.getElementById("agent-name");
        const agentImageContainer = document.getElementById("agent-image");
        const agentDescriptionContainer =
          document.getElementById("agent-description");

        agentNameContainer.textContent = agent.displayName;

        const agentImg = document.createElement("img");
        agentImg.src = agent.fullPortrait ? agent.fullPortrait : "";
        agentImg.alt = agent.displayName;
        agentImg.className = "w-full object-contain";
        agentImageContainer.appendChild(agentImg);

        const agentDescription = document.createElement("p");
        agentDescription.textContent = agent.description;
        agentDescription.id = "agentDescription";
        agentDescription.className =
          "text-lg md:text-3xl lg:text-5xl text-white";
        agentDescriptionContainer.appendChild(agentDescription);

        cambiarTema();
      }
    })
    .catch((error) => console.error("Error loading agents:", error));
} else {
  document.getElementById("agent-name").textContent = "No agent ID provided.";
}
