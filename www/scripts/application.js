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
  $scope.currentPlayer = false;
  $scope.playerBonus = 0;

  $scope.monsterPower = 5;
  $scope.monsterTier = 1;

  $scope.benchMenu = false;
  $scope.panBench = false;
  $scope.panMenu = false;
  $scope.overlayOn = false;
  $scope.animationName = '';
  $scope.animationPartial = '';

  $scope.helpStatus = {
    benchButton: true,
    dragToSeat: true,
    draggedToSeat: false,
    radialMenu: false,
    tutorialOn: true
  };


  $scope.monsterFunction = function(bonus) {
    if (bonus)
      $scope.monsterPower = $scope.monsterPower + bonus;
    var power = $scope.monsterPower;
    if (power < 8)  {
      $scope.monsterTier = 1;
    } else if (power < 16) {
      $scope.monsterTier = 2;
    } else if (power < 24) {
      $scope.monsterTier = 3;
    } else if (power < 32) {
      $scope.monsterTier = 4;
    } else {
      $scope.monsterTier = 5;
    }
  };

  $scope.selectPlayer = function(player){
    $scope.currentPlayer = player;
    $scope.cursorBg = player.color[0];
    openRadial();
  };

  $scope.combatMove = function(player){
    $scope.closeRadial();
    if (!$scope.inPlayer) {
      if (!$scope.inCombat) {
        $scope.combatants = [];
        $scope.playerBonus = 0;
        $scope.monsterPower = 5;
        $scope.monsterTier = 1;
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

  var appWidth      = window.innerWidth;
  var appHeight     = window.innerHeight;
  var tokenShift    = appWidth * 0.15;

  var xLeft         = appWidth * 0.15 - tokenShift;
  var xMiddle       = appWidth * 0.50 - tokenShift;
  var xRight        = appWidth * 0.85 - tokenShift;

  var yTop          = appHeight * 0.14 - appWidth * 0.135;
  var yTopMiddle    = appHeight * 0.37 - appWidth * 0.135;
  var yBottomMiddle = appHeight * 0.63 - appWidth * 0.135;
  var yBottom       = appHeight * 0.86 - appWidth * 0.135;

  $scope.colors = [
    ['#0087CA', tinycolor("#0087CA").darken(7).toString(), false],
    ['#86328C', tinycolor("#86328C").darken(7).toString(), false],
    ['#91be4a', tinycolor("#91be4a").darken(7).toString(), false],
    ['#c1272d', tinycolor("#c1272d").darken(7).toString(), false],
    ['#f763a2', tinycolor("#f763a2").darken(7).toString(), false],
    ['#f7931e', tinycolor("#f7931e").darken(7).toString(), false],
    ['#999999', tinycolor("#999999").darken(7).toString(), false],
    ['#222222', tinycolor("#222222").darken(7).toString(), false]
  ];

  $scope.players = [
    {lvl: 1, gear: 0, active: false, color: false, position: [xMiddle, yBottom,         0]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xLeft,   yBottomMiddle,  90]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xLeft,   yTopMiddle,     90]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xMiddle, yTop,          180]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xRight,  yTopMiddle,    270]},
    {lvl: 1, gear: 0, active: false, color: false, position: [xRight,  yBottomMiddle, 270]}
  ];

  $scope.combatants = [];

  // Player seats
  var player0Pos = [$scope.players[0].position[0], $scope.players[0].position[0] + tokenShift*2, $scope.players[0].position[1], $scope.players[0].position[1] + tokenShift*2];
  var player1Pos = [$scope.players[1].position[0], $scope.players[1].position[0] + tokenShift*2, $scope.players[1].position[1], $scope.players[1].position[1] + tokenShift*2];
  var player2Pos = [$scope.players[2].position[0], $scope.players[2].position[0] + tokenShift*2, $scope.players[2].position[1], $scope.players[2].position[1] + tokenShift*2];
  var player3Pos = [$scope.players[3].position[0], $scope.players[3].position[0] + tokenShift*2, $scope.players[3].position[1], $scope.players[3].position[1] + tokenShift*2];
  var player4Pos = [$scope.players[4].position[0], $scope.players[4].position[0] + tokenShift*2, $scope.players[4].position[1], $scope.players[4].position[1] + tokenShift*2];
  var player5Pos = [$scope.players[5].position[0], $scope.players[5].position[0] + tokenShift*2, $scope.players[5].position[1], $scope.players[5].position[1] + tokenShift*2];

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

  var areaCalc = function(positionArr) {
    return positionArr[0] < $scope.mx && $scope.mx < positionArr[1] && positionArr[2] < $scope.my && $scope.my < positionArr[3];
  };

  var playerActivation = function(index, object) {
    $scope.players[index].active = true;
    $scope.players[index].color[2] = false;
    $scope.players[index].color = object;
    object[2] = true;

    if ($scope.helpStatus.tutorialOn) {
      $scope.helpStatus.dragToSeat = false;
      $scope.helpStatus.draggedToSeat = true;
      $scope.helpStatus.radialMenu = true;
    }
  };

  $scope.playerUpdate = function(player, bonus, target){
    var bonusText = bonus > 0 ? 'Up' : 'Down';
    setTimeout(function(){
      $scope.animationName = '';
    },10);

    if (target == 'gear') {
      player.gear = player.gear + bonus;
      animateMe('fadeIn' + bonusText, 'gear' + bonusText.toLowerCase());
    } else {
      player.lvl = player.lvl + bonus;
      animateMe('fadeIn' + bonusText, 'lvl' + bonusText.toLowerCase());
    }
    $scope.closeRadial();
  };

  $scope.benchPlayer = function(player) {
    player.active = false;
    player.lvl = 1;
    player.gear = 0;
    player.color[2] = false;
    $scope.closeRadial();
  };

  function animateMe(name, text) {
    $scope.animationName = name;
    $scope.animationPartial = '/assets/_' + text + '.svg';
  }

  $scope.positionCheck = function(currentObject) {
    $scope.currentPlayer = currentObject;
    if ($scope.panMenu) {
      setTimeout(function(){
        $scope.animationName = '';
      },10);
      if (areaCalc(trashZonePos)) {
        $scope.benchPlayer(currentObject);
      } else if (areaCalc(vsCirclePos)) {
        $scope.combatMove(currentObject);
      } else if (areaCalc(lvlUpPos)) {
        currentObject.lvl++;
        animateMe('fadeInUp', 'lvlup');
      } else if (areaCalc(lvlDownPos)) {
        currentObject.lvl--;
        animateMe('fadeInDown', 'lvldown');
      } else if (areaCalc(gearUpPos)) {
        currentObject.gear++;
        animateMe('fadeInUp', 'gearup');
      } else if (areaCalc(gearDownPos)) {
        currentObject.gear--;
        animateMe('fadeInDown', 'geardown');
      }
    } else if ($scope.panBench) {
      if (areaCalc(player0Pos)) {
        playerActivation(0, currentObject);
      } else if (areaCalc(player1Pos)) {
        playerActivation(1, currentObject);
      } else if (areaCalc(player2Pos)) {
        playerActivation(2, currentObject);
      } else if (areaCalc(player3Pos)) {
        playerActivation(3, currentObject);
      } else if (areaCalc(player4Pos)) {
        playerActivation(4, currentObject);
      } else if (areaCalc(player5Pos)) {
        playerActivation(5, currentObject);
      }
      $scope.panBench = false;
    }

    cursorListenerActive(false);
    $scope.closeRadial();
  };

  var openRadial = function() {
    $scope.panMenu = true;
    $scope.overlayOn = true;

    if($scope.helpStatus.tutorialOn && $scope.helpStatus.draggedToSeat) {
      $scope.helpStatus.radialMenu = false;
      $scope.helpStatus.tutorialOn = false;
    }
  };

  $scope.closeRadial = function() {
    $scope.panMenu = false;
    $scope.overlayOn = false;
  };

  $scope.benchToggle = function(option) {
    $scope.benchMenu = option;
    $scope.helpStatus.benchButton = false;
  };

  $scope.panningOn = function(target, radial) {
    cursorListenerActive(true);
    $scope.cursorBg = target.color ? target.color[0] : target[0];
    $scope.panBench = !radial;
    if (radial) {
      $scope.benchMenu = false;
      openRadial();
    }
  };

  // Cursor
  $scope.mx = -100;
  $scope.my = -100;
  $scope.cursorBg = '#cccccc';

  var mouseListener = function(event){
    $scope.mx = event.clientX;
    $scope.my = event.clientY;
  };

  var touchListener = function(event){
    $scope.mx = event.touches[0].pageX;
    $scope.my = event.touches[0].pageY;
  };

  var cursorListenerActive = function(active) {
    if (active) {
      window.addEventListener('mousemove', mouseListener, false);
      window.addEventListener('touchmove', touchListener, false);
    } else {
      window.removeEventListener('mousemove', mouseListener, false);
      window.removeEventListener('touchmove', touchListener, false);
      $scope.mx = -100;
      $scope.my = -100;
    }
  };


  // Toggle fullscreen (not implemented)
  $scope.toggleFullScreen = function() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

});
