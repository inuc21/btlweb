document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();

  if (username) {
    localStorage.setItem("loggedInUser", username); // Lưu tên tài khoản
    window.location.href = "home.html"; // Chuyển về trang chủ
  }
});
