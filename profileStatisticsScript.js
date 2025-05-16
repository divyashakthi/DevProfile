document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const profileForm = document.getElementById("profileForm");
  const measureBtn = document.getElementById("measureBtn");
  const profileStatus = document.getElementById("profileStatus");
  const profileHighlight = document.getElementById("profileHighlight");

  // Handle Measure Profile button click
  measureBtn.addEventListener("click", function () {
    const yearsExperience =
      parseInt(document.getElementById("yearsExperience").value) || 0;
    const websitesDeveloped =
      parseInt(document.getElementById("websitesDeveloped").value) || 0;
    const appsMade = parseInt(document.getElementById("appsMade").value) || 0;

    if (yearsExperience === 0 || isNaN(websitesDeveloped) || isNaN(appsMade)) {
      alert("Please fill in all required fields");
      return;
    }

    // Calculate profile status
    const status = calculateProfileStatus(
      yearsExperience,
      websitesDeveloped,
      appsMade
    );

    // Display status
    profileHighlight.innerHTML = status;
    profileStatus.style.display = "block";

    // Scroll to profile status
    profileStatus.scrollIntoView({ behavior: "smooth" });
  });

  // Handle form submission
  profileForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const yearsExperience =
      parseInt(document.getElementById("yearsExperience").value) || 0;
    const websitesDeveloped =
      parseInt(document.getElementById("websitesDeveloped").value) || 0;
    const appsMade = parseInt(document.getElementById("appsMade").value) || 0;
    const skills = document.getElementById("skills").value;

    if (
      !fullName ||
      !email ||
      !jobTitle ||
      yearsExperience === 0 ||
      isNaN(websitesDeveloped) ||
      isNaN(appsMade)
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Calculate profile status
    const status = calculateProfileStatus(
      yearsExperience,
      websitesDeveloped,
      appsMade
    );

    // Store data in localStorage
    const profileData = {
      fullName,
      email,
      jobTitle,
      yearsExperience,
      websitesDeveloped,
      appsMade,
      skills,
      status,
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));

    // Redirect to portfolio page
    window.location.href = "portfolio/portfolio.html";
  });

  // Function to calculate profile status
  function calculateProfileStatus(years, websites, apps) {
    // Calculate total projects
    const totalProjects = websites + apps;

    // Calculate productivity ratio (projects per year)
    const productivity = totalProjects / years;

    // Calculate experience level
    let experienceLevel = "";
    let levelClass = "";

    if (years < 2) {
      experienceLevel = "Beginner";
      levelClass = "badge-beginner";
    } else if (years < 5) {
      experienceLevel = "Intermediate";
      levelClass = "badge-intermediate";
    } else if (years < 8) {
      experienceLevel = "Advanced";
      levelClass = "badge-advanced";
    } else {
      experienceLevel = "Expert";
      levelClass = "badge-expert";
    }

    // Generate highlight text
    let highlightHTML = `
          <p>You are a <span class="badge ${levelClass}">${experienceLevel}</span> developer with ${years} years of experience.</p>
          <p>You've completed ${totalProjects} projects (${websites} websites and ${apps} apps).</p>
        `;

    // Add productivity analysis
    if (productivity >= 4) {
      highlightHTML += `<p>Your productivity is exceptional with ${productivity.toFixed(
        1
      )} projects per year!</p>`;
    } else if (productivity >= 2) {
      highlightHTML += `<p>You have good productivity with ${productivity.toFixed(
        1
      )} projects per year.</p>`;
    } else {
      highlightHTML += `<p>You focus on quality over quantity with ${productivity.toFixed(
        1
      )} projects per year.</p>`;
    }

    // Add custom recommendations
    if (websites > apps * 2) {
      highlightHTML += `<p>You specialize in web development. Consider expanding your app development skills.</p>`;
    } else if (apps > websites * 2) {
      highlightHTML += `<p>You specialize in app development. Consider exploring more web projects.</p>`;
    } else {
      highlightHTML += `<p>You have a balanced portfolio across web and app development.</p>`;
    }

    return highlightHTML;
  }
});
