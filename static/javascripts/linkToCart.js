var app = angular.module('linkToCart', []);
app.controller('cartLinkCtrl', function($scope) {
  var yourCart = JSON.parse(sessionStorage.getItem('yourCart'));
  var cartLen = cartLength();
  $scope.cartLinkText = "cart(" + cartLen + ")";

  $scope.updateLink = function() {
    yourCart = JSON.parse(sessionStorage.getItem('yourCart'));
    var cartLen = cartLength();
    $scope.cartLinkText = "cart(" + cartLen + ")";
  }

  function cartLength() {
    var cartLength = 0;
    if (yourCart) {
      cartLength = yourCart.length.toString();
    }
    return cartLength
  }
})
