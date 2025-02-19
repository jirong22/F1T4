document.addEventListener("DOMContentLoaded", () => {
    const circleItems = document.querySelectorAll(".circle-item");
    const descItems = document.querySelectorAll(".desc-item");

    function removeActiveStates() {
        document.querySelectorAll(".desc-item, .circle-item").forEach(item => {
            item.classList.remove("active", "clicked");
            item.style.transform = ""; //  초기 화면 세팅
        });
    }

    function activateItems(key) {
        console.log(`Activating items with key: ${key}`);

        document.querySelectorAll(`.desc-item[data-key="${key}"], .circle-item[data-key="${key}"]`).forEach(el => {
            el.classList.add("active", "clicked");

            // 🔥 클릭된 circle-item을 중앙으로 이동
            if (el.classList.contains("circle-item")) {
                el.style.transform = "translate(0, 0) scale(1.3)";
            }
        });
    }

    circleItems.forEach((item) => {
        const key = item.dataset.key;

        // 클릭 시 중앙 고정 + desc-item 강조 유지
        item.addEventListener("click", (event) => {
            event.stopPropagation();

            // 다른 클릭된 요소들 초기화
            removeActiveStates();
            // 같은 data-key를 가진 desc-item도 강조
            activateItems(key);
        });
    });

    // 다른 곳 클릭하면 초기화
    document.addEventListener("click", () => {
        removeActiveStates();
    });
});
