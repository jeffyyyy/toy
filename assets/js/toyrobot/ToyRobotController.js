ToyRobot.controller('ToyRobotController', ['$scope', 'ToyRobotService',
function ($scope, ToyRobotService) {
  $scope.toyRobotModel = {
    currentState: {}
  }
  $scope.init = function() {
    ToyRobotService.getInitialState().then(function(response) {
      $scope.toyRobotModel.currentState = response;
      console.log($scope.toyRobotModel.initialState);
    });
  }

  $scope.nextMove = function() {
    var data = {
      currentPosition: {
        x: 0,
        y: 0,
        f: 'E'
      },
      // commandInput: {
      //   type: 'place',
      //   x: 4,
      //   y: 1,
      //   f: 'N'
      // }
      commandInput: {
        type: 'move',
      }
    }
    ToyRobotService.nextMove(data).then(function(response) {
      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        $scope.toyRobotModel.currentState = response;
      }
    });
  }

  $scope.init();
  $scope.nextMove();
}]);
