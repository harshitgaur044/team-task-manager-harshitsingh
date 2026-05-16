# 🚀 Team Task Manager

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A premium SaaS-grade project management platform designed for high-performance teams to coordinate, track, and scale their workflows with precision.**

---

## 🚀 Live Demo

Experience the platform in action:

*   **Frontend Application:** [https://team-task-manager-prod.railway.app/](https://team-task-manager-prod.railway.app/)
*   **Backend API:** [https://api.team-task-manager.railway.app/](https://api.team-task-manager.railway.app/)
*   **GitHub Repository:** [https://github.com/yourusername/team-task-manager](https://github.com/yourusername/team-task-manager)

---

## 📖 About The Project

**Team Task Manager** is a sophisticated project management solution built to bridge the gap between chaotic spreadsheets and overpriced, bloated legacy software. It offers a streamlined, glassmorphism-inspired interface that prioritizes focus and productivity.

### Why this project?
In modern remote-first environments, teams often struggle with fragmented communication and invisible bottlenecks. This platform was engineered to provide real-time visibility into every project's pulse.

### Key Objectives
*   **Centralization:** One source of truth for all tasks and team availability.
*   **Clarity:** Real-time progress tracking with automated status updates.
*   **Strategy:** Data-driven insights via an integrated analytics engine.

---

## ✨ Features

### 🔐 Authentication & Security
*   **Role-Based Access Control (RBAC):** Distinct permissions for Admins and Members.
*   **JWT Authentication:** Secure stateless session management.
*   **Protected Routes:** Client-side and Server-side route guarding.
*   **Multi-factor Readiness:** Architectural provision for future MFA integration.

### 🏗️ Project Management
*   **Organization-wide Projects:** Centralized project hub with status tracking.
*   **Member Attribution:** Assign multi-disciplinary teams to specific workstreams.
*   **Dynamic Progress Bars:** Automated completion percentage calculation based on task status.

### 📝 Task Management
*   **Kanban Workflow:** Drag-and-drop task movement (Implementation ready).
*   **Priority Matrix:** High/Medium/Low urgency tagging with visual indicators.
*   **Deadline Enforcement:** Automated countdowns and overdue notifications.
*   **Detailed Action Items:** Nested task metadata including descriptions and assignees.

### 📊 Analytics & Insights
*   **Delivery Performance:** Area charts comparing planned vs. actual output.
*   **Resource Allocation:** Pie chart distribution of efforts across departments.
*   **Task Velocity:** Bar charts tracking throughput by functional teams.
*   **AI Insights:** Context-aware recommendations for workflow optimization.

### 🎨 UI/UX Excellence
*   **Glassmorphism Design:** Modern translucent layers and blurred backdrops.
*   **Dark Mode Support:** Full automatic or manual theme switching.
*   **Micro-interactions:** Framer Motion powered transitions and hover effects.
*   **Responsive Layouts:** Seamless transitions between mobile, tablet, and ultra-wide screens.

---

## 🖼️ Screenshots

| Dashboard Overview | Project Kanban |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/600x400?text=Dashboard+UI) | ![Kanban Placeholder](https://via.placeholder.com/600x400?text=Kanban+Board+UI) |

| Team Analytics | Mobile Experience |
| :---: | :---: |
| ![Analytics Placeholder](https://via.placeholder.com/600x400?text=Analytics+Charts) | ![Mobile Placeholder](https://via.placeholder.com/200x400?text=Mobile+UI) |

---

## 🏗️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express.js (Proposed), MongoDB (Proposed) |
| **Auth** | JWT (JSON Web Tokens), Zod Validation |
| **State Management** | Context API / React Hooks |
| **Deployment** | Railway, GitHub Actions |
| **Tools** | Postman, VS Code, ESLint, TypeScript |

---

## 📂 Folder Structure

```text
TeamTaskManager/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components (shadcn style)
│   │   ├── context/        # Auth & Theme Context providers
│   │   ├── data/           # Mock data and constants
│   │   ├── hooks/          # Custom react hooks
│   │   ├── lib/            # Utility functions (cn, etc.)
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API integration services
│   │   └── types.ts        # Global TypeScript interfaces
│   ├── public/             # Static assets
│   └── index.html
├── server/                 # Backend (Node + Express)
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API entry points
│   ├── middleware/         # Auth & validation guards
│   └── index.js            # Server entry point
├── .env.example            # Environment templates
├── README.md               # You are here
└── package.json            # Project dependencies
```

---

## ⚙️ Installation Guide

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A MongoDB Instance (Atlas or Local)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
```

### 2. Frontend Setup
```bash
# Navigate to project root or client folder
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

### 3. Backend Setup (In Development)
```bash
# Navigate to server folder (if applicable)
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory (or respective client/server folders):

```env
# SERVER CONFIG
PORT=5000
MONGODB_URI=mongodb+srv://...           # Your MongoDB connectivity string
JWT_SECRET=your_super_secret_key_...    # Secure key for token signing

# CLIENT CONFIG
VITE_API_URL=http://localhost:5000      # Backend API endpoint
```

---

## 🔐 Authentication Flow

1.  **Handshake:** Client sends user credentials via `/api/auth/login`.
2.  **Validation:** Server validates credentials against MongoDB and signs a JWT.
3.  **Persistence:** JWT is returned and stored in secure cookies or `localStorage` (secured xSS).
4.  **Authorization:** Subsequent requests include the Bearer token in the `Authorization` header.
5.  **Role Verification:** Middleware intercepts requests to check if `token.role === 'Admin'` for sensitive operations.

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account |
| `POST` | `/api/auth/login` | Authenticate user and get token |

### Projects & Tasks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/projects` | Fetch all projects for the user |
| `POST` | `/api/projects` | Create a new project (Admin Only) |
| `GET` | `/api/tasks/:projectId`| Retrieve tasks for a specific project |
| `PATCH` | `/api/tasks/:id` | Update task status or assignee |

---

## 🎨 UI/UX Design Philosophy

This project follows a **"Focus-First"** aesthetic.
*   **Intentional Spacing:** Utilizing a strict 4px grid for consistency.
*   **Visual Hierarchy:** High-contrast headings paired with muted metadata to reduce cognitive load.
*   **Dynamic Feedback:** Skeleton loaders and motion-driven button states provide sensory confirmation of actions.

---

## 📱 Responsive Design

Building for the mobile-first world:
*   **Adaptive Navigation:** Sidebar collapses into a bottom-bar or hamburger menu on smaller screens.
*   **Fluid Grids:** Dashboard cards stack vertically on mobile while maintaining bento-grid layouts on desktop.
*   **Touch Targets:** All interactive elements are optimized for 44px minimum touch area.

---

## 🚀 Deployment Guide

### Railway.app Deployment
1.  **Connect GitHub:** Link your repository to a new Railway project.
2.  **Environment Setup:** Add variables from `.env` to the Railway Dashboard.
3.  **Build Commands:** 
    *   Set **Install Command:** `npm install`
    *   Set **Start Command:** `node server.js` (for backend) or `vite preview` (for frontend).
4.  **Domains:** Connect your custom domain or use generated subdomains.

---

## 🧪 Future Improvements

*   [ ] **Real-time Collaboration:** WebSocket integration for live cursor tracking.
*   [ ] **Cloud Storage:** Direct file uploads to AWS S3 or Cloudinary for task attachments.
*   [ ] **Automated Reporting:** Weekly PDF summaries sent to project admins.
*   [ ] **Integrations:** Slack and Discord webhook support for task events.

---

## 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Your Name**
*   **LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
*   **GitHub:** [@yourusername](https://github.com/yourusername)
*   **Portfolio:** [yourportfolio.com](https://yourportfolio.com)

---

## ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub! Your support motivates continued development.

---
