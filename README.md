# 🐻 Interactive 3D Bear Login Authentication ✨

A fun, aesthetic, and fully functional full-stack authentication system. It features a custom "Claymorphism" 3D SVG bear that interacts with the user as they type! 

## 🌟 The Magic (Features)
* **Interactive 3D SVG Bear:** * 👀 **Watches You:** The bear's eyes look down at the email input when you click on it.
  * 🙈 **Hides Eyes:** The bear covers its eyes with cute paws when you type your password.
  * 👋 **Waves Hello:** A happy, waving bear welcomes you to the dashboard!
* **Full Authentication Flow:** Seamless routing between Register, Login, and Dashboard.
* **Backend Integration:** Powered by Node.js and Express.
* **Local Database:** Securely stores new user credentials in a local `users.json` file.
* **Clean UI:** Forms have `autocomplete` disabled for a fresh, secure, and modern testing experience.

## 🛠️ Tech Stack Used
* **Frontend:** HTML5, CSS3 (3D Gradients, Drop Shadows, Animations), Vanilla JavaScript, Inline SVG.
* **Backend:** Node.js, Express.js. (Server setup & Routing)
* **Middleware:** `body-parser` to handle form submissions securely.
* **Database:** File System (`fs`) with JSON (`users.json`).

## 📂 Project Structure
```text
📦 LOGIN AUTHENTICATION
 ┣ 📂 node_modules/       # Dependencies (auto-generated)
 ┣ 📂 public/             # Frontend files served to the browser
 ┃ ┣ 📜 dashboard.html    # Secured welcome page (Waving Bear)
 ┃ ┣ 📜 login.html        # Login page (Interactive Bear)
 ┃ ┣ 📜 register.html     # Sign-up page 
 ┃ ┗ 📜 style.css         # 3D Aesthetic styling & animations
 ┣ 📜 package-lock.json   # Exact dependency tree
 ┣ 📜 package.json        # Project metadata & npm scripts
 ┣ 📜 server.js           # Main backend server & logic
 ┣ 📜 users.json          # Local database file
 ┗ 📜 README.md           # Project documentation