// api 호출

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
    rows.forEach(
      ({
        id,
        original_title: title,
        overview,
        poster_path: posterPath,
        vote_average: voteAverage,
      }) => {
        // 위와 같이 객체구조분해할당을 통해 간결하게 바꿈
        // let id = mov["id"];
        // let title = mov["original_title"];
        // let overview = mov["overview"];
        // let posterPath = mov["poster_path"];
        // let voteAverage = mov["vote_average"];
        // 별점 기능 구현 방법 찾는 중
        let starPer = (voteAverage / 10) * 100;
        let starPerRounded = `${Math.round(starPer / 10) * 10}%`;
        let cardHtml = `
      <div class="card" id="card-${id}" data-id="${id}">
        <img class="image" src="https://image.tmdb.org/t/p/original/${posterPath}" />
        <div class="title">${title}</div>
        <div class="overview">${overview}</div>
        <div class="ratings">
          <div class="star-container">
            <object id="starSvg" type="image/svg+xml" data="star.svg">Your browser does not support SVG</object>
          </div>
          <span class="star-grade">${voteAverage}/10</span>
        </div>
      </div>`;
        cardList.insertAdjacentHTML("beforeend", cardHtml);
      }
    );
  });

// 검색
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

  // alert 창
  cardList.addEventListener("click", function (event) {
    let target = event.target.closest(".card"); //
    if (target) {
      let id = target.dataset.id; // 카드 html에 data-id 속성 추가해서 사용
      alert(`The id of this movie is ${id}`);
    }
  });
});

// 별점 구현
// document.addEventListener("DOMContentLoaded", function () {
//   const obj = document.getElementById("starSvg");
//   obj.addEventListener("load", function () {
//     const svgDoc = obj.contentDocument; // SVG 문서에 접근
//     const stars = svgDoc.querySelectorAll("path"); // 모든 별 찾기
//     updateStarRating(stars, 7.5); // 예시 점수 7.5로 함수 호출
//   });
// })
