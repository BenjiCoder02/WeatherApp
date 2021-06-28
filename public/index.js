//Query Selectors

let bar1 = document.querySelector("#one")
let bar2 = document.querySelector("#two")
let bar3 = document.querySelector("#three")
let bgColor = document.querySelector("body")

//Blinking buttons

function blink(){
    setInterval(() => {
        setTimeout(() => {
            bar1.classList.toggle("blink")
      
        }, 1000);
    }, 1000);

    setInterval(() => {
        setTimeout(() => {
            bar2.classList.toggle("blink")
      
        }, 1500);
    }, 1000);


    setInterval(() => {
        setTimeout(() => {
            bar3.classList.toggle("blink")
      
        }, 2000);
    }, 1000);
}

