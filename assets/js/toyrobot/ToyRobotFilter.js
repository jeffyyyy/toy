ToyRobot.filter('rangeColumn', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=total-1; i>=0; i--) {
      input.push(i);
    }

    return input;
  };
});

ToyRobot.filter('rangeRow', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});