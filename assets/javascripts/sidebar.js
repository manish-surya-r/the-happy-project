document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  let topicText = null;

  if (path.includes("oop-python")) {
    topicText = "Object-Oriented Design in Python";
  } else if (path.includes("oop-cpp")) {
    topicText = "Object-Oriented Design in C++";
  }

  if (!topicText) return;

  const topLevelItems = document.querySelectorAll(
    ".wy-menu-vertical > ul > li"
  );

  topLevelItems.forEach(li => {
    const link = li.querySelector(":scope > a");
    if (!link) return;

    if (link.textContent.trim() === topicText) {
      li.classList.add("active-topic");
    }
  });
});
