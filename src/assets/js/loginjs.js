

function myFunction() {
    var x = document.getElementById("myInput");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if (x.type === 'password') {

        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";

    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}


function menuToggle() {
    document.getElementById("dropDown").classList.toggle("active");


    window.onclick = function (event) {
        if (!event.target.matches('.arrow')) {
            var dropdowns = document.getElementsByClassName("active");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var opendowns = dropdowns[i];
                if (opendowns.classList.contains('active')) {
                    opendowns.classList.remove('active');
                }
            }
        }
    }
}


function toggleNotifi() {
    document.getElementById("box").classList.toggle("activeNot");


    window.onclick = function (e) {
        if (!e.target.matches('.far')) {
            var dropdown = document.getElementsByClassName("activeNot");
            var i;
            for (i = 0; i < dropdown.length; i++) {
                var opendropdowns = dropdown[i];
                if (opendropdowns.classList.contains('activeNot')) {
                    opendropdowns.classList.remove('activeNot');
                }
            }
        }
    }
}






//image script
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {

    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    let i;
    let slides = document.getElementsByClassName("topimg");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

}






//recent project script
function slide() {
    const productContainers = [...document.querySelectorAll('.rpbox')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];




    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })

    })
}


function slide1() {
    const productContainers = [...document.querySelectorAll('.sdep')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];




    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })

    })
}

function popup(){
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}



function sponsor(){
    $('#sponsor-carousel').carousel({
        interval: 3000,
        cycle: true
      }); 
}



