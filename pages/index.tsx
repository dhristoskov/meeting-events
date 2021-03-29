import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from 'axios';

import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantInterface from "interfaces/restaurant";

import styles from '@/styles/restaurant.module.scss';

interface Props {
  restaurants: RestaurantInterface[];
}

const Home: NextPage<Props> = ({ restaurants }) =>  {

  const router = useRouter()

  const onCardOpen = (id: string): void => {
    router.push(`/restaurants/${id}`)
  }

  return (
    <div className={styles.wrapper}>
      {
        restaurants.map( item => {
          return (
            <RestaurantCard restaurant={item} onCardOpen={onCardOpen} key={item._id}/>
          )
        })
      }
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<Props>  = async () => {

  const url = `http://localhost:3000/api/restaurant/options`;

  const response = await axios.get(url);

  if ( !response  ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  }

  return {
     props: {  restaurants: response.data.restaurants }
  };
}
