import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Search = ({ handleSearchChange }) => {
  return (
    
    <div>Search for a country
      <input onChange={ handleSearchChange } />
    </div>
  )
}

const Country = ({country, setShowCountry, showCountry}) => {
  console.log('call to country', country)
  const handleShowClick = (event) => {
    
    setShowCountry(showCountry.concat(country))
    console.log('bttn clicked', country.name, showCountry)
    }
      
    return (
    <div>
    {country.name} 
    <button onClick={handleShowClick}>show</button>
    </div>
  )
}

const WeatherInfo = ({countryName, weather}) => {
  console.log('wheether', weather.length)
  if (weather.length > 0) {
    console.log('truee')
   // console.log('wheether', weather.main.temp)
    return(
      <div>
      <h3>Weather for {weather[0].name}
      </h3>
      <img alt='weather' title={weather[0].weather[0].description} height='100' src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@4x.png`}/>
      <p>Temperature {weather[0].main.temp} Celsius</p>
      <p>Feels like: {weather[0].main.feels_like} Celsius</p>
      <p>Humidity {weather[0].main.humidity}%</p>
      <p>Wind Speed {weather[0].wind.speed}mph</p>
    </div>
    )
  }
  else return (

    <div>
      <h3>Weather
      </h3>Weather data not ready yet
    </div>
  )
  }

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    //console.log(countryName)
    console.log('EFFECTOO', country.capital)
    axios
    .get('http://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + api_key + '&units=metric')
    .then(response => {
      console.log('weather',response.data)
      setWeather([].concat(response.data))
    })
    .catch(e => {console.log(e)})
  }, [country.capital])


  return (
    <div>
    <img className="photo" height="150" alt="flag" src={country.flag}/>
    <h2>{country.name} </h2> 
    <p><b>Population</b> {country.population} </p>
    <p><b>Capital</b> {country.capital} </p>
    <div>
      <h3>Languages</h3>
      {country.languages.map(language => <p key={language.name}>{`${language.name}`}</p>)}
    </div>
    <WeatherInfo countryName={country.name} weather={weather}/>
  </div>
  )
}
const CountryDisplay = ({ countries, searchValue, showCountry, setShowCountry }) => {
  console.log('SHOWCOUNTRY', showCountry)
  if (showCountry) console.log('showcountry is true')
  let countriesFiltered = countries.filter(
    country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
    
    if (searchValue === 'undefined') return (
    <div>please enter a country to search for</div>
    )

        if (countriesFiltered.length === 1) {
              // && countriesFiltered[0].name.toLowerCase() === searchValue.toLowerCase())
              console.log('=1')
              
          let country = countriesFiltered[0];
          return <CountryInfo country={country} />
        }

  if (showCountry.length > 0) {
    console.log('showcountry.length >0')
    return <CountryInfo country={showCountry[0]} />
  }
  if (countriesFiltered.length >= 10) {
    console.log('> 10')
    return (
      <div>
        please further specify your search
      </div>
    )
  }

  if (countriesFiltered.length <= 10) {
    console.log('< 10')
    return (
      <div>
        {countriesFiltered.map(country => {
          return <Country key={country.name} country={country} setShowCountry={setShowCountry} showCountry={showCountry} />
        })}
      </div>
    )
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('undefined')
  const [showCountry, setShowCountry] = useState([])
  

  const handleSearchChange = (event) => {
   // console.log(event.target.value)
    setSearchValue(event.target.value)
    if (showCountry.length > 0) setShowCountry([])
  }

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      console.log('response received', response)
    })
  }, [])
  console.log('render', countries.length, 'countries')

 
  //console.log('counteries filtered', countriesFiltered)

  return (
    <div>
      <h1>Countries</h1>
      
      <Search handleSearchChange={handleSearchChange} />
      <CountryDisplay countries={countries} searchValue={searchValue} showCountry={showCountry} setShowCountry={setShowCountry} />

    </div>
  )
}

export default App