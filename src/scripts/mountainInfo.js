"use strict"

import { mountainsArray } from "./data/mountainData.js"


function populateMountOptions(){
    let mountainOptions = document.getElementById('mountains');
    mountainsArray.forEach((mountain) => {
        let newOption = new Option(mountain.name)
        mountainOptions.appendChild(newOption)
    })
}

async function populateMountainInfo(selected) {
    let chosenMt = mountainsArray.filter((mountain) => mountain.name === selected)[0];
    let sunData = await getSunriseSunset(chosenMt);
    let dawn = sunData.dawn;
    let dusk = sunData.dusk;
    let mountainDesc = document.getElementById('mountain-desc');
    let mountainElev = document.getElementById('mt-elev');
    let mountainName = document.getElementById('mt-name');
    let mountainDawn = document.getElementById('mt-sunrise');
    let mountainDusk = document.getElementById('mt-sunset');
    let mountainEffort = document.getElementById('mt-effort');
    mountainDesc.innerHTML = chosenMt.desc
    mountainElev.innerHTML = chosenMt.elevation
    mountainName.innerHTML = chosenMt.name
    mountainEffort.innerHTML = chosenMt.effort
    mountainDawn.innerHTML = dawn;
    mountainDusk.innerHTML = dusk;
    document.getElementById("mountain-img").src=`../../assets/${(chosenMt.img)}`;
}

async function selectHandler(event) {
    populateMountainInfo(event.target.value)
}

async function getSunriseSunset(mt) {
    const response = await fetch(`https://api.sunrisesunset.io/json?lat=${mt.coords.lat}&lng=${mt.coords.lng}`)
    const times = await response.json();
    return {
        'dawn': times.results.dawn,
        'dusk': times.results.dusk
    }
}

window.addEventListener('load', (event) => {
    populateMountOptions();
    let mountainSelect = document.getElementById('mountains')
    mountainSelect.addEventListener('change', selectHandler)
    populateMountainInfo(mountainsArray[Math.floor(Math.random() * mountainsArray.length)].name)

})
