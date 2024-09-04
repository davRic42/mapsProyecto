// loadGoogleMaps.js

(g => {
  var h, a, k, p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set,
    e = new URLSearchParams,
    u = () => h || (h = new Promise(async (f, n) => {
      await (a = m.createElement("script"));
      e.set("libraries", [...r] + "");
      for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
      e.set("callback", c + ".maps." + q);
      a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
      d[q] = f;
      a.onerror = () => h = n(Error(p + " could not load."));
      a.nonce = m.querySelector("script[nonce]")?.nonce || "";
      m.head.append(a)
    }));
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
})({
  key: "AIzaSyDgll0eCyYoalH4MHcmCKzilwK65pSjU-g",  // Reemplaza "YOUR_API_KEY" con tu clave de API real.
  v: "weekly"
});
// 4.6370400501542095, -74.08318391303874
// Función para inicializar el mapa
let lastMarker = null;

async function initMap() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Map } = await google.maps.importLibrary("maps");

  // Crear y configurar el mapa
  const map = new Map(document.getElementById("map"), {
    center: { lat: 4.6370400501542095, lng: -74.08318391303874 },
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });

  // Agregar un evento de clic al mapa
  map.addListener("click", (event) => {
    addMarker(event.latLng, map);
  });
}

async function addMarker(location, map) {
  // Eliminar el marcador anterior si existe
  if (lastMarker) {
    lastMarker.setMap(null); 
  }
  const content = buildContent(location.toString());
  lastMarker = new google.maps.marker.AdvancedMarkerElement({
    content: content,
    position: location,
    map: map,
  });
  
  updateLocationInput(location);

  lastMarker.addListener("click", () => {
    toggleHighlight(lastMarker);
  });
}

function updateLocationInput(location) {
  // Actualizar el valor del campo de entrada con las coordenadas
  const locationInput = document.getElementById('location');
  if (locationInput) {
    locationInput.value = `${location.lat().toFixed(6)}, ${location.lng().toFixed(6)}`;
  }
}

function toggleHighlight(marker) {
  // Alternar la clase de resaltado y ajustar el zIndex
  if (marker.content.classList.contains("highlight")) {
    marker.content.classList.remove("highlight");
    marker.zIndex = null;
  } else {
    marker.content.classList.add("highlight");
    marker.zIndex = 1;
  }
}

function buildContent(property) {
  // Crear el contenido HTML para el marcador
  const content = document.createElement("div");
  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-home"></i>
    </div>
    <div class="details">
        <span>${property}</span>
    </div>
    `;
  return content;
}

// Cargar la biblioteca de mapas y luego inicializar el mapa
google.maps.importLibrary("maps").then(() => initMap());
