function displayResults() {

  $('#searchResultsDiv').append('<h2>Your search results:</h2>');
  searchResults = JSON.parse(sessionStorage.getItem('searchResults'));
  if (searchResults.length > 0) {
    var resultItem;
    var len = searchResults.length;
    for (i = 0; i < len; i++) {
      resultItem = document.createElement('h2');
      resultItem.innerHTML = searchResults[i];
      $('#searchResultsDiv').append(resultItem)
    }
  } else {
    $('#searchResultsDiv').append('<h2>Sorry no matches found</h2>');
  }
}

function beginning() {
  displayResults()
}

window.addEventListener("load", beginning);
