const CAROUSEL_ITEM_WIDTH_PERCENTAGE = 75;
const ACTIVE_CLASSES = ['active1', 'active2'];
const ACTIVE_CLASS_PREFIXES = ['active', 'active'];

const danCarousel = document.querySelectorAll('.dan-carousel');
const danPrevButton = document.getElementById('dan-prev');
const danNextButton = document.getElementById('dan-next');
const danCarouselItems = document.querySelectorAll('.dan-carousel-item');
const danCarouselTextArea = document.querySelectorAll('.dan-carousel-text-area');
let transformWidth;
let isMobile = window.innerWidth < 769
let mobileReachEnd = false;

if (isMobile) {
  transformWidth = 100
}
else{
  transformWidth = 50
}

function setItemWidth() {
  const itemWidth = (window.innerWidth * CAROUSEL_ITEM_WIDTH_PERCENTAGE) / 100;
  danCarousel.forEach(item1 => {
    Array.from(item1.children).forEach(item => {
      if (isMobile) {
        item.querySelector('img').style.width = `769px`;
        item.querySelector('img').style.minWidth = `769px`;
        item.querySelector('img').style.maxWidth = `769px`;
      }
      else{
        item.querySelector('img').style.width = `${itemWidth}px`;
        item.querySelector('img').style.minWidth = `${itemWidth}px`;
        item.querySelector('img').style.maxWidth = `${itemWidth}px`;
      }
    });
  })


  danCarouselTextArea.forEach(item => {
    if (isMobile) {
      // item.style.width = `769px`;
    }
    else{
      item.style.width = `${itemWidth}px`;
    }
  });

}

function initActive() {
  danCarousel.forEach(item1 => {
    Array.from(item1.children).forEach((item, index) => {
      item.classList.toggle("active1", index === 0);
      item.classList.toggle("active2", index === 1);

      if (isMobile) {
        Array.from(item.children).forEach(child => {
            Array.from(child.children).find(element => element.classList.contains("dan-carousel-text-area")).style.opacity = 1
        })
          
      }

    });
    item1.style.transform = `translateX(0%)`;
  })


}


function updateActiveClasses() {
  danCarousel.forEach(item1 => {
    Array.from(item1.children).forEach((item, index) => {
      ACTIVE_CLASSES.forEach((activeClass, i) => {
        item.classList.toggle(activeClass, index === danCurrentIndex + i);
      });
    });
  })
}

function transformDanCarousel() {
  const danTranslateX = -danCurrentIndex * 50;
  danCarousel.forEach(item => {
    item.style.transform = `translateX(${danTranslateX}%)`;
  })
}

function handleMouseInteraction(item, enlarge) {

  const textArea = item.querySelectorAll('.dan-carousel-text-area')
  textArea.forEach(item1 => {
    item1.classList.toggle('hovered', enlarge);
  })

  item.classList.toggle('col-md-9', enlarge);
  item.classList.toggle('col-md-6', !enlarge);
  
  const isActive1 = item.classList.contains('active1');
  const isActive2 = item.classList.contains('active2');
  
  const sibling = isActive1 ? item.nextElementSibling : isActive2 ? item.previousElementSibling : null;
  if (sibling) {
    sibling.classList.toggle('col-md-3', enlarge);
    sibling.classList.toggle('col-md-6', !enlarge);
  }
}

