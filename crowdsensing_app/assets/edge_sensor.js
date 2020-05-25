// This is the script that is executed by the browser, that will read the measurements made by
// the accelerometer and that will do the activity recognition

// Wait until the browser is ready (everything loaded)
$(document).ready(() => {
    try {

        // Prepare the variables to store the values
        let x_coordinate = document.getElementById("x_coordinate");
        let y_coordinate = document.getElementById("y_coordinate");
        let z_coordinate = document.getElementById("z_coordinate");

        let activity_label = document.getElementById("activity");

        // Check if the accelerometer is supported
        if ("Accelerometer" in window) {

            // Create a new Accelerometer object
            let sensor = new Accelerometer({frequency: 1});

            // Start the sensor reading
            sensor.start();

            // Manage the reads (onreading event)
            sensor.onreading = () => {

                // Show the readings in real time in the HTML page
                x_coordinate.innerHTML = sensor.x;
                y_coordinate.innerHTML = sensor.y;
                z_coordinate.innerHTML = sensor.z;

                // Logs
                console.log("x coordinate: " + sensor.x + "\ny coordinate: " + sensor.y + "\nz coordinate:  " + sensor.z);

                // Activity recognition
                let activity = "undefined";

                // Compute the module of the vector
                let module = Math.sqrt((sensor.x * sensor.x) + (sensor.y * sensor.y) + (sensor.z * sensor.z));
                
                // Take into account gravitational acceleration
                let normalizedModule = Math.abs(module - 9.81);
                
                //Activity recognition
                if (normalizedModule > 2) {
                    activity = "Running";
                }
                else if (normalizedModule > 0.5) {
                    activity = "Walking";
                }
                else {
                    activity = "Standing still";
                }

                // Show the resulting activity in real time in the HTML page
                activity_label.innerHTML = activity;

                // Preapare data to be sent to the Node JS backend
                let telemetry = { x: sensor.x, y: sensor.y, z: sensor.z, module: module, activity: activity };

                // POST data to the backend
                fetch("/edge", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(telemetry),
                });
            }

        }
        // The accelerometer is not supported
        else {
            document.getElementById("error_message").innerHTML = "Accelerometer not supported";
            activity_label.innerHTML = "";
        }
    // Manage errors
    } catch (error) {
        document.getElementById("error_message").innerHTML = error;
    }
});