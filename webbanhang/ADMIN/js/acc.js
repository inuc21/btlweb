// DOM Elements
const btnAddAccount = document.getElementById("btnAddAccount");
const accountModal = document.getElementById("accountModal");
const closeAccountModal = document.getElementById("closeAccountModal");
const accountForm = document.getElementById("accountForm");
const accountList = document.getElementById("accountList");

const accountIdInput = document.getElementById("accountId");
const accountNameInput = document.getElementById("accountName");
const accountEmailInput = document.getElementById("accountEmail");
const accountRoleSelect = document.getElementById("accountRole");
const accountModalTitle = document.getElementById("accountModalTitle");

let accounts = [];
let editingIndex = -1;

// Show modal
btnAddAccount.addEventListener("click", () => {
  resetForm();
  accountModalTitle.textContent = "Thêm tài khoản";
  accountModal.style.display = "block";
});

// Close modal
closeAccountModal.addEventListener("click", () => {
  accountModal.style.display = "none";
});

// Handle submit
accountForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = accountNameInput.value.trim();
  const email = accountEmailInput.value.trim();
  const role = accountRoleSelect.value;

  if (editingIndex === -1) {
    // Thêm mới
    const newAccount = { name, email, role };
    accounts.push(newAccount);
  } else {
    // Cập nhật
    accounts[editingIndex].name = name;
    accounts[editingIndex].email = email;
    accounts[editingIndex].role = role;
  }

  renderAccounts();
  accountModal.style.display = "none";
  resetForm();
});

// Hiển thị danh sách tài khoản
function renderAccounts() {
  accountList.innerHTML = "";
  accounts.forEach((account, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${account.name}</td>
      <td>${account.email}</td>
      <td>${account.role}</td>
      <td>
        <button class="btn btn-warning btn-sm me-1" onclick="editAccount(${index})">Sửa</button>
        <button class="btn btn-danger btn-sm" onclick="deleteAccount(${index})">Xóa</button>
      </td>
    `;

    accountList.appendChild(row);
  });
}

// Sửa tài khoản
window.editAccount = function (index) {
  const account = accounts[index];
  accountIdInput.value = index;
  accountNameInput.value = account.name;
  accountEmailInput.value = account.email;
  accountRoleSelect.value = account.role;

  editingIndex = index;
  accountModalTitle.textContent = "Chỉnh sửa tài khoản";
  accountModal.style.display = "block";
};

// Xóa tài khoản
window.deleteAccount = function (index) {
  if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
    accounts.splice(index, 1);
    renderAccounts();
  }
};

// Reset form
function resetForm() {
  accountForm.reset();
  accountIdInput.value = "";
  editingIndex = -1;
}
