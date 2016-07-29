ToyRobot.controller('ToyRobotController', ['$scope', 'ToyRobotService',
function ($scope, ToyRobotService) {
  $scope.toyRobotModel = {
    currentPosition: {},
    row: 5,
    column : 5,
    nextMove: {
      type: '',
      f: '',
      x: '',
      y: ''
    },
    robotClass: '',
    input: '',
    output: '',
    error: ''
  }

  $scope.changeDirection = function(facing) {
    switch(facing) {
      case 'N':
        $scope.toyRobotModel.robotClass = "fa-arrow-up";
        break;
      case 'E':
        $scope.toyRobotModel.robotClass = "fa-arrow-right";
        break;
      case 'S':
        $scope.toyRobotModel.robotClass = "fa-arrow-down";
        break;
      case 'W':
        $scope.toyRobotModel.robotClass = "fa-arrow-left";
        break;
      default:
        break;
    }
  }

  $scope.nextMove = function(type) {
    var commandInput = {
      x: $scope.toyRobotModel.nextMove.x,
      y: $scope.toyRobotModel.nextMove.y,
      f: $scope.toyRobotModel.nextMove.f,
      type: type
    };

    var data;
    if (type == 'place') {
      data = {
        commandInput: commandInput
      };
    } else {
      data = {
        currentPosition: $scope.toyRobotModel.currentPosition,
        commandInput: commandInput
      };
    }

    ToyRobotService.nextMove(data).then(function(response) {
      if (response.error) {
        $scope.toyRobotModel.error = "Oh snap! " + response.error;
      } else {
        $scope.toyRobotModel.currentPosition = response;
        $scope.toyRobotModel.output = $scope.reportOutput($scope.toyRobotModel.currentPosition);
        $scope.toyRobotModel.error = '';
        if (response.f) $scope.changeDirection(response.f);
        if (type == 'place') {
          $scope.toyRobotModel.input += "PLACE " + commandInput.x + "," + commandInput.y + "," + commandInput.f+"\n";
        } else {
          $scope.toyRobotModel.input += type.toUpperCase()+"\n";
        }
      }
    });
  }

  $scope.reportOutput = function(currentPosition) {
    return "Output: " + currentPosition.x + "," + currentPosition.y + "," + currentPosition.f;
  }

}]);
