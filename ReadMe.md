Nepal’s Hidden Gems 🌄
Discover Nepal’s Trekking, Hiking, Sightseeing, and Adventure Destinations
Nepal’s Hidden Gems is a dynamic web application that helps tourists, travelers, and adventure enthusiasts explore Nepal’s lesser-known and popular destinations. Users can browse trekking, hiking, sightseeing, and adventure options, view detailed information, and save their favorite spots.

🚀 Features
Explore trekking, hiking, sightseeing, and adventure destinations in Nepal
Detailed information for each destination: difficulty, duration, region, and images
Save your favorite destinations for easy access
Responsive and user-friendly interface for web and mobile
Clean and modern design for seamless experience
Future-ready for AI-based recommendations and booking integrations
🛠 Technology Stack
Frontend:
React.js (interactive and dynamic UI)
TypeScript (structured and safer code)
Tailwind CSS (responsive and modern design)
ShadCN UI (ready-to-use UI components)
Lucide Icons (visual clarity and aesthetics)
Backend:
Supabase (Backend-as-a-Service)
PostgreSQL database (structured relational data)
Authentication and secure data handling
🔄 How It Works
User opens the website; React loads the interface
The frontend requests destination data from Supabase
Database returns data in real-time
User sees destination cards with images, activity tags, difficulty, and duration
Users can save favorites; the database updates securely
UI updates dynamically without page reloads
🗄 Database Structure
Tables:
destinations
id
name
region
difficulty
duration
description
image_url
favorites
id
user_id
destination_id
users (managed by Supabase Auth)
email
user_id
🎨 UI / UX
Clean, minimal, and modern interface
Activity tags for easy navigation (trekking, hiking, sightseeing, adventure)
Mobile-friendly and responsive design
Smooth real-time interaction with database
🌟 Future Scope
AI-based destination recommendations based on user interests
Budget and fitness-based filters
Booking system for guides, hotels, and trips
Integration with Nepal Tourism Board for promoting hidden gems



📁 Project Structure
src/
 ├─ components/        # UI components
 ├─ pages/             # Home, Explore, Favorites pages
 ├─ services/          # Supabase API calls
 ├─ hooks/             # Custom React hooks
 ├─ styles/            # Tailwind CSS files
 └─ main.tsx           # App entry point


📌 How to Run Locally

Clone the repository


git clone https://github.com/Error-4O04/nepal-trek-explorer-10.git


Navigate into the project folder


cd nepal-trek-explorer-10


Install dependencies


npm install


Start development server on port 8088


npm run dev -- --port 8088


Open the website at http://localhost:8088



👥 Team

Saurav Shah
Lhakpa Dorji Sherpa
Diwakar Budhathoki
Samarthak KC



📄 License
This project is for educational and hackathon purposes.
