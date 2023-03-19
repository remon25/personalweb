let toggle = document.querySelector(".toggle");
let navBtn = document.querySelector(".nav-btn");
let logo = document.querySelector(".logo");
let navMenu = document.querySelector(".navmenu");
let homeBtn = document.querySelector('[href="#home"]');
let aboutBtn = document.querySelector('[href="#about"]');
let skillsBtn = document.querySelector('[href="#skills"]');
let contactBtn = document.querySelector('[href="#contact"]');
let page = document.querySelector(".menu-overlay");
let header = document.querySelector(".header");

//loading page

window.addEventListener("load", () => {
  document.querySelector(".loading svg").classList.add("move");
  document.querySelector(".loading").classList.add("loaded");
  setTimeout(() => {
    document.body.classList.remove("active");
    logo.classList.add("scaled");
  }, 3000);
});

// ------- N A V  T O G G L E R  &&  M E N U  O V E R L A Y ------//

function menuOverlay() {
  if (!page.classList.contains("cvb")) {
    page.classList.add("cvb");
    page.classList.remove("bb");
    page.style.cssText = `clip-path: ellipse(55% 50% at 50% 50%);
    width: 3000px;
    height: 3000px;`;
  } else {
    page.classList.remove("cvb");
    page.classList.add("bb");
    page.style.cssText = `clip-path: ellipse(0% 0% at 50% 50%);
    width: 3000px;
    height: 3000px;`;
  }
}

navBtn.addEventListener("click", () => {
  menuOverlay();

  navBtn.style.pointerEvents = "none";
  setTimeout(function () {
    navBtn.style.pointerEvents = "visible";
  }, 1000);
  logo.style.pointerEvents = "none";
  setTimeout(function () {
    logo.style.pointerEvents = "visible";
  }, 1000);

  if (!toggle.classList.contains("toggled")) {
    toggle.classList.add("toggled");
    header.style.backgroundColor = "rgba(16, 21, 25, 0)";
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
    setTimeout(function () {
      navMenu.style.display = "block";
      MenuItemTextReveal(1);
    }, 900);
  } else {
    MenuItemTextReveal(0);
    toggle.classList.remove("toggled");
    document.body.style.overflowY = "visible";
    document.documentElement.style.overflowY = "visible";
    setTimeout(function () {
      navMenu.style.display = "none";
    }, 700);
    setTimeout(function () {
      header.style.backgroundColor = "rgba(16, 21, 25, 0.9)";
    }, 1000);
  }
});

[logo, homeBtn, aboutBtn, contactBtn, skillsBtn].forEach((el) => {
  el.addEventListener("click", function () {
    navBtn.style.pointerEvents = "none";

    setTimeout(function () {
      navBtn.style.pointerEvents = "visible";
    }, 1000);
    logo.style.pointerEvents = "none";
    setTimeout(function () {
      logo.style.pointerEvents = "visible";
    }, 1000);

    if (toggle.classList.contains("toggled")) {
      toggle.classList.remove("toggled");

      document.body.style.overflowY = "visible";
      document.documentElement.style.overflowY = "visible";

      MenuItemTextReveal(0);

      setTimeout(function () {
        navMenu.style.display = "none";
      }, 700);
      setTimeout(function () {
        header.style.backgroundColor = "rgba(16, 21, 25, 0.9)";
      }, 1000);

      menuOverlay();
    }
  });
});

//-- MENU ITEM TEXT REVEAL --//

function MenuItemTextReveal(state) {
  state === 1 ? (cls = "show") : (cls = "hide");
  const menuItems = document.querySelectorAll(".navbar-item");
  menuItems.forEach((el) => {
    const itemText = el.textContent;
    const textArray = itemText.split("");
    el.innerHTML = "";

    textArray.forEach((letter, idx) => {
      el.innerHTML += `<span style="--char-idx:${idx}" class=${cls}>${letter}</span>`;
    });
  });
}

// about section  //

let about = document.querySelector(".about");

aboutOffset = about.offsetTop;

addEventListener("scroll", () => {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    aboutOffset + 220
  ) {
    document.querySelector(".about h1").classList.add("rot");
    about.children[0].style.setProperty("--wid", "55%");
  } else {
    document.querySelector(".about h1").classList.remove("rot");
    about.children[0].style.setProperty("--wid", "0%");
  }
});

// skills section script ------------------------------------

let skills = document.querySelector(".skills");
let skillsOffset = skills.offsetTop;

  let svgA = document.getElementById("Capa_1");
  let svgB = document.getElementById("Capa_2");
  let skillFirstPath = document.querySelector(".skills #Capa_1 path.cls-1");
  let skillsecondPath = document.querySelector(".skills #Capa_1 path.cls-2");
  let skillThirdPath = document.querySelector(".skills #Capa_2 path.cls-2");
  let skillFourthPath = document.querySelector(".skills #Capa_2 path.cls-1");



