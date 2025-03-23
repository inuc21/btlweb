// Giả lập dữ liệu đơn hàng
const orders = [
  {
    customer: "Nguyễn Văn A",
    productId: "SP01",
    product: "Áo thun",
    quantity: 2,
    price: 150000,
    status: "Đã giao",
  },
  {
    customer: "Trần Thị B",
    productId: "SP02",
    product: "Quần jeans",
    quantity: 1,
    price: 350000,
    status: "Đang giao",
  },
  {
    customer: "Lê Văn C",
    productId: "SP03",
    product: "Áo sơ mi",
    quantity: 3,
    price: 200000,
    status: "Đã giao",
  },
  {
    customer: "Phạm Thị D",
    productId: "SP04",
    product: "Váy xòe",
    quantity: 1,
    price: 400000,
    status: "Chờ xử lý",
  },
];

let totalOrders = orders.length;
let totalRevenue = 0;
let deliveredOrders = 0;

const revenueTable = document.getElementById("revenueTable");

orders.forEach((order, index) => {
  const totalPrice = order.price * order.quantity;
  totalRevenue += totalPrice;
  if (order.status === "Đã giao") deliveredOrders++;

  const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${order.customer}</td>
        <td>${order.productId}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.price.toLocaleString()} đ</td>
        <td>${totalPrice.toLocaleString()} đ</td>
        <td>${order.status}</td>
      </tr>`;
  revenueTable.innerHTML += row;
});

document.getElementById("totalOrders").innerText = totalOrders;
document.getElementById("totalRevenue").innerText =
  totalRevenue.toLocaleString() + " đ";
document.getElementById("deliveredOrders").innerText = deliveredOrders;
