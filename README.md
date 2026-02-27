KisanSetu: Smart Farming Advisor
Empowering farmers with data-driven insights, localized schemes, and land-specific guidance.

Project Overview
KisanSetu is a lightweight, web platform designed to bridge the information gap for rural farmers. By entering their Region, Land Size, and Soil Type, farmers receive personalized recommendations on:


Government Schemes: Direct links to subsidies and financial aid they are eligible for.

Crop Optimization: What to plant based on their specific land acreage.

Actionable Advice: Localized agricultural practices based on regional climate and soil data.

Setup Instructions

1. Clone the Repository
git clone <your-repository-link>
cd <project-folder>

2. Install Dependencies
Run: npm install

4. Start Backend Server
Run: node index.js

Server will start at:
http://localhost:3000

4. Run Frontend
Open: index.html
in your browser.



Key Features
 Regional Localization: Tailored content for specific States and Districts.

 Scalable Advice: Different logic for Marginal, Small, and Large-scale land holdings.

 Live Weather Integration: Real-time updates to help with daily farming decisions.

Tech Stack
This project is built using a "Clean Web" approach to ensure maximum speed and compatibility:

HTML5: Semantic structure for accessibility

CSS3: Custom Flexbox/Grid layouts 

JavaScript (Vanilla): Dynamic filtering logic and API handling

JSON: Localized database for schemes and crop data

Project Structure
Plaintext
├── index.html          # Main landing page & input form
├── assets/
│   ├── css/            # Stylesheets (mobile-responsive)
│   ├── js/             # Logic for scheme filtering & advice
│   └── img/            # Visual icons for ease of navigation
├── data/
│   └── schemes.json    # Database of regional govt schemes
└── README.md           # Project documentation

How It Works (The Logic)
The application follows a simple three-step logic flow:

Input: User selects District (e.g., Nashik) and Land Size (e.g., 1.5 Hectares).

Process: JavaScript parses schemes.json to find matches for the region and size category.

Output: The DOM updates dynamically to show "Your Recommended Schemes" and "Best Crops for Your Land."

Roadmap
[ ] Phase 1: Data collection for initial 5 states.

[ ] Phase 2: Build responsive UI components.

[ ] Phase 3: Implement JavaScript filtering engine.

[ ] Phase 4: Integrate Weather API.

[ ] Phase 5: Add PWA (Progressive Web App) support for offline use.

Contributing
As this is a social-impact project, contributions regarding localized data or translation are highly encouraged. Please feel free to fork the repo and submit a PR!

Developed with ❤️ for the farming community.
