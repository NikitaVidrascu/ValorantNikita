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

// Cargar las imágenes de las armas
fetch("https://valorant-api.com/v1/weapons")
  .then((response) => response.json())
  .then((data) => {
    const weaponsContainer = document.getElementById("weapons-container");
    const weapons = data.data;

    weapons.forEach((weapon) => {
      const img = document.createElement("img");
      img.src = weapon.displayIcon ? weapon.displayIcon : "";
      img.alt = weapon.displayName;
      img.className =
        "cursor-pointer w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain rounded-md";

      const link = document.createElement("a");
      link.href = `weapon.html?id=${weapon.uuid}`;
      link.appendChild(img);

      weaponsContainer.appendChild(link);
    });
  });



