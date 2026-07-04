/* ===========================
   GiftOS v0.1
=========================== */

const time = document.getElementById("time");
const date = document.getElementById("date");

const swipe = document.querySelector(".swipe");

const lockscreen = document.getElementById("lockscreen");
const passcode = document.getElementById("passcode");
const desktop = document.getElementById("desktop");

const dots = document.querySelectorAll(".dot");
const buttons = document.querySelectorAll(".keypad button");
const statusText = document.getElementById("status");

const PASSWORD = "0811";

let input = "";

let wrongCount = 0;

/* ===========================
   Clock
=========================== */

function updateClock(){

    const now = new Date();

    time.innerHTML = now.toLocaleTimeString("vi-VN",{

        hour:"2-digit",
        minute:"2-digit"

    });

    date.innerHTML = now.toLocaleDateString("vi-VN",{

        weekday:"long",
        day:"numeric",
        month:"long"

    });

}

updateClock();

setInterval(updateClock,1000);

/* ===========================
   Swipe Up
=========================== */

swipe.onclick=()=>{

    lockscreen.classList.add("fadeOut");

    setTimeout(()=>{

        lockscreen.style.display="none";

        passcode.classList.add("show");

    },500);

}

/* ===========================
   Fill Dots
=========================== */

function updateDots(){

    dots.forEach((dot,index)=>{

        if(index<input.length){

            dot.classList.add("active");

        }else{

            dot.classList.remove("active");

        }

    });

}

/* ===========================
   Reset
=========================== */

function clearInput(){

    input="";

    updateDots();

}

/* ===========================
   Unlock
=========================== */

function unlock(){

    passcode.classList.add("unlock");

    setTimeout(()=>{

        passcode.style.display="none";

        desktop.classList.add("show");

    },700);

}

/* ===========================
   Wrong Password
=========================== */

function wrongPassword(){

    wrongCount++;

    passcode.classList.add("shake");

    statusText.innerHTML="❌ Sai mật khẩu";

    setTimeout(()=>{

        passcode.classList.remove("shake");

    },450);

    setTimeout(()=>{

        statusText.innerHTML="Nhập mật khẩu";

    },1800);

    if(wrongCount==3){

        statusText.innerHTML="💡 Gợi ý: Ngày sinh của bạn là gì?";

    }

    if(wrongCount==6){

        statusText.innerHTML="💡 Gợi ý: Tên ở nhà của bạn là gì?";

    }

    clearInput();

}

/* ===========================
   Keypad
=========================== */

buttons.forEach((button)=>{

    button.addEventListener("click",()=>{

        const value = button.dataset.value || button.textContent.trim();

        if(button.classList.contains("empty")) return;

        if(button.id==="delete"){

            input=input.slice(0,-1);

            updateDots();

            return;

        }

        if(input.length>=4) return;

        input+=value;

        updateDots();

        if(input.length===4){

            setTimeout(checkPassword,180);

        }

    });

});

/* ===========================
   Check Password
=========================== */

function checkPassword(){

    const value=input.toLowerCase().trim();

    // PIN đúng
    if(value==="0811"){

        statusText.innerHTML="❤️ Welcome Back";

        unlock();

        return;

    }

    // Gợi ý 1
    const birthday=[

        "8/11/2011",
        "08/11/2011",
        "08112011",
        "0811"

    ];

    if(birthday.includes(value)){

        statusText.innerHTML="❤️ Đúng rồi!<br>Mật khẩu là 0811";

        clearInput();

        return;

    }

    // Gợi ý 2
    const nickname=[

        "pi",
        "pii"

    ];

    if(nickname.includes(value)){

        statusText.innerHTML="❤️ Chính xác!<br>Mật khẩu là 0811";

        clearInput();

        return;

    }

    wrongPassword();

}

/* ===========================
   Floating Hearts
=========================== */

const hearts=document.getElementById("hearts");

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"%";

    heart.style.fontSize=(14+Math.random()*20)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,700);

/* ===========================
   Ripple Effect
=========================== */

buttons.forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=button.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";
        ripple.style.top=(e.clientY-rect.top)+"px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ===========================
   Welcome Animation
=========================== */

function welcomeMessage(){

    statusText.innerHTML="❤️ Welcome Back";

    statusText.classList.add("glow");

}

/* ===========================
   Keyboard Support
=========================== */

document.addEventListener("keydown",(e)=>{

    if(passcode.style.display==="none") return;

    if(e.key>="0" && e.key<="9"){

        if(input.length<4){

            input+=e.key;

            updateDots();

        }

        if(input.length===4){

            setTimeout(checkPassword,150);

        }

    }

    if(e.key==="Backspace"){

        input=input.slice(0,-1);

        updateDots();

    }

});