
const burgerBtn = document.getElementById('burger-menu'),
      dropdownMenu = document.getElementsByClassName('drop-down-menu')[0],
      contentTabs =document.getElementsByClassName('content-wrapper')[0].children,
      tabContainer =document.getElementsByClassName('tab-container')[0].children,
      skillsContainer = document.getElementsByClassName('scroll-animate')[0].children;
var   prevTab=0,scrollIndex=0,k=0;
console.log(contentTabs[0]);
// function animateTabs(i){
//     if(prevTab != i){
//     contentTabs[prevTab].classList.remove('active'); 
//     contentTabs[i].classList.add('active');
//     prevTab = i;
//     }
// }
for(let i=0;i<4;i++){
    tabContainer[i].addEventListener('click',function animateTabs(e){
        e.preventDefault();
        if(prevTab != i){
        contentTabs[prevTab].classList.remove('active'); 
        contentTabs[i].classList.add('active');
        prevTab = i;
        }
    });
    tabContainer[i].addEventListener('touchstart',function animateTabs(e){
        e.preventDefault();
        if(prevTab != i){
        contentTabs[prevTab].classList.remove('active'); 
        contentTabs[i].classList.add('active');
        prevTab = i;
        }
    });
}
burgerBtn.addEventListener('click',function(e){
    e.preventDefault();
    burgerBtn.classList.toggle('active');
    dropdownMenu.classList.toggle('visible');
    k=(k+1)%2;
});
dropdownMenu.addEventListener('touchmove',function(e){
    e.preventDefault();
});
window.addEventListener('wheel',function(e){
    if(k==1){
    e.preventDefault();
    e.stopPropagation();
}
},{passive: false});

let options = {
    root: null,
    rootMargin: '0px 24px',
    threshold: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.75,0.8,0.85,0.95,0.9,1.0]
  }


let observer = new IntersectionObserver(function(entries,observer){
    entries.forEach((entry) => {
    if(entry.intersectionRatio>0.7){
    contentTabs[0].classList.add('active');
        prevTab=0;
        observer.unobserve(contentTabs[0])
    }
    });
}, options);
observer.observe(contentTabs[0]);


let observer1 = new IntersectionObserver(handleIntersect1, options);
let observer2 = new IntersectionObserver(handleIntersect2, options);
let observer3 = new IntersectionObserver(handleIntersect3, options);
let observer4 = new IntersectionObserver(handleIntersect4, options);
observer1.observe(skillsContainer[1]);
function handleIntersect1(entries, observer) {
    entries.forEach((entry) => {
     
      if(entry.intersectionRatio>0.85){
        skillsContainer[1].classList.add('active');
        scrollIndex=1;
        return;
      }else 
      skillsContainer[1].classList.remove('active');
    });
  }
observer2.observe(skillsContainer[2]);
  function handleIntersect2(entries, observer) {
    entries.forEach((entry) => {
     
      if(entry.intersectionRatio>0.85){
        skillsContainer[2].classList.add('active');
        scrollIndex=2;
        return;
      }else
      skillsContainer[2].classList.remove('active');
    });
  }
  observer3.observe(skillsContainer[3]);
  function handleIntersect3(entries, observer) {
    entries.forEach((entry) => {
   
      if(entry.intersectionRatio>0.85 ){
        skillsContainer[3].classList.add('active');
        scrollIndex=3;
        return;
      }else
      skillsContainer[3].classList.remove('active');
    });
  }
  observer4.observe(skillsContainer[0]);
  function handleIntersect4(entries, observer) {
    entries.forEach((entry) => {
      console.log(entry.intersectionRatio);
      if(entry.intersectionRatio>0.85 ){
        skillsContainer[0].classList.add('active');
        scrollIndex=0;
      }else 
        skillsContainer[0].classList.remove('active');
      
  
      //prevRatio = entry.intersectionRatio;
    });
  }
const call2action = document.getElementsByClassName('call-to-action')[0];
let observer5 = new IntersectionObserver(function(entries,observer){
    entries.forEach((entry) => {
    if(entry.intersectionRatio>0.7){
    call2action.classList.add('active');
    }
    });
}, options);
observer5.observe(call2action);

var n=0;
partnerlogo = document.getElementsByClassName('infinite-slide')[0];
let observateur = new IntersectionObserver(function(entries,observateur){
    entries.forEach((entry) => {
    if(entry.intersectionRatio>0){
        console.log(entry.intersectionRatio)
        n=1;
        
    }else{
        n=0;
    }
    });
}, options);
observateur.observe(partnerlogo);
const viewPort = window.visualViewport;
var vpWidth=viewPort.width;

viewPort.addEventListener('resize',(event) => {
    vpWidth=viewPort.width;
		
});
var interval = setInterval(f,10);

var containerWidth = 5*Math.min(vpWidth/4,200)+16/100 * vpWidth,xpos1=-(containerWidth),xpos2=-3*containerWidth ;
console.log(vpWidth +'px' + containerWidth);

function f(){
    if(n==1 && vpWidth <= containerWidth){
        xpos1+=1;
        xpos2+=1;
        if(xpos2 >= -containerWidth && xpos2<-containerWidth+1){
            console.log('---'+xpos1 + '   '+-containerWidth + Math.min(vpWidth - containerWidth,0));
            xpos1 = -containerWidth ;
        }

        if(xpos1 >= 0 && xpos1<1){
            console.log('--'+xpos2 + '   '+-containerWidth + Math.min(vpWidth - containerWidth,0));
            xpos2 = -2*containerWidth;
        }
        partnerlogo.children[0].style.transform ='translate(' + xpos1+ 'px)';
        partnerlogo.children[1].style.transform ='translate(' + xpos2+ 'px)';
      //  partnerlogo.children[1].style.transform ='translate(' + xpos2+ 'px)';
        // partnerlogo.children[2].style.transform ='translate(' + xpos+ 'px)';
        // partnerlogo.children[3].style.transform ='translate(' + xpos+ 'px)';
        // partnerlogo.children[4].style.transform ='translate(' + xpos+ 'px)';
    }
}
