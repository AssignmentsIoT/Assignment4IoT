$(document).ready(() => {
    if ("Accelerometer" in window) {

        var x_coordinate = document.getElementById("x_coordinate");
        var y_coordinate = document.getElementById("y_coordinate");
        var z_coordinate = document.getElementById("z_coordinate");

        let sensor = new Accelerometer({frequency: 1});

        sensor.start();

        sensor.onreading = () => {
            x_coordinate.innerHTML = sensor.x;
            y_coordinate.innerHTML = sensor.y;
            z_coordinate.innerHTML = sensor.z;

            console.log("x coordinate: " + sensor.x + "\ny coordinate: " + sensor.y + "\nz coordinate:  " + sensor.z);
        }

        sensor.onerror = (error) => {
            document.getElementById("error_message").innerHTML = error;
        }
    }
    else document.getElementById("error_message").innerHTML = "Accelerometer not supported";
});