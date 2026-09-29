// This timer does NOT gate student login — students can log in
// and write letters right away. It only counts down to when
// (a) public letters become visible in the message feed, and
// (b) teachers can log in to see what was sent to them.
// Reveal moment: October 2, 2026, 4:00 PM Philippine Time (UTC+8)
const REVEAL_TIME = new Date("2026-10-02T16:00:00+08:00").getTime();

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  label: document.getElementById("countdownLabel"),
  section: document.querySelector(".countdown"),
  form: document.getElementById("loginForm"),
  email: document.getElementById("schoolEmail"),
  error: document.getElementById("loginError"),
};

let timerId;

function pad(n) {
  return String(n).padStart(2, "0");
}

function showRevealed() {
  clearInterval(timerId);

  els.days.textContent = "00";
  els.hours.textContent = "00";
  els.minutes.textContent = "00";
  els.seconds.textContent = "00";

  els.section.classList.add("countdown--open");
  els.label.textContent = "Public messages are visible and teachers can log in";
}

function tick() {
  const remaining = REVEAL_TIME - Date.now();

  if (remaining <= 0) {
    showRevealed();
    return;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);
}

tick();
timerId = setInterval(tick, 1000);

// Login is only wired up on index.html (compose.html loads this same
// file just for the timer and has no #loginForm, so skip the rest there).
if (els.form) {
  els.form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = els.email.value.trim();
    if (els.error) els.error.style.display = "none";

    // Student emails contain their school ID number, e.g. 1004576@sacs.edu.ph
    if (/\d/.test(email)) {
      sessionStorage.setItem("studentEmail", email);
      window.location.href = "compose.html";
      return;
    }

    // Otherwise check it against the faculty list from js/data.js
    // (format: [initials].[surname]@sacs.edu.ph, e.g. aj.refulle@sacs.edu.ph)
    const teacher = typeof findTeacherByEmail === "function" ? findTeacherByEmail(email) : null;
    if (teacher) {
      sessionStorage.setItem("teacherEmail", teacher.email);
      window.location.href = "teacherlandingpagelocked.html";
      return;
    }

    // No match — let them try again instead of redirecting nowhere.
    if (els.error) {
      els.error.style.display = "block";
    } else {
      alert("We couldn't match that email to a student or teacher account.");
    }
  });
}
