document.addEventListener("DOMContentLoaded", () => {
    const circleItems = document.querySelectorAll(".circle-item");
    const descItems = document.querySelectorAll(".desc-item");

    console.log("🎯 circleItems:", circleItems.length);
    console.log("📌 descItems:", descItems.length);

    circleItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            let key = item.getAttribute("data-key");
            console.log("🔍 Hovered on:", key); // key 값이 정상적으로 받아지는지 확인!

            descItems.forEach(desc => {
                desc.classList.remove("active");
                console.log("🔎 Checking:", desc.getAttribute("data-key")); // 각 설명의 key 값 확인

                if (desc.getAttribute("data-key") === key) {
                    desc.classList.add("active");
                    console.log("✅ Activated:", key); // 활성화된 설명 출력
                }
            });
        });

        item.addEventListener("mouseleave", () => {
            descItems.forEach(desc => {
                desc.classList.remove("active");
            });
        });
    });
});
