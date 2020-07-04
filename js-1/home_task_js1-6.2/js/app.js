'use strict';

let slider = {
    currentIndex: 0,
    photos: document.getElementsByClassName('slider-item'),
    buttons: document.querySelectorAll('i'),
    hidePhoto() {
		this.photos[this.currentIndex].classList.add('hidden');
    },
    moveLeft() {
    	this.hidePhoto();
    	if (this.currentIndex == 0) {
    		this.currentIndex = this.photos.length - 1;
    	} else {
    		this.currentIndex--;
    	}   
    	this.photos[this.currentIndex].classList.add('animate__fadeInRight');
    	this.photos[this.currentIndex].classList.remove('hidden'); 
    	setTimeout(function() {
			slider.photos[slider.currentIndex].classList.remove('animate__fadeInRight');
		}, 1000);    	
   	},
    moveRight() { 
		this.hidePhoto();
		if (this.currentIndex == this.photos.length - 1) {
    		this.currentIndex = 0;
    	} else {
    		this.currentIndex++;
    	} 
    	this.photos[this.currentIndex].classList.remove('hidden'); 
    	this.photos[this.currentIndex].classList.add('animate__fadeInLeft');
    	setTimeout(function() {
			slider.photos[slider.currentIndex].classList.remove('animate__fadeInLeft');
		}, 1000);  
    },
}

slider.buttons.forEach(function(button) {
	button.addEventListener("click", function(event) {
		if (event.target == slider.buttons[0]) {
			slider.moveLeft();
		} else if (event.target == slider.buttons[1]) {
			slider.moveRight();
		}
	})	
});