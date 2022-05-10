# Assest-Creator, an online code editor
Demo Link: https://chrisdev-asset.freedomains.dev/api

**About**

This project was built to demonstrate the ability to create an API to power an online text editor that creates code files.
Each file is saved to a .db file called `fileData.db`. This uses the file system API in node js (https://nodejs.org/api/fs.html). 
To prevent the server from getting filled up with files, the server will automatically delete files after a 5 minute mark for each file. This is written in the function called `deleteFile()` which will loop through fileData every 10s.

**Data storage format**
```
const fileData = {
  fileName: {
    fileContent: '<h1>Hey!<h1>',
    age: Date.now()
  }
}
```


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
