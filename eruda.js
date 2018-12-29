//  手机调试模式

(function () {
    var script = document.createElement('script');
    script.src = "http://eruda.liriliri.io/eruda.min.js";
    document.body.appendChild(script);
    script.onload = function () {
        eruda.init()
    }
})()