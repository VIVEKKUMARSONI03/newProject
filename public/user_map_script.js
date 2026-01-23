const bcode = document.getElementById('bcode');
const nm = document.getElementById('name');
const t = document.getElementById('lat');
const g = document.getElementById('lng');
const me = document.getElementById('me');
const cover = document.getElementById('cover');
const not_me = document.getElementById('not_me');
const socket = io();

socket.emit('msg_from_user', 'i am a user');

not_me.addEventListener('click',()=>{
    cover.style.display = 'none';
    socket.emit('not_me',"you are at wrong user");
})

me.addEventListener('click', ()=>{
    cover.style.display = 'none';
    cover2.style.display = 'flex';
    socket.emit('me',"yes i am");
})

socket.on('')

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

let partner = { lat: 21.2379, lng: 81.6337 };

const map = L.map("map").setView([user.lat, user.lng], 14);

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

socket.on('mfp_vb_fu', (msg) => {

    const { p_latitude, p_longitude, p_branchcode } = msg;
    if (p_branchcode === bcode.textContent) {
        console.log(`user ${nm.textContent} is printing`, msg);

        partner.lat = p_latitude; partner.lng = p_longitude;
        partnerMarker.setLatLng([partner.lat, partner.lng]);

        // drawRoute(user, partner);
    }
})

// socket.on('s_conf_p',(msg)=>{
//     console.log('partner ne bheja and user ko mil gaya ');
//     window.location.href = '/user/arrived';
// })

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                //user.lat = latitude; user.lng = longitude;
                //user.lat = parseFloat(t.textContent); user.lng = parseFloat(g.textContent);
                //userMarker.setLatLng([user.lat, user.lng]);

                const pointA = L.latLng(user.lat, user.lng);
                const pointB = L.latLng(partner.lat, partner.lng);

                if (pointA.distanceTo(pointB) <= 5) {
                    console.log('u',pointA.distanceTo(pointB) );
                    socket.emit('u_to_X',"band_karo_bhai");
                    //window.location.href = '/user/arrived';
                }
                else{
                    console.log('u',pointA.distanceTo(pointB) );
                    socket.emit('msg_from_user', { u_latitude: user.lat, u_longitude: user.lng, u_branchcode: bcode.textContent });
                }

                

            },
            (error) => {
                console.error("Error getting branchcode:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }
  drawRoute(user, partner);
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

