import { insertIndexedDB, getAllIndexedDB } from "../indexedDB/indexedDB.js";
import { modalTemplate } from "../template/modalTemplate.js";
import { postTemplate } from "../template/postTemplate.js";
import { dataRender } from "./dataRender.js";
import { readFile } from "./readFile.js";

export function createModal() {
  //console.log('click');
  const modalEl = document.createElement("div");
  modalEl.setAttribute("class", "modal__layout");
  modalEl.innerHTML = modalTemplate();
  document.querySelector("body").prepend(modalEl);

  const modalCloseEl = document.querySelector(".modal__close");

  modalCloseEl.addEventListener("click", function () {
    document.querySelector("body").removeChild(modalEl);
  });

  const fileEl = document.querySelector("#file");
  fileEl.addEventListener("input", function () {
    readFile(fileEl.files[0], function (response) {
      if (response instanceof Error) {
        alert("Error:", response);
        document.querySelector("body").removeChild(modalEl);
      }

      const imageBase64 = response;
      document
        .querySelector(".modal__card")
        .setAttribute("class", "modal__card write--post");
      document
        .querySelector(".modal__main")
        .setAttribute("class", "modal__main write--post");

      const backBtn = document.querySelector(".modal__back > img");
      const shareBtn = document.querySelector(".modal__header > p ");

      backBtn.style.visibility = "visible";
      shareBtn.style.visibility = "visible";

      document.querySelector(".modal__main").innerHTML =
        postTemplate(imageBase64);

      backBtn.addEventListener("click", function () {
        document.querySelector("body").removeChild(modalEl);
        createModal();
      });

      shareBtn.addEventListener("click", function () {
        const databaseName = "instagram";
        const version = 1;
        const objectStore = "posts";
        const currentData = {
          content: document.querySelector(".modal__write > textarea").value,
          image: imageBase64,
        };

        insertIndexedDB(
          databaseName,
          version,
          objectStore,
          currentData,
          function () {
            getAllIndexedDB(
              databaseName,
              version,
              objectStore,
              function (dataList) {
                const mainPostsEl = document.querySelector(".main__posts");
                mainPostsEl.setAttribute("class", "main__posts");
                document.querySelector("body").removeChild(modalEl);
                mainPostsEl.innerHTML = "";
                dataRender(dataList);
              }
            );
          }
        );
      });
    });
  });
}
