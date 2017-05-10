function displayCartItems() {
  var cart = JSON.parse(sessionStorage.getItem("yourCart"));
  var len = cart.length;
  for (var m = 0; m < len; m++) {
    var cartItem = document.createElement("li");
    cartItem.innerHTML  = cart[m].name + " by " + cart[m].artist + ": $" + cart[m].price;
    cartItem.setAttribute("class", "cartItem");
    $("#yourCartList").append(cartItem);
  }
}

function init() {
  displayCartItems()
}

window.addEventListener("load", init);
