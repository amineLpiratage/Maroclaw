window.addEventListener('load', function(){
	// Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  	const nav = document.getElementsByTagName("nav")[0];
	console.log(nav.offsetHeight);  
	var button = document.getElementById('menu-burger');
	var btn = document.getElementById('exit-dropdown');
	var menu = document.getElementById('nav-menu');
	var blur = document.getElementById('layer-blur');
	var index = 0 ;
	const viewPort = window.visualViewport;
	viewPort.addEventListener('resize',(event) => {
		if(menu.classList.contains('is-open')){
		console.log(menu.offsetWidth);
		menu.style.transform='translate(-'+(menu.offsetWidth+4+scrollbarWidth)+'px)';
	}
	 })
	function flyout(event) {
		if(index == 0){
		event.preventDefault();
		button.attributes[3].nodeValue='false';
		menu.classList.toggle('is-open');
		blur.classList.toggle('blur');
		blur.style.transition='opacity 0.2s linear,visibility 0s linear .2s';
	 	blur.style.opacity='0';
	 	menu.style.transform='translate(0)';
	 	index = 1;
	 }
	}
	blur.addEventListener('transitionend',function(event){
		index = 0;
	})
	button.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('salam');
		button.attributes[3].nodeValue='true';
		blur.classList.toggle('blur');
		menu.classList.toggle('is-open');
		blur.style.transitionDelay='0s';
		blur.style.opacity='1';
		menu.style.transform='translate(-'+(menu.offsetWidth+4+scrollbarWidth)+'px)';
	});
	btn.addEventListener('click', flyout);
	blur.addEventListener('click', flyout);

    var swipablesurface = document.getElementsByClassName('slider-img')[0],
        zaap = document.getElementsByClassName('slider-nav')[0].children,
        sliderDescription = document.getElementsByClassName('description-wrapper')[0].children,
        sliderImgs= document.querySelector('.slider-img'),
        actualpos=0,next = 1,direction=1,scrollIndex,
        startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;
    var width=sliderImgs.children[0].offsetWidth;
    var length = sliderImgs.children.length-1;
    console.log('amine ' +-200.2 + '%' + Math.abs(-200) +' = ' +(50 % 24));
    swipablesurface.addEventListener('touchstart', function(e){
       // touchsurface.innerHTML = '';
        var touchobj = e.changedTouches[0];
        for(let i=0;i<length;i++){
            sliderImgs.children[i].style.transition='unset';
        }
        console.log('don\'t fucking touch me ever again')
        dist = 0;  
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
       // e.preventDefault();
    }, false)
 
    swipablesurface.addEventListener('touchmove', function(e){
        dist = e.targetTouches[0].pageX - startX;
        direction = dist / Math.abs(dist);
        next= (actualpos+direction+length)%length;
        if(Math.abs(e.targetTouches[0].pageY - startY) > Math.abs(dist) && scrollIndex!=2){
            scrollIndex=1;
        }else{
            if(scrollIndex%2 == 0 ){
            scrollIndex = 2;
            e.preventDefault(); // prevent scrolling when inside DIV
            sliderImgs.children[actualpos].style.transform='translate('+dist + 'px)';  
            sliderImgs.children[next].style.transform='translate('+((-direction) * width + dist) + 'px)';
            }
        }
        
        
        
        
    },false);
    function moveSlider(i){
        if(i!=actualpos){
        console.log('====>' +i);
        console.log(sliderDescription[actualpos].children[0]);
        sliderDescription[actualpos].children[0].children[0].style.transition='unset';
        sliderDescription[actualpos].children[1].style.transition='unset';
        sliderDescription[i].children[0].children[0].style.transition='opacity 0s ease-in, transform .45s ease-out';
        sliderDescription[i].children[1].style.transition='opacity 0s ease-out , transform 0s ease-out ';
        sliderDescription[actualpos].classList.remove('infront');
        sliderDescription[i].classList.add('infront');
        zaap[actualpos].classList.remove('current');
        zaap[i].classList.add('current');
        sliderImgs.children[actualpos].style.transform='translate('+ direction * width + 'px)'; 
        sliderImgs.children[i].style.transform='translate('+ 0 + 'px)';
        actualpos=i;
        }else console.log("i couldn't get in");
    }
    for(let i=0;i<zaap.length;i++){
    zaap[i].addEventListener('click',function(){
        direction = i > actualpos? 1 : -1;
        console.log('im clicked');
        moveSlider(i);
    },false);
    zaap[i].addEventListener('touchstart',function(){
        console.log('im clicked');
        direction = i > actualpos? 1 : -1;
        moveSlider(i);
    },false);
}
    swipablesurface.addEventListener('touchend', function(e){
        scrollIndex = 0;
        var touchobj = e.changedTouches[0];
        console.log(touchobj);
        dist = touchobj.pageX - startX; // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        sliderImgs.children[actualpos].style.transition='transform 0.5s ease-out';
        sliderImgs.children[next].style.transition='transform 0.5s ease-out';
        console.log('-----' + actualpos+'  '+next);
        console.log(dist / elapsedTime);
        if(Math.abs(dist) >= 100 || Math.abs(dist)/elapsedTime>=0.15){
            moveSlider(next);
            console.log(actualpos +'  ' + direction+'  '+next);
        }else if(Math.abs(dist) >= 1){
            sliderImgs.children[actualpos].style.transform='translate(0)'; 
            sliderImgs.children[next].style.transform='translate('+(-direction) * width + 'px)';
        }
        var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
        //handleswipe(swiperightBol);
        e.preventDefault();
    }, false);
}, false);
