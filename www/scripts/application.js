angular.module('SteroidsApplication', ['supersonic', 'hmTouchEvents'])
.controller('IndexController', function($scope, supersonic) {
  // $scope.navbarTitle = "What a Munchful table!";
  // $scope.Math = Math;
  steroids.view.setBackgroundColor("#CCCCCC");

  // Table functions
  $scope.openCombat = function(){
    $scope.inCombat = true;
  };

  $scope.openSheet = function(player){
    $scope.inSheet = true;
  };

  $scope.closeTable = function(){
    $scope.inCombat = false;
    $scope.inSheet = false;
  };

  // $scope.travel = [0,0,1,0];
  // $scope.panIntent = function(arrTravel) {
  //   return arrTravel.indexOf(Math.max.apply(null, arrTravel)); 
  // };

  // $scope.panEnder = function(player, travel) {
  //   player.facing[travel.indexOf(Math.max.apply(null, travel))];
  // };
  // $scope.panIntent = $scope.travel.indexOf(Math.max.apply(null, $scope.travel)); 

  // Players directions
  var direction = {
    up: "pLevel = pLevel + 1", 
    down: "pLevel = pLevel - 1", 
    right: "pGear = pGear + 1", 
    left: "pGear = pGear - 1"
  };

  var facing = {
    north: [direction.up, direction.right, direction.down, direction.left],
    east: [direction.left, direction.up, direction.right, direction.down],
    south: [direction.down, direction.left, direction.up, direction.right],
    west: [direction.right, direction.down, direction.left, direction.up]
  }

  // var north = [direction.up, direction.right, direction.down, direction.left];
  // var east = [direction.left, direction.up, direction.right, direction.down];
  // var south = [direction.down, direction.left, direction.up, direction.right];
  // var west = [direction.right, direction.down, direction.left, direction.up];

  $scope.players = [
    {facing: facing.north, color: '#0087CA', darkColor: '#006ca6', style: 'left: 50%; margin-left: -15vw; bottom: 5%'},
    {facing: facing.east, color: '#86328C', darkColor: '#642568', style: 'left: 2%; top: 53%; -webkit-transform: rotate(90deg)'},
    {facing: facing.east, color: '#F15A24', darkColor: '#cc4c1e', style: 'left: 2%; top: 47%; -webkit-transform: rotate(90deg); margin-top: -30vw'},
    {facing: facing.south, color: '#91be4a', darkColor: '#75993c', style: 'left: 50%; margin-left: -15vw; top: 5%; -webkit-transform: rotate(180deg)'},
    {facing: facing.west, color: '#c1272d', darkColor: '#991132', style: 'right: 2%; top: 53%; -webkit-transform: rotate(270deg)'},
    {facing: facing.west, color: '#f7931e', darkColor: '#cf7b19', style: 'right: 2%; top: 47%; -webkit-transform: rotate(270deg); margin-top: -30vw'}
  ];

});