function drawOnScroll(svg,theFirst,theSecond){
  let svgTop = svg.getBoundingClientRect().top;

  let theFirstLength = theFirst.getTotalLength();

  theFirst.style.strokeDasharray = theFirstLength;

  if(svgTop + 35 > window.innerHeight / 1.15){
    theFirst.style.strokeDashoffset = theFirstLength;
    theSecond.style.opacity = 0;

  }
  else if (
    svgTop + 35 <= window.innerHeight / 1.15 &&
    window.innerHeight - (svgTop + 35) <= 300
  ) {
    theFirst.style.strokeDashoffset =
      theFirstLength -
      ((window.innerHeight - (svgTop + 35)) / 300) * theFirstLength;
      theSecond.style.opacity = 0;
  }
  else if(window.innerHeight - (svgTop +35) > 300) {
    theFirst.style.strokeDashoffset = 0;
    theSecond.style.opacity = 1;

  }

}

window.addEventListener("scroll", () => {
  drawOnScroll(svgA,skillFirstPath,skillsecondPath);
  drawOnScroll(svgB,skillThirdPath,skillFourthPath);
  skillOverlayMove();
  textTransform();
  skillBefore();
  contactBefore();
});


/// infinite marqueee.

const lerp = (current, target, factor) => current * (1 - factor) + target * factor;

class LoopingText {
  constructor(el) {
    this.el = el;
    this.lerp = {current: 0, target: 0};
    this.interpolationFactor = 0.1;
    this.speed = 0.08;
    this.direction = -1; // -1 (to-left), 1 (to-right) 
    
    // Init
    this.el.style.cssText = `position: relative; display: inline-flex; white-space: nowrap;`;
    this.el.children[1].style.cssText = `position: absolute; left: ${100 * -this.direction}%;`;
    this.events();
    this.render();
  }

  events() {
    window.addEventListener("scroll", () => this.lerp.target += this.speed * 4);
  }

  animate() {
    this.lerp.target += this.speed;
    this.lerp.current = lerp(this.lerp.current, this.lerp.target, this.interpolationFactor);
    
    if (this.lerp.target > 100) {
      this.lerp.current -= this.lerp.target;
      this.lerp.target = 0;
    }

    const x = this.lerp.current * this.direction;
    this.el.style.transform = `translateX(${x}%)`;
  }

  render() {
    this.animate();
    window.requestAnimationFrame(() => this.render());
  }
}

document.querySelectorAll(".loop-container").forEach(el => new LoopingText(el));




////////////////



function skillOverlayMove() {
  if (
    window.scrollY - skillsOffset >= 540 &&
    window.scrollY - skillsOffset <= 1740
  ) {
    document
      .querySelector(".skilloverlay")
      .style.setProperty("--p", `${(window.scrollY - skillsOffset) / 8}px`);
  }
}

function textTransform() {
  let codeText = document.querySelector("li.coding h2");
  let designText = document.querySelector("li.design h2");

  if (
    window.scrollY - skillsOffset >= -480 &&
    window.scrollY - skillsOffset <= 0
  ) {
    codeText.style.transform = `translateX(${
      Math.abs(window.scrollY - skillsOffset) / 10
    }px)`;
  } else if (
    window.scrollY - skillsOffset >= 380 &&
    window.scrollY - skillsOffset <= 680
  ) {
    designText.style.transform = `translateX(${
      -(window.scrollY - skillsOffset - 680) / 10
    }px)`;
  }
}

function skillBefore() {
  let skillHeading = document.querySelector(".skills .heading .before span");
  if (window.scrollY >= skillsOffset - 500) {
    skillHeading.style.setProperty("--w", "90%");
  } else {
    skillHeading.style.setProperty("--w", "0%");
  }
}

// ---- C O N T A C T ------//

function contactBefore() {
  let contact = document.querySelector(".contact");
  let contactHeading = document.querySelector(".contact .container .heading");
  contactOffset = contact.offsetTop;

  if (
    window.scrollY + document.documentElement.clientHeight >=
    contactOffset + 220
  ) {
    contactHeading.style.setProperty("--wid", "50%");
  } else {
    contactHeading.style.setProperty("--wid", "0%");
  }
}

/// menu sections action

document.querySelectorAll(".navbar-item").forEach(function (el) {
  el.addEventListener("click", function () {
    setTimeout(function () {
      window.scrollTo({
        top:
          document.querySelector(`${el.getAttribute("href")}`).offsetTop - 70,
      });
    }, 1000);
  });
});

/// scroll reveal
const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);

scrollReveal();


  

