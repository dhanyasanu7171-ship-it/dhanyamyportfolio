
// =====================================
// FETCH JSON DATA
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load JSON data");
            }

            return response.json();

        })
        .then(data => {

            renderPortfolio(data);

            document.getElementById("loadingMessage").classList.add("d-none");

            document.getElementById("portfolioContent")
                .classList.remove("d-none");

        })
        .catch(error => {

            console.error("Error:", error);

            document.getElementById("loadingMessage")
                .classList.add("d-none");

            document.getElementById("errorMessage")
                .classList.remove("d-none");

        });

});


// =====================================
// MAIN RENDER FUNCTION
// =====================================

function renderPortfolio(data) {

    renderPersonalDetails(data.personal);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderEducation(data.education);
    renderCertifications(data.certifications);
    renderContact(data.personal);
    renderSocialLinks(data.social);
    renderFooter(data.personal);

}


// =====================================
// PERSONAL DETAILS
// =====================================

function renderPersonalDetails(personal) {

    document.getElementById("logo").innerHTML =
        `${escapeHTML(personal.name)}<span>.</span>`;

    document.getElementById("studentName").textContent =
        personal.name;

    document.getElementById("studentRole").textContent =
        personal.role;

    document.getElementById("studentIntro").textContent =
        personal.introduction;

    document.getElementById("careerGoal").textContent =
        personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("aboutImage").src =
        personal.profileImage;

    document.getElementById("profileImage").alt =
        personal.name;

    document.getElementById("aboutImage").alt =
        personal.name;

    document.getElementById("resumeButton").href =
        personal.resume;

}


// =====================================
// ABOUT SECTION
// =====================================

function renderAbout(about) {

    document.getElementById("aboutHeading").textContent =
        about.heading;

    document.getElementById("aboutDescription").textContent =
        about.description;

    const details = [

        {
            icon: "bi-envelope",
            label: "Email",
            value: about.email
        },

        {
            icon: "bi-telephone",
            label: "Phone",
            value: about.phone
        },

        {
            icon: "bi-geo-alt",
            label: "Location",
            value: about.location
        },

        {
            icon: "bi-mortarboard",
            label: "Course",
            value: about.course
        }

    ];

    const container = document.getElementById("aboutDetails");

    container.innerHTML = "";

    details.forEach(item => {

        container.innerHTML += `
            <div class="about-detail">
                <i class="bi ${item.icon}"></i>
                <strong>${escapeHTML(item.label)}:</strong>
                ${escapeHTML(item.value)}
            </div>
        `;

    });

}


// =====================================
// SKILLS SECTION
// =====================================

function renderSkills(skills) {

    const container = document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const percentage = Math.max(
            0,
            Math.min(100, Number(skill.level) || 0)
        );

        container.innerHTML += `

            <div class="col-6 col-md-4 col-lg-2">

                <div class="skill-card">

                    <div class="skill-icon">
                        <i class="bi ${escapeHTML(skill.icon)}"></i>
                    </div>

                    <h5>${escapeHTML(skill.name)}</h5>

                    <div class="progress">

                        <div class="progress-bar"
                             role="progressbar"
                             style="width: ${percentage}%"
                             aria-valuenow="${percentage}"
                             aria-valuemin="0"
                             aria-valuemax="100">
                        </div>

                    </div>

                    <small class="text-secondary mt-2 d-block">
                        ${percentage}% Proficiency
                    </small>

                </div>

            </div>

        `;

    });

}


// =====================================
// PROJECTS SECTION
// =====================================

function renderProjects(projects) {

    const container = document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const technologies = project.technologies.map(tech => {

            return `
                <span class="tech-badge">
                    ${escapeHTML(tech)}
                </span>
            `;

        }).join("");

        container.innerHTML += `

            <div class="col-md-6 col-lg-4">

                <div class="project-card">

                    <img src="${escapeHTML(project.image)}"
                         alt="${escapeHTML(project.name)}"
                         loading="lazy">

                    <div class="project-content">

                        <h4>${escapeHTML(project.name)}</h4>

                        <p>
                            ${escapeHTML(project.description)}
                        </p>

                        <div>
                            ${technologies}
                        </div>

                        <a href="${safeURL(project.link)}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="project-link">

                            View Project
                            <i class="bi bi-arrow-up-right"></i>

                        </a>

                    </div>

                </div>

            </div>

        `;

    });

}


