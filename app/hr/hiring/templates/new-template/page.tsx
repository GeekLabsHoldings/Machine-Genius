import React from 'react'
import styles from './new-template.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'


const addIcon = <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z" fill="#FFFFFB" />
</svg>


const options = ['jop listings','tasks','offers','HR Questions','jop listings','tasks','offers','HR Questions'] ;

const page = () => {



    return (
        <div className="flex flex-col h-full">

            {/* chhose brand select */}
            <div className={"flex flex-col h-[75vh] py-[1.5vw] " + styles.add_new_template}>
                <div className={styles.header}>
                    <div className={styles.template_name}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="43" viewBox="0 0 44 43" fill="none">
                            <path d="M22.6929 9.80264C16.2742 9.73865 11.0184 14.8902 10.9544 21.3094C10.8904 27.7286 16.0425 32.9839 22.4612 33.0479C28.8799 33.1119 34.1357 27.9603 34.1997 21.5411C34.2637 15.1219 29.1116 9.86663 22.6929 9.80264ZM25.8385 18.7176C26.4808 18.724 27.0206 19.4778 27.2279 20.5346C27.2644 20.7245 27.2139 20.9206 27.0906 21.0695C26.9673 21.2178 26.783 21.3039 26.5905 21.302L25.0361 21.2865C24.8426 21.2846 24.6605 21.1959 24.5402 21.0446C24.4194 20.8938 24.3734 20.6957 24.4142 20.5071C24.642 19.4541 25.1967 18.7112 25.8385 18.7176ZM19.3703 18.6531C20.0125 18.6595 20.5523 19.4139 20.7591 20.4702C20.7961 20.66 20.7457 20.8561 20.6219 21.005C20.4986 21.1534 20.3143 21.2395 20.1218 21.2375L18.5674 21.222C18.3743 21.2201 18.1923 21.1314 18.0715 20.9801C17.9512 20.8288 17.9046 20.6312 17.9454 20.4421C18.1727 19.3901 18.7275 18.6467 19.3703 18.6531ZM22.5029 28.8683C19.4774 28.8381 16.8519 27.1694 15.4583 24.7146C15.3446 24.5143 15.347 24.2692 15.4637 24.0708C15.5804 23.8723 15.7939 23.7526 16.0243 23.7549L29.0821 23.8851C29.3115 23.8874 29.523 24.0123 29.6357 24.2126C29.7495 24.4128 29.747 24.6584 29.6293 24.8553C28.1865 27.2824 25.5278 28.8984 22.5029 28.8683Z" fill="#2A2B2A" />
                            <rect x="0.909053" y="0.50496" width="42.587" height="40.6498" rx="7.5" transform="rotate(0.571188 0.909053 0.50496)" stroke="#2A2B2A" />
                        </svg>
                        <input type="text" placeholder='Template Title*' />
                    </div>

                    <div className={styles.choose_group}>
                        Add to <CustomSelectInput options={options} ><CustomBtn btnColor='black' word='Add New Group' width='w-fill' icon={addIcon} /></CustomSelectInput> group
                    </div>
                </div>
            </div>


            {/* buttons to move to last or next page */}
            <div className="flex justify-end items-center gap-[1vw]">
                <CustomBtn word="Add Card" btnColor="white" icon={addIcon} href="" />
                <CustomBtn word="Save Template" btnColor="black" href="" />
            </div>

        </div>
    )
}

export default page
