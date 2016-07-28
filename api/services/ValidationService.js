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
    console.log(inputData);
    if (!inputData.currentPosition) {
      error = {error: "No current position"};
    } else if (!inputData.commandInput) {
      error = {error: "No valid command input"};
    } else if (inputData.commandInput.type == "place" && (inputData.currentPosition.x == undefined
      || inputData.currentPosition.y == undefined
      || !ValidationService.checkInteger(inputData.currentPosition.x) 
      || !ValidationService.checkInteger(inputData.currentPosition.y))) {
      error = {error: "Current position x or y undefined"};
    } else if (inputData.commandInput.type == "place" && (inputData.commandInput.x == undefined 
      || inputData.commandInput.y == undefined 
      || !ValidationService.checkInteger(inputData.commandInput.x) 
      || !ValidationService.checkInteger(inputData.commandInput.y))) {
      error = {error: "Command input x or y undefined"};
    } else if (!inputData.commandInput.type) {
      error = {error: "Command input type undefined"};
    } else if (inputData.commandInput.type == "place" && (!inputData.commandInput.f || !_.contains(directions, inputData.commandInput.f))) {
      error = {error: "Command input facing direction undefined or incorrect"};
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
