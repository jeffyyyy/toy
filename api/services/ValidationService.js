/**
 * Validation Service to deal with standard validations required for robot inputs
 * @class ValidationService
 * @memberOf Services
 */

var _ = require('underscore');

var ValidationService = {

  // Validate Robot simulator input to make sure they pass in required
  validateInput: function(inputData, onResult, onError) {
    var error;
    var currentPosition = inputData.currentPosition;
    var commandInput = inputData.commandInput;

    if (currentPosition) {
      if (commandInput && commandInput.type) {
        switch(commandInput.type) {
          case "place":
            if (ValidationService.checkInvalidPosition(commandInput)) {
              error = {error: "Command input not valid, either x or y or direction undefined"};
            }
            break;
          case "move":
          case "left":
          case "right":
            if (ValidationService.checkInvalidPosition(currentPosition)) {
              error = {error: "Current position not valid, please start with valid PLACE command"};
            }
            break;
          default:
            error = {error: "Command type not valid"};
            break;
        }
      } else {
        error = {error: "No command type"};
      }
    } else {
      if (commandInput && commandInput.type == 'place') {
        if (ValidationService.checkInvalidPosition(commandInput)) {
          error = {error: "Command input not valid, either x or y or direction or type undefined"};
        }
      } else {
        error = {error: "No current position, please use valid PLACE command first"};
      }
    }

    if (error) {
      return onError(error);
    } else {
      return onResult();
    }
  },

  checkInvalidPosition: function(input) {
    var directions = ['N', "E", "S", "W"];
    return (!ValidationService.checkInteger(input.x)
            || !ValidationService.checkInteger(input.y)
            || !_.contains(directions, input.f));
  },

  checkInteger: function(input) {
    return _.isNumber(input) && input % 1 === 0;
  }
}
module.exports = ValidationService;
