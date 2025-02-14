document.addEventListener("DOMContentLoaded", function () {
    const features = document.querySelectorAll(".feature-text");
    const pages = document.querySelectorAll(".page");
    let isScrolling = false;
  
    /* ✅ 핵심 기능 문구 색상 변경 애니메이션 */
    function checkScroll() {
        let scrollPosition = window.scrollY + window.innerHeight * 0.5; // 중간 위치로 조정

        features.forEach((feature, index) => {
            let sectionTop = feature.getBoundingClientRect().top + window.scrollY;
            
            if (scrollPosition >= sectionTop) {
                // 현재 보이는 문구 활성화
                feature.classList.add("active");
                // 이전 문구는 비활성화
                for (let i = 0; i < index; i++) {
                    features[i].classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // 초기 실행

    /* ✅ 페이지 스와이프 애니메이션 */
    function handlePageSwipe(direction) {
        if (isScrolling) return;
        isScrolling = true;

        let currentPageIndex = 0;
        pages.forEach((page, index) => {
            if (window.scrollY >= page.offsetTop - window.innerHeight / 2) {
                currentPageIndex = index;
            }
        });

        if (direction === "down" && currentPageIndex < pages.length - 1) {
            pages[currentPageIndex + 1].classList.add("swipe-up");
            setTimeout(() => {
                window.scrollTo({ top: pages[currentPageIndex + 1].offsetTop, behavior: "smooth" });
                isScrolling = false;
            }, 500);
        } else if (direction === "up" && currentPageIndex > 0) {
            pages[currentPageIndex].classList.remove("swipe-up");
            setTimeout(() => {
                window.scrollTo({ top: pages[currentPageIndex - 1].offsetTop, behavior: "smooth" });
                isScrolling = false;
            }, 500);
        } else {
            isScrolling = false;
        }
    }

    /* ✅ 스크롤 이벤트 감지 */
    window.addEventListener("wheel", function (event) {
        if (event.deltaY > 0) {
            handlePageSwipe("down");
        } else {
            handlePageSwipe("up");
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
            handlePageSwipe("down");
        } else if (event.key === "ArrowUp") {
            handlePageSwipe("up");
        }
    });
});