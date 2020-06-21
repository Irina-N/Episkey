"use strict"

	const buttons = document.querySelectorAll("button");

	buttons.forEach(function(button) {
		button.addEventListener("click", function(event) {
			showMeSomthing(event);
		})
	})

	function showMeSomthing(clickedButtonEvent) {
		let productNode = clickedButtonEvent.target.parentNode;

		const product = {
			wrap: productNode,
			name: productNode.querySelector(".product-name"),
			img: productNode.querySelector(".photo"),
			button: productNode.querySelector(".btn"),
		}

		let buttonText = product.button.innerText;

		if (buttonText === "ПОДРОБНЕЕ") {
			showDescription(product);

		} else {
			showPhoto(product);
		}
	}

	function showDescription(product) {
		product.img.style.display = "none";
		let description = "<li>Сосотав: хлопок 80%, полиамид 17%, эластан 3%</li><li>Размеры: 39–41, 42–44</li><li>Страна-производитель: Польша;</li>";
		product.name.insertAdjacentHTML("afterend", `<ul class="desc">${description}</ul>`);
		product.button.innerText = "ОТМЕНА";
	};

	function showPhoto(product) {
		product.img.style.display = "block";
		product.button.innerText = "ПОДРОБНЕЕ";
		product.wrap.querySelector(".desc").remove();
	};

