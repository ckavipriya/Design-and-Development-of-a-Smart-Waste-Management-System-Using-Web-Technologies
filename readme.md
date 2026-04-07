
## 📌 Features

- **Real‑time bin monitoring:**  
  Shows fill‑level (percentage) of each waste bin on a map/dashboard.

- **Status alerts:**  
  Admins receive notifications when a bin reaches a critical fill threshold (e.g., 80%).

- **Route viewing / optimization (basic):**  
  Displays a suggested route for the collection truck based on bin fill‑levels.

- **User roles:**  
  - Admin (manage bins, users, view all data)  
  - Municipal worker (view assigned bins and routes)

- **REST APIs:**  
  - `POST /api/bins` – register a new smart bin  
  - `PUT /api/bins/:id/status` – update bin fill‑level  
  - `GET /api/bins` – fetch all bins and their status  

## ⚙️ Hardware Subsystem (High Level)

1. **Sensor Unit:**  
   - Ultrasonic sensor attached to the bin to measure distance to the waste surface.  
   - ESP/NodeMCU reads the sensor and converts it into a fill‑level percentage.

2. **Communication:**  
   - Wi‑Fi sends data to the backend server via HTTP requests.

3. **Power:**  
   - 5V DC supply (USB or battery) powers the ESP and sensor.

*(You can paste your circuit diagram or block diagram image here if available.)*

## 🖥️ Web Application Screenshots (Placeholders)

- Dashboard: Bin map with status circles (green/yellow/red).  
- Bin details page: Bin ID, location, last updated time, fill‑level graph.  
- Admin panel: Add/edit bins, view alerts, assign routes.

(Replace `screenshot1.png` and `screenshot2.png` with your actual images.)

- ![Dashboard View](screenshots/screenshot1.png)  
- ![Bin Details](screenshots/screenshot2.png)

## 🚀 How to Run the Project

### 1. Prerequisites

- Node.js + npm installed  
- MySQL / MongoDB installed and running  
- Arduino IDE (for uploading sensor code)  

### 2. Backend Setup

```bash
cd server
npm install
# Configure your .env file (DB_URL, PORT, etc.)
npm run dev
