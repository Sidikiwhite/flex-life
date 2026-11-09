/* =====================================================================
   AÏCHA & IBRAHIM — TEMPLATE MARIAGE « ÉLÉGANCE »
   Interactions : compte à rebours, navigation, révélations, RSVP.
   ===================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------------
     Compte à rebours
     ------------------------------------------------------------------- */
  var weddingDate = new Date(2027, 5, 12, 15, 30, 0).getTime();
  var countdown = document.querySelector(".countdown");
  var countdownUnits = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    var distance = weddingDate - Date.now();

    if (distance <= 0) {
      Object.keys(countdownUnits).forEach(function (key) {
        if (countdownUnits[key]) countdownUnits[key].textContent = "00";
      });
      if (countdown) {
        countdown.setAttribute("aria-label", "Le grand jour est arrivé");
      }
      return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((distance / (1000 * 60)) % 60);
    var seconds = Math.floor((distance / 1000) % 60);

    if (countdownUnits.days) countdownUnits.days.textContent = pad(days);
    if (countdownUnits.hours) countdownUnits.hours.textContent = pad(hours);
    if (countdownUnits.minutes) countdownUnits.minutes.textContent = pad(minutes);
    if (countdownUnits.seconds) countdownUnits.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  /* -------------------------------------------------------------------
     En-tête au défilement
     ------------------------------------------------------------------- */
  var header = document.getElementById("header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* -------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fermer le menu");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      if (mainNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!mainNav.classList.contains("is-open")) return;
      if (mainNav.contains(event.target) || menuToggle.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* -------------------------------------------------------------------
     Révélations au défilement
     ------------------------------------------------------------------- */
  var revealElements = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* -------------------------------------------------------------------
     Formulaire RSVP de démonstration
     ------------------------------------------------------------------- */
  var rsvpForm = document.getElementById("rsvp-form");
  var formSuccess = document.getElementById("form-success");
  var guestsField = document.getElementById("guests-field");
  var guestsInput = document.getElementById("guests");

  function syncGuests() {
    if (!rsvpForm || !guestsField || !guestsInput) return;

    var attendance = rsvpForm.querySelector(
      'input[name="attendance"]:checked'
    );
    var accompanied = attendance && attendance.value === "oui";

    guestsField.hidden = !accompanied;
    guestsInput.disabled = !accompanied;
    guestsInput.required = Boolean(accompanied);

    if (accompanied && !guestsInput.value) {
      guestsInput.value = "2";
    }
  }

  if (rsvpForm) {
    rsvpForm
      .querySelectorAll('input[name="attendance"]')
      .forEach(function (input) {
        input.addEventListener("change", syncGuests);
      });
    syncGuests();
  }

  if (rsvpForm && formSuccess) {
    rsvpForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!rsvpForm.checkValidity()) {
        rsvpForm.reportValidity();
        return;
      }

      var nameField = document.getElementById("name");
      var firstName = nameField ? nameField.value.trim().split(" ")[0] : "";
      var attendance = rsvpForm.querySelector(
        'input[name="attendance"]:checked'
      );

      var guestCount = guestsInput ? Number(guestsInput.value) : 1;

      if (attendance && attendance.value === "non") {
        formSuccess.textContent =
          "Merci " +
          firstName +
          ". Nous sommes tristes de ne pas vous compter parmi nous, mais nous vous embrassons fort.";
      } else if (guestCount > 1) {
        formSuccess.textContent =
          "Merci " +
          firstName +
          " ! Votre réponse pour " +
          guestCount +
          " personnes a bien été enregistrée. Votre mot nous touche, nous avons hâte de vous retrouver.";
      } else {
        formSuccess.textContent =
          "Merci " +
          firstName +
          " ! Votre réponse a bien été enregistrée. Votre mot nous touche, nous avons hâte de vous retrouver.";
      }

      formSuccess.hidden = false;
      rsvpForm.reset();
      syncGuests();
      formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });

      window.setTimeout(function () {
        formSuccess.hidden = true;
      }, 8000);
    });
  }
})();
