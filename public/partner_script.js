const bcode = document.getElementById('bcode');
const nm = document.getElementById('name');
const socket = io();

socket.emit('msg_from_partner', `i am partner ${nm.textContent}`);

socket.on('mfu_vb_fp', (msg) => {
    
    const {u_latitude,u_longitude,u_branchcode,u_name} = msg;
    if( u_branchcode === bcode.textContent){
        console.log(`partner ${nm.textContent} is printing`,msg);
    }
})

const setloc = () => {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude =  position.coords.longitude;

                socket.emit('msg_from_partner',{p_latitude:latitude, p_longitude: longitude, p_branchcode : bcode.textContent, p_name: nm.textContent});
            },
            (error) => {
                console.error("Error getting branchcode:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported");
    }

}

setInterval(setloc,500);