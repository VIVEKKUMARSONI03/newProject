const loc = document.getElementById('loc');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_partner', `i am partner ${nm.textContent}`);

const user = { lat: 21.2514, lng: 81.6296 };
const partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView(user, 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);


socket.on('mfu_vb_fp', (msg) => {

    const { u_latitude, u_longitude, u_location, u_name } = msg;
    if (u_location === loc.textContent) {
        console.log(`partner ${nm.textContent} is printing`, msg);
    }

    user.lat = u_latitude; user.lng = u_longitude;
    const userMarker = L.marker([user.lat, user.lng]).addTo(map)
        .bindPopup("User");

    const partnerMarker = L.marker([partner.lat, partner.lng]).addTo(map)
        .bindPopup("Delivery Partner");

})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                partner.lat = latitude; partner.lng = longitude;

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

setInterval(setloc, 500);