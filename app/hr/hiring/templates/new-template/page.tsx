'use client'
import React, { useState } from 'react'
import styles from './new-template.module.css'
import CustomBtn from '@/app/_components/Button/CustomBtn'
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput'
import { Box, Modal } from '@mui/material'
import CustomCheckBox from '@/app/_components/CustomCheckBox/CustomCheckBox'


const addIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.58333 10.0833C4.58333 10.5896 4.99373 11 5.5 11C6.00628 11 6.41667 10.5896 6.41667 10.0833V6.41667H10.0833C10.5896 6.41667 11 6.00628 11 5.5C11 4.99373 10.5896 4.58333 10.0833 4.58333H6.41667V0.916667C6.41667 0.410401 6.00628 0 5.5 0C4.99373 0 4.58333 0.410401 4.58333 0.916667V4.58333H0.916667C0.41041 4.58333 0 4.99373 0 5.5C0 6.00628 0.41041 6.41667 0.916667 6.41667H4.58333V10.0833Z" fill="#FFFFFB" />
</svg>


const options = ['jop listings', 'tasks', 'offers', 'HR Questions', 'jop listings', 'tasks', 'offers', 'HR Questions'];

const Page = () => {

    const [Templates, setTemplates] = useState([{ title: 'title 1', description: 'description1 description1 description1 description1 description1 description1 description1' },
    { title: 'title 2', description: 'description2 description2 description1 description1 description1 description1 description1' },
    { title: 'title 3', description: 'description3 description1 description1 description1 description1 description1 description1' },
    { title: 'title 4', description: 'description4 description1 description1 description1 description1 description1 description1' }
    ]);


    // State for controlling the modal open/close state
    const [open, setOpen] = useState(false);
    // Function to handle modal open.
    const handleOpen = () => setOpen(true);
    // Function to handle modal close.
    const handleClose = () => setOpen(false);

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
                        Add to <CustomSelectInput options={options}><CustomBtn btnColor='black' word='Add New Group' icon={addIcon} width='w-full' onClick={handleOpen} /></CustomSelectInput> group
                    </div>
                </div>

                <div className={styles.template_cards + " grid grid-cols-4 gap-[1vw]"}>
                    {Templates.map(( ele ,idx) => (
                        <div className={styles.card} key={idx}>
                            <div className={styles.card_header}>
                                <input type="text" placeholder='Card Title*' value={ele.title} />
                                <button >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0983 15.6111C13.7921 16.3049 14.9168 16.3049 15.6106 15.6111C16.3044 14.9173 16.3044 13.7926 15.6106 13.0988L10.586 8.07422L15.6106 3.04964C16.3044 2.35587 16.3044 1.23112 15.6106 0.537354C14.9168 -0.156415 13.7921 -0.156415 13.0983 0.537353L8.07373 5.56193L3.04915 0.537353C2.3554 -0.156403 1.23063 -0.156415 0.536865 0.537354C-0.156903 1.23112 -0.15689 2.35589 0.536865 3.04964L5.56144 8.07422L0.536865 13.0988C-0.156878 13.7925 -0.156903 14.9173 0.536865 15.6111C1.23063 16.3049 2.35541 16.3048 3.04915 15.6111L8.07373 10.5865L13.0983 15.6111Z" fill="#ACACAC" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.card_body}>
                                <textarea placeholder='Card Description...' rows={3} value={ele.description} />
                                <CustomBtn word='Save' btnColor='black' />
                            </div>
                        </div>
                    ))}


                    <div className={styles.card + " " + styles.editable}>
                        <div className={styles.card_header}>
                            <input type="text" placeholder='Card Title*' />
                            <button><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0983 15.6111C13.7921 16.3049 14.9168 16.3049 15.6106 15.6111C16.3044 14.9173 16.3044 13.7926 15.6106 13.0988L10.586 8.07422L15.6106 3.04964C16.3044 2.35587 16.3044 1.23112 15.6106 0.537354C14.9168 -0.156415 13.7921 -0.156415 13.0983 0.537353L8.07373 5.56193L3.04915 0.537353C2.3554 -0.156403 1.23063 -0.156415 0.536865 0.537354C-0.156903 1.23112 -0.15689 2.35589 0.536865 3.04964L5.56144 8.07422L0.536865 13.0988C-0.156878 13.7925 -0.156903 14.9173 0.536865 15.6111C1.23063 16.3049 2.35541 16.3048 3.04915 15.6111L8.07373 10.5865L13.0983 15.6111Z" fill="#ACACAC" />
                            </svg></button>
                        </div>
                        <div className={styles.card_body}>
                            <textarea placeholder='Card Description...' rows={3} />
                            <CustomBtn word='Save' btnColor='black' />
                        </div>
                    </div>
                </div>

            </div>


            {/* buttons to move to last or next page */}
            <div className="flex justify-end items-center gap-[1vw]">
                <CustomBtn word="Add Card" btnColor="white" icon={addIcon} href="" paddingVal='px-[1.5vw] py-[0.5vw]' />
                <CustomBtn word="Save Template" btnColor="black" href="" paddingVal='px-[1.5vw] py-[0.5vw]' />
            </div>




            <Modal
                className={`${styles.modal}`}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <form className={`${styles.modalBox}`}>
                        <div className={styles.group_title}>
                            {/* Modal title */}
                            <input type="text" placeholder='Group Title*' />
                            {/* Close button */}
                            <div
                                onClick={() => {
                                    handleClose();
                                }}
                                className="cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.0125 13.9613L18.4214 21.3616C18.8145 21.7543 19.3477 21.9749 19.9037 21.9749C20.4597 21.9749 20.9929 21.7543 21.386 21.3616C21.7791 20.969 22 20.4364 22 19.881C22 19.3257 21.7791 18.7931 21.386 18.4004L13.9744 11L21.3846 3.59962C21.5792 3.40518 21.7335 3.17437 21.8388 2.92035C21.944 2.66634 21.9982 2.39411 21.9981 2.11919C21.998 1.84428 21.9438 1.57207 21.8384 1.3181C21.733 1.06414 21.5786 0.833399 21.3839 0.639051C21.1892 0.444703 20.9582 0.290556 20.7039 0.185411C20.4496 0.0802654 20.177 0.026181 19.9018 0.0262458C19.6266 0.0263106 19.354 0.080523 19.0998 0.185788C18.8455 0.291053 18.6145 0.445309 18.42 0.639749L11.0125 8.04013L3.6037 0.639749C3.41048 0.439732 3.17931 0.280156 2.92369 0.170331C2.66806 0.0605069 2.3931 0.00263317 2.11484 8.77827e-05C1.83659 -0.0024576 1.56061 0.0503759 1.30301 0.155506C1.04541 0.260635 0.811359 0.415956 0.614501 0.612405C0.417642 0.808853 0.261924 1.0425 0.156431 1.2997C0.0509388 1.5569 -0.00221519 1.83252 7.07167e-05 2.11046C0.00235662 2.3884 0.0600364 2.6631 0.169745 2.91854C0.279454 3.17398 0.438994 3.40503 0.639057 3.59823L8.05068 11L0.640455 18.4018C0.440392 18.595 0.280852 18.826 0.171143 19.0815C0.0614341 19.3369 0.00375362 19.6116 0.00146772 19.8895C-0.000818188 20.1675 0.0523358 20.4431 0.157828 20.7003C0.263321 20.9575 0.419039 21.1911 0.615898 21.3876C0.812756 21.584 1.04681 21.7394 1.30441 21.8445C1.562 21.9496 1.83798 22.0025 2.11624 21.9999C2.3945 21.9974 2.66946 21.9395 2.92508 21.8297C3.18071 21.7198 3.41188 21.5603 3.6051 21.3603L11.0125 13.9613Z"
                                        fill="#BDBDBD"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.group_description}>
                            <textarea placeholder='Group description...' rows={4} />
                        </div>

                        <h6>Add Templates:</h6>
                        <div className={styles.add_templates}>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Video-Editor' />
                                <label htmlFor="Video-Editor">Video Editor</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Front-End-Dev' />
                                <label htmlFor="Front-End-Dev">Front End Dev</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='UX/UI-Designer' />
                                <label htmlFor="UX/UI-Designer">UX/UI Designer</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Back-End-Dev' />
                                <label htmlFor="Back-End-Dev">Back End Dev</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Graphic-Design' />
                                <label htmlFor="Graphic-Design">Graphic Design</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Full-Stack-Dev' />
                                <label htmlFor="Full-Stack-Dev">Full Stack Dev</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='Content-Writer' />
                                <label htmlFor="Content-Writer">Content Writer</label>
                            </div>
                            <div className={styles.template_item}>
                                <CustomCheckBox name='add-template' id='HR' />
                                <label htmlFor="HR">HR</label>
                            </div>
                        </div>

                        <CustomBtn btnColor='black' word='Create Group' icon={addIcon} width='w-full' />
                    </form>
                </Box>
            </Modal>

        </div>
    )
}

export default Page
