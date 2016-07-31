/**
 * RobotController
 *
 * @description :: Server-side logic for managing robots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {

  handleNextMove: function(req, res) {
    var currentPosition = req.param('currentPosition');
    var commandInput = req.param('commandInput');

    var inputData = {
      currentPosition: currentPosition,
      commandInput: commandInput
    };

    ValidationService.validateInput(inputData, function () {
      ToyRobotService.handleNextMove(inputData, function(result) {
        return res.send(result);
      }, function(error) {
        return res.send(error);
      });
    }, function(error) {
      return res.send(error);
    });
  },

  handlePatchCommands: function(req, res) {
    var patchCommands = req.param('patchCommands');
    var currentPosition = {
      x: '',
      y: '',
      f: ''
    };

    var commands = patchCommands.split('\n');
    async.mapSeries(commands, function(command, callback) {
      var commandDetail = command.split(',');
      var inputData = {
        currentPosition: currentPosition,
        commandInput: {
          type: commandDetail[0] != undefined ? commandDetail[0] : '',
          x: commandDetail[1] != undefined ? parseInt(commandDetail[1]) : '',
          y: commandDetail[2] != undefined ? parseInt(commandDetail[2]) : '',
          f: commandDetail[3] != undefined ? commandDetail[3] : ''
        }
      };
      ToyRobotService.handleNextMove(inputData, function (result) {
        if (result.x != undefined && result.y != undefined && result.f != undefined) {
          currentPosition = result;
        }
        return callback();
      }, function (error) {
        return callback();
      });
    }, function(error, results) {
      return res.send(currentPosition);
    });
  }
};

