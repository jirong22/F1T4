export function openModal() {
  const scrollY = $(window).scrollTop();
  const windowHeight = $(window).height();

  const modalTop = scrollY + windowHeight / 2;

  $(".modal-bg").css("display", "block");
  $(".modal-content").css({
    display: "block",
    top: `${modalTop}px`,
    transform: "translate(-50%, -50%)",
    left: "50%",
  });
}

export function closeModal() {
  $(".modal-bg").css("display", "none");
  $(".modal-content").css("display", "none");
}
