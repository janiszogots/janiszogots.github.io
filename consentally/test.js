// Shows what the page can see: the consent cookie, every cookie, and the requests the browser made.
(function () {
  var out = document.getElementById("state");
  if (!out) return;
  function render() {
    var hosts = {};
    performance.getEntriesByType("resource").forEach(function (e) {
      try {
        var h = new URL(e.name).host;
        if (h !== location.host) hosts[h] = (hosts[h] || 0) + 1;
      } catch (err) {}
    });
    out.textContent =
      "Cookies: " + (document.cookie || "(none)") + "\n\n" +
      "Requests to other hosts:\n" +
      (Object.keys(hosts).sort().map(function (h) { return "  " + h + " x" + hosts[h]; }).join("\n") || "  (none)");
  }
  render();
  setInterval(render, 1000);
})();

// Any element with data-ca-open opens the preference centre, when the widget offers it.
document.addEventListener("click", function (e) {
  var t = e.target.closest && e.target.closest("[data-ca-open]");
  if (!t) return;
  if (window.ConsentAlly) window.ConsentAlly.openPreferences();
});
