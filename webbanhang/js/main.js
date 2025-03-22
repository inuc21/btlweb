// Include HTML
function includeHTML(callback) {
  const elements = document.querySelectorAll("[include-html]");
  let count = elements.length;

  if (count === 0) {
    if (callback) callback();
    return;
  }

  elements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải file: " + file);
        return res.text();
      })
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");
        count--;
        if (count === 0 && callback) callback();
      })
      .catch((err) => {
        el.innerHTML = `<p style="color:red;">${err.message}</p>`;
        count--;
        if (count === 0 && callback) callback();
      });
  });
}
function handleLoginLogout() {
  const username = localStorage.getItem("loggedInUser");
  if (username) {
    const usernameDisplay = document.getElementById("usernameDisplay");
    if (usernameDisplay) {
      usernameDisplay.textContent = username;
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        location.href = "signin.html";
      });
    }
  }
}

// Gọi khi đã include xong HTML
function initEvents() {
  // Toggle giỏ hàng
  const toggleCartBtn = document.getElementById("toggleCartBtn");
  const cartDropdown = document.getElementById("cartDropdown");
  const closeCartBtn = document.getElementById("closeCartBtn");

  if (toggleCartBtn && cartDropdown && closeCartBtn) {
    toggleCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      cartDropdown.classList.toggle("open");
    });

    closeCartBtn.addEventListener("click", () => {
      cartDropdown.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (
        !cartDropdown.contains(e.target) &&
        !toggleCartBtn.contains(e.target)
      ) {
        cartDropdown.classList.remove("open");
      }
    });
  }

  // Cộng trừ số lượng
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const input = this.parentElement.querySelector(".qty_input");
      let value = parseInt(input.value);
      if (this.classList.contains("minus")) {
        value = value > 1 ? value - 1 : 1;
      } else {
        value += 1;
      }
      input.value = value;
      updateTotal();
    });
  });

  // Xóa sản phẩm
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest("tr").remove();
      updateTotal();
    });
  });

  // Checkbox chọn sản phẩm
  document.querySelectorAll(".item_checkbox").forEach((cb) => {
    cb.addEventListener("change", updateTotal);
  });

  // Dropdown danh mục
  const toggleMenuBtn = document.getElementById("toggleMenuBtn");
  const danhMucMenu = document.getElementById("danhMucMenu");
  if (toggleMenuBtn && danhMucMenu) {
    toggleMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      danhMucMenu.classList.toggle("show_menu");
    });

    document.addEventListener("click", function (e) {
      if (
        !danhMucMenu.contains(e.target) &&
        !toggleMenuBtn.contains(e.target)
      ) {
        danhMucMenu.classList.remove("show_menu");
      }
    });
  }

  updateTotal(); // Tính tổng ban đầu
}

// Tính tổng giỏ hàng
function updateTotal() {
  let total = 0;
  let itemCount = 0;

  document.querySelectorAll("#cartItems tr").forEach((row) => {
    const checkbox = row.querySelector(".item_checkbox");
    if (checkbox && checkbox.checked) {
      const priceText = row
        .querySelector(".price")
        .textContent.replace(/\./g, "")
        .trim();
      const price = parseInt(priceText);
      const quantity = parseInt(row.querySelector(".qty_input").value);
      total += price * quantity;
      itemCount++;
    }
  });

  const totalPriceEl = document.getElementById("totalPrice");
  const itemCountEl = document.getElementById("itemCount");
  if (totalPriceEl)
    totalPriceEl.textContent = total.toLocaleString("vi-VN") + " đ";
  if (itemCountEl) itemCountEl.textContent = itemCount;
}

// Hiển thị tên người dùng và logout
function handleLoginLogout() {
  const username = localStorage.getItem("loggedInUser");
  if (username) {
    const displayUsername = document.getElementById("displayUsername");
    const logoutBtn = document.getElementById("logoutBtn");

    if (displayUsername) {
      displayUsername.textContent = username;
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        location.reload();
      });
    }
  }
}

// Khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", function () {
  includeHTML(function () {
    initEvents();
    handleLoginLogout(); // Gọi sau khi header đã load
  });
});
