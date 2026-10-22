"use strict";

/*
=========================================================
AMRUTHA.R — PERSONAL PORTFOLIO DATA
=========================================================

HOW TO UPDATE THIS WEBSITE

1. Add or edit skills in "skills".
2. Add education and internships in "experience".
3. Add projects in "projects".
4. Add certificates in "certificates".
5. Update contact details in "contact".

TIMELINE IMAGES:
Education:
assets/education/school pic.jpg
assets/education/college pic.jpg
assets/education/degree pic.jpg

Experience:
assets/experience/robotic pic.jpg
assets/experience/digital marketing pic.jpg

IMPORTANT:
- Keep this file named data.js.
- Keep property names used by script.js.
- Image paths are relative to index.html.
- Only add accurate personal information.
=========================================================
*/

window.PORTFOLIO_DATA = {

    // =========================================
    // 1. TECHNICAL AND PROFESSIONAL SKILLS
    // =========================================

    skills: [
        {
            icon: "⌘",
            title: "Programming",
            description:
                "Developing programming fundamentals, logical thinking and problem-solving skills through practical coding and project work.",
            tags: ["Python", "C", "C++"]
        },
        {
            icon: "⌗",
            title: "Web Development",
            description:
                "Creating websites and web applications while learning front-end development, responsive layouts and server-side programming.",
            tags: ["HTML", "CSS", "JavaScript", "Flask"]
        },
        {
            icon: "▤",
            title: "Data and Databases",
            description:
                "Working with structured data, spreadsheets and relational databases to organize information and support data analysis.",
            tags: [
                "SQL",
                "PostgreSQL",
                "Excel",
                "Data Analysis",
                "SQLAlchemy"
            ]
        },
        {
            icon: "◈",
            title: "Development Tools",
            description:
                "Using development environments and version-control tools to build, test, organize and maintain projects.",
            tags: [
                "Git",
                "GitHub",
                "VS Code",
                "Microsoft Word",
                "PowerPoint"
            ]
        },
        {
            icon: "✧",
            title: "Emerging Technologies",
            description:
                "Exploring emerging technology fields and developing an understanding of their practical applications.",
            tags: [
                "AI/ML Fundamentals",
                "Cybersecurity",
                "Cloud Computing",
                "Data Science"
            ]
        },
        {
            icon: "◎",
            title: "Professional Skills",
            description:
                "Developing workplace readiness through collaboration, communication, creative thinking and a willingness to learn.",
            tags: [
                "Communication",
                "Teamwork",
                "Creativity",
                "Adaptability",
                "Open-mindedness"
            ]
        }
    ],

    // =========================================
    // 2. EDUCATION AND EXPERIENCE ROADMAP
    // =========================================
    //
    // The existing script.js reads the image property.
    // Image paths below match your actual filenames.
    // The original timeline order is preserved.
    // =========================================

    experience: [
        {
            date: "Apr – May 2026",
            title: "Digital Marketing Intern",
            organization: "Fluencers Club",
            category: "Internship",
            description:
                "Supported content planning, promotional activities, social media marketing and campaign coordination. Gained exposure to digital promotion, communication and collaborative work.",
            image: "assets/experience/digital marketing pic.jpg"
        },

        {
            date: "Dec 2025 – Mar 2026",
            title: "Robotics Intern",
            organization: "Sana RoboMation",
            category: "Internship",
            description:
                "Gained practical exposure to robotics projects and learning sessions. Developed technical understanding through hands-on activities while improving teamwork, presentation and workplace communication skills.",
            image: "assets/experience/robotic pic.jpg"
        },

        {
            date: "Currently pursuing",
            title: "Bachelor of Computer Applications (BCA)",
            organization: "SJES College of Management Studies",
            category: "Education",
            description:
                "Pursuing a BCA degree while building a foundation in computer applications, programming, databases and emerging technologies. Current CGPA: 7.4, as provided.",
            image: "assets/education/degree pic.jpg"
        },

        {
            date: "2023",
            title: "Pre-University Course (PUC)",
            organization: "St. Anne's Girls PU College",
            category: "Education",
            description:
                "Completed Pre-University education under the State Board with 76%.",
            image: "assets/education/college pic.jpg"
        },

        {
            date: "2021",
            title: "Secondary School Leaving Certificate (SSLC)",
            organization: "Amar Vidhya Niketan School",
            category: "Education",
            description:
                "Completed secondary school education under the State Board with 82%.",
            image: "assets/education/school pic.jpg"
        }
    ],

    // =========================================
    // 3. PROJECTS
    // =========================================

    projects: [
        {
            title: "STAS — Stock Technical Analysis System",
            status: "Live Project",
            description:
                "A Flask-based stock analysis web application that retrieves stock market data, calculates technical indicators and presents analysis results alongside saved analysis history.",
            technologies: [
                "Python",
                "Flask",
                "PostgreSQL",
                "SQLAlchemy",
                "yfinance",
                "Pandas",
                "JavaScript"
            ],
            symbol: "STAS",
            image: "",
            github:
                "https://github.com/ammu30sujatha-debug/STAS",
            demo:
                "https://stas-6mi4.onrender.com"
        },

        {
            title: "Task Manager",
            status: "Personal Project",
            description:
                "A task-management project intended to help organize tasks and track work. Visit the repository to explore its current implementation and available features.",
            technologies: [
                "Project Development",
                "Task Organization"
            ],
            symbol: "TASK",
            image: "",
            github:
                "https://github.com/ammu30sujatha-debug/Task-Manager",
            demo: ""
        }
    ],

    // =========================================
    // 4. CERTIFICATES
    // =========================================

    certificates: [
        /*
        Add a certificate here when ready:

        {
            title: "Certificate Name",
            issuer: "Issuing Organization",
            date: "2026",
            image: "https://example.com/certificate.png",
            verifyUrl: "https://example.com/verify"
        }
        */
    ],

    // =========================================
    // 5. CONTACT AND SOCIAL PROFILES
    // =========================================

    contact: {
        email: "ammu30sujatha@gmail.com",
        location: "India",

        languages: [
            "English",
            "Hindi",
            "Telugu",
            "Tamil",
            "Kannada"
        ],

        github:
            "https://github.com/ammu30sujatha-debug",

        linkedin:
            "https://www.linkedin.com/in/amrutha-r-3596103b9/"
    }
};

// =========================================
// 6. OPTIONAL THEME METADATA
// =========================================

window.PORTFOLIO_THEME = {
    name: "Rose Vale",

    colors: {
        roseVale: "#C08081",
        cornsilk: "#FFF8DC",
        tealGreen: "#2A9D8F",
        mistBlack: "#1E2022",
        desertSun: "#E3A24A"
    }
};

console.info("Amrutha.R portfolio data loaded successfully.");