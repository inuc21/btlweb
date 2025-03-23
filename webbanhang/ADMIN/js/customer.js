let customers = [];

const customerModal = document.getElementById("customerModal");
const customerForm = document.getElementById("customerForm");
const customerList = document.getElementById("customerList");
const btnAddCustomer = document.getElementById("btnAddCustomer");
const closeCustomerModal = document.getElementById("closeCustomerModal");

btnAddCustomer.addEventListener("click", () => {
  document.getElementById("modalTitle").innerText = "Thêm khách hàng";
  customerForm.reset();
  document.getElementById("customerId").value = "";
  customerModal.style.display = "flex";
});

closeCustomerModal.addEventListener("click", () => {
  customerModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === customerModal) {
    customerModal.style.display = "none";
  }
});

customerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("customerId").value;
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  if (id) {
    const index = customers.findIndex((c) => c.id === parseInt(id));
    customers[index] = { id: parseInt(id), name, email, phone, address };
  } else {
    const newId = customers.length
      ? Math.max(...customers.map((c) => c.id)) + 1
      : 1;
    customers.push({ id: newId, name, email, phone, address });
  }

  renderCustomerList();
  customerModal.style.display = "none";
});

function renderCustomerList() {
  customerList.innerHTML = "";
  customers.forEach((c, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.address}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editCustomer(${
            c.id
          })">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="deleteCustomer(${
            c.id
          })">🗑️</button>
        </td>
      </tr>
    `;
    customerList.innerHTML += row;
  });
}

window.editCustomer = function (id) {
  const c = customers.find((c) => c.id === id);
  document.getElementById("customerId").value = c.id;
  document.getElementById("customerName").value = c.name;
  document.getElementById("customerEmail").value = c.email;
  document.getElementById("customerPhone").value = c.phone;
  document.getElementById("customerAddress").value = c.address;
  document.getElementById("modalTitle").innerText = "Sửa khách hàng";
  customerModal.style.display = "flex";
};

window.deleteCustomer = function (id) {
  if (confirm("Bạn có chắc muốn xóa khách hàng này?")) {
    customers = customers.filter((c) => c.id !== id);
    renderCustomerList();
  }
};

renderCustomerList();
