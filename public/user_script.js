const bcode = document.getElementById('bcode');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_user', 'i am a user');

socket.on('mfp_vb_fu', (msg) => {
    const { p_latitude, p_longitude, p_branchcode, p_name } = msg;
    if (p_branchcode === bcode.textContent) {
        console.log(`user ${nm.textContent} is printing`, msg);
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

setInterval(setloc, 500);

