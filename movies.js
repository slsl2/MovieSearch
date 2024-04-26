const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzc4NjFiMWRmMjMyMWI0OGFmZTc1ZWNhNGNlNmNiZSIsInN1YiI6IjY2MjhiOGJhMjIxYmE2MDE3YzE4NWQ5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TDxxjkiVyFBctIqS1Oi7Fz_i-8fIAAjccNQnTEjmBM",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let rows = data["results"];
    const cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";
    rows.forEach((mov) => {
      let id = mov["id"];
      let title = mov["original_title"];
      let overview = mov["overview"];
      let posterPath = mov["poster_path"];
      let voteAverage = mov["vote_average"];
      let cardHtml = `
      <div class="card" id="card-${id}">
        <img
          class="image"
          src="https://image.tmdb.org/t/p/original/${posterPath}"
        />
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
        <div class="ratings">${voteAverage}</div>`;
      cardList.insertAdjacentHTML("beforeend", cardHtml);
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector("#search-box");
  const cardList = document.querySelector(".card-list");
  searchBox.addEventListener("keyup", function () {
    // keyup : 키를 놓을 때 이벤트 발생
    const filterValue = searchBox.value.toLowerCase();
    const cards = cardList.querySelectorAll(".card");
    cards.forEach(function (card) {
      const titleText = card.querySelector(".title").textContent.toLowerCase();
      if (titleText.includes(filterValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});
