const loc = document.getElementById('loc');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_partner', `i am partner ${nm.textContent}`);

let user = { lat: 21.2514, lng: 81.6296 };
let partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView([partner.lat, partner.lng], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

let userMarker = L.marker([user.lat, user.lng]).addTo(map)
    .bindPopup("User");

let partnerMarker = L.marker([partner.lat, partner.lng]).addTo(map)
    .bindPopup("Delivery Partner");


let routeLine = null;



socket.on('mfu_vb_fp', (msg) => {

    const { u_latitude, u_longitude, u_location, u_name } = msg;
    if (u_location === loc.textContent) {
        console.log(`partner ${nm.textContent} is printing`, msg);
    }

    user.lat = u_latitude; user.lng = u_longitude;
    userMarker.setLatLng([user.lat,user.lng]);

    drawRoute(user, partner);

})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                partner.lat = latitude; partner.lng = longitude;
                partnerMarker.setLatLng([partner.lat,partner.lng]);

                socket.emit('msg_from_partner', { p_latitude: latitude, p_longitude: longitude, p_location: loc.textContent, p_name: nm.textContent });
            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

async function drawRoute(user, partner) {
    const url = `https://router.project-osrm.org/route/v1/driving/` +
        `${partner.lng},${partner.lat};${user.lng},${user.lat}` +
        `?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    const coords = data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
    );

    if (routeLine) {
        map.removeLayer(routeLine);
    }

    routeLine = L.polyline(coords, {
        color: "blue",
        weight: 5,
    }).addTo(map);

    map.fitBounds(routeLine.getBounds());
}

setInterval(setloc, 500);