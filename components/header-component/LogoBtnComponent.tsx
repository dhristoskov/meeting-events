import Image from 'next/image';

const LogoBtnComponent = () => {

    return (
        <div>
            <Image src='/icons/logo.svg' alt='logo' width={35} height={35} />
        </div>
    )
}

export default LogoBtnComponent