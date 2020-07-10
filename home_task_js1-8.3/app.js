'use strict';

let calc = {
	buttons: document.querySelectorAll('td'),
	screen: document.querySelector('.screen'),
	panel: document.querySelector('.buttons'),
	a: null,
	currentAction: null,
	needToClearScreenAfter: false,
	valueOnScreenAllowedToChange: true,
	initEventHandlers() {
        this.panel.addEventListener('click', event => this.buttonClickHandler(event));
    },
    buttonClickHandler(event) {
    	
    	let typyOfButton = event.target.classList;
    	switch (typyOfButton.value) {
  			case 'number':
  				this.clearScreen();
  				if (this.screen.innerText.length >= 13) {
  					break;
  				}
  				this.addNumberOnScreen(event);
  				this.valueOnScreenAllowedToChange = true;  				
  				break;
			case 'action':
				if (this.currentAction == null || isNaN(this.a)) {
					this.saveArgument();
		    		this.getAction(event);		    		
				} else {
					this.count(); 
					this.showResult(); 
					this.getAction(event); 
				}
	    		this.needToClearScreenAfter = true;
			    break;
			case 'clear':
			    this.needToClearScreenAfter = true;
			    this.clearScreen();
			    this.clearCurrentAction();
			    this.clearArgument();
			    break;
			case 'backspace':
				if (this.valueOnScreenAllowedToChange == false) {
					break;
				}
			    this.deleteLastSymbol();
			    break;
			case 'sign':
			    this.changeSign();
			    break;
			case 'equals':
				if (this.a == null || this.currentAction == null) {
					break;
				}
				this.clearScreen();
			    this.count();
			    this.showResult();
			    this.clearArgument();
			    this.clearCurrentAction();
			    this.needToClearScreenAfter = true;
			    break;
		}
    },

    deleteLastSymbol() {
    	this.screen.innerText = this.screen.innerText.slice(0, this.screen.innerText.length - 1)
    },

    addNumberOnScreen(event) {
    	if (event.target.innerText == '.' && this.screen.innerText.includes('.')) {
	  		return;
	  	}
    	if (event.target.innerText == '.' && this.screen.innerText == '') {
  			this.screen.innerText = '0.';
  		} else {
  			this.screen.innerText += event.target.innerText;
  		}	    	
    },

    clearScreen() {
    	if (this.needToClearScreenAfter) {
    		this.screen.innerText = '';
    		this.needToClearScreenAfter = false;
    	}    	
    },

    saveArgument() {
    	this.a = +this.screen.innerText;
    },

    clearArgument() {
    	this.a = null;
    },
    
    addition() {
    	this.a += +this.screen.innerText;
    },
    
    subtraction() {
    	this.a -= +this.screen.innerText;
    },

    multiplication() {
    	this.a *= +this.screen.innerText;
    },

    division() {
    	if (this.screen.innerText == '0') {
    		this.a = 'No way!';
    		return;
    	}
    	this.a /= +this.screen.innerText;
    	this.a = this.a.toFixed(11);
    },

    getAction(event) {
    	this.currentAction = event.target.id;
    },

    clearCurrentAction() {
    	this.currentAction = null;
    },

    changeSign() {
    	if (this.screen.innerText == '' || !this.valueOnScreenAllowedToChange) {
    		return;
    	}
    	else if (!this.screen.innerText.includes('-')) {
    		this.screen.innerText = '-' + this.screen.innerText;
    	} else {    		
    		this.screen.innerText = this.screen.innerText.slice(1, this.screen.innerText.length);
    	}    	
    },

    count() {
		switch (this.currentAction) {
  			case 'addition':
  				this.addition();
  				break;
			case 'subtraction':
				this.subtraction();
			    break;
			case 'multiplication':
			    this.multiplication();
			    break;
			case 'division':
			    this.division();
			    break;
		}
    },

    showResult() {
		this.a = String(this.a);
		if (this.a.length > 13) {
			this.a = this.a.slice(0, 13);
		}
		this.screen.innerText = this.a;
		this.valueOnScreenAllowedToChange = false;
    },
    }

window.addEventListener('load', function() {
	calc.initEventHandlers();
});