// =====================================
// EDUCATION SECTION
// =====================================

function renderEducation(education) {

    const container = document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        container.innerHTML += `

            <div class="education-card">

                <span class="education-year">
                    ${escapeHTML(item.year)}
                </span>

                <h4>${escapeHTML(item.degree)}</h4>

                <p>
                    <i class="bi bi-building"></i>
                    ${escapeHTML(item.college)}
                </p>

                <p>${escapeHTML(item.details)}</p>

            </div>

        `;

    });

}


// =====================================
// CERTIFICATIONS SECTION
// =====================================

function renderCertifications(certifications) {

    const container = document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        container.innerHTML += `

            <div class="col-md-6 col-lg-4">

                <div class="certificate-card">

                    <i class="bi ${escapeHTML(certificate.icon)}"></i>

                    <h5>${escapeHTML(certificate.name)}</h5>

                    <p>${escapeHTML(certificate.issuer)}</p>

                    <small class="text-info">
                        ${escapeHTML(certificate.year)}
                    </small>

                    ${
                        certificate.link
                        ? `<p class="mt-3 mb-0">
                            <a href="${safeURL(certificate.link)}"
                               target="_blank"
                               rel="noopener noreferrer"
                               class="project-link">
                                View Certificate
                            </a>
                           </p>`
                        : ""
                    }

                </div>

            </div>

        `;

    });

}


// =====================================
// CONTACT DETAILS
// =====================================

function renderContact(personal) {

    const container = document.getElementById("contactDetails");

    container.innerHTML = `

        <div class="contact-item">
            <i class="bi bi-envelope"></i>
            ${escapeHTML(personal.email)}
        </div>

        <div class="contact-item">
            <i class="bi bi-telephone"></i>
            ${escapeHTML(personal.phone)}
        </div>

        <div class="contact-item">
            <i class="bi bi-geo-alt"></i>
            ${escapeHTML(personal.location)}
        </div>

    `;

}


// =====================================
// SOCIAL MEDIA LINKS
// =====================================

function renderSocialLinks(social) {

    const heroContainer = document.getElementById("heroSocial");

    const footerContainer = document.getElementById("footerSocial");

    let html = "";

    social.forEach(item => {

        html += `

            <a href="${safeURL(item.link)}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="${escapeHTML(item.name)}">

                <i class="bi ${escapeHTML(item.icon)}"></i>

            </a>

        `;

    });

    heroContainer.innerHTML = html;

    footerContainer.innerHTML = html;

}


// =====================================
// FOOTER
// =====================================

function renderFooter(personal) {

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyright").textContent =
        `© ${new Date().getFullYear()} ${personal.name}. All Rights Reserved.`;

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

document.getElementById("contactForm").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {

            showFormMessage(
                "Please fill in all fields.",
                "danger"
            );

            return;

        }

        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "danger"
            );

            return;

        }

        if (message.length < 10) {

            showFormMessage(
                "Message must contain at least 10 characters.",
                "danger"
            );

            return;

        }

        showFormMessage(
            "Your form is valid! Connect a backend or email service to actually send your message.",
            "success"
        );

        document.getElementById("contactForm").reset();

    }
);


// =====================================
// FORM MESSAGE
// =====================================

function showFormMessage(message, type) {

    const formMessage = document.getElementById("formMessage");

    formMessage.className = `alert alert-${type} mt-3`;

    formMessage.textContent = message;

}


// =====================================
// HTML ESCAPING
// =====================================

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function (char) {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        };

        return entities[char];

    });

}


// =====================================
// SAFE URL VALIDATION
// =====================================

function safeURL(value) {

    try {

        const url = new URL(value, window.location.href);

        if (
            url.protocol === "https:" ||
            url.protocol === "http:" ||
            url.protocol === "mailto:"
        ) {

            return url.href;

        }

    } catch (error) {

        console.warn("Invalid URL:", value);

    }

    return "#";

}


// =====================================
// MOBILE NAVBAR AUTO CLOSE
// =====================================

document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

    link.addEventListener("click", function () {

        const navbar = document.getElementById("navbarNav");

        if (navbar.classList.contains("show")) {

            bootstrap.Collapse.getOrCreateInstance(navbar).hide();

        }

    });

});
