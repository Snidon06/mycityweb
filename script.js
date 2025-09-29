// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Update navbar
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Initialize page-specific features
  if (pageId === "portal") {
    initMap();
  } else if (pageId === "dashboard") {
    initCharts();
  } else if (pageId === "contact") {
    initContactMap();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Initialize Map for Public Portal
function initMap() {
  if (typeof L !== "undefined" && !window.mapInitialized) {
    const map = L.map("map").setView([15.4909, 73.8278], 12); // Panjim, Goa coordinates

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add sample markers
    const locations = [
      {
        lat: 15.4909,
        lng: 73.8278,
        title: "City Hall",
        desc: "Administrative Center",
        icon: "🏛️",
      },
      {
        lat: 15.49,
        lng: 73.835,
        title: "Cleanup Drive",
        desc: "Community cleanup event",
        icon: "🧹",
      },
      {
        lat: 15.495,
        lng: 73.82,
        title: "Road Repair",
        desc: "Ongoing road maintenance",
        icon: "🚧",
      },
      {
        lat: 15.48,
        lng: 73.84,
        title: "Water Treatment",
        desc: "Water quality monitoring",
        icon: "💧",
      },
    ];

    locations.forEach((loc) => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.icon} ${loc.title}</b><br>${loc.desc}`);
    });

    window.mapInitialized = true;
  }
}

// Initialize Contact Map
function initContactMap() {
  if (typeof L !== "undefined" && !window.contactMapInitialized) {
    setTimeout(() => {
      const contactMap = L.map("contactMap").setView([15.4909, 73.8278], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(contactMap);

      L.marker([15.4909, 73.8278])
        .addTo(contactMap)
        .bindPopup("<b>MyCity Office</b><br>City Hall, Panjim");

      window.contactMapInitialized = true;
    }, 100);
  }
}

// Initialize Charts for Dashboard
function initCharts() {
  if (typeof Chart !== "undefined" && !window.chartsInitialized) {
    // Issue Resolution Chart
    const issueCtx = document.getElementById("issueChart");
    if (issueCtx) {
      new Chart(issueCtx, {
        type: "doughnut",
        data: {
          labels: ["Resolved", "In Progress", "Submitted"],
          datasets: [
            {
              data: [1089, 98, 60],
              backgroundColor: ["#27ae60", "#f39c12", "#e74c3c"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    // Budget Chart
    const budgetCtx = document.getElementById("budgetChart");
    if (budgetCtx) {
      new Chart(budgetCtx, {
        type: "bar",
        data: {
          labels: [
            "Infrastructure",
            "Sanitation",
            "Transport",
            "Parks",
            "Admin",
          ],
          datasets: [
            {
              label: "Budget Allocated (₹ Crores)",
              data: [50, 30, 25, 15, 20],
              backgroundColor: "#4a90e2",
              borderColor: "#2c5aa0",
              borderWidth: 1,
            },
            {
              label: "Budget Utilized (₹ Crores)",
              data: [45, 28, 22, 12, 18],
              backgroundColor: "#27ae60",
              borderColor: "#1e8449",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    window.chartsInitialized = true;
  }
}

// Issue Form Submission
document.getElementById("issueForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  // Generate ticket ID
  const ticketId =
    "MCT-" +
    new Date().getFullYear() +
    "-" +
    String(Math.floor(Math.random() * 1000)).padStart(3, "0");

  // Show success message
  alert(`Issue reported successfully! Your ticket ID is: ${ticketId}`);

  // Reset form
  this.reset();
});

// Track Issue Function
function trackIssue() {
  const ticketId = document.getElementById("trackingId").value;
  const resultDiv = document.getElementById("trackingResult");

  if (!ticketId) {
    alert("Please enter a ticket ID");
    return;
  }

  // Simulate tracking result
  const statuses = ["Submitted", "In Progress", "Resolved"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  resultDiv.innerHTML = `
                <div class="alert alert-info mt-3">
                    <strong>Ticket ID:</strong> ${ticketId}<br>
                    <strong>Status:</strong> <span class="badge bg-primary">${randomStatus}</span><br>
                    <strong>Last Updated:</strong> ${new Date().toLocaleDateString()}
                </div>
            `;
}

// Poll Selection
let selectedPollOption = null;

function selectPoll(element, option) {
  // Remove previous selection
  document.querySelectorAll(".poll-option").forEach((opt) => {
    opt.classList.remove("selected");
  });

  // Add selection to clicked option
  element.classList.add("selected");
  selectedPollOption = option;
}

function submitPoll() {
  if (!selectedPollOption) {
    alert("Please select an option before voting");
    return;
  }

  alert(`Thank you for voting! Your choice: ${selectedPollOption}`);

  // Reset poll
  document.querySelectorAll(".poll-option").forEach((opt) => {
    opt.classList.remove("selected");
  });
  selectedPollOption = null;
}

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  // Initialize home page charts if on dashboard
  if (window.location.hash === "#dashboard") {
    showPage("dashboard");
  }

  // Add animation class to feature cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".feature-card").forEach((card) => {
    observer.observe(card);
  });
});

// Handle navbar collapse on mobile
document.addEventListener("click", function (e) {
  const navbar = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (
    navbar.classList.contains("show") &&
    !navbar.contains(e.target) &&
    !navbarToggler.contains(e.target)
  ) {
    navbarToggler.click();
  }
});

// Initialize default page
document.addEventListener("DOMContentLoaded", function () {
  showPage("home");
});
