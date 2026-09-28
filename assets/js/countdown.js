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

// Student login is open the whole time — this just handles the
// submit. Replace with a real fetch() call to your PythonAnywhere
// login endpoint once that URL is finalized.
els.form.addEventListener("submit", function (event) {
  event.preventDefault();
  // TODO: connect to backend API, e.g.:
  // fetch("https://yourusername.pythonanywhere.com/api/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email: els.email.value }),
  // });
  console.log("Login submitted:", els.email.value);
});
