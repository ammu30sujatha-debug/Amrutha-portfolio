"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // =========================================
    // 1. LOAD PORTFOLIO DATA
    // =========================================

    const data = window.PORTFOLIO_DATA || {};

    const skillsGrid = document.getElementById("skillsGrid");
    const timeline = document.getElementById("timeline");
    const projectGrid = document.getElementById("projectGrid");
    const certificateGrid = document.getElementById("certificateGrid");

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const skills = Array.isArray(data.skills) ? data.skills : [];
    const experience = Array.isArray(data.experience)
        ? data.experience
        : [];
    const projects = Array.isArray(data.projects) ? data.projects : [];
    const certificates = Array.isArray(data.certificates)
        ? data.certificates
        : [];

    const contact = data.contact || {};

    // =========================================
    // 2. SAFE TEXT AND URL HELPERS
    // =========================================

    const safeText = (value = "") =>
        String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    const safeWebUrl = value => {
        if (typeof value !== "string" || !value.trim()) {
            return "";
        }

        try {
            const url = new URL(value.trim(), window.location.href);

            if (url.protocol === "https:" || url.protocol === "http:") {
                return url.href;
            }
        } catch {
            return "";
        }

        return "";
    };
const safeImageUrl = value => {
    if (typeof value !== "string" || !value.trim()) {
        return "";
    }

    const trimmed = value.trim();
    const webUrl = safeWebUrl(trimmed);

    if (webUrl) {
        return webUrl;
    }

    // Allow local image paths with spaces in filenames.
    const validRelativePath =
        /^(?!\/)(?![a-zA-Z][a-zA-Z\d+.-]*:)[a-zA-Z0-9_./ -]+\.(png|jpe?g|webp|gif|svg)$/i;

    if (
        validRelativePath.test(trimmed) &&
        !trimmed.split("/").includes("..") &&
        !trimmed.includes("\\")
    ) {
        return trimmed
            .split("/")
            .map(part => encodeURIComponent(part))
            .join("/");
    }

    return "";
};
    const externalLink = (url, label) => {
        const safeUrl = safeWebUrl(url);

        if (!safeUrl) {
            return "";
        }

        return `
            <a
                href="${safeText(safeUrl)}"
                target="_blank"
                rel="noopener noreferrer"
            >${safeText(label)}</a>
        `;
    };

    const setContent = (element, html) => {
        if (element) {
            element.innerHTML = html;
        }
    };

    const safeArray = value => Array.isArray(value) ? value : [];

    // =========================================
    // 3. RENDER INTERACTIVE SKILLS
    // =========================================

    if (skillsGrid) {
        if (skills.length) {
            setContent(
                skillsGrid,
                skills.map((skill, index) => {
                    const tags = safeArray(skill.tags);
                    const title = skill.title || "Skill";
                    const panelId = `skill-details-${index}`;

                    return `
                        <article class="skill-card reveal">
                            <button
                                class="skill-toggle"
                                type="button"
                                aria-expanded="false"
                                aria-controls="${panelId}"
                            >
                                <span class="skill-icon" aria-hidden="true">
                                    ${safeText(skill.icon || "✦")}
                                </span>

                                <span class="skill-heading">
                                    ${safeText(title)}
                                </span>

                                <span class="skill-chevron" aria-hidden="true">
                                    +
                                </span>
                            </button>

                            <div
                                class="skill-details"
                                id="${panelId}"
                                hidden
                            >
                                <p class="skill-description">
                                    ${safeText(
                                        skill.description ||
                                        "Skill details coming soon."
                                    )}
                                </p>

                                ${
                                    tags.length
                                        ? `
                                            <div class="skill-tags">
                                                ${tags.map(tag => `
                                                    <span>${safeText(tag)}</span>
                                                `).join("")}
                                            </div>
                                        `
                                        : ""
                                }
                            </div>
                        </article>
                    `;
                }).join("")
            );

            // Only one skill card can be open at a time.
            const skillButtons = skillsGrid.querySelectorAll(".skill-toggle");

            skillButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const currentCard = button.closest(".skill-card");
                    const details = currentCard?.querySelector(".skill-details");
                    const wasOpen = button.getAttribute("aria-expanded") === "true";

                    skillButtons.forEach(otherButton => {
                        const otherCard = otherButton.closest(".skill-card");
                        const otherDetails =
                            otherCard?.querySelector(".skill-details");

                        otherButton.setAttribute("aria-expanded", "false");
                        otherCard?.classList.remove("is-open");

                        const otherChevron =
                            otherButton.querySelector(".skill-chevron");

                        if (otherChevron) {
                            otherChevron.textContent = "+";
                        }

                        if (otherDetails) {
                            otherDetails.hidden = true;
                        }
                    });

                    if (!wasOpen && details) {
                        button.setAttribute("aria-expanded", "true");
                        currentCard.classList.add("is-open");
                        details.hidden = false;

                        const chevron =
                            button.querySelector(".skill-chevron");

                        if (chevron) {
                            chevron.textContent = "−";
                        }
                    }
                });
            });
        } else {
            setContent(
                skillsGrid,
                `<div class="certificate-empty">
                    Skills will appear here when added to data.js.
                </div>`
            );
        }
    }

    // =========================================
    // 4. RENDER EDUCATION AND EXPERIENCE
    // =========================================

    if (timeline) {
        if (experience.length) {
            setContent(
                timeline,
                experience.map((item, index) => {
                    const title = item.title || "Education or Experience";
                    const panelId = `timeline-details-${index}`;
                    const image = safeImageUrl(item.image || item.photo || "");
                    const details = item.description || "Details coming soon.";

                    const imageMarkup = image
                        ? `
                            <div class="timeline-image">
                                <img
                                    src="${safeText(image)}"
                                    alt="${safeText(title)}"
                                    loading="lazy"
                                >
                            </div>
                        `
                        : `
                            <div class="timeline-image timeline-image-placeholder"
                                 aria-hidden="true">
                                <span>✦</span>
                            </div>
                        `;

                    return `
                        <article class="timeline-item reveal">
                            <div class="timeline-marker" aria-hidden="true">
                                <span>${index + 1}</span>
                            </div>

                            <div class="timeline-card">
                                <button
                                    class="timeline-toggle"
                                    type="button"
                                    aria-expanded="false"
                                    aria-controls="${panelId}"
                                >
                                    ${imageMarkup}

                                    <span class="timeline-summary">
                                        <span class="timeline-date">
                                            ${safeText(item.date || "")}
                                        </span>

                                        <span class="timeline-title">
                                            ${safeText(title)}
                                        </span>

                                        <span class="org">
                                            ${safeText(item.organization || "")}
                                        </span>
                                    </span>

                                    <span class="timeline-chevron"
                                          aria-hidden="true">+</span>
                                </button>

                                <div
                                    class="timeline-details"
                                    id="${panelId}"
                                    hidden
                                >
                                    <p>${safeText(details)}</p>
                                </div>
                            </div>
                        </article>
                    `;
                }).join("")
            );

            // Open one milestone at a time.
            const timelineButtons =
                timeline.querySelectorAll(".timeline-toggle");

            timelineButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const currentItem = button.closest(".timeline-item");
                    const details =
                        currentItem?.querySelector(".timeline-details");

                    const wasOpen =
                        button.getAttribute("aria-expanded") === "true";

                    timelineButtons.forEach(otherButton => {
                        const otherItem =
                            otherButton.closest(".timeline-item");

                        const otherDetails =
                            otherItem?.querySelector(".timeline-details");

                        otherButton.setAttribute("aria-expanded", "false");
                        otherItem?.classList.remove("is-open");

                        const chevron =
                            otherButton.querySelector(".timeline-chevron");

                        if (chevron) {
                            chevron.textContent = "+";
                        }

                        if (otherDetails) {
                            otherDetails.hidden = true;
                        }
                    });

                    if (!wasOpen && details) {
                        button.setAttribute("aria-expanded", "true");
                        currentItem.classList.add("is-open");
                        details.hidden = false;

                        const chevron =
                            button.querySelector(".timeline-chevron");

                        if (chevron) {
                            chevron.textContent = "−";
                        }
                    }
                });
            });
        } else {
            setContent(
                timeline,
                `<div class="certificate-empty">
                    Education and experience entries will appear here
                    when added to data.js.
                </div>`
            );
        }
    }

    // =========================================
    // 5. RENDER PROJECTS
    // =========================================

    if (projectGrid) {
        if (projects.length) {
            setContent(
                projectGrid,
                projects.map(project => {
                    const technologies = safeArray(project.technologies);
                    const image = safeImageUrl(project.image || "");
                    const title = project.title || "Untitled Project";

                    const art = image
                        ? `
                            <div class="project-art">
                                <img
                                    src="${safeText(image)}"
                                    alt="${safeText(title)} screenshot"
                                    loading="lazy"
                                >
                            </div>
                        `
                        : `
                            <div class="project-art">
                                <div class="project-symbol">
                                    ${safeText(project.symbol || "PRJ")}
                                </div>
                            </div>
                        `;

                    const github = externalLink(project.github, "GitHub ↗");
                    const demo = externalLink(project.demo, "Live demo ↗");
                    const links = [github, demo].filter(Boolean).join("");

                    return `
                        <article class="project-card reveal">
                            ${art}

                            <div class="project-body">
                                <div class="project-topline">
                                    <h3>${safeText(title)}</h3>

                                    <span class="project-status">
                                        ${safeText(project.status || "Project")}
                                    </span>
                                </div>

                                <p>
                                    ${safeText(
                                        project.description ||
                                        "Project description coming soon."
                                    )}
                                </p>

                                ${
                                    technologies.length
                                        ? `
                                            <div class="skill-tags">
                                                ${technologies.map(technology => `
                                                    <span>${safeText(technology)}</span>
                                                `).join("")}
                                            </div>
                                        `
                                        : ""
                                }

                                <div class="project-links">
                                    ${
                                        links ||
                                        `<span>Project details available on request</span>`
                                    }
                                </div>
                            </div>
                        </article>
                    `;
                }).join("")
            );
        } else {
            setContent(
                projectGrid,
                `<div class="certificate-empty">
                    Projects will appear here when added to data.js.
                </div>`
            );
        }
    }

    // =========================================
    // 6. RENDER CERTIFICATES
    // =========================================

    if (certificateGrid) {
        if (certificates.length) {
            setContent(
                certificateGrid,
                certificates.map(cert => {
                    const certificateImage = safeWebUrl(cert.image || "");
                    const verificationUrl = safeWebUrl(cert.verifyUrl || "");

                    const certificateLink = certificateImage
                        ? externalLink(certificateImage, "View certificate ↗")
                        : "";

                    const verificationLink = verificationUrl
                        ? externalLink(verificationUrl, "Verify credential ↗")
                        : "";

                    return `
                        <article class="certificate-card reveal">
                            <div class="certificate-icon" aria-hidden="true">
                                ✧
                            </div>

                            <h3>${safeText(cert.title || "Certificate")}</h3>

                            <p>
                                ${safeText(cert.issuer || "Issuing organization")}
                                ${
                                    cert.date
                                        ? " · " + safeText(cert.date)
                                        : ""
                                }
                            </p>

                            ${certificateLink}
                            ${verificationLink}
                        </article>
                    `;
                }).join("")
            );
        } else {
            setContent(
                certificateGrid,
                `<div class="certificate-empty">
                    Your certificates will appear here. Add each certificate
                    to the certificates list in data.js when you're ready.
                </div>`
            );
        }
    }

    // =========================================
    // 7. SOCIAL PROFILE LINKS
    // =========================================

    const githubLink = document.querySelector(
        '[data-profile-link="github"]'
    );

    const linkedinLink = document.querySelector(
        '[data-profile-link="linkedin"]'
    );

    const setProfileLink = (element, url, label) => {
        if (!element) {
            return;
        }

        const safeUrl = safeWebUrl(url);

        if (safeUrl) {
            element.href = safeUrl;
            element.target = "_blank";
            element.rel = "noopener noreferrer";
            element.removeAttribute("aria-disabled");
        } else {
            element.removeAttribute("href");
            element.setAttribute("aria-disabled", "true");
            element.title = `${label} profile URL is not configured yet.`;

            element.addEventListener("click", event => {
                event.preventDefault();
                console.warn(
                    `${label} profile URL is missing from data.js.`
                );
            });
        }
    };

    setProfileLink(githubLink, contact.github, "GitHub");
    setProfileLink(linkedinLink, contact.linkedin, "LinkedIn");

    // =========================================
    // 8. MOBILE NAVIGATION
    // =========================================

    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        };

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // =========================================
    // 9. SCROLL REVEAL ANIMATIONS
    // =========================================

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window && !reducedMotion) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => {
            item.classList.add("visible");
        });
    }

    // =========================================
    // 10. FOOTER YEAR
    // =========================================

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================================
    // 11. INITIALIZATION MESSAGE
    // =========================================

    console.info("Amrutha.R portfolio initialized successfully.");
});