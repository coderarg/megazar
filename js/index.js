const carrousel = document.getElementById('slide__container')
const images = document.querySelectorAll('.slide__img');

let len = 2;
let counter = 0;

setInterval(()=> {
    
    
    images.forEach(image => {
        image.classList.remove('to-front')
    })
    
    images[counter].classList.add('to-front');
    
    counter < len ? counter += 1 : counter = 0;

    
},3000)

console.log(images);