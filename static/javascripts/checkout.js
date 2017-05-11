function sendCartData() {
  cartData = sessionStorage.getItem("yourCart");
  cartDataJSON = JSON.stringify(cartData);
  $.ajax({
    type: "POST",
    url: "/orders/checkout",
    data: cartData,
    dataType: "json"
  })
}

function init() {
  $("#checkout").submit(sendCartData)
}

window.addEventListener("load", init);
