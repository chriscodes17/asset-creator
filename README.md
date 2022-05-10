# Assest-Creator, an online code editor
Demo Link: https://chrisdev-asset.freedomains.dev/api

**About**

This project was built to demonstrate the ability to create an API to power an online text editor that creates files and deletes each file if older than 5 minutes. The data is stored one a fileData.db file, and files are stored in a file_storage folder.

**API format:**
* GET resquest to /api will take the user to an empty editor
* Listen to incoming POST requests to /api/files to create a file.
* Listen to incoming GET requests to /api/files to get the an array containing all the files.
* Listen to incoming GET requests to /api/files/file-name to get the content of file-name. This will update the url and display the selected file on the editor

**How to use:**
* Create a file:

**What was used to build this project:**
* JavaScript
* Node Js
* Express
* File System API in Node Js
