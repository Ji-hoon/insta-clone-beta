export function readFile(file, cb) {
    let reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = function () {
      cb(reader.result);
    };
  
    reader.onerror = function (error) {
      cb(error);
    };
  }