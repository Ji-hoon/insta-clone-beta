// getAllKeysIndexedDB를 활용하는 코드가 일부 작성되어 있습니다.
import { getAllKeysIndexedDB } from '../indexedDB/indexedDB.js';
import { route } from '../../main.js';
import { postView} from '../template/postView.js'

export function dataRender(dataList) {
  // main 페이지 게시물 수 카운트 적용
  let postCounts = document.querySelector('.main__profile .middle ul li:first-child b');
  postCounts.textContent = dataList.length;

  for (let i = 0; i < dataList.length; i++) {
    
    const postListAnchorEl = document.createElement('a'); // anchor 태그 추가

    const postListEl = document.createElement('img');
    const mainPostsEl = document.querySelector('.main__posts');
    const databaseName = 'instagram';
    const version = 1;
    const objectStore = 'posts';


    getAllKeysIndexedDB(databaseName, version, objectStore, function (keys) {
      const postId = keys[i]; // posts ObjectStore에 있는 Key를 id로 사용해보세요.
      mainPostsEl.setAttribute('class', 'main__posts');
      postListEl.setAttribute('src', dataList[i].image);
      postListEl.setAttribute('id', postId);
      postListEl.setAttribute('alt', 'user_post_image');
      postListAnchorEl.appendChild(postListEl);
      postListAnchorEl.setAttribute('href', `#\/post/${postId}\/`);
      postListAnchorEl.addEventListener('click', function () {
        //window.location.pathname = `/W2_instaClone/post/${postId}`;
        
        route(postId);
      });

      document.querySelector('.main__posts').appendChild(postListAnchorEl);
    });
  }
}