function handleCarouselClick(event) {
  const targetParent2 = event.target.parentElement.parentElement;
  const targetParent1 = event.target.parentElement;
  if (targetParent2) {
    const isPrevButton = targetParent2.classList.contains('active1') || targetParent1.classList.contains('prev');
    const isNextButton = targetParent2.classList.contains('active2') || targetParent1.classList.contains('next');
    
    let count=0;
    let childArr;
    let childArrLength;

    if ((targetParent2.classList.contains('active1') || targetParent2.classList.contains('active2')) && isMobile != true) {
      childArr = Array.from(targetParent2.parentElement.children)
      let childArrLength = childArr.length

      for (const element of childArr) {
        if (element.classList.contains('active1')) {
          break; 
        }
        count++
      }

      if (isPrevButton) {
        if (count != 0) {
          targetParent2.previousElementSibling.classList.add('active1')
          targetParent2.classList.remove('active1')
          targetParent2.classList.add('active2')
          targetParent2.nextElementSibling.classList.remove('active2')

          handleMouseInteraction(targetParent2.nextElementSibling, false)
          handleMouseInteraction(targetParent2, false)

          let prevTranslateValue = Number(targetParent2.parentElement.style.transform.match(/\((.*?)%\)/)[1]) + transformWidth
          targetParent2.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }


      } else if (isNextButton) {

        if (count < childArrLength - 2) {

          targetParent2.previousElementSibling.classList.remove('active1')
          targetParent2.classList.add('active1')
          targetParent2.classList.remove('active2')
          targetParent2.nextElementSibling.classList.add('active2')
          handleMouseInteraction(targetParent2.previousElementSibling, false)
          handleMouseInteraction(targetParent2, false)

          let prevTranslateValue = Number(targetParent2.parentElement.style.transform.match(/\((.*?)%\)/)[1]) - transformWidth
          targetParent2.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }
      }
    }
    else if (targetParent1.classList.contains('prev') || targetParent1.classList.contains('next')){
      childArr = Array.from(Array.from(targetParent1.parentElement.children).find(element => element.classList.contains("dan-carousel")).children)
      childArrLength = childArr.length
      let active1Ele;
      let active2Ele;

      for (const element of childArr) {
        if (element.classList.contains('active1')) {
          active1Ele = element; 
        }
        else if(element.classList.contains('active2')){
          active2Ele = element; 
        }
      }

      for (const element of childArr) {
        if (element.classList.contains('active1')) {
          break; 
        }
        count++
      }
      if (isPrevButton) {
        if (isMobile && mobileReachEnd){
          console.log(mobileReachEnd)
          mobileReachEnd = false
          let prevTranslateValue = Number(active1Ele.parentElement.style.transform.match(/\((.*?)%\)/)[1]) + transformWidth
          active1Ele.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }
        else if (count != 0) {
          active1Ele.previousElementSibling.classList.add('active1')
          active1Ele.classList.remove('active1')
          active1Ele.classList.add('active2')
          active1Ele.nextElementSibling.classList.remove('active2')

          handleMouseInteraction(active1Ele.nextElementSibling, false)
          handleMouseInteraction(active1Ele, false)

          let prevTranslateValue = Number(active1Ele.parentElement.style.transform.match(/\((.*?)%\)/)[1]) + transformWidth
          active1Ele.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }

      } else if (isNextButton) {

        if (count < childArrLength - 2) {

          active2Ele.previousElementSibling.classList.remove('active1')
          active2Ele.classList.add('active1')
          active2Ele.classList.remove('active2')
          active2Ele.nextElementSibling.classList.add('active2')
          handleMouseInteraction(active2Ele.previousElementSibling, false)
          handleMouseInteraction(active2Ele, false)

          let prevTranslateValue = Number(active2Ele.parentElement.style.transform.match(/\((.*?)%\)/)[1]) - transformWidth
          active2Ele.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }
        else if (isMobile && count == childArrLength - 2 && mobileReachEnd==false){
          mobileReachEnd = true
          let prevTranslateValue = Number(active2Ele.parentElement.style.transform.match(/\((.*?)%\)/)[1]) - transformWidth
          active2Ele.parentElement.style.transform = `translateX(${prevTranslateValue}%)`;
        }
      }

    }
  }
}

danCarousel.forEach(item1 => {
  Array.from(item1.children).forEach(item => {
    item.addEventListener('mouseover', () => handleMouseInteraction(item, true));
    item.addEventListener('mouseout', () => handleMouseInteraction(item, false));
  });
})
document.addEventListener('click', handleCarouselClick);

// Initial setup
let danCurrentIndex = [];

setItemWidth();
transformDanCarousel();
initActive();
