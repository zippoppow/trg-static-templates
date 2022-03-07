/** credit to Luke Jackson: https://github.com/lukejacksonn/GreedyNav
 * his logic.
 * i just reworked for vanilla js.
 */

const navEl = document.querySelector('.nav__main');
const navBtnEl = document.querySelector('.nav__main button');
const navVisibleLinks = document.querySelector('.nav__main .visible-links');
const navHiddenLinks = document.querySelector('.nav__main .hidden-links');

let breaks = [];

function updateNav(){

    const availableSpace = document.querySelector("button[class='.hidden']") ? navEl.clientWidth : navEl.clientWidth - navBtnEl.clientWidth - 30;
    
    console.log('navEl.clientWidth: ' + navEl.clientWidth);
    console.log('navBtnEl.clientWidth: ' + navBtnEl.clientWidth);
    console.log('navBtnEl.clientWidth - 30: ' + (navBtnEl.clientWidth - 30));
    console.log('availableSpace: ' + availableSpace);


    //The visible list is overflowing the nav
    if(navVisibleLinks.clientWidth > availableSpace){
        console.log('The visible list is overflowing the nav');

        //record the width of the list
        breaks.push(navVisibleLinks.clientWidth);
        console.log('breaks.length: ' + breaks.length);

        //move item to the hidden list
        navHiddenLinks.appendChild(navVisibleLinks.lastElementChild);
        console.log("navHiddenLinks: " +  navHiddenLinks.lastElementChild.textContent);

        //show the dropdown button
        if(navBtnEl.classList.contains('hidden')){
            navBtnEl.classList.remove('hidden');
        }

    } else {
        console.log('The visible list is NOT overflowing the nav');

        // There is space for another item in the nav
        if(availableSpace > breaks[breaks.length-1]) {

            //move the item to the visible list
            navVisibleLinks.appendChild(navHiddenLinks.firstElementChild);
            console.log("navHiddenLinks: " +  navVisibleLinks.firstElementChild.textContent);

            breaks.pop();
        }

        if(breaks.length < 1){
            navBtnEl.classList.add('hidden');
            navHiddenLinks.classList.add('hidden');
        }
    }

    //keep the button counter updated
    navBtnEl.setAttribute('count', breaks.length);

    //recur
    if(navVisibleLinks.clientWidth > availableSpace){
         updateNav();
    }

}

function toggleHidden(e){
    this.classList.toggle('hidden');
}

navBtnEl.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('hidden');
});

window.addEventListener('resize', function() {
   // console.log('window resized')
    updateNav();
    
});

updateNav();