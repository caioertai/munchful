angular.module('SteroidsApplication', ['supersonic', 'hmTouchEvents'])
.controller('IndexController', function($scope, supersonic) {
  // $scope.navbarTitle = "What a Munchful table!";
  // $scope.Math = Math;
  steroids.view.setBackgroundColor("#CCCCCC");

  // Table functions
  $scope.inCombat = false;
  $scope.inSheet = false;

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

  $scope.players = [
    {lvl: 1, gear: 0, facing: facing.north, color: '#0087CA', darkColor: '#006ca6', style: 'left: 50%; margin-left: -15vw; bottom: 5%'},
    {lvl: 1, gear: 0, facing: facing.east, color: '#86328C', darkColor: '#642568', style: 'left: 2%; top: 53%; -webkit-transform: rotate(90deg)'},
    {lvl: 1, gear: 0, facing: facing.east, color: '#F15A24', darkColor: '#cc4c1e', style: 'left: 2%; top: 47%; -webkit-transform: rotate(90deg); margin-top: -30vw'},
    {lvl: 1, gear: 0, facing: facing.south, color: '#91be4a', darkColor: '#75993c', style: 'left: 50%; margin-left: -15vw; top: 5%; -webkit-transform: rotate(180deg)'},
    {lvl: 1, gear: 0, facing: facing.west, color: '#c1272d', darkColor: '#991132', style: 'right: 2%; top: 53%; -webkit-transform: rotate(270deg)'},
    {lvl: 1, gear: 0, facing: facing.west, color: '#f7931e', darkColor: '#cf7b19', style: 'right: 2%; top: 47%; -webkit-transform: rotate(270deg); margin-top: -30vw'}
  ];

});
