export const generateMoviesCards = async () => {
  const cardList = document.querySelector(".card-list");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzc4NjFiMWRmMjMyMWI0OGFmZTc1ZWNhNGNlNmNiZSIsInN1YiI6IjY2MjhiOGJhMjIxYmE2MDE3YzE4NWQ5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-TDxxjkiVyFBctIqS1Oi7Fz_i-8fIAAjccNQnTEjmBM",
    },
  };
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await response.json();
    let rows = data["results"];
    cardList.innerHTML = "";
    rows.forEach(
      ({
        id,
        original_title: title,
        overview,
        poster_path: posterPath,
        vote_average: voteAverage,
      }) => {
        // 별점 이미지로 구현
        let starImage;
        if (voteAverage >= 9.5) {
          starImage = "star5.svg";
        } else if (voteAverage >= 8.5) {
          starImage = "star4.5.svg";
        } else if (voteAverage >= 7.5) {
          starImage = "star4.svg";
        } else if (voteAverage >= 6.5) {
          starImage = "star3.5.svg";
        } else if (voteAverage >= 5.5) {
          starImage = "star3.svg";
        } else if (voteAverage >= 4.5) {
          starImage = "star2.5.svg";
        } else if (voteAverage >= 3.5) {
          starImage = "star2.svg";
        } else if (voteAverage >= 2.5) {
          starImage = "star1.5.svg";
        } else if (voteAverage >= 1.5) {
          starImage = "star1.svg";
        } else if (voteAverage >= 0.5) {
          starImage = "star0.5.svg";
        } else {
          starImage = "star0.svg";
        }
        let cardHtml = `
              <div class="card" id="card-${id}" data-id="${id}">
                <img class="image" src="https://image.tmdb.org/t/p/original/${posterPath}" />
                <div class="title">${title}</div>
                <div class="overview">${overview}</div>
                <div class="ratings">
                  <div class="star-container">
                    <img src=assets/${starImage}>
                  </div>
                  <span class="star-grade">${voteAverage}/10</span>
                </div>
              </div>`;
        cardList.insertAdjacentHTML("beforeend", cardHtml);
      }
    );
  } catch (error) {
    console.error("Failed to fetch the movies: ", error);
  }
};
