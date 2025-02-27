const fetchHistoricalEvents = async (month, day) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        displayEvents(data.events);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const displayEvents = (events) => {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (events.length === 0) {
        resultsContainer.innerHTML = "<p>No historical events found for this date.</p>";
        return;
    }
    
    events.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event-item");
        eventElement.innerHTML = `
            <h3>${event.year}</h3>
            <p>${event.text}</p>
            <a href="https://en.wikipedia.org/wiki/${event.pages[0].titles.normalized}" target="_blank">Read more</a>
        `;
        resultsContainer.appendChild(eventElement);
    });
};

const handleSearch = () => {
    const dateInput = document.getElementById("dateInput").value;
    if (!dateInput) return;
    
    // Extract month and day only
    const [, month, day] = dateInput.split("-"); // Ignore the year

    fetchHistoricalEvents(month, day);
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton").addEventListener("click", handleSearch);
});
