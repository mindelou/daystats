//Add Enter button functionality
document.getElementById("search-field").addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            document.getElementById("search-btn").click();
        }
    });

    //api key
const KEY = 'c7365ad529b35258113538c5e6855e87';
const searchItems = () =>{
    const searchText =document.getElementById('search-field').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=${KEY}`
    fetch(url)
        .then(response =>response.json())
        .then(data => showUpdates(data))
    .catch(error => showError())
    toggleSpinner();
}
//show Error 
const showError = () =>{
    document.getElementById('city').classList.add('d-none');
    document.getElementById('show-error').innerText = 'Unknown Location';
    toggleSpinner();
}
//show weather showUpdates
const showUpdates = data => {
    document.getElementById('show-error').innerText = '';
    document.getElementById('city').classList.remove('d-none');
    document.getElementById('city-title').innerText = data.name || '';
    document.getElementById('city-temp').innerHTML = `${data.main.temp} <span>&deg;C</span>`;
    document.getElementById('city-lead').innerText = data.weather[0].main;
    document.getElementById('icon').setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    toggleSpinner();
}
//spinner
const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.toggle('d-none');
}
