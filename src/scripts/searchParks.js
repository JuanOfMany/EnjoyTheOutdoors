"use strict"

import { nationalParksArray } from './data/nationalParkData.js'
import { parkTypesArray } from './data/parkTypeData.js'

function getAllParks() {
    return nationalParksArray;
}

function getLocations() {
    let stateArr = nationalParksArray.map((park) => park.State)
    let uniqueStateArr = stateArr.filter((state, index, arr) => {
        return arr.indexOf(state) === index
    })
    return uniqueStateArr;
}

function filterByState(state) {
    let matchedStateArr = nationalParksArray.filter((park) => park.State === state)
    return matchedStateArr;
}

function getParkTypes() {
    return parkTypesArray;
}

function filterParkType(type) {
    let matchedParkTypeArr = nationalParksArray.filter((park) => park.LocationName.toUpperCase().includes(type.toUpperCase()))
    return matchedParkTypeArr;
}

function populateTable(arrOfParks) {
    let parkTable = document.getElementById('park-table')
    arrOfParks.forEach((park) => {
        let newRow = parkTable.insertRow()
        newRow.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:text-white', 'px-6', 'py-4')
        let nameCell = newRow.insertCell(0)
        let cityCell = newRow.insertCell(1)
        let stateCell = newRow.insertCell(2)
        let visitCell = newRow.insertCell(3)
        if (park.Visit) {
            visitCell.innerHTML = `<a target="_blank" href=${park.Visit}>${park.Visit}</a>`
        } else {
            visitCell.innerHTML = 'No Website Listed.'
        }
        nameCell.innerHTML = park.LocationName
        cityCell.innerHTML = park.City
        stateCell.innerHTML = park.State
        nameCell.classList.add('px-6', 'py-3')
    })
}

function showAllParks() {
    populateTable(nationalParksArray)
}

function populateOptions() {
    let locationOptions = document.getElementById('locations');
    getLocations().forEach((location) => {
        let newOption = new Option(location)
        locationOptions.appendChild(newOption)
    })

    let typeOptions = document.getElementById('park-types');
    getParkTypes().forEach((type) => {
        let newOption = new Option(type)
        typeOptions.appendChild(newOption)
    })
}

function addSelectListeners() {
    let parkTable = document.getElementById('park-table')
    let locationOption = document.getElementById('locations');
    let typeOptions = document.getElementById('park-types');
    locationOption.addEventListener('change', (event) => {
        parkTable.innerHTML = ''
        populateTable(filterByState(event.target.value))
    })
    typeOptions.addEventListener('change', (event) => {
        parkTable.innerHTML = ''
        populateTable(filterParkType(event.target.value))
    })
}

function addShowAllParksListener() {
    let showAllBtn = document.getElementById('show-all');
    showAllBtn.addEventListener('click', (event) => {
        event.preventDefault()
        populateTable(nationalParksArray)})
}

window.addEventListener('load', (event) => {
    populateOptions();
    addSelectListeners();
    addShowAllParksListener();
})
