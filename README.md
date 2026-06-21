# GVMC Smart Ward Management Portal

> **Greater Visakhapatnam Municipal Corporation** — a modern, data-driven web portal for transparent ward-level governance, citizen engagement, and sustainability tracking across all 120 GVMC wards.

---

## 🌐 Live Demo

[https://datlaabhiram8-lab.github.io/gvmc](https://datlaabhiram8-lab.github.io/gvmc)

---

## 📖 Overview

The **GVMC Smart Ward Connect Portal** is a full-featured civic technology web application built with HTML, CSS, and vanilla JavaScript. It provides citizens, municipal officers, and administrators with a comprehensive dashboard to:

- Search and explore all **120 GVMC wards** with real demographic data
- View **ward-level sustainability scores** that dynamically update based on citizen feedback
- Submit **citizen ratings** through surveys and polls that directly influence sustainability metrics
- Track **nearby public services** (hospitals, schools, parks) for each ward
- File and browse **complaints** for municipal issues
- **Compare wards** side-by-side on population, sustainability, and infrastructure metrics
- Access **emergency contacts** and **community resources**

---

## 🗂️ Pages & Features

### 🏠 Home (`index.html`)
- Hero section with animated counters for total wards, population, and key statistics
- Smart Insights panel that identifies top-performing wards dynamically
- Quick navigation cards to all portal sections
- Interactive mini-map preview with ward markers

### 🔍 Ward Search (`ward-search.html`)
- Real-time search across all 120 GVMC wards by ward number or area name
- Filterable results grid with ward-level sustainability scores and population
- Direct navigation to individual ward dashboards

### 📊 Ward Dashboard (`ward-dashboard.html`)
Each ward has a dedicated dashboard featuring:

| Section | Description |
|---|---|
| **KPI Cards** | Live animated counters for population, women %, sustainability score |
| **Gender Distribution Chart** | Interactive Chart.js doughnut chart |
| **Citizen Feedback Poll** | Weighted slider poll with 8 sustainability categories |
| **Sustainability Score Breakdown** | Animated gauge + 8-category progress bars (dynamically tied to citizen polls) |
| **Areas in this Ward** | Chip display of all sub-localities |
| **Recent Complaints** | Latest ward-level complaints with status badges |
| **Citizen Feedback Ratings** | Star-rating grid across 8 service categories |
| **Active Projects** | Municipal project tracker with budget and progress bars |
| **Nearby Public Services** | Parks, Schools, Hospitals with Google Maps links and distances |
| **Ward Location Map** | Interactive Google Maps view with boundary overlays |

### 🌿 Sustainability Dashboard (`sustainability.html`)
- Ward selector to view any of 120 wards
- **Dynamic Sustainability Score** gauge (out of 100) that updates based on citizen surveys
- **8-Category SDG-Aligned Breakdown** with animated progress bars:
  1. 🧹 Cleanliness & Waste Management (20%)
  2. 💧 Water Availability & Quality (15%)
  3. 🚌 Public Transport Accessibility (15%)
  4. 🌳 Green Spaces & Parks (10%)
  5. 🛣️ Road & Pedestrian Infrastructure (10%)
  6. 🌬️ Air & Noise Pollution Control (10%)
  7. 🛡️ Disaster Preparedness & Safety (10%)
  8. 🗳️ Citizen Participation & Governance (10%)
- **Citizen Sustainability Survey** — slider-based rating form that persists submissions to `localStorage` and immediately updates the ward's sustainability score
- Submission history panel showing recent citizen reviews

### ⚖️ Ward Comparison (`ward-comparison.html`)
- Select any two wards side-by-side
- Compare population, women percentage, and sustainability scores
- Winner highlighting and proportional bar charts

### 🚨 Complaints (`complaints.html`)
- Complaint filing form with category, ward, and description fields
- Status tracking for submitted complaints (Pending / In Progress / Resolved)

### 🤝 Community (`community.html`)
- Community events, notices, and engagement resources
- Links to ward councillors and secretariat contacts

### 📞 Contact (`contact.html`)
- GVMC department directory
- Feedback and grievance submission form

### 🆘 Emergency (`emergency.html`)
- Emergency helpline numbers for fire, police, ambulance, and disaster management
- Quick-dial links for all critical services

---

## 🏗️ Architecture & Technology

```
gvmc/
├── index.html              # Homepage
├── ward-dashboard.html     # Per-ward dynamic dashboard
├── ward-search.html        # Ward search and browsing
├── ward-comparison.html    # Side-by-side ward comparison
├── sustainability.html     # Sustainability scores & citizen surveys
├── complaints.html         # Complaint filing & tracking
├── community.html          # Community resources
├── contact.html            # Contact directory
├── emergency.html          # Emergency helplines
├── css/
│   └── style.css           # Design system & component styles
└── js/
    ├── main.js             # Shared utilities + dynamic sustainability engine
    ├── demographics.js     # WARD_DEMOGRAPHICS data & insights engine
    ├── ward_data.js        # Ward area names (WARD_AREAS)
    ├── ward-poi-data.js    # Points of interest (hospitals, schools, parks)
    ├── ward-coordinates.js # Latitude/longitude for all 120 wards
    ├── ward-boundaries.js  # Boundary polygons for wards 73–120
    ├── ward-map.js         # Google Maps integration logic
    └── maps-config.js      # Map configuration and helpers
```

### Key Technologies
| Technology | Usage |
|---|---|
| **HTML5 + Vanilla JS** | Core structure and all application logic |
| **Vanilla CSS** | Full custom design system with dark mode, glassmorphism, gradients |
| **Chart.js** | Doughnut, bar, and gauge charts |
| **Google Maps JavaScript API / Embed** | Interactive ward location maps |
| **Font Awesome 6** | Icons throughout the interface |
| **Google Fonts (Outfit, Inter)** | Typography system |
| **localStorage** | Persistent citizen feedback and session management |

---

## 🔄 Dynamic Sustainability Score

The sustainability score is **not static** — it updates dynamically based on citizen input:

1. **Base Score**: Each ward gets a deterministic base score (60–95) seeded from its ward number.
2. **Citizen Feedback**: When users submit ratings via the Citizen Poll or Sustainability Survey, those ratings are stored in `localStorage`.
3. **Dynamic Mix**: The final displayed score is a **50/50 weighted blend** of the municipal base rating and the average of all citizen-submitted ratings.
4. **Real-time Update**: Scores update across all pages (maps, insights, comparison) automatically whenever feedback is submitted.

The 8 rating categories are **identical** across both the Citizen Feedback Poll (on the ward dashboard) and the Sustainability Survey (on the sustainability page), ensuring consistency.

---

## 📍 Ward-Specific Nearby Public Services

Each ward dashboard displays nearby hospitals, schools, and parks. For wards in the **Bheemunipatnam / Bheemili** region (Wards 1–3), the following verified services are listed:

### 🌳 Parks & Gardens
- Waves Amusement Park
- Mandi Park
- Divis Park
- Beach Park

### 🏫 Schools & Colleges
- Cambridge School
- Government High School Bheemunipatnam
- CBM School
- Saint Ann's English Medium School

### 🏥 Hospitals & Clinics
- Apollo Pharmacy Bheemunipatnam
- Varun Health Centren Bheemili
- Veterinary Hospital
- Government Hospital

---

## 🔐 Officer Login

The portal includes a secure officer login modal for GVMC staff:

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Ward Officer | `admin` | `admin123` |

Officers can access ward-specific management features after login.

---

## 🚀 Getting Started

No build tools or server required. Simply open any HTML file in a modern browser:

```bash
# Clone the repository
git clone https://github.com/datlaabhiram8-lab/gvmc.git

# Open homepage
open index.html   # macOS
start index.html  # Windows
```

To use the interactive Google Maps features, add your API key in `js/maps-config.js`:

```js
const GVMC_MAP = {
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  ...
};
```

---

## 📊 Data Coverage

| Metric | Value |
|---|---|
| Total Wards | 120 |
| Total Population | 2,576,618 |
| Wards with boundary polygons | 48 (Wards 73–120) |
| Points of Interest | 1,930+ (hospitals, schools, parks) |
| Ward area localities | 3,000+ |

---

## 🙏 Acknowledgements

- **Greater Visakhapatnam Municipal Corporation (GVMC)** for ward delimitation data
- **OpenStreetMap / Overpass API** for Points of Interest data
- **Chart.js** for beautiful, responsive charts
- **Font Awesome** for the icon library

---

*Built for the citizens of Visakhapatnam. Smart governance for a sustainable city.*