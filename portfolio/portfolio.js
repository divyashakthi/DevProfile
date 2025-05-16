document.addEventListener("DOMContentLoaded", function () {
  const portfolioContent = document.getElementById("portfolioContent");

  // Try to get profile data from localStorage
  const profileDataJson = localStorage.getItem("profileData");

  if (!profileDataJson) {
    // No profile data found
    portfolioContent.innerHTML = `
          <div class="card not-found">
            <h2>No Profile Data Found</h2>
            <p>It seems you haven't created your profile yet or your data was not saved.</p>
            <a href="index.html" class="btn btn-back">Create Your Profile</a>
          </div>
        `;
    return;
  }

  // Parse profile data
  const profileData = JSON.parse(profileDataJson);

  // Get initials for avatar
  const initials = getInitials(profileData.fullName);

  // Process skills
  const skillsArray = profileData.skills
    ? profileData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)
    : [];

  // Create portfolio HTML
  const portfolioHTML = `
        <div class="card">
          <div class="profile-header">
            <div class="profile-avatar">
              ${initials}
            </div>
            <div class="profile-info">
              <h2 class="profile-name">${profileData.fullName}</h2>
              <div class="profile-title">${profileData.jobTitle}</div>
              <div class="profile-email">${profileData.email}</div>
            </div>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${profileData.yearsExperience}</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${profileData.websitesDeveloped}</div>
              <div class="stat-label">Websites Developed</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${profileData.appsMade}</div>
              <div class="stat-label">Apps Created</div>
            </div>
          </div>
          
          ${
            skillsArray.length > 0
              ? `
            <div class="section-title">Skills</div>
            <div class="skills-container">
              ${skillsArray
                .map((skill) => `<div class="skill-tag">${skill}</div>`)
                .join("")}
            </div>
          `
              : ""
          }
          
          <div class="section-title">Profile Highlights</div>
          <div class="profile-highlight">
            ${profileData.status}
          </div>
        </div>
      `;

  // Set portfolio content
  portfolioContent.innerHTML = portfolioHTML;
});

// Function to get initials from full name
function getInitials(fullName) {
  if (!fullName) return "?";

  return fullName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
