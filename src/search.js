export const searchMovie = () => {
  const cardList = document.querySelector(".card-list");
  document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.querySelector("#search-box");
    searchBox.addEventListener("keyup", function () {
      // keyup : 키를 놓을 때 이벤트 발생
      const filterValue = searchBox.value.toLowerCase();
      const cards = cardList.querySelectorAll(".card");
      cards.forEach(function (card) {
        const titleText = card
          .querySelector(".title")
          .textContent.toLowerCase();
        if (titleText.includes(filterValue)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });

    // alert 창
    cardList.addEventListener("click", function (event) {
      let target = event.target.closest(".card");
      if (target) {
        let id = target.dataset.id; // 카드 html에 data-id 속성 추가해서 사용
        alert(`The id of this movie is ${id}`);
      }
    });
  });
};
