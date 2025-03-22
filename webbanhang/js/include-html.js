function includeHTML(callback) {
  const elements = document.querySelectorAll("[include-html]");
  let count = elements.length;

  if (count === 0) {
    if (callback) callback();
    return;
  }

  elements.forEach((el) => {
    const file = el.getAttribute("include-html");
    if (file) {
      fetch(file)
        .then((response) => response.text())
        .then((data) => {
          el.innerHTML = data;
          el.removeAttribute("include-html");
          count--;
          if (count === 0 && callback) callback(); // Gọi callback sau cùng
        })
        .catch((err) => {
          el.innerHTML = "Lỗi khi tải " + file;
          count--;
          if (count === 0 && callback) callback();
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML(initEvents); // Gọi initEvents sau khi include xong
});
