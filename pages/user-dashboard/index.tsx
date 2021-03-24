import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import axios from 'axios';

import { UserInterface } from 'interfaces/user';

import styles from '@/styles/dashboard.module.scss';

interface Props {
    user: UserInterface;
}

const UserProfilePage: React.FC<Props> = ({ user }) => {

    const date = new Date(user.created).toLocaleDateString('en-GB')

    return(
        <div className={styles.submenu}>
            <div className={styles.profile}>
                <p>Username: <span>{user.username}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>{date}</p>
            </div>
            <div className={styles.settings}>
                <Link href='/user-dashboard/settings'>
                    <a className={styles.item}>Settings</a></Link>
            </div>      
        </div>
    )
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps  = async (ctx) => {

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
