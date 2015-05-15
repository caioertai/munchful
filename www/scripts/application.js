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

  $scope.playerSheet = function(position){
    if(!$scope.inCombat){
      $scope.inPlayer = true;
      $scope.currentPlayer = position;      
    }
  };

  var combatFlick = function(player){
    if (!$scope.inCombat) {
      $scope.combatants = [];
      $scope.playerBonus = 0;
      $scope.monsterPower = 10;
      $scope.combatants.push(player);
      $scope.inCombat = true;      
    } else {
      if (!$scope.inPlayer && $scope.combatants.indexOf(player) < 0) {
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
    // up: "pLevel = pLevel + 1", 
    // down: "pLevel = pLevel - 1", 
    // right: "pGear = pGear + 1", 
    // left: "pGear = pGear - 1"
  };

  var facing = {
    north: [direction.up, direction.right, direction.down, direction.left],
    east: [direction.left, direction.up, direction.right, direction.down],
    south: [direction.down, direction.left, direction.up, direction.right],
    west: [direction.right, direction.down, direction.left, direction.up]
  }

  $scope.colors = [
    ['#0087CA', '#006ca6'],
    ['#86328C', '#642568'],
    ['#F15A24', '#cc4c1e'],
    ['#91be4a', '#75993c'],
    ['#c1272d', '#991132'],
    ['#f7931e', '#cf7b19']
  ];
  var colors = $scope.colors;

  $scope.players = [
    {lvl: 1, gear: 0, position: 0, active: true, facing: facing.north, color: colors[0], style: 'left: 50%; margin-left: -15vw; bottom: 5%'},
    {lvl: 1, gear: 0, position: 1, active: false, facing: facing.east, color: colors[1], style: 'left: 2%; top: 53%; -webkit-transform: rotate(90deg)'},
    {lvl: 1, gear: 0, position: 2, active: false, facing: facing.east, color: colors[2], style: 'left: 2%; top: 47%; -webkit-transform: rotate(90deg); margin-top: -30vw'},
    {lvl: 1, gear: 0, position: 3, active: false, facing: facing.south, color: colors[3], style: 'left: 50%; margin-left: -15vw; top: 5%; -webkit-transform: rotate(180deg)'},
    {lvl: 1, gear: 0, position: 4, active: false, facing: facing.west, color: colors[4], style: 'right: 2%; top: 53%; -webkit-transform: rotate(270deg)'},
    {lvl: 1, gear: 0, position: 5, active: false, facing: facing.west, color: colors[5], style: 'right: 2%; top: 47%; -webkit-transform: rotate(270deg); margin-top: -30vw'}
  ];

  $scope.combatants = [];


  // Elements and position functions
  var vsCircle = document.getElementById('vs-icon');
  var vsCirclePos = [vsCircle.offsetLeft, vsCircle.offsetLeft + vsCircle.offsetWidth, vsCircle.offsetTop, vsCircle.offsetTop + vsCircle.offsetHeight];
  var cursor = document.getElementById('cursor');

  $scope.panOn = false;

  $scope.positionCheck = function(player) {
    $scope.panOn = false;
    if (vsCirclePos[0] < $scope.mx && $scope.mx < vsCirclePos[1] && vsCirclePos[2] < $scope.my && $scope.my < vsCirclePos[3]) {
      $scope.inCombat = true;
      combatFlick(player);
      cursor.style.left = '-100px';
      cursor.style.top = '-100px';
    }
  }

  window.addEventListener('touchmove', function(event){
    $scope.mx = event.pageX;
    $scope.my = event.pageY;
  }, false);

  $scope.flmouse = function(pColor){
    $scope.panOn = true;
    cursor.style.left = $scope.mx + 'px';
    cursor.style.top = $scope.my + 'px';
    cursor.style.background = pColor;
  };

});
