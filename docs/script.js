const snowContainer = document.getElementById("globe-snow");
const backgroundSnow = document.getElementById("background-snow");
const globe = document.getElementById("globe");
const house = document.getElementById("house");
const lamp = document.getElementById("lamp");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");
const trees = document.getElementById("trees");

const snowToggle = document.getElementById("snow-toggle");
const lightsToggle = document.getElementById("lights-toggle");
const rotateToggle = document.getElementById("rotate-toggle");

let snowOn = true;
let lightsOn = true;
let rotateOn = true;
let currentWorld = "winter";
let shakeTimer;

const wishes = [
    "May your little world be full of wonder. ❄",
    "Somewhere, snow is falling just for you. ❄",
    "Make room for a little magic in your life. ❄",
    "Even the smallest worlds can hold the biggest dreams. ❄",
    "Take a deep breath and let the snowflakes fall. ❄",
];

const scenes = {
    winter: {
        sky: "linear-gradient(#8abbe3, #466d9a 70%, #b5d9ed)",
        mountain: "#d8edff",
        ground: "linear-gradient(#e8f7ff, #b6d7ef)",
        caption: "A quiet night in a winter wonderland.",
        moon: "☾"
    },
    night: {
        sky: "linear-gradient(#10152f, #273d69 70%, #667da9)",
        mountain: "#a4b6d9",
        ground: "linear-gradient(#e2eaff, #91a8d4)",
        caption: "Under a thousand tiny stars.",
        moon: "☾"
    },
    dream: {
        sky: "linear-gradient(#b7b3e8, #858dc8 60%, #e4d9f8)",
        mountain: "#f3eaff",
        ground: "linear-gradient(#fff7ff, #c9c9f2)",
        caption: "A world of dreams and wonder.",
        moon: "⟡"
    }
};

function makeFlake(container, inside = false) {
    const flake = document.createElement("span");
    flake.className = "flake"
    flake.textContent = ["❄", "⟡", "❉", "."][
        Math.floor(Math.random() * 4)
    ];

    flake.style.left = Math.random() * 100 + "%";
    flake.style.fontSize = 7 + Math.random() * 12 + "px";
    flake.style.opacity = 0.3 + Math.random() * 0.7;
    flake.style.animationDuration = 4 + Math.raandom() * 8 + "s";
    flake.style.animationDelay = Math.random() * 10 + "s";

    container.appendChild(flake);
}

function fillSnow() {
    snowContainer.replaceChildren();
    backgroundSnow.replaceChildren();

    for (let i = 0; i < 32; i++) {
        makeFlake(snowContainer, true);
    }

    for (let i = 0; i < 35; i++) {
        makeFlake(backgroundSnow);
    }
}

function setSnow(enabled) {
    snowOn = enabled;
    snowToggle.classList.toggle("active", enabled);
    snowContainer.style.display = enabled ? "block" : "none";
    backgroundSnow.style.display = enabled ? "block" : "none";
}

function setLights(enabled) {
    lightsOn = enabled;
    lightsToggle.classList.toggle("active", enabled);
    house.style.filter = enabled
        ? "drop-shadow(0 0 12px #ffca7b)"
        : "brightness(0.55)";
    lamp.style.opacity = enabled ? "1" : ".2";
}

function setRotation(enabled) {
    rotateOn = enabled;
    rotateToggle.classList.toggle("active", enabled);
    globe.style.animation = enabled
        ? "float 5s ease-in-out infinite"
        : "none";
}

function setWorld(name) {
    currentWorld = name;
    const scene = scenes[name];

    document.querySelectorAll(".world").forEach((button) => {
        button.classList.toggle("active", button.dataset == name);
    });
    document.querySelector(".sky").style.background = scene.sky;
    document.querySelectorAll(".mountain").forEach((mountain) => {
        mountain.style.borderBottomColor = scene.mountain;
    });
    document.querySelector(".ground").style.background = scene.ground;
    document.getElementById("scene-caption").textContent = scene.caption;
    moon.textContent = scene.moon;

    document.querySelector(".lake").style.background =
        name === "dream"
            ? "linear-gradient(#d8b9ef, #827fc2)"
            : name === "night"
            ? "linear-gradient(#708dbd, #354d83)"
            : "linear-gradient(#80c5e7, #3b739d)";
}

snowToggle.addEventListener("click", () => setSnow(!snowOn));
lightsToggle.addEventListener("click", () => setLights(!lightsOn));
rotateToggle.addEventListener("click", () => setRotation(!rotateOn));

document.querySelectorAll(".world").forEach(button => {
    button.addEventListener("click", () => {
        setWorld(button.dataset.world);
    });
});

function shakeGlobe() {
    globe.animate(
        [
            {transform: "translateX(0) rotate(0)"},
            {transform: "tranlateX(-5px) rotate(-2deg)"},
            {transform: "translateX(5px) rotate(2deg)"},
            {transform: "translateX(-3px) rotate(-1deg)"},
            {transform: "translateX(0) rotate(0)"}
        ],
        { duration: 450, easing: "ease-in-out"}
    );
    
    if (snowOn) {
        for (let i = 0; i < 18; i++) {
            makeFlake(snowContainer, true);
    }
    }

    clearTimeout(shakeTimer);
    shakeTimer = setTimeout(() => {
        if (snowOn) fillSnow();
    }, 6000);
}

globe.addEventListener("click", shakeGlobe);
globe.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    shakeGlobe();
  }
});

// Explore button
document.getElementById("explore").addEventListener("click", () => {
  document.querySelector(".controls").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  document.getElementById("scene-caption").textContent =
    "Go on... make this little world your own. ✧";
});

// Wish button
document.getElementById("wish-button").addEventListener("click", () => {
  const message = wishes[Math.floor(Math.random() * wishes.length)];
  document.getElementById("wish-message").textContent = message;

  for (let i = 0; i < 12; i++) {
    makeFlake(backgroundSnow);
  }
});

// Toggle a dreamy alternate theme
document.getElementById("theme-button").addEventListener("click", event => {
  document.body.classList.toggle("dream-mode");
  const dreamy = document.body.classList.contains("dream-mode");

  document.body.style.background = dreamy
    ? "radial-gradient(ellipse at 50% 40%, #4b3e72, transparent 65%), #17152f"
    : "radial-gradient(ellipse at 50% 42%, #173b64 0%, transparent 52%), #07152b";

  event.currentTarget.textContent = dreamy ? "✧" : "☾";
});

// Reset all controls
document.getElementById("reset").addEventListener("click", () => {
  setSnow(true);
  setLights(true);
  setRotation(true);
  setWorld("winter");
  fillSnow();

  document.getElementById("wish-message").textContent = "";
  document.body.classList.remove("dream-mode");
  document.body.style.background =
    "radial-gradient(ellipse at 50% 42%, #173b64 0%, transparent 52%), #07152b";

  document.getElementById("theme-button").textContent = "☾";
});

fillSnow();
