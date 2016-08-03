# Toy Robot Simulator

## Introduction
Robot can move around on this 5x5 table, but can not fall over boundaries. Robot needs to start with a PLACE command provided with (x,y) position and facing direction. MOVE command will make the robot move 1 step at current direction, LEFT or RIGHT will turn the direction to left or right.

## Install Guide
1. Go to the project folder, run command "npm install".
2. If you are on Mac, simply run command "grunt install" (It will execute a Makefile to install all necessary packages globally). If you are on windows, you need to run command "npm run init" instead.
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
