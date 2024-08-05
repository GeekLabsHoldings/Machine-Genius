'use client'
import './calender.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect, useState } from 'react';
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput';
import CustomBtn from '@/app/_components/Button/CustomBtn';
import eventContentImg from '../../../public/assets/calender event content img.png'
import Image from 'next/image';
import CustomCheckBox from '@/app/_components/CustomCheckBox/CustomCheckBox';

export default function Calendar() {

    const brandOptions: string[] = ['Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics'];
    const contentTypeOptions: string[] = ['Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics'];
    const calenderEvents = [
        { title: 'event 1', start: '2024-04-26', end: '2024-04-30', backgroundColor: "#09c", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "#000", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "rgba(95, 168, 91, 0.71)", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
    ]
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleEventClick = (info: any) => {
        setSelectedEvent(info.event);
        console.log(selectedEvent);

    };

    const handleCloseEvent = () => {
        setSelectedEvent('');
    };


    const today = new Date();
    const month = today.getMonth() + 1; // Note: Month is zero-based (0 for January, 1 for February, etc.)
    const day = today.getDate();


    const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>;

    // useEffect(() => {
    //     console.log(handleEventBackgroundColor());

    // })


    return (

        <div className="pt-[1.5vw] h-full w-full full-calender">
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-[1vw] filters'>
                <CustomSelectInput label='Brand Name' options={brandOptions} />
                <CustomSelectInput label='Content Type' options={contentTypeOptions} />
                <CustomBtn btnColor="white" word='Clear' onClick={() => console.log('clear')} style={{ width: 'max-content' }} />
                <div className='flex items-center justify-end'>
                    <CustomCheckBox value={"Show Events Only"} name='show-events-only' />
                    <label htmlFor="">Show Events Only</label>
                </div>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: 'prev,next title today',
                    right: ''
                }}
                initialView="dayGridMonth"
                events={calenderEvents}
                eventClick={(e) => handleEventClick(e)}
                height={'100%'}
                eventBorderColor='transparent'
                dayMaxEvents={3}
                buttonText={{ today: `${day} / ${month}` }}
                droppable={true}
            />

            {selectedEvent ? <>
                <div className="event-content-overlay" onClick={handleCloseEvent} > </div>
                <div className="event-content" >
                    <span className='close-event-content' onClick={handleCloseEvent} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>

                    </span>
                    <div className="event-content-header">
                        <h3>{selectedEvent.extendedProps?.articleTitle}</h3>
                        <p>{selectedEvent.startStr}  <span style={{ background: selectedEvent.backgroundColor }}>Canada</span></p>
                    </div>
                    <Image src={eventContentImg} height={100} alt='' />
                    <p>{selectedEvent.extendedProps.article}</p>
                </div>
            </> : null
            }
        </div>
    )
}