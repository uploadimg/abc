"use strict";
var w      = parseInt(el('chieurongcrop').value);
  var h      = parseInt(el('chieucaocrop').value);
  var x      = parseInt(el('vitri-ngang').value);
  var y      = parseInt(el('vitri-doc').value);
  var r      = parseInt(el('doxoay').value);

  var ratio  = w/h;
  function updateData(){
	  
    w      = parseInt(el('chieurongcrop').value);
    h      = parseInt(el('chieucaocrop').value);
    x      = parseInt(el('vitri-ngang').value);
    y      = parseInt(el('vitri-doc').value);
    r      = parseInt(el('doxoay').value);

    ratio  = w/h;
  }
  // DOM LOADED
  window.addEventListener('DOMContentLoaded', function () {
    var image = el('image');
    var input = el('inputIMG');
    var imgout = el('imgout');
 
    var $modal = $('#imgModal');
    var cropper;
    // show/hide modal
    $modal.on('shown.bs.modal', function () {
      // tính lại các thông số
      updateData();
      console.log(w);
      cropper = new Cropper(image, {
        aspectRatio: ratio,
        viewMode: 1,
      });
    }).on('hidden.bs.modal', function () {
      cropper.destroy();
      cropper = null;
    });
    // input change
    input.addEventListener('change',function(){
      document.getElementById('chonanh').textContent = 'Chọn ảnh khác';
      // cập nhật lại data
      updateData();
      console.log(w+'-'+h);
      // destroy exists cropper
      cropper.destroy();
      cropper = null;
      var file = this.files[0];  
      var image = document.getElementById('image');
          image.src = URL.createObjectURL(file);
      var done = function (url) {
            input.value = '';
            image.src = url;
          };
                    
      var reader;
      var file;
      var url;
      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function (e) {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
      // callback Cropper
      cropper = new Cropper(image, {
        aspectRatio: ratio,
        viewMode: 1,
      });
      document.getElementById('cropanh-container').classList.remove("d-none");
    });  // end change
    
    // Crop ảnh
    document.getElementById('crop').addEventListener('click',function(){
      this.textContent = 'Cắt ảnh...';
      document.getElementById('upanh').textContent = 'Chọn ảnh khác';
      var croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob(function(blob) {
          var url = URL.createObjectURL(blob);
          el('anhcrop').src = url;
		  el('maunen').value = url;
      });
      setTimeout(function(){
        document.getElementById('crop').textContent = 'Cắt ảnh';
        // ẩn modal
        $modal.modal('hide');
      },40);      
    });
    document.getElementById('rotate-left').addEventListener('click',function(){
      cropper.rotate(-90);
    });
    document.getElementById('rotate-right').addEventListener('click',function(){
      cropper.rotate(90);
    });
    document.getElementById('flip-h').addEventListener('click',function(){
      cropper.scale(-1, 1); // Flip horizontal
    });
    document.getElementById('flip-v').addEventListener('click',function(){
      cropper.scale(1, -1); // Flip vertical
    });
    // change imgout style
    var style = document.getElementsByName('style');
    for (var i = 0, length = style.length; i < length; i++) {
      style[i].addEventListener('click',function(){
          el('data-overlay').value = this.value;
          el('vitri-ngang').value       = this.getAttribute('vitri-ngang');
          el('vitri-doc').value       = this.getAttribute('vitri-doc');
          el('doxoay').value       = this.getAttribute('doxoay');
          el('chieurongcrop').value       = this.getAttribute('chieurongcrop');
          el('chieucaocrop').value       = this.getAttribute('chieucaocrop');

          el('canvas').width       = this.getAttribute('chieurong_anhxuat');
          el('canvas').height      = this.getAttribute('chieudai_anhxuat');
      });
    }
    // dragable scroller-type
    const slider = document.querySelector('.scroller-type');
    let mouseDown = false;
    let startX, scrollLeft;
    let startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
      mouseDown = false;
    };
    slider.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if(!mouseDown) { return; }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    // Add the event listeners
    slider.addEventListener('mousedown', startDragging, false);
    slider.addEventListener('mouseup', stopDragging, false);
    slider.addEventListener('mouseleave', stopDragging, false);
  }); // end DOM
  // active scroller-type mauanh
    var mauanhs = document.querySelectorAll('.scroller-type .mauanh');
    for(var i = 0; i< mauanhs.length; i ++) {
      mauanhs[i].addEventListener('click',function(){
        for (var j = 0; j< mauanhs.length; j ++) {
          mauanhs[j].classList.remove('active');
        }
        this.classList.add('active');
      });
    }
function el(e) {
    return document.getElementById(e)
}
function copyToClipBoard(e) {
    var t, n, o, a, l = document;
    e = l.createTextNode(e), t = window, n = l.body, n.appendChild(e), n.createTextRange ? (o = n.createTextRange(), o.moveToElementText(e), o.select(), l.execCommand("copy")) : (o = l.createRange(), a = t.getSelection, o.selectNodeContents(e), a().removeAllRanges(), a().addRange(o), l.execCommand("copy"), a().removeAllRanges()), e.remove()
}
function copyElementToClipboard(e) {
    window.getSelection().removeAllRanges();
    var t = document.createRange();
    t.selectNode("string" == typeof e ? document.getElementById(e) : e), window.getSelection().addRange(t), document.execCommand("copy"), window.getSelection().removeAllRanges()
}
function b64EncodeUnicode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
        return String.fromCharCode("0x" + t)
    }))
}
function b64DecodeUnicode(e) {
    return decodeURIComponent(atob(e).split("").map(function(e) {
        return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    }).join(""))
}
function copyText() {
    if (document.getElementById("source_txt")) {
        var e = document.getElementById("source_txt");
        e.select(), e.setSelectionRange(0, 99999), document.execCommand("copy")
    }
}
function idleLogout() {
    function e() {
        window.location.reload()
    }
    function t() {
        clearTimeout(n), n = setTimeout(e, 6e5)
    }
    var n;
    window.onload = t, window.onmousemove = t, window.onmousedown = t, window.ontouchstart = t, window.ontouchmove = t, window.onclick = t, window.onkeydown = t, window.addEventListener("scroll", t, !0)
}
var utf8ToBin, binToUtf8, ajax_url, base_url, tooltipTriggerList, tooltipList, source_txt, popoverTriggerList, popoverList;
 ajax_url = document.getElementById("ajax_url").value, base_url = document.getElementById("base_url").value, tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')), 
function() {
        if (feather.replace(), count_words(), idleLogout(), document.getElementById("wheel-container")) {
            loadWheel();
            var e = getCookie("wheel_list");
            e && createButtonFromCookies(e)
        }
    }();