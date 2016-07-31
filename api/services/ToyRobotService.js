var _ = require('underscore');

var ToyRobotService = {
  handleNextMove: function(inputData, onResult, onError) {
    var currentPosition = inputData.currentPosition;
    var commandInput = inputData.commandInput;
    var boundary = {
      minX: 0,
      maxX: 4,
      minY: 0,
      maxY: 4
    };
    var response = ToyRobotService.calculateNewPosition(currentPosition, commandInput, boundary);

    if (response) {
      return onResult(response);
    } else {
      return onError({error: "Out of boundary"});
    }
  },

  calculateNewPosition: function(currentPosition, input, boundary) {
    var directions = ['N', "E", "S", "W"];
    var newPosition;
    switch(input.type) {
      case "place":
        newPosition = ToyRobotService.validateNewPosition(input, boundary);
        break;
      case "move":
        var next = {
          x: currentPosition.x,
          y: currentPosition.y,
          f: currentPosition.f
        };

        switch(currentPosition.f) {
          case "N":
            next.y += 1;
            break;
          case "E":
            next.x += 1;
            break;
          case "S":
            next.y -= 1;
            break;
          case "W":
            next.x -= 1;
            break;
          default:
            break;
        };
        newPosition = ToyRobotService.validateNewPosition(next, boundary);
        break;
      case "left":
        var currentIndex = _.indexOf(directions, currentPosition.f);
        var newIndex = (currentIndex - 1 >= 0) ? currentIndex - 1 : directions.length-1;
        var newDirection = directions[newIndex];
        newPosition = {x: currentPosition.x, y: currentPosition.y, f: newDirection};
        break;
      case "right":
        var currentIndex = _.indexOf(directions, currentPosition.f);
        var newIndex = (currentIndex + 1 <= directions.length-1) ? currentIndex + 1 : 0;
        var newDirection = directions[newIndex];
        newPosition = {x: currentPosition.x, y: currentPosition.y, f: newDirection};
        break;
      default:
        break;
    };

    return newPosition;
  },

  validateNewPosition: function(input, boundary) {
    var validPosition;
    if (input.x < boundary.minX || input.x > boundary.maxX
      || input.y < boundary.minY || input.y > boundary.maxY) {
      validPosition = false;
    } else {
      validPosition = {x: input.x, y: input.y, f: input.f};
    }
    return validPosition;
  }

};

module.exports = ToyRobotService;
