# Assest-Creator, an online code editor
Demo Link: https://chrisdev-asset.freedomains.dev/api

**About**

This project was built to demonstrate the ability to create an API to power an online text editor that creates code files.
Each file is saved to a .db file called `fileData.db` and a folder so each file can previewed / downloaded. This project uses the file system API in node js (https://nodejs.org/api/fs.html). 
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
* GET resquest to /api will take the user to an empty editor.
* Listen to incoming POST requests to /api/files to create a file and save it to fileData.db or update an exisiting files content. This post requests sends the recived data to a function called `updateFile()`
* Listen to incoming GET requests to /api/files to get the an array containing all the files and send response.json() to the user.
* Listen to incoming GET requests to /api/files/file-name to get the content of file-name. This will update the url and display the selected file on the editor
* Listen to incoming GET requests to /api/uploadFile/:file to get the actual file so the user can view / download the file. The response sends a file use the file system in node js. 

**How to use:**
* Create a file: Type a file name in the input and click create file.
* View file: click on the file name on the left side of the screen.
* Update file: click the file name on the left, update the content in the editor and click update file.
* New editor: click new editor at the top right of the screen, this will bring the user to an empty editor.

**What was used to build this project:**
* JavaScript
* Node Js
* Express
* File System API in Node Js
