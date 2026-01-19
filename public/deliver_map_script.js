const t = document.getElementById('lat');
const g = document.getElementById('lng');
const bcode = document.getElementById('bcode');
const nm = document.getElementById('nm');
const cover = document.getElementById('cover');
const socket = io();

const extractCoordinate = (element) => {
    const text = element.textContent;
    // Extract the number after the colon
    const match = text.split(':').pop().trim();
    const num = parseFloat(match);
    return isNaN(num) ? 0 : num;
};

let user = {
    lat: extractCoordinate(t),
    lng: extractCoordinate(g)
};

console.log(user);

let partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView([partner.lat, partner.lng], 14);

const gasIcon = L.icon({
    iconUrl: "https://res.cloudinary.com/dftacepnw/image/upload/v1758679016/Pngtree_gas_cylinder_icon_vector_11080127_m5jqyw.png",
    iconSize: [26, 26],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

let userMarker = L.marker([user.lat, user.lng]).addTo(map).bindPopup("User");

let partnerMarker = L.marker([partner.lat, partner.lng], { icon: gasIcon }).addTo(map).bindPopup("Delivery Partner");

let routeLine = null;

// socket.on('mfu_vb_fp', (msg) => {

//     const { u_latitude, u_longitude, u_branchcode, u_name } = msg;
//     if (u_branchcode === bcode.textContent) {
//         console.log(`partner ${nm.textContent} is printing`, msg);

//         user.lat = u_latitude; user.lng = u_longitude;
//         userMarker.setLatLng([user.lat, user.lng]);


//     }
// })



const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                partner.lat = latitude; partner.lng = longitude;
                partnerMarker.setLatLng([partner.lat, partner.lng]);

                const pointA = L.latLng(user.lat, user.lng);
                const pointB = L.latLng(partner.lat, partner.lng);

                if (pointA.distanceTo(pointB) <= 5) {
                    console.log('p', pointA.distanceTo(pointB));
                    socket.emit('p_to_X', "partner_bola");
                    //window.location.href = '/partner/arrived';
                    cover.style.display ='flex';
                }
                else {
                    console.log('p', pointA.distanceTo(pointB));
                    socket.emit('msg_from_partner', { p_latitude: partner.lat, p_longitude: partner.lng, p_branchcode: bcode.textContent });

                }
            },
            (error) => {
                console.error("Error getting branchcode:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }
    socket.on('s_conf_u', (msg) => {
        console.log('user ne bheja tha partner ko mil gaya');
        //window.location.href = '/partner/arrived';
        cover.style.display ='flex';
    })
    drawRoute(user, partner);
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

setInterval(setloc, 3000);