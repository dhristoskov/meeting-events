import { useEffect, useState } from "react";
import axios from 'axios';

const CityPicker = () => {

    const [ cities, setCities ] = useState<{city: string}[]>([]) 

    useEffect(() => {
        const url = 'http://localhost:3000/api/restaurant/get-citynames';
        axios.get(url)
             .then( res => {
                setCities(res.data.cities)
            }).catch(err => {
                console.log(err)
            });
    }, [])

    return(
        <div>
            {
                cities.map(item => {
                    return (
                        <p key={item.city}>{ item.city }</p>
                    )
                })
            }
        </div>
    )
}

export default CityPicker;


  