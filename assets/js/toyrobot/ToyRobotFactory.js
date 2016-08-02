ToyRobot.factory('ToyRobotModel', ['$http', '$q', function($http, $q) {
  function initialize() {
    var toyRobotModel = {
      currentPosition: {},
      row: 5,
      column : 5,
      nextMove: {
        type: '',
        f: '',
        x: '',
        y: ''
      },
      mode: 'step', //default mode is step by step
      stepModeClass: 'active btn-primary',
      patchModeClass: 'btn-default',
      modeDescription: 'Step By Step Mode - Each command will get executed and return output immediately!',
      patchCommands: '',
      robotClass: '',
      input: '',
      output: '',
      error: ''
    };
    return toyRobotModel;
  }

  return {
    initialize: initialize
  };
}]);
