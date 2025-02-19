/* 기본 세팅 */
document.addEventListener("DOMContentLoaded", () => { // 이벤트리스너 - html 로드된 후, javascript가 실행
    const circleItems = document.querySelectorAll(".circle-item");

    circleItems.forEach((item) => {
        // 초기 transform 값을 가져와서 아래처럼 저장하기 !
        item.dataset.originalTransform = window.getComputedStyle(item).transform;
    });

    console.log("원래 위치 저장:", circleItems);

    const descItems = document.querySelectorAll(".desc-item"); // 써클아이템과 설명아이템을 불러온다


    /* 초기 화면 세팅 */
    function removeActiveStates() {
        document.querySelectorAll(".desc-item, .circle-item").forEach(item => {
            item.classList.remove("active", "clicked"); // 써클과 설명에서 active,click을 제거 -> 강조했던 거 초기화
            
            if (item.classList.contains("circle-item")) {
                item.style.transition = "transform 1s ease-in-out"; // 애니매이션 효과
                item.style.transform = item.dataset.originalTransform; // 클릭 해제 시 원래 위치로 되돌리기
            }
        });
    }


    /* 같은 data-key를 가진 써클아이템과 설명아이템을 찾아서 active, clicked를 준다 */
    function activateItems(key) {
        document.querySelectorAll(`.desc-item[data-key="${key}"], .circle-item[data-key="${key}"]`).forEach(el => {
            el.classList.add("active", "clicked");


            /* 클릭된 circle-item은 중앙으로 이동 */
            if (el.classList.contains("circle-item")) {
                el.style.transform = "translate(0, 0) scale(1.3)";
            }                           //  ↳ 위치(중앙)     ↳ 크기
        });
    }


    /* 이벤트리스너 추가 - 클릭하면 중앙으로 이동& 강조되는데 -> 이것을 유지 */
    circleItems.forEach((item) => { // 모든 circle 아이템에 클릭 이벤트 추가
        const key = item.dataset.key;// 아이템의 데이터 값을 가져온다
        item.addEventListener("click", (event) => {
            event.stopPropagation(); // 이벤트 전파 방지 (circle-item 클릭 시, document의 클릭 이벤트((밑 문단))가 실행되지 않아서 강조 효과가 유지됨)
            removeActiveStates();// 다른 클릭된 요소들 초기화
            activateItems(key);// 같은 data-key를 가진 desc아이템도 강조
        });
    });


    /* 다른 곳(페이지의 아무곳) 클릭하면 초기화 */
    document.addEventListener("click", () => {
        removeActiveStates(); // 위에 초기화면 세팅으로!!
    });
});
