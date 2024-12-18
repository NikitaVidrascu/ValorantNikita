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

// Cargar las imágenes de los mapas
fetch("https://valorant-api.com/v1/maps")
  .then((response) => response.json())
  .then((data) => {
    const mapsContainer = document.getElementById("maps-container");
    const maps = data.data;

    maps.forEach((map) => {
      if (map.displayName !== "The Range") {
        const img = document.createElement("img");
        img.src = map.splash ? map.splash : "";
        img.alt = map.displayName;

        img.className =
          "cursor-pointer w-44 h-auto md:w-64 md:h-auto lg:w-80 lg:h-auto rounded-md";

        const link = document.createElement("a");
        link.href = `map.html?id=${map.uuid}`;
        link.appendChild(img);

        mapsContainer.appendChild(link);
      }
    });
  });
