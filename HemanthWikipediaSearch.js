let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        link,
        title,
        description
    } = result;
    let containerItem = document.createElement("div");
    containerItem.classList.add("result-item");
    console.log(containerItem);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    containerItem.appendChild(titleEl);
    searchResultsEl.appendChild(containerItem);

    let breakEl = document.createElement("br");
    containerItem.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    containerItem.appendChild(urlEl);
    searchResultsEl.appendChild(containerItem);

    let break2El = document.createElement("br");
    containerItem.appendChild(break2El);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("result-description");
    containerItem.appendChild(descriptionEl);
    searchResultsEl.appendChild(containerItem);

}

function displayResults(search_results) {
    spinnerEl.classList.add("d-none");
    searchResultsEl.classList.remove("d-none");
    for (let result of search_results) {
        createAndAppend(result);
    }
}

function userInputValue(event) {
    if (event.key === "Enter") {
        let userInput = (searchInputEl.value);
        let options = {
            method: "GET"
        };
        spinnerEl.classList.remove("d-none");
        fetch("https://apis.ccbp.in/wiki-search?search=" + userInput, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", userInputValue);