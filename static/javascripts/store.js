var albums = [];

function getXMLHttpRequestObject() {
  var ajax = null;
	if (window.XMLHttpRequest) {
	    ajax = new XMLHttpRequest()
	} else if (window.ActiveXObject) {
	    ajax = new ActiveXObject('MSXML2.XMLHTTP.3.0')
	}
  return ajax
}

function handleAjaxResponse(e) {
	if (typeof e == 'undefined') var e = window.event;
	var ajax = e.target || e.srcElement;
  if (ajax.readyState == 4) {
  	allAlbums = ajax.response;
    sessionStorage.setItem("albums", allAlbums);
    albums = JSON.parse(allAlbums);
		ajax = null;
	}
}

function getData() {
	var ajax = getXMLHttpRequestObject();
	ajax.onreadystatechange = handleAjaxResponse;
	ajax.open('GET', '/products/albums.json', true);
	ajax.send(null);
	return false;
}

function artistSearch(searchArtist) {
  searchArtist = searchArtist.toLowerCase();
  var searchHits = [];
  var len = albums.length;
  for (i = 0; i < len; i++) {
    var albumArtist = albums[i].artist.toLowerCase();
    var searchRegex = new RegExp(searchArtist);
    if (searchRegex.test(albumArtist)) {
      searchHits.push(albums[i].title)
    }
  }
  searchResultsWindow = window.open('searchresults.html');
  return searchHits
}

function searching(evt) {
  evt.preventDefault();
  var results = artistSearch($('#searchText').val());
  sessionStorage.setItem('searchResults', JSON.stringify(results));
}

function init() {
  getData();
  $("#searchBox").submit(searching)
}

window.addEventListener("load", init);
