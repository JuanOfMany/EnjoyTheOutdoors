"use strict"

import { mountainsArray } from "./data/mountainData.js"


window.addEventListener('load', (event) => {
    let mountainOptions = document.getElementById('mountains');
    mountainsArray.forEach((mountain) => {
        let newOption = new Option(mountain.name)
        mountainOptions.appendChild(newOption)
    })
    console.log(mountainsArray[Math.floor(Math.random() * mountainsArray.length)].img)
    document.getElementById("mountain-img").src=`../../assets/${(mountainsArray[Math.floor(Math.random() * mountainsArray.length)].img)}`;
})
