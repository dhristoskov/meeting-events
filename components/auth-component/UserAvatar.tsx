import { ChangeEvent, FormEvent, useState } from "react";
import { NextPage } from "next";
import axios from 'axios';

import UserInterface from "interfaces/user";

interface Props {
    user: UserInterface;
    changeImageHandler: (data: {avatar: string} ) => void;
}

const UserAvatar: NextPage<Props> = ({ user, changeImageHandler }) => {

    const [ url, setUrl ] = useState<string>('')

    const onImageUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        // const url = 'https://api.cloudinary.com/v1_1/eventsgallery/image/upload';
        const files = e.target.files;
        const data = new FormData();

        data.append('file', files[0]);
        data.append('upload_preset', 'events');
        data.append('cloud_name', 'eventsgallery');

        const response = await axios.post(process.env.CLOUDINARY_URL, data);
        const mediaUrl = response.data.url;

        setUrl(mediaUrl);
    }

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const data = { avatar: url }
        changeImageHandler(data);
        setUrl('');
    };

    return(
        <form onSubmit={onHandleSubmit}>
            {
                !url &&
                <label htmlFor="file">
                    {
                        user.avatar === 'no-data' 
                        ? <span>Add</span>
                        : <span>Change</span>
                    }               
                    <input type="file" id='file' placeholder='Upload image' accept="image/*" onChange={onImageUploadHandler}/>
                </label>
            }           
            {
                url &&  <input type='submit' value='confirm' />
            }       
        </form>
    )
}

export default UserAvatar;