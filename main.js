
import {
    createIndexedDB,
    getAllIndexedDB,
    getIndexedDB,
    updateIndexedDB,
    deleteIndexedDB,
  } from './src/indexedDB/indexedDB.js';
  import { createModal } from './src/utils/createModal.js';
  import { dataRender } from './src/utils/dataRender.js';
  import { postView } from './src/template/postView.js';


  const databaseName = 'instagram';
  const version = 1;
  const objectStore = 'posts';
  const pathArray = window.location.pathname.split('/'); // [0: "", 1: W2_instaClone, 2: ""]
  //const postId = pathArray[2];
 

  function main() {
  
    let locationHrefArray = window.location.href.split('/');
    // main 일 때 : [0:"http", 1:"", 2:"127.0.0.1:5500", 3:"W2_instaClone", 4:"" ]
    // post 일 때 : [0:"http", 1:"", 2:"127.0.0.1:5500", 3:"W2_instaClone", 4:"#", 5:"post", 6:"id", 7:"" ]
    console.log(pathArray, locationHrefArray);
    
    //const locationHref = window.location.href;
    let targetPostId = locationHrefArray[6];

    if (locationHrefArray[5] === 'post') {
        route(targetPostId);
        history.pushState(null, null, location.href); 
    }
    else {
        
        // 뒤로가기 막기 코드 
        // 스택 추가
        history.pushState(null, null, location.href); 

        // 뒤로라기 이벤트감지 -> 현재페이지로 이동
        window.onpopstate = function() { 
            history.go(1);
        }
        document.querySelector('#add-post').addEventListener('click', createModal);
    
        createIndexedDB(databaseName, version, objectStore, function () {
            getAllIndexedDB(databaseName, version, objectStore, function (dataList) {
                const mainPostsEl = document.querySelector('.main__posts');
                if (dataList.length !== 0) {
                    mainPostsEl.innerHTML = '';
                    dataRender(dataList);
                } else {
                    mainPostsEl.setAttribute('class', 'main__posts not-posts');
                }
            });
        });
    }
  }
  
  main();

  // 클릭한 이미지에 따라 뷰를 렌더링하는 함수
  export function route(targetPostId) {

    if(targetPostId) {
      getIndexedDB(
        databaseName,
        version,
        objectStore,
        //pathArray[2],
        targetPostId,
        function (data) {
          
          //document.body.innerHTML = postView(data.image, data.content);
          const modalEl = document.createElement("div");
          modalEl.setAttribute("class", "modal__layout");
          modalEl.innerHTML = postView(data.image, data.content);
          document.querySelector("body").append(modalEl);

          const closeBtn = document.querySelector('.post__view > img');
          const updateBtn = document.querySelector(
            '.post__buttons > button:first-child'
          );
          // 삭제버튼 요소를 가져오세요.
          const deleteBtn = document.querySelector(
            '.post__buttons > button:last-child'
          );;
          
          closeBtn.addEventListener('click', function () {
            //window.location.href = '/W2_instaClone/';
            //window.location.pathname = '/W2_instaClone/';
            

            history.pushState(null, null, location.pathname); 
            // 뒤로라기 이벤트감지 -> 현재페이지로 이동
            window.onpopstate = function() { 
              history.go(1);
            }
            console.log('back');

            modalEl.innerHTML = '';
            window.location.href='';
            //window.location.replace('');

          });
          updateBtn.addEventListener('click', function () {
            const result = window.prompt('수정할 내용을 작성해주세요.', '');
            if (result) {
              updateIndexedDB(
                databaseName,
                version,
                objectStore,
                targetPostId,
                result,
                function () {
                  window.location.reload();
                }
              );
            }
          });
          
          deleteBtn.addEventListener('click', function() {
              const confirm = window.confirm('포스트를 삭제할까요?', '');
              if(confirm) {
                  deleteIndexedDB(databaseName, version, objectStore, targetPostId, function (){
                      //window.location.pathname="/W2_instaClone/";
                      window.location.replace('');
                  })
              }
          });

          //뒤로가기 이벤트 막고 새로고침 하기
          // 스택 추가
          history.pushState(null, null, location.href); 

          // 뒤로라기 이벤트감지 -> 현재페이지로 이동
          window.onpopstate = function() { 
            history.go(-1);
            //window.location.replace('');
            modalEl.innerHTML = '';
            window.location.href='';
          }
          
        }
      );
      return;
    } 
  }

  document.querySelector('.header__search input').addEventListener('click', (e) => {
      document.querySelector('body').classList.add('search');
  });

  document.querySelector('.header__search input').addEventListener('focusout', (e) => {
      document.querySelector('body').classList.remove('search');
  });


// 아래는 사용하지 않는 라우팅 샘플 코드
// router.js
// const container = document.querySelector("head title")
// //console.log(container);
// const pages = {
//  home: () => container.innerText = 'Instagram',
//  post: () => container.innerText = 'Instagram Post',
// }
// const router = createRouter();


// // router.addRoute("#/", pages.home)
// //      .addRoute("#/melon", pages.melon)
// //      .start();

// function createRouter() {
//     const routes = []; // 애플리케이션의 경로 목록들을 담을 배열이다. 클로저를 이용하여 데이터를 추가한다.
  
//     const router = {
//       // 라우터 기능 1. 애플리케이션의 경로 목록들을 저장한다.
//       addRoute(fragment, component) {
//         routes.push({fragment, component});
//         return this;
//       },
//       // 라우터 기능 2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체한다.
//       start() {
//         // routes 배열에서 현재 브라우저 hash값과 동일한 해시값을 가진 구성 요소를 찾는다.
//         const checkRoutes = () => {
//           const currentRoute = routes.find(route => route.fragment === window.location.hash);
//           currentRoute.component(); // 페이지 이동을 보여주기 위해 innerText를 변경하는 메서드
//         }
  
//         window.addEventListener('hashchange', checkRoutes); // 브라우저에서 hash값이 바뀔때 발생하는 이벤트.
//         checkRoutes();
  
//       }
//     };
  
//     return router;
//   }