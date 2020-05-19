// This is the script that is executed by the browser and that will read the measurements made by
// the accelerometer and that will send them to ThingsBoard

// Prepare the variables to store the values
let x_coordinate = document.getElementById("x_coordinate");
let y_coordinate = document.getElementById("y_coordinate");
let z_coordinate = document.getElementById("z_coordinate");

$(document).ready(() => {
    try {
        if ("Accelerometer" in window) {

            let sensor = new Accelerometer({frequency: 1});

            sensor.start();

            sensor.onreading = () => {
                x_coordinate.innerHTML = sensor.x;
                y_coordinate.innerHTML = sensor.y;
                z_coordinate.innerHTML = sensor.z;

                console.log("x coordinate: " + sensor.x + "\ny coordinate: " + sensor.y + "\nz coordinate:  " + sensor.z);

                let telemetry = { x: x_coordinate, y: y_coordinate, z: z_coordinate};

                fetch("/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(telemetry),
                });
            }

        }
        else document.getElementById("error_message").innerHTML = "Accelerometer not supported";
    } catch (error) {
        document.getElementById("error_message").innerHTML = error;
    }
});