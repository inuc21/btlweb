// Lấy các phần tử
const orderList = document.getElementById("orderList");
const btnAddOrder = document.getElementById("btnAddOrder");
const orderModal = document.getElementById("orderModal");
const closeOrderModal = document.getElementById("closeOrderModal");
const orderForm = document.getElementById("orderForm");

const orderId = document.getElementById("orderId");
const orderCustomer = document.getElementById("orderCustomer");
const orderProduct = document.getElementById("orderProduct");
const orderProductCode = document.getElementById("orderProductCode");
const orderQuantity = document.getElementById("orderQuantity");
const orderStatus = document.getElementById("orderStatus");
const orderModalTitle = document.getElementById("orderModalTitle");

// Mảng lưu đơn hàng
let orders = [];

// Hiển thị danh sách đơn hàng
function renderOrders() {
  orderList.innerHTML = "";
  orders.forEach((order, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${order.customer}</td>
      <td>${order.product}</td>
      <td>${order.productCode}</td>
      <td>${order.quantity}</td>
      <td>${order.status}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editOrder(${index})">✏ Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteOrder(${index})">🗑 Xóa</button>
      </td>
    `;
    orderList.appendChild(row);
  });
}

// Mở modal thêm mới
btnAddOrder.addEventListener("click", () => {
  orderForm.reset();
  orderId.value = "";
  orderModalTitle.textContent = "Thêm đơn hàng";
  orderModal.style.display = "block";
});

// Đóng modal
closeOrderModal.addEventListener("click", () => {
  orderModal.style.display = "none";
});

// Khi submit form
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const order = {
    customer: orderCustomer.value.trim(),
    product: orderProduct.value.trim(),
    productCode: orderProductCode.value.trim(),
    quantity: parseInt(orderQuantity.value),
    status: orderStatus.value,
  };

  const id = orderId.value;

  if (id === "") {
    // Thêm mới
    orders.push(order);
  } else {
    // Sửa đơn hàng
    orders[id] = order;
  }

  renderOrders();
  orderModal.style.display = "none";
});

// Sửa đơn hàng
window.editOrder = function (index) {
  const order = orders[index];
  orderId.value = index;
  orderCustomer.value = order.customer;
  orderProduct.value = order.product;
  orderProductCode.value = order.productCode;
  orderQuantity.value = order.quantity;
  orderStatus.value = order.status;
  orderModalTitle.textContent = "Sửa đơn hàng";
  orderModal.style.display = "block";
};

// Xóa đơn hàng
window.deleteOrder = function (index) {
  if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
    orders.splice(index, 1);
    renderOrders();
  }
};

// Đóng modal khi click ngoài vùng modal
window.onclick = function (e) {
  if (e.target === orderModal) {
    orderModal.style.display = "none";
  }
};

// Khởi tạo ban đầu
renderOrders();
