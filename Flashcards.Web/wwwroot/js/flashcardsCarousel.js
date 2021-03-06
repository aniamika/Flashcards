﻿
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		const response = await fetch(endpoint);
		const flashcardsData =await response.json();
		const flashcardsObjArray = flashcardsData.data;

		//const btnsContainer = document.getElementById('btn-container');
		const prevBtn = document.getElementById("prev");
		const nextBtn = document.getElementById("next");
		const titleContainer = document.querySelector("#flashcard-title h2");
		const descriptionContainer = document.querySelector("#flashcard-description p");

		//Sprawdzam czy w bazie są fiszki
		if (flashcardsObjArray.length > 0) {

			let index = 0;       //zmienna do nawigacji po tablicy fiszek

			// wyświetlanie treści fiszki, obsługa karuzeli
			displayFirstFlashcard(titleContainer, descriptionContainer, flashcardsObjArray, index);

			navigateCarousel(nextBtn, prevBtn, titleContainer, descriptionContainer, flashcardsObjArray, index);
		
		} else {

			alert("Sorry, there is no flashcards in here! Hit the Create button!");
			
		}


//---------- deklaracje funkcji użytych powyżej -------------------
		function displayFirstFlashcard(htmlTitleEl,htmlDescrEl,data, i) {
			htmlTitleEl.textContent = `${data[i].title}`;
			htmlDescrEl.textContent = `${data[i].description}`;
		}

		function navigateCarousel(htmlNextBtnEl, htmlPrevBtnEl, htmlTitleEl, htmlDescrEl, data, i ) {
			htmlNextBtnEl.addEventListener("click", event => {
				i++;
				if (i > data.length - 1) {
					i = 0;
				}
				htmlTitleEl.textContent = `${data[i].title}`;
				htmlDescrEl.textContent = `${data[i].description}`;
				return i;
			});

			htmlPrevBtnEl.addEventListener("click", event => {
				i--;
				if (i < 0) {
					i = data.length - 1;
				}
				htmlTitleEl.textContent = `${data[i].title}`;
				htmlDescrEl.textContent = `${data[i].description}`;
				return i;
			});
			return i;
		}

		
	};
	getAll();
});
