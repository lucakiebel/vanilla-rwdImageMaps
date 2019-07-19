/*
* rwdImageMaps vanilla Function v1.7
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2019 Luca Kiebel
* https://github.com/lucakiebel/vanilla-rwdImageMaps
* https://luca-kiebel.de
* Licensed under the MIT license
*/
function rwdImageMaps(selector) {
	var elements=document.querySelectorAll(selector);
	function addMapToElement(elements) {
		for(var i = 0; i<elements.length; i++) {
			var el = elements[i];
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
				var elementStyle = window.getComputedStyle(el),
				wPercent = elementStyle.getPropertyValue("width")/100,
				hPercent = elementStyle.getPropertyValue("height")/100,
				map = el.getAttribute('usemap').replace('#', ''),
				c = 'coords';
				Array.from(document.querySelector('map[name="' + map + '"]').querySelectorAll("area")).forEach(function(ar) {
					if(!ar.dataset[c])
						ar.dataset[c]=ar.getAttribute(c);

					var coords = ar.dataset[c].split(','),
					coordsPercent = new Array(coords.length);

					for (var i = 0; i < coordsPercent.length; ++i) {
						if (i % 2 === 0)
							coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
						else
							coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
					}
					ar.setAttribute(c, coordsPercent.toString());
				});
				el.setAttribute("src",el.getAttribute("src"));
			});
		}
	}
	window.addEventListener("resize",function() {addMapToElement(elements)});
	window.dispatchEvent(new Event("resize"));
}
