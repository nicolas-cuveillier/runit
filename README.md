# Runit

🏃‍♂️🏃‍♀️🚀 Welcome to **Runit** – a platform designed to connect runners with local clubs and streamline club management. Our goal is to enhance the running community by making it easier for runners to find and join clubs while helping organizers efficiently manage events and communications. 🏃‍♂️🏃‍♀️🚀

## Features
- **Discover & Join Clubs**: Runners can easily find local clubs and become members.
- **Seamless Communication**: Improved tools to share essential run details and updates.
- **Social Media Integration**: Pre-designed Instagram content templates to save organizers time and enhance club visibility.

## Tech Stack
📱💻🛠️
- **Backend**: ExpressJS – Manages user data, club schedules, and event details.
- **Frontend**: React Native – Cross-platform mobile app for iOS and Android, offering an intuitive interface for runners.
- **Database**: MongoDB – Stores and organizes club information, user profiles, and run history. 📱💻🛠️

## Tools Used
- React Native
- ExpressJS
- MongoDB

## Installation & Setup
🛠️📥⚙️
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/runit.git
   ```
2. Install dependencies for the backend:
   ```sh
   cd runit-backend
   npm install
   ```
3. Create a `.env` file in the `runit-backend` directory with the following fields:
   ```sh
   PORT=8080
   
   MONGOURI=""
   AWS_BUCKET_NAME=''
   AWS_BUCKET_REGION=''
   AWS_BUCKET_ACCESS_KEY=''
   AWS_BUCKET_SECRET_ACCESS_KEY=''
   PASSWORD_SALT=10
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. Install dependencies for the React Native app:
   ```sh
   cd ../runit-app
   npm install
   ```
6. Run the mobile app:
   ```sh
   npm run android   # For Android
   npm run ios       # For iOS (requires Mac & Xcode)
   ```
🛠️📥⚙️

## Contributing
🚀📝🤝 We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit your changes
4. Push to your branch and submit a PR 🚀📝🤝

## License
📜🔓⚖️ This project is licensed under the MIT License. 📜🔓⚖️

---

Happy running! 🏃‍♂️🏃‍♀️🎉

