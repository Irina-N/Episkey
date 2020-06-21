"use strict"

	let buttonOpen = document.querySelector(".open-modal-window-btn");
	let modalWindow = document.querySelector(".modal-window");
	let buttonClose = document.querySelector(".close-modal-window-btn");

	buttonOpen.addEventListener("click", function() {
		modalWindow.classList.remove("hidden");
		modalWindow.classList.add("animate__flipInX");
		modalWindow.classList.remove("animate__flipOutX");
	});

	buttonClose.addEventListener("click", function() {
		modalWindow.classList.remove("animate__flipInX");
		modalWindow.classList.add("animate__flipOutX");
		setTimeout(function() {
			modalWindow.classList.add("hidden");
		}, 1000);
	});

