'use client'
import './calender.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect, useState } from 'react';
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput';
import CustomBtn from '@/app/_components/Button/CustomBtn';
import eventContentImg from '../../../public/assets/calender event content img.png'
import Image from 'next/image';

export default function Calendar() {

    const brandOptions: string[] = ['Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics'];
    const contentTypeOptions: string[] = ['Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics', 'Street Politics'];
    const calenderEvents = [
        { title: 'event 1', start: '2024-04-26', end: '2024-04-30', backgroundColor: "#09c", constraint: true },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "#F36F24" },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "#000" },
        { title: 'event 2', date: '2024-04-26', backgroundColor: "rgba(95, 168, 91, 0.71)" },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24", articleImg: '../../../public/assets/calender event content img.png', article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es', articleTitle: 'Canada’s PM Quits' },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
    ]
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleEventClick = (info: any) => {
        setSelectedEvent(info.event);
        console.log(selectedEvent);

    };

    const handleCloseEvent = () => {
        setSelectedEvent(null);
    };

    const handleEventBackgroundColor = () => {
        return "#F36F24"
    }


    // useEffect(() => {
    //     console.log(handleEventBackgroundColor());

    // })


    return (

        <div className="pt-[1.5vw] h-full w-full full-calender">
            <div className='grid grid-cols-3 lg:grid-cols-4 gap-[1vw] filters'>
                <CustomSelectInput label='Brand Name' options={brandOptions} />
                <CustomSelectInput label='Content Type' options={contentTypeOptions} />
                <CustomBtn btnColor="white" word='clear' onClick={() => console.log('clear')} style={{ width: 'max-content' }} />
            </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: 'prev,next title today',
                    right: ''
                }}
                initialView="dayGridMonth"
                events={calenderEvents}

                eventBackgroundColor={handleEventBackgroundColor()}
                eventClick={(e) => handleEventClick(e)}
                height={'100%'}
                eventBorderColor='transparent'
                dayMaxEvents={3}

            />

            {selectedEvent && (
                <div className="event-content" onBlur={handleCloseEvent}>
                    <div className="event-content-header">
                        <h3>{selectedEvent.extendedProps?.articleTitle}</h3>
                        <p>{selectedEvent.startStr}  <span style={{ background: selectedEvent.backgroundColor }}>Canada</span></p>
                    </div>
                    <Image src={eventContentImg} height={100} alt=''/>
                    <p>{selectedEvent.extendedProps.article}</p>
                </div>
            )}
        </div>
    )
}