export function postTemplate(img) {
    return `
            <div class="modal__post">
              <img width="478px" height="478px" src=${img} alt="image" />
              <div class="modal__write">
                <textarea placeholder="문구 입력..." autofocus></textarea>
              </div>
            </div>
          `;
  }