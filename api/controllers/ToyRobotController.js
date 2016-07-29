/**
 * RobotController
 *
 * @description :: Server-side logic for managing robots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  handleNextMove: function(req, res) {
    var currentPosition = req.param('currentPosition');
    var commandInput = req.param('commandInput');

    var inputData = {
      currentPosition: currentPosition,
      commandInput: commandInput
    };

    ValidationService.validateInput(inputData, function () {
      inputData.boundary = {
        minX: 0,
        maxX: 4,
        minY: 0,
        maxY: 4
      };

      ToyRobotService.handleNextMove(inputData, function(result) {
        return res.send(result);
      }, function(error) {
        return res.send(error);
      });
    }, function(error) {
      return res.send(error);
    });
  }
};

