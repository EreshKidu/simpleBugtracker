# simpleBugtracker
With this bug tracking system you can track multiple projects, assign users to them, add issues with pictures, comment them and edit everything. With zero page reloads.

Live example: https://simplebugtracker.onrender.com/

This is a personal project, which utilizes the following technologies:

Backend - Node.js with Express web framework
Database - MongoDB / mongoose
HTML Templating - EJS
Images storage - cloudinary
HTML pretifier - bootstrap
Authentication - passport
Security - helmet


In order to run this project locally you need:
1) Install and start MongoDB 
2) Create .env file in root of the project and add the following:
CLOUDINARY_CLOUD_NAME = get personal code from dashboard at https://cloudinary.com/
CLOUDINARY_KEY = get personal code from dashboard at https://cloudinary.com/
CLOUDINARY_SECRET =  get personal code from dashboard at https://cloudinary.com/


GOOGLE_CLIENT_ID= get personal code from https://console.cloud.google.com/apis/credentials/
GOOGLE_CLIENT_SECRET= get personal code from https://console.cloud.google.com/apis/credentials/

SECRET= put any text like sfg845h3294202hfs
MONGODBURI = mongodb://localhost:27017/simpleBugtracker

3) Start the app:
node app.js

Should see:
Serving on port 3000
Database connected

4) In the browser open 
http://localhost:3000/
