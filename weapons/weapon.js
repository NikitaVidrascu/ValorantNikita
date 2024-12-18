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

// Obtener el ID del arma desde la URL
const params = new URLSearchParams(window.location.search);
const weaponId = params.get("id");

// Cargar informacion del mapa en base al id
fetch("https://valorant-api.com/v1/weapons")
  .then((response) => response.json())
  .then((data) => {
    const weapons = data.data;
    const weaponNameContainer = document.getElementById("weapon-name");
    const weaponImageContainer = document.getElementById("weapon-image");
    const weaponVideoContainer = document.getElementById("weapon-video");
    const weapon = weapons.find(w => w.uuid === weaponId);

    if (weapon) {
      weaponNameContainer.textContent = weapon.displayName;

      const img = document.createElement("img");
      img.src = weapon.displayIcon;
      img.alt = weapon.displayName;
      img.className = "w-full object-contain";
      weaponImageContainer.appendChild(img);

      let videoUrl;
      for (const skin of weapon.skins) {
        for (const level of skin.levels) {
          if (level.streamedVideo) {
            videoUrl = level.streamedVideo;
            break;
          }
        }
        if (videoUrl) break;
      }

      if (videoUrl) {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.controls = true;
        video.className = "w-full rounded-lg";
        weaponVideoContainer.appendChild(video);
      } else {
        weaponVideoContainer.textContent = "No video available for this weapon.";
      }
    } else {
      weaponNameContainer.textContent = "Weapon not found.";
    }
  })
  .catch((error) => console.error("Error loading weapons:", error));
