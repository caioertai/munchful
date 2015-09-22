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

  var combatMove = function(player){
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
  var meepoShift    = appWidth * 0.15;

  var xLeft         = appWidth * 0.15 - meepoShift;
  var xMiddle       = appWidth * 0.50 - meepoShift;
  var xRight        = appWidth * 0.85 - meepoShift;

  var yTop          = appHeight * 0.86 - appWidth * 0.135;
  var yTopMiddle    = appHeight * 0.63 - appWidth * 0.135;
  var yBottomMiddle = appHeight * 0.37 - appWidth * 0.135;
  var yBottom       = appHeight * 0.14 - appWidth * 0.135;

  $scope.players = [
    {lvl: 1, gear: 0, active: true, color: colors[0], position: [xMiddle, yBottom,         0]},
    {lvl: 1, gear: 0, active: true, color: colors[1], position: [xLeft,   yBottomMiddle,  90]},
    {lvl: 1, gear: 0, active: true, color: colors[2], position: [xLeft,   yTopMiddle,     90]},
    {lvl: 1, gear: 0, active: true, color: colors[3], position: [xMiddle, yTop,          180]},
    {lvl: 1, gear: 0, active: true, color: colors[4], position: [xRight,  yTopMiddle,    270]},
    {lvl: 1, gear: 0, active: true, color: colors[5], position: [xRight,  yBottomMiddle, 270]}
  ];

  $scope.combatants = [];

  // Elements and position functions
  var vsCircle = document.getElementById('vs-icon');
  var vsCirclePos = [vsCircle.offsetLeft, vsCircle.offsetLeft + vsCircle.offsetWidth, vsCircle.offsetTop, vsCircle.offsetTop + vsCircle.offsetHeight];

  var lvlUp = document.getElementById('lvl-up');
  var lvlUpPos = [lvlUp.offsetLeft, lvlUp.offsetLeft + lvlUp.offsetWidth, lvlUp.offsetTop, lvlUp.offsetTop + lvlUp.offsetHeight];

  var lvlDown = document.getElementById('lvl-down');
  var lvlDownPos = [lvlDown.offsetLeft, lvlDown.offsetLeft + lvlDown.offsetWidth, lvlDown.offsetTop, lvlDown.offsetTop + lvlDown.offsetHeight];

  var gearUp = document.getElementById('gear-up');
  var gearUpPos = [gearUp.offsetLeft, gearUp.offsetLeft + gearUp.offsetWidth, gearUp.offsetTop, gearUp.offsetTop + gearUp.offsetHeight];

  var gearDown = document.getElementById('gear-down');
  var gearDownPos = [gearDown.offsetLeft, gearDown.offsetLeft + gearDown.offsetWidth, gearDown.offsetTop, gearDown.offsetTop + gearDown.offsetHeight];

  $scope.panOn = false;

  $scope.positionCheck = function(player) {
    $scope.panOn = false;
    if (vsCirclePos[0] < $scope.mx && $scope.mx < vsCirclePos[1] && vsCirclePos[2] < $scope.my && $scope.my < vsCirclePos[3]) {
      combatMove(player);
    } else if (lvlUpPos[0] < $scope.mx && $scope.mx < lvlUpPos[1] && lvlUpPos[2] < $scope.my && $scope.my < lvlUpPos[3]) {
      player.lvl++;
    } else if (lvlDownPos[0] < $scope.mx && $scope.mx < lvlDownPos[1] && lvlDownPos[2] < $scope.my && $scope.my < lvlDownPos[3]) {
      player.lvl--;
    } else if (gearUpPos[0] < $scope.mx && $scope.mx < gearUpPos[1] && gearUpPos[2] < $scope.my && $scope.my < gearUpPos[3]) {
      player.gear++;
    } else if (gearDownPos[0] < $scope.mx && $scope.mx < gearDownPos[1] && gearDownPos[2] < $scope.my && $scope.my < gearDownPos[3]) {
      player.gear--;
    };

    // To avoid cursor jitter
    $scope.mx = -100;
    $scope.my = -100;
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
