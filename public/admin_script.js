const bcode = document.getElementById('bcode');
const nm = ducument.getElementById('name');
const socket = io();



socket.emit('msg_from_admin', 'i am admin');

socket.on('mfb', (msg) => {
    console.log('admin is printing:', msg);
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                // console.log("Latitude:", latitude);
                // console.log("Longitude:", longitude);

                //socket.emit('msg_from_admin', `admin bcode : latitude: ${latitude}, longitude : ${longitude}`);
                socket.emit({latitude:latitude, longitude: longitude, branchcode: bcode.textContent, name: nm.textContent});
            },
            (error) => {
                console.error("Error getting branchcode:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

setInterval(setloc,3000);