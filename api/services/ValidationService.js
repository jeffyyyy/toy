/**
 * Validation Service to deal with standard validations required for robot inputs
 * @class ValidationService
 * @memberOf Services
 */

var _ = require('underscore');

var ValidationService = {

  // Validate Robot simulator input to make sure they pass in required
  validateInput: function(inputData, onResult, onError) {
    var directions = ['N', "E", "S", "W"];
    var error;
  
    if (!inputData.commandInput) {
      error = {error: "No command input"};
    } if (!inputData.currentPosition) {
      error = {error: "No current position"};
    } else if (!ValidationService.checkInteger(inputData.currentPosition.x)
                || !ValidationService.checkInteger(inputData.currentPosition.y)
                || !_.contains(directions, inputData.currentPosition.f)) {
      error = {error: "No current position, please use PLACE command first"};
    } else if (!inputData.commandInput.type) {
      error = {error: "Command input type undefined"};
    } else {
      switch(inputData.commandInput.type) {
        case "place":
          if (!ValidationService.checkInteger(inputData.commandInput.x) 
              || !ValidationService.checkInteger(inputData.commandInput.y)
              || !_.contains(directions, inputData.commandInput.f)) {
            error = {error: "Command input x or y or direction undefined"};
          }
          break;
        case "move":
        case "left":
        case "right":
          console.log("here is move left or right");
          break;
        default:
          break;
      }
    }

    if (error) {
      return onError(error);
    } else {
      return onResult();
    }
  },

  checkInteger: function(input) {
    return _.isNumber(input) && input % 1 === 0;
  }
}
module.exports = ValidationService;
