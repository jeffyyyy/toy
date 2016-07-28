'use strict';

var ToyRobot = angular.module('ToyRobot', ['ngRoute']);

ToyRobot.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/toyrobot/index',
      controller: 'ToyRobotController'
    }).
    /*when('/apply', {
      templateUrl: '/templates/student/leave-types/index',
      controller: 'LeaveTypeListController',
      resolve: {
        session: setSession
      }
    })*/
    otherwise({
      redirectTo: '/'
    });
}]);



