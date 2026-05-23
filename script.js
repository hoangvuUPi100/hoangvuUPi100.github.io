let price = 100;
let money = 10000;
let shares = 0;

const priceText = document.getElementById("price");
const moneyText = document.getElementById("money");
const sharesText = document.getElementById("shares");
const trendText = document.getElementById("trend");
const historyList = document.getElementById("history");

function updateUI() {
  priceText.innerText = price.toFixed(2) + "$";
  moneyText.innerText = money.toFixed(2);
  sharesText.innerText = shares;
}

function addHistory(text) {
  const li = document.createElement("li");
  li.innerText = text;
  historyList.prepend(li);
}

function randomPrice() {
  const oldPrice = price;

  const change = (Math.random() - 0.5) * 10;
  price += change;

  if (price < 1) {
    price = 1;
  }

  if (price > oldPrice) {
    trendText.innerText = "📈 Giá tăng";
    trendText.style.color = "#22c55e";
  } else {
    trendText.innerText = "📉 Giá giảm";
    trendText.style.color = "#ef4444";
  }

  updateUI();
}

function buyStock() {
  if (money >= price) {
    money -= price;
    shares++;

    addHistory("🟢 Mua 1 cổ phiếu giá " + price.toFixed(2) + "$");

    updateUI();
  } else {
    alert("Không đủ tiền!");
  }
}

function sellStock() {
  if (shares > 0) {
    shares--;
    money += price;

    addHistory("🔴 Bán 1 cổ phiếu giá " + price.toFixed(2) + "$");

    updateUI();
  } else {
    alert("Bạn không có cổ phiếu!");
  }
}

setInterval(randomPrice, 2000);

updateUI();
