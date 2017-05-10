function Cart() {
  this.cart = [];
  this.albums = [];
};

Cart.prototype.findAlbum = function(albumId) {
  var len = albums.length;
  for (var i = 0; i < len; i++) {
    if (albums[i].id == albumId) {
      return albums[i]
    }
  }
  return false
}

Cart.prototype.findAndAddSetUp = function(e) {
  e.preventDefault();
  var addAlbumId = e.currentTarget.id;
  Cart.prototype.findAndAdd(addAlbumId);
}

Cart.prototype.findAndAdd = function(addAlbumId) {
  var addAlbum = Cart.prototype.findAlbum(addAlbumId);
  cart.push(addAlbum);
  Cart.prototype.save();
}

Cart.prototype.removeFromCart = function(albumId) {
  var len = cart.length;
  for (var j = 0; j < len; j++) {
    if (cart[j].id == albumId) {
      cart.splice(j, 1)
    }
  }
}

Cart.prototype.getItems = function() {
  return cart
}

Cart.prototype.getTotal = function() {
  var total = 0;
  var len = cart.length;
  for (var k = 0; k < len; k++) {
    total += cart[k].price
  }
  return total
}

Cart.prototype.save = function() {
  sessionStorage.clear();
  var cartData = JSON.stringify(cart);
  sessionStorage.setItem('yourCart', cartData);
}

Cart.prototype.cartInit = function() {
  function delayMe() {
    albums = JSON.parse(sessionStorage.getItem("albums"));
    console.log('In cart ' + albums);
    var addButtons = $('.add');
    var len = addButtons.length;
    for (var i = 0; i < len; i++) {
      addButtons[i].addEventListener('click', this.Cart.prototype.findAndAddSetUp);
    }
    cart = [];
    if (sessionStorage.getItem('yourCart')) {
      cart = JSON.parse(sessionStorage.getItem('yourCart'));
    }
  }
  setTimeout(delayMe, 1000)
};

var yourCart = new Cart();
yourCart.cartInit();
