'use client'
import { useEffect, useState } from 'react';
import CustomBtn from '../_components/Button/CustomBtn';
import styles from './signin.module.css';
import logoTextImg from '@/public/assets/welcome logo.svg'
import logo_image from '@/public/assets/logo.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignIn = () => {

    const [StartAnimation, setStartAnimation] = useState(false)
    const [ShowSignInForm, setShowSignInForm] = useState(false)
    const [ShowWelcomeMesage, setShowWelcomeMesage] = useState(false)

    const router = useRouter()


    const handleLogin = () => {
        let logInLogo: any = document.querySelector('.signin-wrapper img')
        logInLogo.style.transform = 'scale(150)';
        setShowWelcomeMesage(true)


        // setTimeout(() => {
        //     // Your action here
        //     router.push('')

        // }, 500); // 3000 milliseconds = 3 seconds

    }

    useEffect(() => {
        setStartAnimation(true)
    }, [])


    return (

        <div className='flex items-center justify-center w-[100vw] h-[100vh] fixed top-0 left-0 overflow-hidden' style={{ zIndex: 99999999999999, background: "var(--dark)" }}>

            <div className={`${styles.welcomePart} welcom-wrapper ${StartAnimation ? styles.startAnimation : ''} ${ShowSignInForm ? styles.hide : ''}`}>
                <h1>Welcome To </h1>
                <Image src={logoTextImg} height={100} alt='' />
                <CustomBtn word='Enter' btnColor='white' href='#' onClick={() => setShowSignInForm(true)} />
            </div>

            <div className={`${styles.signin_wrapper} signin-wrapper  ${ShowSignInForm ? styles.show : ''} `}>

                <div className={styles.logo_title}>
                    <Image src={logo_image} height={100} alt='' />
                    <h3>Sign In</h3>
                </div>

                <div className={styles.form_group}>
                    <input type="text" name='email' placeholder='Email' />
                </div>

                <div className={styles.form_group}>
                    <input type="password" name='email' placeholder='Password' />
                </div>

                <CustomBtn word='Sign In' btnColor='black' onClick={handleLogin} />

            </div>

            <div className={`${styles.hi_message} ${ShowWelcomeMesage ? styles.show : ''}`}>
                <h2>
                    Hi Mostafa, <br />
                    Let’s have a productive day!
                </h2>
                <CustomBtn btnColor='black' word='Dashboard' href='/content-creator/dashboard' />
            </div>
        </div>
    )
}

export default SignIn