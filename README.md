# Toy Robot Simulator

## Install Guide
1. Go to the project folder, run command "npm install".
2. Then run command "grunt install" (It will install all necessary packages globally).
3. Run unit tests with command "mocha". Please be aware that if you already have the web server running, you need to shut it down first since unit tests will need to start the web server at same port 1337.
4. Finally run command "sails lift" to start the web server, now you can view the robot simulator at http://localhost:1337.

## Important files
* Inside folder "api/controllers" and "api/services", which contains all the server side node.js code
* Inside folder "assets/js/toyrobot", which contains all the frontend angular.js code
* Inside folder "assets/styles", which contains all the css files
* Inside folder "views/toyrobot", which contains the view files
* Inside folder "test", which contains all unit tests files


## Screenshots
![alt text](https://github.com/jeffyyyy/toy/raw/develop/assets/images/patchcommandmode.png "Toy Robot Patch Commands Mode")
![alt text](https://github.com/jeffyyyy/toy/raw/develop/assets/images/unittest_screenshot.png "Toy Robot Unit Tests")
