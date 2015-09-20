angular.module('SteroidsApplication', ['supersonic', 'hmTouchEvents'])
.controller('IndexController', function($scope, supersonic) {
  // $scope.navbarTitle = "What a Munchful table!";
  // $scope.Math = Math;
  $scope.alert = function(i){
    alert(i);
  };
  steroids.view.setBackgroundColor("#CCCCCC");

  // Table functions
  $scope.inCombat = false;
  $scope.inPlayer = false;
  $scope.currentPlayer = 0;
  $scope.playerBonus = 0;
  $scope.monsterPower = 10;


  $scope.monsterTier = function() {
    if ($scope.monsterPower < 8)  {
      return 1;
    } else if ($scope.monsterPower < 16) {
      return 2;
    } else if ($scope.monsterPower < 24) {
      return 3;
    } else if ($scope.monsterPower < 32) {
      return 4;
    } else {
      return 5;
    }
  };

  $scope.playerSheet = function(position){
    if(!$scope.inCombat){
      $scope.inPlayer = true;
      $scope.currentPlayer = position;
    }
  };

  var combatFlick = function(player){
    if (!$scope.inPlayer) {
      if (!$scope.inCombat) {
        $scope.combatants = [];
        $scope.playerBonus = 0;
        $scope.monsterPower = 10;
        $scope.combatants.push(player);
        $scope.inCombat = true;
      } else if ($scope.combatants.indexOf(player) < 0) {
        $scope.combatants.push(player);
        $scope.inCombat = true;
      };
    };
  };

  $scope.combatRemove = function(combatant){
    $scope.combatants.splice($scope.combatants.indexOf(combatant), 1);
  }

  // Players directions
  var direction = {
    up: "combatFlick(player)",
    down: "",
    right: "",
    left: ""
  };

  var facing = {
    north: [direction.up, direction.right, direction.down, direction.left],
    east: [direction.left, direction.up, direction.right, direction.down],
    south: [direction.down, direction.left, direction.up, direction.right],
    west: [direction.right, direction.down, direction.left, direction.up]
  }

  var colors = [
    ['#0087CA', '#006ca6'],
    ['#86328C', '#642568'],
    ['#91be4a', '#75993c'],
    ['#c1272d', '#991132'],
    ['#f763a2', '#d9578e'],
    ['#f7931e', '#cf7b19']
  ];

  var appWidth      = window.innerWidth;
  var appHeight     = window.innerHeight;

  var xLeft         = appWidth * 0.15 - appHeight * 0.083;
  var xMiddle       = appWidth * 0.50 - appWidth  * 0.15;
  var xRight        = appWidth * 0.85 - appHeight * 0.083;

  var yTop          = appHeight * 0.86 - appHeight * 0.083;
  var yTopMiddle    = appHeight * 0.63 - appWidth  * 0.135;
  var yBottomMiddle = appHeight * 0.37 - appWidth  * 0.135;
  var yBottom       = appHeight * 0.14 - appHeight * 0.083;

  $scope.players = [
    {lvl: 1, gear: 0, active: true, facing: facing.north, color: colors[0], position: [xMiddle, yBottom,         0]},
    {lvl: 1, gear: 0, active: true, facing: facing.east,  color: colors[1], position: [xLeft,   yBottomMiddle,  90]},
    {lvl: 1, gear: 0, active: true, facing: facing.east,  color: colors[2], position: [xLeft,   yTopMiddle,     90]},
    {lvl: 1, gear: 0, active: true, facing: facing.south, color: colors[3], position: [xMiddle, yTop,          180]},
    {lvl: 1, gear: 0, active: true, facing: facing.west,  color: colors[4], position: [xRight,  yTopMiddle,    270]},
    {lvl: 1, gear: 0, active: true, facing: facing.west,  color: colors[5], position: [xRight,  yBottomMiddle, 270]}
  ];

  $scope.combatants = [];

  // Elements and position functions
  var vsCircle = document.getElementById('vs-icon');
  var vsCirclePos = [vsCircle.offsetLeft, vsCircle.offsetLeft + vsCircle.offsetWidth, vsCircle.offsetTop, vsCircle.offsetTop + vsCircle.offsetHeight];

  $scope.panOn = false;

  $scope.positionCheck = function(player) {
    $scope.panOn = false;
    if (vsCirclePos[0] < $scope.mx && $scope.mx < vsCirclePos[1] && vsCirclePos[2] < $scope.my && $scope.my < vsCirclePos[3]) {
      combatFlick(player);

      // To avoid cursor jitter
      $scope.mx = -100;
      $scope.my = -100;

    };
  }

  $scope.radialOn = function(player) {
    $scope.panOn = true;
    $scope.cursorBg = player.color[0];
  }

  // Cursor
  $scope.mx = -100;
  $scope.my = -100;
  $scope.cursorBg = '#a00'
  window.addEventListener('touchmove', function(event){
    $scope.mx = event.touches[0].pageX;
    $scope.my = event.touches[0].pageY;
  }, false);
});
