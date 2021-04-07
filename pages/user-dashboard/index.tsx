import { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import axios from 'axios';

import UserInterface from 'interfaces/user';
import UserInfoBar from '@/components/user-dashboard-component/UserDashboardInfo/UserInfoBar';
import UserReservation from '@/components/user-dashboard-component/UserReservation/UserReservation';

import styles from '@/styles/layout.module.scss';

interface Props {
    user: UserInterface;
}

const UserProfilePage: NextPage<Props> = ({ user }) => {

    return(
        <div className={styles.reservations}>
            <UserInfoBar user={user} />
            <UserReservation />
        </div>
       
    )
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps<Props>  = async (ctx) => {

    const { token } = parseCookies(ctx);
    const url = `http://localhost:3000/api/user-profile/profile`;

    const response = await axios.get(url, { headers: { Authorization: token } });
    
    if ( !response || !token ) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
    }

    return {
       props: {  user: response.data.user }
    };
}
