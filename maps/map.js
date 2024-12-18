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

// Obtener el parámetro id de la URL
const params = new URLSearchParams(window.location.search);
const mapId = params.get("id");

// Cargar informacion del mapa en base al id
if (mapId) {
  fetch("https://valorant-api.com/v1/maps")
    .then((response) => response.json())
    .then((data) => {
      const maps = data.data;
      const map = maps.find(m => m.uuid === mapId);

      if (map) {
        const mapNameContainer = document.getElementById("map-name");
        const splashContainer = document.getElementById("map-splash");
        const minimapContainer = document.getElementById("map-minimap");

        mapNameContainer.textContent = map.displayName;

        const splashImg = document.createElement("img");
        splashImg.src = map.splash ? map.splash : "";
        splashImg.alt = map.displayName;
        splashImg.className = "w-full object-contain";
        splashContainer.appendChild(splashImg);

        const minimapImg = document.createElement("img");
        minimapImg.src = map.displayIcon ? map.displayIcon : "";
        minimapImg.alt = map.displayName;
        minimapImg.className = "w-full object-contain";
        minimapContainer.appendChild(minimapImg);
      }
    })
    .catch((error) => console.error("Error loading maps:", error));
} else {
  document.getElementById("map-name").textContent = "No map ID provided.";
}
