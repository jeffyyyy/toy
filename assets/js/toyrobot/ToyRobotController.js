ToyRobot.controller('ToyRobotController', ['$scope', 'ToyRobotService', 'ToyRobotModel',
function ($scope, ToyRobotService, ToyRobotModel) {
  $scope.toyRobotModel = new ToyRobotModel.initialize();

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

  $scope.setMode = function(mode) {
    var previousMode = $scope.toyRobotModel.mode;
    $scope.toyRobotModel.mode = mode;
    $scope.toyRobotModel.stepModeClass = (mode == 'step' ? 'active btn-primary' : 'btn-default');
    $scope.toyRobotModel.patchModeClass = (mode == 'patch' ? 'active btn-primary' : 'btn-default');
    $scope.toyRobotModel.modeDescription = (mode == 'step' ? 'Step By Step Mode - Each command will get executed and return output immediately!' :
      'Patch Commands Mode - Commands will be appended together as one command, click on the \"Execute\" button to calculate final output!');
    if (previousMode != mode) $scope.reset();
  }

  $scope.nextMove = function(type) {
    var commandInput;
    var data;

    if (type == 'place') {
      commandInput = {
        x: $scope.toyRobotModel.nextMove.x,
        y: $scope.toyRobotModel.nextMove.y,
        f: $scope.toyRobotModel.nextMove.f,
        type: type
      };
      data = {
        commandInput: commandInput
      };
    } else {
      commandInput = {
        type: type
      };
      data = {
        currentPosition: $scope.toyRobotModel.currentPosition,
        commandInput: commandInput
      };
    }

    if ($scope.toyRobotModel.mode == 'step') {
      ToyRobotService.nextMove(data).then(function (response) {
        if (response.error) {
          $scope.toyRobotModel.error = "Oh snap! " + response.error;
        } else {
          $scope.toyRobotModel.currentPosition = response;
          $scope.toyRobotModel.output = $scope.reportOutput($scope.toyRobotModel.currentPosition);
          $scope.toyRobotModel.error = '';
          if (response.f) $scope.changeDirection(response.f);
        }
        if (type == 'place') {
          $scope.toyRobotModel.input += "PLACE "
            + (commandInput.x!='' ? commandInput.x + "," : "")
            + (commandInput.y!='' ? commandInput.y + "," : "")
            + (commandInput.f!='' ? commandInput.f : "") +  (response.error ? " - ERROR \n" : "\n");
        } else {
          $scope.toyRobotModel.input += type.toUpperCase() + (response.error ? " - ERROR \n" : "\n");
        }
      });
    } else {
      $scope.toyRobotModel.patchCommands += ($scope.toyRobotModel.patchCommands != '' ? "\n" : "")
                                              + commandInput.type
                                              + (commandInput.x != undefined && commandInput.x != '' ? "," + commandInput.x: "")
                                              + (commandInput.y != undefined && commandInput.y != '' ? "," + commandInput.y: "")
                                              + (commandInput.f ? "," + commandInput.f: "");
      $scope.toyRobotModel.input = $scope.toyRobotModel.patchCommands.toUpperCase();
      $scope.toyRobotModel.output = '';
      $scope.toyRobotModel.robotClass = '';
    }
  }

  $scope.patchCommandsExecute = function() {
    var data = {
      patchCommands: $scope.toyRobotModel.patchCommands
    }

    ToyRobotService.executePatchCommands(data).then(function (response) {
      if (response.error) {
      } else {
        $scope.toyRobotModel.currentPosition = response;
        $scope.toyRobotModel.output = $scope.reportOutput(response);
        $scope.toyRobotModel.patchCommands = '';
        if (response.f) $scope.changeDirection(response.f);
        if (!data.patchCommands) {
          $scope.toyRobotModel.input = '';
          $scope.toyRobotModel.robotClass = '';
        }
      }
    });
  }

  $scope.reportOutput = function(currentPosition) {
    if (currentPosition.x != undefined && currentPosition.y != undefined && currentPosition.f != '') {
      return "Output: " + currentPosition.x + "," + currentPosition.y + "," + currentPosition.f;
    } else {
      return "Output: INVALID";
    }
  }

  $scope.reset = function() {
    $scope.toyRobotModel.currentPosition = {};
    $scope.toyRobotModel.nextMove.type = ""
    $scope.toyRobotModel.nextMove.f = ""
    $scope.toyRobotModel.nextMove.x = ""
    $scope.toyRobotModel.nextMove.y = ""
    $scope.toyRobotModel.robotClass = ''
    $scope.toyRobotModel.input = '';
    $scope.toyRobotModel.output = '';
    $scope.toyRobotModel.error = '';
    $scope.toyRobotModel.patchCommands = '';
  }

}]);
