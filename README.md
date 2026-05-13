
---

# 🍸 Molecular Mixology: The Digital Speakeasy

An elite, high-end web application that bridges the gap between classic mixology, organic chemistry, and artificial intelligence. Built as a secure, full-stack platform, this application allows users to catalog unique chemical reagents, botanicals, and spirits to dynamically synthesize precise molecular cocktail protocols using advanced AI models.

---

## 🔬 Core System Architecture

The application is built following rigorous **Separation of Concerns (SoC)**, moving all viewport execution to decoupled front-end engines, database modeling to strict schemas, and routing to isolated Express endpoints.

### The Stack

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js (MVC Pattern Architecture)
* **Database Management:** MongoDB via Mongoose ODM
* **Template Engine:** Embedded JavaScript (EJS)
* **Artificial Intelligence Engine:** Google GenAI SDK (`gemini-2.5-flash` Stable Release)
* **Style Framework:** Vanilla CSS3 Custom Design System (*Deep Navy, Speakeasy Gold, and Ice Blue Glass*)

---

## ⚡ Key Engineering Features

### 1. The Alchemist's Deck (`/dashboard`)

* **Personalized Entry Gateway:** Dynamically hooks into the session storage state on load, resolving the authenticated account's identifier against the MongoDB collection to greet the active user by their custom alias.
* **Onboarding Subsystems:** Features an integrated responsive viewport matrix that instantly introduces unfamiliar users to the underlying core chemistry rules (Specific Gravity profiles, polymer gelation cross-linking, and pH modulation vectors) directly in the UI.

### 2. The Laboratory & Vault Engine (`/modules/pantry`)

* **Collapsible Vault Drawers:** Condenses a massive list of reagents into clean, native, click-to-open accordion compartments categorized by chemical utility (Acids, Amari, Sugars, Botanicals) to eradicate scrolling fatigue.
* **Live Reagent Filtering:** A high-performance JavaScript text-matching filter running asynchronously. Typing instantly maps, isolates, and opens relevant category drawers while hiding zero-match categories in real time.
* **Sticky Command Deck:** A floating navigation control plane designed via CSS boundary-stickiness that stays anchored to the viewport as the alchemist scrolls deeply into the vault.

### 3. The Alchemical Discovery Engine (`/api/generate-formulation`)

* **Atmospheric Guardrails Mapping:** Enforces an elite lounge narrative context, strictly blacklisting clinical/medical jargon (e.g., *beakers, pipettes, test tubes*) in favor of luxury molecular barware terms (*mixing vessels, precision droppers*). Maps standard beverage configurations (`oz`, `dashes`) against micro-precision chemical additives (`grams`, `ml`).
* **Dynamic Title Extraction:** Utilizes an integrated RegEx text parsing mechanism to safely scan raw AI markdown streams, capture string variables following the `Protocol Name:` index, and map them explicitly into individual database keys.
* **Fail-Safe Interceptors:** Custom endpoint try/catch error mapping that translates raw MongoDB drops, network timeout failures, or Gemini quota limits into elegant, context-aware in-app alert frames rather than breaking system layouts.

### 4. The Archives (`/modules/journal`)

* **Dossier Print Isolation Engine:** Leverages localized JavaScript tracking triggers coupled with targeted `@media print` CSS overrides. Clicking "Export Dossier" locks onto a single historical record, flattens the UI layout into a high-contrast monochrome layout, and bridges directly to native browser print hardware or localized PDF export engines.

### 5. The System Specifications (`/modules/guide`)

* **In-App Technical Specifications:** A dedicated, fully authenticated domain manual integrated directly into the core layout template ecosystem. It translates the application's abstract code structures into foundational physical chemistry documentation.

### 6. Credential Gateway (`/signin`, `/signup`)

* A customized frosted-glass security gate matching the root layout palette, securing full user session initialization and rendering backend validation exceptions gracefully within the UI viewport rather than throwing flat-text browser drops.

