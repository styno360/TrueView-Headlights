/* =========================================
   MOBILE NAVIGATION TOGGLE
========================================= */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("open");
  });
}


/* =========================================
   BEFORE / AFTER IMAGE TOGGLE
========================================= */
const toggleBtn = document.getElementById("toggleBtn");
const beforeImg = document.querySelector(".before-img");
const afterImg = document.querySelector(".after-img");

if (toggleBtn && beforeImg && afterImg) {
  toggleBtn.addEventListener("click", () => {
    const showingBefore = beforeImg.classList.contains("active");

    if (showingBefore) {
      beforeImg.classList.remove("active");
      afterImg.classList.add("active");
      toggleBtn.textContent = "Show Before";
    } else {
      afterImg.classList.remove("active");
      beforeImg.classList.add("active");
      toggleBtn.textContent = "Show After";
    }
  });
}

document.querySelectorAll(".toggle-container").forEach(container => {
  const btn = container.querySelector(".toggle-btn");
  const beforeImg = container.querySelector(".before-img");
  const afterImg = container.querySelector(".after-img");

  if (btn && beforeImg && afterImg) {
    btn.addEventListener("click", () => {
      const showingBefore = beforeImg.classList.contains("active");

      if (showingBefore) {
        beforeImg.classList.remove("active");
        afterImg.classList.add("active");
        btn.textContent = "Show Before";
      } else {
        afterImg.classList.remove("active");
        beforeImg.classList.add("active");
        btn.textContent = "Show After";
      }
    });
  }
});


/* =========================================
   WHY CHOOSE US — INDEPENDENT TOGGLES
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const whyItems = document.querySelectorAll(".why-item");

  whyItems.forEach(item => {
    const btn = item.querySelector(".dropdown-btn");

    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      btn.textContent = isOpen ? "Hide Details" : "See Details";
    });
  });
});



/* =========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});


/* =========================================
   SCROLL FADE-IN ANIMATION
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
});


/* =========================================
   CONTACT FORM VALIDATION
========================================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const vehicle = document.getElementById("vehicle");
    const message = document.getElementById("message");

    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach(el => el.remove());

    function showError(input, text) {
      const error = document.createElement("div");
      error.classList.add("error-message");
      error.style.color = "red";
      error.style.fontSize = "0.85rem";
      error.style.marginTop = "5px";
      error.innerText = text;
      input.parentElement.appendChild(error);
    }

    // Validation
    if (name.value.trim() === "") { showError(name, "Please enter your name."); isValid = false; }
    if (email.value.trim() === "") { showError(email, "Please enter your email."); isValid = false; }
    if (phone.value.trim() === "") { showError(phone, "Please enter your phone number."); isValid = false; }
    if (vehicle.value.trim() === "") { showError(vehicle, "Please enter your vehicle."); isValid = false; }
    if (message.value.trim() === "") { showError(message, "Please enter a message."); isValid = false; }

    if (!isValid) return;

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value,
        vehicle: vehicle.value,
        message: message.value
      })
    });

    if (response.ok) {
      alert("Thank you for contacting TrueView Headlight Restoration. We will get back to you shortly.");
      e.target.reset();
    } else {
      alert("There was an issue sending your message. Please try again.");
    }
  });
}


/* =========================================
   PRICE COUNT UP ON SCROLL
========================================= */
const priceCounter = document.getElementById("priceCounter");

if (priceCounter) {
  let counterStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || counterStarted) return;

      counterStarted = true;

      let current = 0;
      const target = 90;
      const duration = 1500;
      const stepTime = Math.floor(duration / target);

      const counterInterval = setInterval(() => {
        current++;
        priceCounter.textContent = current;

        if (current >= target) {
          clearInterval(counterInterval);
        }
      }, stepTime);
    });
  }, { threshold: 0.5 });

  counterObserver.observe(priceCounter);
}


/* =========================================
   SOLD CARD FADE-IN
========================================= */
document.querySelectorAll('.sold-card').forEach(card => {
  card.classList.add('fade-in');
});


/* =========================================
   CONTACT FORM SCROLL
========================================= */
document.querySelectorAll('a[href^="#contactForm"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#contactForm").scrollIntoView({
      behavior: "smooth"
    });
  });
});


/* =========================================
   READ MORE BUTTONS (INVENTORY CARDS)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".read-more-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".inventory-card");
      const details = card.querySelector(".card-details");

      const isOpen = details.style.display === "block";

      if (isOpen) {
        details.style.display = "none";
        btn.textContent = "Read More";
      } else {
        details.style.display = "block";
        btn.textContent = "Read Less";
      }
    });
  });
});

/* =========================================
                    FAQ
========================================= */
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.parentElement;
    const icon = button.querySelector(".faq-icon");

    // Toggle open class
    card.classList.toggle("open");

    // Switch icon
    icon.textContent = card.classList.contains("open") ? "−" : "+";
  });
});

