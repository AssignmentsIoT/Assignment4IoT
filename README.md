# Assignment4IoT

This assignment was done as part of the course of Internet of Things of Master Degree in Computer Engineering at Sapienza University of Rome.<br>

## Main idea
We want to build a simple crowdsensing application that collects the data read by the accelerometer sensor on a smartphone and does some activity recognition with it. In particular, we want to be able to tell if the user is running, is walking or id he's standing still. We'll consider two variants: the activity recognition is perfomed at the **cloud level** by the cloud platform, or the activity recognition is done at **edge level**, which means it is done locally on the phone, and only after that the data is sent on the cloud.<br>

## Implementation
The crowdsensing application is a simple Nodejs application deployed on Heroku. The data is collected from the accelerometer with a simple HTML page and some JavaScript rendered by the browser Google Chrome. The code relative to this part is in the */views* folder and in the *.js* files in the */assets* folder into */crowdsensing_app*. There is also a little */assets/styles.css* for basic styling. The activity recognition section in the */assets/edge_sensor.js* file is easily recognizable.<br>
In the file */controllers/accelerometerController.js* HTTP requests are managed, in particular in the POST methods the data is collected from the front-end and send to the cloud platform.<br>
We use ThingsBoard as cloud platform, where the activity recongnition is performed, thanks to a rule chain, by this code:<br>
```
// If activity recognition was not performed at edge level, it's done now at cloud level
if (msg.activity === "undefined") {
    activity_recognition(msg);
}

// Return the message for further processing
return {msg: msg, metadata: metadata, msgType: msgType};

// Activity recognition function
function activity_recognition(msg) {
    // Compute the module of the vector
    var module = Math.sqrt((msg.x * msg.x) + (msg.y * msg.y) + (msg.z * msg.z));
    msg.module = module;
    
    // Take into account gravitational acceleration
    var normalizedModule = Math.abs(module - 9.81);
    
    //Activity recognition
    if (normalizedModule > 2) {
        msg.activity = "Running";
    }
    else if (normalizedModule > 0.5) {
        msg.activity = "Walking";
    }
    else {
        msg.activity = "Standing still";
    }
}
```
<br>
In the **cloud** section, you can visualiza the ThingsBoard dashboard thanks to a link, to see all the latest values detected by the sensors, even all the ones collected in an hour.<br>
In the **edge** section, you'll be able to see the activity you're doing in real time on the page, but you can also access a dashboard where you can see all the activities detected during the last hour.<br>

### Run the application
#### Prepare the phone
First of all, you need an Android phone with Chrome browser. In the search bar, write **chrome://flags/** and enable **#enable-generic-sensor-extra-classes**. If you have a Chrome version older than 63 you also need to enable **#enable-generic-sensor** as stated in this page: https://intel.github.io/generic-sensor-demos/ .<br>
#### Access the application
Since the application is deployed on Heroku, you just need to connect to this link: https://salty-wave-30591.herokuapp.com/ and see the magic happen!<br>

### More information
If you want to know how to build an application like this, just have a look at this tutorial I've made on Hackster.io: LINK TUTORIAL.<br>
There's also a video on Youtube to show the application running and the main technologies involved: YOUTUBE_LINK.<br>
Finally, for further information, have a look also the power point in this repository.<br>
I hope these series of tutorial has been fun and useful!<br>

### Further references
Here's a list of useful links:<br>

- Generic Sensor API: https://w3c.github.io/sensors/

- HTML: https://html.spec.whatwg.org/multipage/

- JavaScript: https://en.wikipedia.org/wiki/JavaScript

- Google Chrome: https://en.wikipedia.org/wiki/Google_Chrome

- Node.js: https://nodejs.org/en

- MQTT: https://mqtt.org/

- Heroku: https://www.heroku.com/

- ThingsBoard: https://thingsboard.io