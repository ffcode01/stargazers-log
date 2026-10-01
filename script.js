const list = document.querySelector("#starred");
const status = document.querySelector("#status");

if (!list || !status) {
  console.error("Required starred repositories elements are missing from the page.");
  throw new Error("Missing starred repositories UI elements.");
}

status.textContent = "Loading starred repositories...";

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events.json (${response.status})`);
    }

    return response.json();
  })
  .then((events) => {
    list.innerHTML = "";

    if (!Array.isArray(events) || events.length === 0) {
      status.textContent = "No starred repositories found.";
      return;
    }

    let renderedCount = 0;

    events.forEach((event) => {
      if (!event || typeof event.name !== "string" || typeof event.starred !== "string") {
        return;
      }

      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
      renderedCount += 1;
    });

    status.textContent =
      renderedCount > 0
        ? `Loaded ${renderedCount} starred repositories.`
        : "No valid starred repositories were found.";
  })
  .catch((error) => {
    console.error("Could not load starred repositories:", error);
    list.innerHTML = "";
    status.textContent = "Unable to load starred repositories right now.";
  });
