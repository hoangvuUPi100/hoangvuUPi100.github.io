let price = 100;
const moneyText = document.getElementById("money");
const sharesText = document.getElementById("shares");
const trendText = document.getElementById("trend");
const historyList = document.getElementById("history");

function updateUI() {
  priceText.innerText = price.toFixed(2) + "$";
  moneyText.innerText = money.toFixed(2);
  sharesText.innerText = shares;
}

function updatePriceColor(oldPrice) {
  if (price > oldPrice) {
    priceText.style.color = "#22c55e";
  } else if (price < oldPrice) {
    priceText.style.color = "#ef4444";
  } else {
    priceText.style.color = "white";
  }
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
  } else if (price < oldPrice) {
    trendText.innerText = "📉 Giá giảm";
    trendText.style.color = "#ef4444";
  } else {
    trendText.innerText = "➖ Không đổi";
    trendText.style.color = "white";
  }

  updatePriceColor(oldPrice);
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
