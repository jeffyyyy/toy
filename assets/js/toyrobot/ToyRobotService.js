ToyRobot.service('ToyRobotService', ['$http', '$q', function($http, $q) {
  var toyrobotService = {};

  toyrobotService.getInitialState = function() {
    var defer = $q.defer();
    $http.get('/api/getInitialState').success(function(response) {
      defer.resolve(response);
    }).error(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  };

  toyrobotService.nextMove = function(data) {
    var defer = $q.defer();
    $http.post('/api/handleNextMove', data).success(function(response) {
      defer.resolve(response);
    }).error(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  };

  toyrobotService.executePatchCommands = function(data) {
    var defer = $q.defer();
    $http.post('/api/handlePatchCommands', data).success(function(response) {
      defer.resolve(response);
    }).error(function(err) {
      defer.reject(err);
    });
    return defer.promise;
  };

  return toyrobotService;

}]);

