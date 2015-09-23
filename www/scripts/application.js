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
  $scope.monsterPower = 5;
  $scope.menuActive = true;

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
        $scope.monsterPower = 5;
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

  var appWidth      = window.innerWidth;
  var appHeight     = window.innerHeight;
  var meepoShift    = appWidth * 0.15;

  var xLeft         = appWidth * 0.15 - meepoShift;
  var xMiddle       = appWidth * 0.50 - meepoShift;
  var xRight        = appWidth * 0.85 - meepoShift;

  var yTop          = appHeight * 0.14 - appWidth * 0.135;
  var yTopMiddle    = appHeight * 0.37 - appWidth * 0.135;
  var yBottomMiddle = appHeight * 0.63 - appWidth * 0.135;
  var yBottom       = appHeight * 0.86 - appWidth * 0.135;


  $scope.colors = [
    ['#0087CA', '#006ca6', true],
    ['#86328C', '#642568', false],
    ['#91be4a', '#75993c', false],
    ['#c1272d', '#991132', false],
    ['#f763a2', '#d9578e', false],
    ['#f7931e', '#cf7b19', false],
    ['#999999', '#888888', false],
  ];

  $scope.players = [
    {lvl: 1, gear: 0, active: true , color: $scope.colors[0], position: [xMiddle, yBottom,         0]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xLeft,   yBottomMiddle,  90]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xLeft,   yTopMiddle,     90]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xMiddle, yTop,          180]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xRight,  yTopMiddle,    270]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xRight,  yBottomMiddle, 270]}
  ];

  $scope.combatants = [];

  // Player seats
  var player0Pos = [$scope.players[0].position[0], $scope.players[0].position[0] + meepoShift*2, $scope.players[0].position[1], $scope.players[0].position[1] + meepoShift*2];
  var player1Pos = [$scope.players[1].position[0], $scope.players[1].position[0] + meepoShift*2, $scope.players[1].position[1], $scope.players[1].position[1] + meepoShift*2];
  var player2Pos = [$scope.players[2].position[0], $scope.players[2].position[0] + meepoShift*2, $scope.players[2].position[1], $scope.players[2].position[1] + meepoShift*2];
  var player3Pos = [$scope.players[3].position[0], $scope.players[3].position[0] + meepoShift*2, $scope.players[3].position[1], $scope.players[3].position[1] + meepoShift*2];
  var player4Pos = [$scope.players[4].position[0], $scope.players[4].position[0] + meepoShift*2, $scope.players[4].position[1], $scope.players[4].position[1] + meepoShift*2];
  var player5Pos = [$scope.players[5].position[0], $scope.players[5].position[0] + meepoShift*2, $scope.players[5].position[1], $scope.players[5].position[1] + meepoShift*2];

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

  var trashZone = document.getElementById('trash-zone');
  var trashZonePos = [trashZone.offsetLeft, trashZone.offsetLeft + trashZone.offsetWidth, trashZone.offsetTop, trashZone.offsetTop + trashZone.offsetHeight];


  $scope.panMenu = false;
  $scope.panBench = false;

  function areaCalc(positionArr) {
    return positionArr[0] < $scope.mx && $scope.mx < positionArr[1] && positionArr[2] < $scope.my && $scope.my < positionArr[3];
  }

  $scope.positionCheck = function(currentObject) {
    if ($scope.panMenu) {
      $scope.panMenu = false;
      if (areaCalc(vsCirclePos)) {
        combatMove(currentObject);
      } else if (areaCalc(lvlUpPos)) {
        currentObject.lvl++;
      } else if (areaCalc(lvlDownPos)) {
        currentObject.lvl--;
      } else if (areaCalc(gearUpPos)) {
        currentObject.gear++;
      } else if (areaCalc(gearDownPos)) {
        currentObject.gear--;
      } else if (areaCalc(trashZonePos)) {
        currentObject.active = false;
        currentObject.lvl = 1;
        currentObject.gear = 0;
        currentObject.color[2] = false;
      };
    } else if ($scope.panBench) {
      if (areaCalc(player0Pos)) {
        $scope.players[0].active = true;
        $scope.players[0].color[2] = false;
        $scope.players[0].color = currentObject;
        currentObject[2] = true;
      } else if (areaCalc(player1Pos)) {
        $scope.players[1].active = true;
        $scope.players[1].color[2] = false;
        $scope.players[1].color = currentObject;
        currentObject[2] = true;
      } else if (areaCalc(player2Pos)) {
        $scope.players[2].active = true;
        $scope.players[2].color[2] = false;
        $scope.players[2].color = currentObject;
        currentObject[2] = true;
      } else if (areaCalc(player3Pos)) {
        $scope.players[3].active = true;
        $scope.players[3].color[2] = false;
        $scope.players[3].color = currentObject;
        currentObject[2] = true;
      } else if (areaCalc(player4Pos)) {
        $scope.players[4].active = true;
        $scope.players[4].color[2] = false;
        $scope.players[4].color = currentObject;
        currentObject[2] = true;
      } else if (areaCalc(player5Pos)) {
        $scope.players[5].active = true;
        $scope.players[5].color[2] = false;
        $scope.players[5].color = currentObject;
        currentObject[2] = true;
      };
      $scope.panBench = false;
    }

    // To avoid cursor jitter
    $scope.mx = -100;
    $scope.my = -100;
  }

  $scope.radialOn = function(target, panMenu) {
    $scope.cursorBg = target.color ? target.color[0] : target[0];
    $scope.panMenu = panMenu;
    if (!target.color)
      $scope.panBench = true;
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
