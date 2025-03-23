let products = [];

const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const btnAddProduct = document.getElementById("btnAddProduct");
const closeModal = document.getElementById("closeModal");

// 👉 Mở modal để thêm sản phẩm
btnAddProduct.addEventListener("click", () => {
  resetForm();
  showModal("Thêm sản phẩm");
});

// 👉 Đóng modal khi nhấn nút "x"
closeModal.addEventListener("click", hideModal);

// 👉 Đóng modal khi click ra ngoài phần nội dung
window.addEventListener("click", (e) => {
  if (e.target === productModal) {
    hideModal();
  }
});

// 👉 Xử lý submit form thêm/sửa sản phẩm
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();

  // 👉 Kiểm tra dữ liệu đầu vào
  if (!name || isNaN(price) || !image) {
    alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
    return;
  }

  if (id) {
    // 👉 Cập nhật sản phẩm
    const index = products.findIndex((p) => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { id: parseInt(id), name, price, image };
    }
  } else {
    // 👉 Thêm sản phẩm mới
    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    products.push({ id: newId, name, price, image });
  }

  renderProductList();
  hideModal();
});

// 👉 Render danh sách sản phẩm ra bảng
function renderProductList() {
  productList.innerHTML = "";
  products.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.price.toLocaleString()} đ</td>
      <td><img src="${p.image}" width="60" alt="Ảnh sản phẩm"/></td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editProduct(${
          p.id
        })">✏️ Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${
          p.id
        })">🗑️ Xóa</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

// 👉 Sửa sản phẩm
window.editProduct = function (id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("productId").value = product.id;
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productImage").value = product.image;
  showModal("Sửa sản phẩm");
};

// 👉 Xóa sản phẩm
window.deleteProduct = function (id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    products = products.filter((p) => p.id !== id);
    renderProductList();
  }
};

// 👉 Hàm hiển thị modal
function showModal(title) {
  document.getElementById("modalTitle").innerText = title;
  productModal.style.display = "flex";
}

// 👉 Hàm ẩn modal
function hideModal() {
  productModal.style.display = "none";
}

// 👉 Hàm reset form
function resetForm() {
  productForm.reset();
  document.getElementById("productId").value = "";
}

// 👉 Render ban đầu
renderProductList();
