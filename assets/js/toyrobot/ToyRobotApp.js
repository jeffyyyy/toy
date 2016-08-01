'use strict';

var ToyRobot = angular.module('ToyRobot', ['ngRoute']);

ToyRobot.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/toyrobot/index',
      controller: 'ToyRobotController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);



