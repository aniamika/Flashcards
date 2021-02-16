﻿document.addEventListener("DOMContentLoaded", function () {

    const hamburgerButton = document.querySelector(".header__hamburger-button");

    hamburgerButton.addEventListener('click', event => {
        const headerNavigation = document.querySelector(".header__navigation");
        headerNavigation.classList.toggle("is-open");
        console.log("click");
    });




});