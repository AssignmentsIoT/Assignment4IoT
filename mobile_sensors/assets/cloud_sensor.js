// This is the script that is executed by the browser and that will read the measurements made by
// the accelerometer 

// Wait until the browser is ready (everything loaded)
$(document).ready(() => {
    try {

        // Prepare the variables to store the values
        let x_coordinate = document.getElementById("x_coordinate");
        let y_coordinate = document.getElementById("y_coordinate");
        let z_coordinate = document.getElementById("z_coordinate");

        // Check if the accelerometer is supported
        if ("Accelerometer" in window) {

            // Create a new Accelerometer object
            let sensor = new Accelerometer({frequency: 1});

            // Start the sensor reading
            sensor.start();

            // Manage the reads (onreading event)
            sensor.onreading = () => {
                x_coordinate.innerHTML = sensor.x;
                y_coordinate.innerHTML = sensor.y;
                z_coordinate.innerHTML = sensor.z;

                // Logs
                console.log("x coordinate: " + sensor.x + "\ny coordinate: " + sensor.y + "\nz coordinate:  " + sensor.z);

                // Preapare data to be sent to the Node JS backend
                let telemetry = { x: sensor.x, y: sensor.y, z: sensor.z, module: "undefined", activity: "undefined" };

                // POST data to the backend
                fetch("/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(telemetry),
                });
            }

        }
        // The accelerometer is not supported
        else document.getElementById("error_message").innerHTML = "Accelerometer not supported";
    // Manage errors
    } catch (error) {
        document.getElementById("error_message").innerHTML = error;
    }
});