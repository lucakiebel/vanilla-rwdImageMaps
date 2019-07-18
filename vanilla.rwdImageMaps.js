/*
* rwdImageMaps vanilla Function v1.4
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2019 Luca Kiebel
* https://github.com/lucakiebel/vanilla-rwdImageMaps
* https://luca-kiebel.de
* Licensed under the MIT license
*/
function rwdImageMaps(selector,array) {
  var elmnt;
  if(!array) {//the supplied selector should be used with querySelector
    elmnt=document.querySelector(selector);
    if (typeof(elment.getAttribute('usemap')) == 'undefined') // if the element doesn't have a map attached, return
					return;
    addMapToElement(element);
  } else {// the supplied selector should be applied in a loop
    elmnt=document.querySelectorAll(selector);
    for(var i = 0; i<elements.length; i++) {
      addMapToElement(element[i]);
    }
  }
  function addMapToElement(el) {
    // Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
    el.addEventListener("load", function(e) {
      var w = el.getAttribute("width"),
			h = el.getAttribute("height");
      if (!w || !h) {
        var temp = new Image();
        temp.src = el.getAttribute("src");
        if (!w)
          w = temp.width;
        if (!h)
          h = temp.height;
      }
      var wPercent = el.width/100,
      hPercent = el.height/100,
      map = el.getAttribute('usemap').replace('#', ''),
      c = 'coords';
      Array.from(document.querySelector('map[name="' + map + '"]').querySelectorAll("area")).forEach(function() {
        if(!this.dataset[c])
          this.dataset[c]=this.getAttribute(c);
        
        var coords = this.dataset[c].split(','),
							coordsPercent = new Array(coords.length);

        for (var i = 0; i < coordsPercent.length; ++i) {
          if (i % 2 === 0)
            coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
          else
            coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
        }
        this.setAttribute(c, coordsPercent.toString());
      });
      el.setAttribute("src",el.getAttribute("src"));
    });
  }
  window.addEventListener("resize",function() {addMapToElement(elmnt)});
  window.dispatchEvent(new Event("resize"));
}
