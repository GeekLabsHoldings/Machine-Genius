'use client' // Indicate that this component is intended for client-side rendering
import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import CustomBtn from '../_components/Button/CustomBtn'; // Custom button component
import styles from './signin.module.css'; // Stylesheet for SignIn component
import logoTextImg from '@/public/assets/welcome logo.svg' // Image asset for welcome logo text
import logo_image from '@/public/assets/logo.svg' // Image asset for logo
import Image from 'next/image'; // Image component from Next.js
import { useRouter } from 'next/navigation'; // Importing useRouter hook from Next.js

// SignIn component
const SignIn = () => {

    // State to manage animation
    const [StartAnimation, setStartAnimation] = useState(false)
    // State to manage showing sign-in form
    const [ShowSignInForm, setShowSignInForm] = useState(false)
    // State to manage showing welcome message
    const [ShowWelcomeMesage, setShowWelcomeMesage] = useState(false)

    // Router instance
    const router = useRouter()

    // Function to handle login action
    const handleLogin = () => {
        let logInLogo: any = document.querySelector('.signin-wrapper img')
        logInLogo.style.transform = 'scale(150)';
        setShowWelcomeMesage(true)

        // Redirect to dashboard after a delay
        // setTimeout(() => {
        //     router.push('')
        // }, 500); // 3000 milliseconds = 3 seconds
    }

    // useEffect hook to trigger animation
    useEffect(() => {
        setStartAnimation(true)
    }, [])

    return (
        <div className='flex items-center justify-center w-[100vw] h-[100vh] fixed top-0 left-0 overflow-hidden' style={{ zIndex: 99999999999999, background: "var(--dark)" }}>

            {/* Welcome section */}
            <div className={`${styles.welcomePart} welcom-wrapper ${StartAnimation ? styles.startAnimation : ''} ${ShowSignInForm ? styles.hide : ''}`}>
                <h1>Welcome To </h1>
                <Image src={logoTextImg} height={100} alt='' />
                <CustomBtn word='Enter' btnColor='white' href='#' onClick={() => setShowSignInForm(true)} />
            </div>

            {/* Sign-in form */}
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

            {/* Welcome message */}
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