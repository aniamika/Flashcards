﻿
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM ready to use!");

	const endpoint = "/api/getAll";

	async function getAll() {

		//dodać walidację jeśli nie będzie żadnej fiszki
		const response = await fetch(endpoint);
		const flashcardsData =await response.json();
		const flashcardsObjArray = flashcardsData.data;

		const btnsContainer = document.getElementById('btn-container');
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

			// wyświetlenie i obsługa buttonów CREATE, EDIT, DELETE
			displayAllButtons(btnsContainer, flashcardsObjArray, index);

			

		} else {

			alert("Sorry, there is no flashcards in here! Hit the Create button below!");
			//jeśli w bazie nie ma fiszek to wyświetla się wyłącznie button CREATE
			displayCreateButton(btnsContainer);
		}


//---------- deklaracje funkcji użytych powyżej -------------------
		function displayFirstFlashcard(htmlTitleEl,htmlDescrEl,data, i) {
			htmlTitleEl.innerHTML = `${data[i].title}`;
			htmlDescrEl.innerHTML = `${data[i].description}`;
		}

		function navigateCarousel(htmlNextBtnEl, htmlPrevBtnEl, htmlTitleEl, htmlDescrEl, data, i ) {
			htmlNextBtnEl.addEventListener("click", event => {
				i++;
				if (i > data.length - 1) {
					i = 0;
				}
				htmlTitleEl.innerHTML = `${data[i].title}`;
				htmlDescrEl.innerHTML = `${data[i].description}`;
				return i;
			});

			htmlPrevBtnEl.addEventListener("click", event => {
				i--;
				if (i < 0) {
					i = data.length - 1;
				}
				htmlTitleEl.innerHTML = `${data[i].title}`;
				htmlDescrEl.innerHTML = `${data[i].description}`;
				return i;
			});
			return i;
		}

		function displayAllButtons(htmlDivEl ,data, i) {
			htmlDivEl.innerHTML = `
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Create</span>
				</a>	
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/Edit/${flashcardsObjArray[i].id}">
					<i class="icon icon--xs icon--edit flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Edit</span>
				</a>
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/Delete/${flashcardsObjArray[i].id}">
					<i class="icon icon--xs icon--delete flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Delete</span>
				</a>
				`;
		}
		function displayCreateButton(htmlDivEl) {
			htmlDivEl.innerHTML = `
				<a class="button button--secondary flashcards-page__button" href="/Flashcards/ShowForm">
					<i class="icon icon--xs icon--add flashcards-page__button-icon"></i>
					<span class="flashcards-page__button-text">Create</span>
				</a>	
			`;
		}
	};
	getAll();
});
