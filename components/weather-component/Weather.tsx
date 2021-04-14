import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "axios";

import { Notification } from "context/notification-context/Notification";
import RestaurantInterface from "interfaces/restaurant";

import styles from '@/styles/weather.module.scss';


interface Props {
    restaurant: RestaurantInterface;
}

const Weather: NextPage<Props> = ({ restaurant }) => {

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${restaurant.area}&days=7&aqi=no&alerts=no`

    const { showNotification } = useContext(Notification);
    const [ forecast, setForecast ] = useState<any>([]);
    const [ current, setCurrent ] = useState<any>({});

    useEffect(() => {
        axios.get(url)
             .then(res => {
                setForecast(res.data.forecast.forecastday);
                setCurrent(res.data.current);
             }).catch(err => {
                showNotification({message: 'Can not load a weather forecast', type: 'alert'});
             });
      }, []);

      return (
          <div className={styles.main}>
              <div className={styles.current}>
                <p>{restaurant.area}</p>
                <p className={styles.condition}>{ ((current || {}).condition || {}).text }</p>
                <img className={styles.img} src={ ((current || {}).condition || {}).icon } alt='icon'/>
                <div className={styles.temp}>
                    <p>Now: {current.temp_c} ℃ </p>
                    <p>Feels like: { current.feelslike_c} ℃</p>
                </div>
              </div>     
              <div className={styles.forecast}>
                  {
                      forecast.map((item: any, index: string) => {
                          return(
                              <div key={index} className={styles.day}>
                                  <p className={styles.date}>{new Date(item.date).toLocaleDateString('de-DE',  { weekday: 'long'})}</p>
                                  <p className={styles.condition}>{ (((item || {}).day || {}).condition || {}).text }</p>
                                  <img className={styles.img} src={ (((item || {}).day || {}).condition || {}).icon } alt='icon'/>
                                  <div className={styles.temp}>
                                    <p className={styles.max}>{ item.day.maxtemp_c } ℃</p>
                                    <p className={styles.min}>{ item.day.mintemp_c } ℃</p>
                                  </div>                        
                              </div>
                          )
                      })
                  }
              </div>
          </div>
      )

}

export default Weather;