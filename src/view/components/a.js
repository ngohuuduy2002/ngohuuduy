// window.addEventListener("DOMContentLoaded", function () {
//   // Lấy tất cả các phần tử trên trang có thuộc tính style inline
//   var elements = document.querySelectorAll("[style]");

//   // Biến để lưu dữ liệu CSS và HTML
//   var cssData = "";
//   var htmlData = document.documentElement.outerHTML;

//   // Duyệt qua từng phần tử và chuyển đổi style inline thành lớp CSS
//   elements.forEach(function (element, index) {
//     var styles = element.getAttribute("style");

//     // Tạo một lớp CSS mới với tên unique dựa trên index
//     var newClass = "auto-class-" + index;

//     // Thêm lớp mới vào phần tử
//     element.classList.add(newClass);

//     // Loại bỏ style inline
//     element.removeAttribute("style");

//     // Tạo CSS cho lớp mới và thêm vào biến cssData
//     cssData += "." + newClass + " {" + styles + "}\n";
//   });

//   // Ghi dữ liệu ra console
//   console.log("CSS Data:");
//   console.log(cssData);
//   console.log("HTML Data:");
//   console.log(htmlData);
// });

window.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử trên trang có thuộc tính style inline
  var elements = document.querySelectorAll("[style]");

  // Biến để lưu dữ liệu CSS và HTML
  var cssData = "";
  var htmlData = document.documentElement.outerHTML;

  // Duyệt qua từng phần tử và chuyển đổi style inline thành lớp CSS
  elements.forEach(function (element, index) {
    var styles = element.getAttribute("style");

    // Tạo một lớp CSS mới với tên unique dựa trên index
    var newClass = "auto-class-" + index;

    // Thêm lớp mới vào phần tử
    element.classList.add(newClass);

    // Loại bỏ style inline
    element.removeAttribute("style");

    // Tách từng thuộc tính và giá trị trong style inline
    styles.split(";").forEach(function (style) {
      var parts = style.split(":");
      if (parts.length === 2) {
        // Lấy tên thuộc tính và giá trị
        var property = parts[0].trim();
        var value = parts[1].trim();
        // Tạo CSS cho lớp mới và thêm vào biến cssData
        cssData += "." + newClass + " {" + property + ": " + value + ";}\n";
      }
    });
  });

  // Tạo một thẻ <style> mới chứa tất cả CSS đã tạo và thêm vào head
  var styleTag = document.createElement("style");
  styleTag.textContent = cssData;
  document.head.appendChild(styleTag);

  // Ghi dữ liệu ra console
  console.log("CSS Data:");
  console.log(cssData);
  console.log("HTML Data:");
  console.log(htmlData);
});
