# Amrutha R — Personal Portfolio

A simple split-screen resume portfolio built with HTML, CSS and JavaScript. No backend, login, admin panel or database.

## Run locally
1. Extract the project folder.
2. Open `index.html` in a browser, or open the folder in VS Code and use the Live Server extension.
3. The project uses Google Fonts when an internet connection is available; the page still works without them.

## Add a project
Open `data.js`, find the `projects` array and add an object like this:

```js
{
  title: "My New Project",
  status: "Completed",
  description: "A short explanation of the project and the problem it solves.",
  technologies: ["Python", "HTML", "CSS"],
  symbol: "WEB",
  image: "assets/projects/my-project.png",
  github: "https://github.com/YOUR-USERNAME/YOUR-REPOSITORY",
  demo: ""
}
```

Copy your screenshot into `assets/projects/` and use its relative path for `image`. Use an empty string for any link you don't have yet.

## Add a certificate
1. Copy the certificate file into `assets/certificates/`.
2. Add an item to the `certificates` array in `data.js`:

```js
{
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "2026",
  image: "assets/certificates/certificate.pdf",
  verifyUrl: ""
}
```

For a PDF, the View certificate link opens the PDF in the browser. Add a verification URL only if the issuer provided one.

## Personalize before publishing
- Replace `assets/profile.svg` with your own professional photo (keep the name `profile.jpg` and update the image path in `index.html`).
- Replace the generic GitHub and LinkedIn links in `index.html` and `data.js` with your real profile URLs.
- Check your email and decide which contact details you want public.
- Replace the resume PDF in `assets/resume.pdf` with your latest version.
- Confirm every project status and description is accurate.
- Only publish certificates and contact details you're comfortable making public.

## Publish with GitHub Pages
This is a static site, so it can be hosted free on GitHub Pages. Create a repository, upload the contents of this folder to the repository root, then enable Pages in the repository's Settings. Your public site will be available at the URL GitHub provides after deployment finishes.


## Update your name and social links
The brand now displays **Amrutha.R**. Open `data.js` and replace the empty `github` and `linkedin` values under `contact` with your exact profile URLs. The social icons will then open your real profiles.

The STAS project is marked **Completed** as requested. Review the description before publishing to ensure it accurately describes your final project.
