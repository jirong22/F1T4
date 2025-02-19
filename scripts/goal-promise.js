document.addEventListener("DOMContentLoaded", () => {
    const circleItems = document.querySelectorAll(".circle-item");
    const descItems = document.querySelectorAll(".desc-item");

    function removeActiveStates() {
        document.querySelectorAll(".desc-item, .circle-item").forEach(item => {
            item.classList.remove("active", "clicked");
        });
    }

    function activateItems(key) {
        console.log(`Activating items with key: ${key}`); // 🔍 디버깅

        // 🔥 desc-item도 선택되도록 코드 수정
        document.querySelectorAll(`.desc-item[data-key="${key}"], .circle-item[data-key="${key}"]`).forEach(el => {
            el.classList.add("active", "clicked");
            console.log(`Activated: `, el); // 🔍 디버깅
        });
    }

    circleItems.forEach((item) => {
        const key = item.dataset.key;

        // 호버 시 desc-item 강조
        item.addEventListener("mouseenter", () => {
            document.querySelectorAll(`.desc-item[data-key="${key}"]`).forEach(el => {
                el.classList.add("active");
            });
        });

        item.addEventListener("mouseleave", () => {
            document.querySelectorAll(`.desc-item[data-key="${key}"]`).forEach(el => {
                if (!el.classList.contains("clicked")) {
                    el.classList.remove("active");
                }
            });
        });

        // 클릭 시 중앙 고정 + desc-item 강조 유지
        item.addEventListener("click", (event) => {
            event.stopPropagation();

            console.log(`Clicked circle-item with key: ${key}`); // 🔍 디버깅

            // 기존 활성화된 요소 초기화
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
