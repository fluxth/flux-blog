const DARK_MODE_STORAGE_KEY = "dark_mode";

function setMode(mode, clear) {
  if (mode === "toggle")
    mode = document.body.classList.contains("dark") ? "light" : "dark";

  switch (mode) {
    case "dark":
      window.localStorage.setItem(DARK_MODE_STORAGE_KEY, "true");
      break;
    case "light":
      window.localStorage.setItem(DARK_MODE_STORAGE_KEY, "false");
      break;
    default:
      return;
  }

  if (window.localStorage.getItem(DARK_MODE_STORAGE_KEY) === "true")
    document.body.classList.add("dark");
  else document.body.classList.remove("dark");

  if (clear === true) window.localStorage.removeItem(DARK_MODE_STORAGE_KEY);
}

(function () {
  const saved = window.localStorage.getItem(DARK_MODE_STORAGE_KEY);
  if (saved !== null) {
    setMode(saved === "true" ? "dark" : "light");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    setMode("dark");
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      setMode(event.matches ? "dark" : "light", true);
    });

  document.querySelectorAll(".dark-mode-toggle").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      setMode("toggle");
    });
  });
})();
