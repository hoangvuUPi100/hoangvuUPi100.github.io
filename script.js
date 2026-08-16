let currentScreen = 1;

const rainEmojis = [
    "🎂",
    "🎉",
    "🎈",
    "🎁",
    "✨",
    "💖",
    "⭐",
    "🧁",
    "🍰"
];

function nextScreen(screenNumber) {

    document
        .getElementById(`screen${currentScreen}`)
        .classList.remove("active");

    setTimeout(() => {

        document
            .getElementById(`screen${screenNumber}`)
            .classList.add("active");

        currentScreen = screenNumber;

    }, 150);
}


function showBirthday() {

    const nameInput =
        document.getElementById("name");

    const birthdayInput =
        document.getElementById("birthday");

    const error =
        document.getElementById("error");

    const name =
        nameInput.value.trim();

    const birthday =
        birthdayInput.value;

    if (!name) {

        error.textContent =
            "🎂 Hãy nhập tên của bạn!";

        nameInput.focus();

        return;
    }

    if (!birthday) {

        error.textContent =
            "📅 Hãy chọn ngày sinh!";

        birthdayInput.focus();

        return;
    }

    error.textContent = "";

    document.getElementById("birthdayName")
        .textContent = name;

    nextScreen(3);

    startRain();
}


/* =========================
   RAIN EFFECT
========================= */

function createRainItem() {

    const container =
        document.getElementById("rain-container");

    const item =
        document.createElement("div");

    item.classList.add("rain-item");

    item.textContent =
        rainEmojis[
            Math.floor(
                Math.random() * rainEmojis.length
            )
        ];

    const size =
        Math.random() * 25 + 20;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 3 + 3;

    const delay =
        Math.random() * 1.5;

    item.style.left = `${left}%`;
    item.style.fontSize = `${size}px`;
    item.style.animationDuration =
        `${duration}s`;

    item.style.animationDelay =
        `${delay}s`;

    container.appendChild(item);

    setTimeout(() => {

        item.remove();

    }, (duration + delay) * 1000);
}


function startRain() {

    const container =
        document.getElementById("rain-container");

    container.innerHTML = "";

    // Tạo một đợt rất nhiều icon
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createRainItem();
        }, i * 80);
    }

    // Sau đó tiếp tục tạo mưa
    setInterval(() => {

        for (let i = 0; i < 4; i++) {
            createRainItem();
        }

    }, 300);
}