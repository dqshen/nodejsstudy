const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */
const imgs = [`pic1.jpg`, `pic2.jpg`, `pic3.jpg`, `pic4.jpg`, `pic5.jpg`];
imgs.forEach(img => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/` + img);
    newImage.onclick = function (evt) {
        displayedImage.src = evt.target.src;};
    thumbBar.appendChild(newImage);
});


/* Wiring up the Darken/Lighten button */

btn.onclick = changeOverlay;

function changeOverlay(evt) {
    if (btn.getAttribute(`class`) === `dark`) {
        btn.setAttribute(`class`,`light`);
        btn.textContent = `Lighten`;
        overlay.style.backgroundColor = `rgba(0,0,0,0.5)`;
    }
    else{
        btn.setAttribute(`class`,`dark`);
        btn.textContent = `Darken`;
        overlay.style.backgroundColor = `rgba(0,0,0,0)`;
    }
}

