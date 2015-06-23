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
  $scope.setPlayerBonus = function(valChange) {
  $scope.playerBonus = $scope.playerBonus + valChange;
  };

  $scope.monsterPower = 10;
  $scope.setMonsterPower = function(valChange) {
  $scope.monsterPower = $scope.monsterPower + valChange;
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
      }
    }
  };

  $scope.combatRemove = function(combatant){
    $scope.combatants.splice($scope.combatants.indexOf(combatant), 1);
  };

  // Players directions
  var direction = {
    up: "combatFlick(player)",
    down: "",
    right: "",
    left: ""
  };

  var colors = [
    ['#0087CA', '#006ca6'],
    ['#86328C', '#642568'],
    ['#F15A24', '#cc4c1e'],
    ['#91be4a', '#75993c'],
    ['#c1272d', '#991132'],
    ['#f7931e', '#cf7b19']
  ];

  var appWidth = window.innerWidth;
  var appHeight = window.innerHeight;

  $scope.players = [
    {lvl: 1, gear: 0, position: [appWidth*0.50, appHeight*0.86, 0], active: true, color: colors[0]},
    {lvl: 1, gear: 0, position: [appWidth*0.16, appHeight*0.65, 90], active: true, color: colors[1]},
    {lvl: 1, gear: 0, position: [appWidth*0.16, appHeight*0.35, 90], active: true, color: colors[2]},
    {lvl: 1, gear: 0, position: [appWidth*0.50, appHeight*0.14, 180], active: true, color: colors[3]},
    {lvl: 1, gear: 0, position: [appWidth*0.84, appHeight*0.35, 270], active: true, color: colors[4]},
    {lvl: 1, gear: 0, position: [appWidth*0.84, appHeight*0.65, 270], active: true, color: colors[5]}
  ];

  $scope.combatants = [];

  $scope.getMeepoStyle = function(position) {
    var marginFix = -appWidth*0.15;
    var posX = position[0] + marginFix;
    var posY = position[1] + marginFix;
    var rotation = position[2];
    return 'left:' + posX + 'px; top:' + posY + 'px; -webkit-transform: rotate(' + rotation + 'deg)';
  };

  $scope.setRadialPositions = function() {

  };


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

    }
  };

  $scope.radialOn = function(player) {
    $scope.panOn = true;
    $scope.cursorBg = player.color[0];
  };

  // Cursor
  $scope.mx = -100;
  $scope.my = -100;
  $scope.cursorBg = '';
  window.addEventListener('touchmove', function(event){
    $scope.mx = event.touches[0].pageX;
    $scope.my = event.touches[0].pageY;
  }, false);
});
