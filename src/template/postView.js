//import close from "../../assets/close_icon.png";

export function postView(img, content) {
  return `
          <div class="post__view">
            <img width="22px" height="22px" src="/assets/close_icon.png" alt="close_image" />
            <div class="post__container">
              <img src=${img} alt="image" />
              <div class="post__content">
                <p>${content}</p>
                <div class="post__buttons">
                  <button>수정하기</button>
                  <button>삭제하기</button>
                </div>
              </div>
            </div>
          </div>
        `;
}
