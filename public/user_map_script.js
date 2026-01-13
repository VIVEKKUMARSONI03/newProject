const loc = document.getElementById('loc');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_user', 'i am a user');

const user = { lat: 21.2514, lng: 81.6296 };
const partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView(user, 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);


socket.on('mfp_vb_fu', (msg) => {
    const { p_latitude, p_longitude, p_location, p_name } = msg;
    if (p_location === loc.textContent) {
        console.log(`user ${nm.textContent} is printing`, msg);


        const userMarker = L.marker([user.lat, user.lng]).addTo(map)
            .bindPopup("User");

        partner.lat = p_latitude; partner.lng = p_longitude;
        const partnerMarker = L.marker([partner.lat, partner.lng]).addTo(map)
            .bindPopup("Delivery Partner");

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

                socket.emit('msg_from_user', { u_latitude: latitude, u_longitude: longitude, u_location: loc.textContent, u_name: nm.textContent });
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

