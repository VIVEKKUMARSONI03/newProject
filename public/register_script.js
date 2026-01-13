const map = L.map("map").setView([21.24366, 81.63560], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
}).addTo(map);

let adminMarker;

async function geocodePlace(placename) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placename)}&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.length) throw new Error("Place not found");

    return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
    };
}

async function locatePlace() {
    const placeName = document.getElementById("placename").value;
    if (!placeName) return alert("Enter place name");

    const coords = await geocodePlace(placeName);

    map.setView([coords.lat, coords.lng], 16);

    if (adminMarker) {
        adminMarker.setLatLng([coords.lat, coords.lng]);
    } else {
        adminMarker = L.marker([coords.lat, coords.lng], { draggable: true })
            .addTo(map);

        adminMarker.on("dragend", (e) => {
            const pos = e.target.getLatLng();
            document.getElementById("lat").value = pos.lat;
            document.getElementById("lng").value = pos.lng;
        });
    }

    document.getElementById("lat").value = coords.lat;
    document.getElementById("lng").value = coords.lng;
}
