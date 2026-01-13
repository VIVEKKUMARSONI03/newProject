const bcode = document.getElementById('bcode');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_user', 'i am a user');

let user = { lat: 21.24366, lng: 81.63560};
let partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView([user.lat, user.lng], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

const gasIcon = L.icon({
  iconUrl: "https://res.cloudinary.com/dftacepnw/image/upload/v1758679016/Pngtree_gas_cylinder_icon_vector_11080127_m5jqyw.png",   
  iconSize: [26, 26],       
  iconAnchor: [20, 40],     
  popupAnchor: [0, -40]     
});


let userMarker = L.marker([user.lat, user.lng])
    .addTo(map)
    .bindPopup("User");

let partnerMarker = L.marker([partner.lat, partner.lng], { icon: gasIcon })
    .addTo(map)
    .bindPopup("Delivery Partner");

let routeLine = null;

socket.on('mfp_vb_fu', (msg) => {
    const { p_latitude, p_longitude, p_branchcode, p_name } = msg;
    if (p_branchcode === bcode.textContent) {
        console.log(`user ${nm.textContent} is printing`, msg);

        partner.lat = p_latitude; partner.lng = p_longitude;
        partnerMarker.setLatLng([partner.lat, partner.lng]);

        drawRoute(user, partner);

    }
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                user.lat = latitude;
                user.lng = longitude;
                userMarker.setLatLng([user.lat, user.lng]);
                socket.emit('msg_from_user', { u_latitude: latitude, u_longitude: longitude, u_branchcode: bcode.textContent, u_name: nm.textContent });

            },
            (error) => {
                console.error("Error getting branchcode:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

async function drawRoute(user, partner) {
    const url = `https://router.project-osrm.org/route/v1/driving/` +
        `${user.lng},${user.lat};${partner.lng},${partner.lat}` +
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

setInterval(setloc, 3000);

