# Avant Garage MTL — Website

A premium automotive consulting & concierge website built with React + Tailwind CSS.

---

## 📁 Project Structure

```
avant-garage/
├── public/
│   ├── index.html
│   ├── logo.png          ← ⚠️ Add your logo here
│   └── porsche.jpg       ← ⚠️ Add your Porsche image here
│
├── src/
│   ├── components/
│   │   ├── Navbar.js       Fixed navigation bar
│   │   ├── Hero.js         Full-screen hero with CTA
│   │   ├── Services.js     4-service concierge grid
│   │   ├── About.js        About me section
│   │   ├── Contact.js      Contact form + info
│   │   └── Footer.js       Footer
│   │
│   ├── data/
│   │   ├── site.json       Brand info (name, phone, email, socials)
│   │   ├── hero.json       Hero headline & CTA text
│   │   ├── services.json   All 4 service cards
│   │   ├── about.json      About me paragraphs & stats
│   │   └── contact.json    Form fields & social links
│   │
│   ├── images/             (optional — for imported assets)
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## 🖼️ Images

Place these two files directly in the `/public` folder:

| File          | Description                         |
| ------------- | ----------------------------------- |
| `logo.png`    | The circular Avant Garage MTL logo  |
| `porsche.jpg` | The Porsche photo your client wants |

The site will gracefully handle missing images (fallback backgrounds).

---

## ✏️ Editing Content

All content lives in `src/data/`. Just edit the JSON files — no touching component code needed:

- **Phone/Email/Social** → `src/data/site.json`
- **Hero headlines & CTA** → `src/data/hero.json`
- **Service cards** → `src/data/services.json`
- **About me text & stats** → `src/data/about.json`
- **Contact form fields** → `src/data/contact.json`

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

---

## 🎨 Design System

- **Primary font:** Bebas Neue (display/headings)
- **Body font:** DM Sans
- **Accent color:** Amber (#FBBF24)
- **Background:** Pure black / zinc-950
- **Style:** Luxury automotive — dark, bold, editorial

---

## 📬 Contact Form

The form currently simulates a submission (1.5s delay → success state).

To wire it to a real backend, replace the `setTimeout` in `Contact.js` with a `fetch` call to your API endpoint or a service like **Formspree**, **EmailJS**, or a custom serverless function.

Example with Formspree:

```js
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(formData)
});
```
