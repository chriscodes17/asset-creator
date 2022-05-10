const fileInput = document.querySelector(".file-input");
const createBtn = document.querySelector(".create-btn");
const fileList = document.querySelector(".file-list");
const loader = document.querySelector(".loader-container");
const editor = ace.edit("editor");
const modelist = ace.require("ace/ext/modelist");
editor.setTheme("ace/theme/monokai");

const findGetParameter = (string) => {
  const result = location.search;
  const params = new URLSearchParams(result);
  const q = params.get(string);
  return q;
};

const fileName = findGetParameter("file");
if (fileName) {
  fetch(`/api/${fileName}`)
    .then((r) => r.json())
    .then((obj) => {
      fileInput.value = fileName;
      createBtn.innerText = "Update File";
      const mode = modelist.getModeForPath(fileName).mode;
      const session = ace.createEditSession(obj.fileContent);
      editor.setSession(session);
      editor.session.setMode(mode);
    });
}

createBtn.addEventListener("click", (e) => {
  if (!fileInput.value) return;
  const editorContent = editor.getValue();
  fetch("/files", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      fileName: fileInput.value,
      fileContent: editorContent,
    }),
  });
  window.location.reload();
});

const getData = async () => {
  try {
    const response = await fetch("/api/files");
    const files = await response.json();
    loader.style.display = "none";
    renderFiles(Object.keys(files));
  } catch (error) {
    console.log(error);
  }
};
const renderFiles = (files) => {
  fileList.innerHTML = files.reduce((acc, e) => {
    const linkValue = `/api?file=${e}`;
    return (
      acc +
      `
              <div class="file-list-element">
              <a class='link' href=${linkValue}><p>${e}</p></a>
              <button class='element-btn'>preview</button>
              </div>
              `
    );
  }, "");
  const openButtonArray = document.querySelectorAll(".element-btn");
  openButtonArray.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      window.open(`/api/uploadfile/${files[i]}`);
    });
  });
};
fileInput.focus();
getData();
