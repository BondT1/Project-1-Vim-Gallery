const searchBtn = document.querySelector("#search-button");
const inputSearch = document.querySelector("#about-us-search");
const selectDownDrop = document.querySelector('#img-vid')
const imgHolder = $("#img-holder");
const vidHolder = $("#vid-holder");
const lastBtn = $('#last-button');




searchBtn.addEventListener("click", submitHandler);


function submitHandler(e) {
  e.preventDefault();
  var searchTerm = inputSearch.value.trim();
  localStorage.setItem('search-term', searchTerm);
  search(searchTerm)
}

function search(searchTerm) {
  console.log(`Searching for ${searchTerm}`)
  if (selectDownDrop.value === 'Image') {
    getImg(searchTerm)
  }else  {
    getVid(searchTerm)
  }
}

function getImg(searchTerm) {
  const Url =
    "https://api.unsplash.com/search/photos/?client_id=dtdf4YL-mhArMfnqr6Kff3o0ccg2LXWb6Q4bWkXEI4o&query=" +
    searchTerm;

  fetch(Url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var results = data.results;
      imgHolder.empty()
      vidHolder.empty()
      for (let i = 0; i < results.length; i++) {
        const results = data.results[i].links.download;
        const imgEl = $(`<img src=${results} class="someClass" />`);
        imgHolder.append(imgEl);
      }
 
   });
}

function getVid(searchTerm) {
  fetch("https://api.pexels.com/videos/search?query="+searchTerm, {
    headers: {
      authorization: "563492ad6f91700001000001d0e3f25fe862425c9b3e73ffb90e2204",
    }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const resultsVid = data.videos;
    vidHolder.empty()
    imgHolder.empty()
    for (let i = 0; i < resultsVid.length; i++) {
      const resultsVid = data.videos[i].video_files[0].link
      const vidHolder = $("#vid-holder");
      const vidEl = $(`<video width="320" height="240" controls>
      <source src="${resultsVid}" type="video/mp4">
      </video>`)
          vidHolder.append(vidEl);
    }
  })
}

$(document).ready(function() {
  searchStorage = localStorage.getItem('search-term');
  showLastBtn(searchStorage);
})

function showLastBtn(search) {
  $("#search-button").on('click', function() {
  if (search) {
    $('#last-button').show();
  }
})}

$('#last-button').on('click', function(event) {
  event.preventDefault()
  var lastSearch = localStorage.getItem('search-term')
  search(lastSearch);
  })
