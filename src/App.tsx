import "./App.css";
import { useState, useEffect } from "react"
import { Stack, Divider } from "@mui/material"
import Letter from './components/letter/Letter'
import { Country, CountryInterface } from './components/countries/Country'

async function fetchCountries(): Promise<CountryInterface[]> {
  const response = await fetch("https://restcountries.com/v3.1/all")
  return await response.json()
}

function App() {

  let [active, setActive] = useState(0)
  let [activeCountry, setActiveCountry] = useState(-1)
  let [countries, setCountries] = useState<CountryInterface[]>([])

  const alphabet: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  useEffect(() => {
    (async () => {
      const response = await fetchCountries()
      setCountries(response)
    })()
  }, [])

  const activate = (value: number) => {
    setActiveCountry(-1)
    setActive(value)
  }

  const fetchCountry = async (value: number) => {
    setActiveCountry(value)
    const country = sortedCountries[value]
    if (!country.description) {
      const wikiAPI = 'https://en.wikipedia.org/w/api.php'
      const params = `?origin=*&format=json&action=query&prop=extracts&explaintext&exsentences=3&titles=${country.name.common}`

      const response = await fetch(wikiAPI + params)
      const result = await response.json()
      countries = countries.map(node => {
        if (node.name.common === country.name.common)
          country.description = result.query.pages[Object.keys(result.query.pages)[0]].extract
        return node
      })
      setCountries(countries)
    }
  }

  const sortedCountries = countries.filter(country => country.name.common[0]?.toUpperCase() === alphabet[active])
  const sortedCountriesList = sortedCountries.map((country, i) => <div key={i} onClick={() => fetchCountry(i)} className="country-name">{country.name.common}</div>)

  return (
    <div className="App">
      <header className="App-header">
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction="row"
          spacing={1}>
          {alphabet.map((letter, i) => <Letter key={i} id={i} activate={activate} active={active} value={letter} />)}
        </Stack>
        <hr />
        {activeCountry !== -1 ? <Country {...sortedCountries[activeCountry]} /> : sortedCountriesList}
      </header>
    </div>
  )
}

export default App;