---

## 📁 Repository Layout

```text
molecular-mixology/
├── middleware/
│   └── auth.js                  # Session validation & security route guards
├── models/
│   ├── Formulation.js           # Schema for saved AI protocols and titles
│   ├── Reagent.js               # Alpha-sorted chemical/spirit properties
│   └── User.js                  # Encrypted credential tracking
├── public/
│   ├── css/
│   │   ├── auth.css             # Frosted glass gateway layout styles
│   │   ├── journal.css          # Archive sheets & printer override logic
│   │   ├── layout.css           # Neutral navigation bridge frames & guide rules
│   │   ├── pantry.css           # Deep navy/gold animations & sticky console
│   │   ├── ph-shift.css         # Acid-adjustment layout customizations
│   │   ├── spherification.css   # Encapsulation module visuals
│   │   ├── stratification.css   # Density & layering interface rules
│   │   └── terminal.css         # Main theme root configuration variables
│   └── js/
│       ├── density-engine.js    # Script logic for layering modules
│       ├── journal-engine.js    # Context print isolators for the archives
│       ├── pantry-engine.js     # Search filters & async payload processing
│       ├── ph-engine.js         # Interactive triggers for acid adjustment
│       └── sphere-engine.js     # Controls for encapsulation mechanics
├── routes/
│   ├── acid.js                  # Router managing acid-adjustment states
│   ├── api.js                   # Unified AI extraction gateway endpoints
│   ├── auth.js                  # Sign-in / Sign-up request controllers
│   ├── density.js               # Stratification view routing
│   ├── journal.js               # Archive fetching & rendering pipeline
│   ├── pantry.js                # Reagent vault collection inventory management
│   ├── ph-shift.js              # Advanced pH balance interface routing
│   └── spherification.js        # Gelation / Encapsulation step endpoints
├── views/
│   ├── partials/
│   │   └── header.ejs           # Persistent semantic navigation bridge
│   ├── acid-form.ejs            # Acid calculation staging deck
│   ├── acid-result.ejs          # Chemical alteration report outputs
│   ├── dashboard.ejs            # Deep midnight hub viewport (displays custom user alias)
│   ├── density.ejs              # Visual stratification workspace
│   ├── error.ejs                # Themed emergency lockdown handler
│   ├── guide.ejs                # Standalone domain manual & system specs view
│   ├── journal.ejs              # Historical recipe archive grimoire
│   ├── pantry.ejs               # Main reagent inventory console
│   ├── ph-shift.ejs             # pH workspace interface deck
│   ├── signin.ejs               # Authentication gate
│   ├── signup.ejs               # Registration gate
│   └── spherification.ejs       # Molecular droplet encapsulation panel
├── .env                         # Secure environment key injection
├── .gitignore                   # Excludes node_modules and local variables
├── package.json                 # Core framework dependency manifests
├── package-lock.json            # Strict dependency locks
├── README.md                    # System blueprint and technical overview
├── seed.js                      # Pre-fills database with baseline reagents
└── server.js                    # Core lifecycle orchestrator & unified /dashboard handler

```

---

## ⚙️ Local Development Setup

### 1. Clone the Vault

```bash
git clone https://github.com/your-username/molecular-mixology.git
cd molecular-mixology

```

### 2. Supply Reagents (Install Dependencies)

```bash
npm install

```

### 3. Establish Environmental Credentials

Create a `.env` file in the root directory and securely map your ports, database strings, and API credentials:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/molecular_mixology
SESSION_SECRET=your_secret_speakeasy_passphrase
GEMINI_API_KEY=your_google_gemini_api_key

```

### 4. Seed the Database

Populate your MongoDB database with your core mixology categories and ingredients before firing up the engines:

```bash
node seed.js

```

### 5. Initiate Server

```bash
npm start

```

Open your browser and enter `http://localhost:3000` to breach the entrance gateway.