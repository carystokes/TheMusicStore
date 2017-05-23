function sendCartData(evt) {
  evt.preventDefault();
  cartData = sessionStorage.getItem("yourCart");
  cartDataJSON = JSON.stringify(cartData);
  $.ajax({
    type: "POST",
    url: "/checkout",
    data: cartData,
    dataType: "json"
  })
}

function init() {
  $("#checkoutButtonForm").submit(sendCartData)
}

window.addEventListener("load", init);
