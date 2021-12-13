import "./Country.css"
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'
import millify from "millify"

export interface CountryInterface {
    name: {
        common: string,
        official: string
    },
    independent: boolean,
    capital: Array<string>,
    description: string,
    region: string,
    subregion: string,
    latlng: Array<number>,
    area: number,
    flags: {
        png: string,
        svg: string
    },
    maps: {
        googleMaps: string
    },
    population: number,
    continents: Array<string>,
    capitalInfo: {
        latlng: Array<number>
    }
}

export function Country(country: CountryInterface): JSX.Element {
    return <Card sx={{ maxWidth: 345 }} onClick={() => { window.location.href = country.maps.googleMaps }}  >
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={country.flags.svg}
                alt={country.name.official}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {country.name.official}
                </Typography>

                {country.capital?.map((capital, i) => <Typography variant="subtitle1" key={i}> {capital}</Typography>)}

                <Typography variant="subtitle2" color="text.secondary">
                    Population: {millify(country.population)}
                </Typography>

                <Typography align="left" variant="body1" color="text.secondary">
                    {country.description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
}