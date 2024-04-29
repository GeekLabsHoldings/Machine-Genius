'use client'
import './calender.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect } from 'react';
import CustomSelectInput from '@/app/_components/CustomSelectInput/CustomSelectInput';
import CustomBtn from '@/app/_components/Button/CustomBtn';

export default function Calendar() {

    const brandOptions:string[] = ['Street Politics','Street Politics','Street Politics','Street Politics','Street Politics','Street Politics','Street Politics'];
    const contentTypeOptions:string[] = ['Street Politics','Street Politics','Street Politics','Street Politics','Street Politics','Street Politics','Street Politics'];

    const handleCustomButtonClick = (e:any) => {
        console.log(e.event._def.title);
    }

    const handleEventBackgroundColor = () => {
        return "#F36F24"
    }


    useEffect(() => {
        console.log(handleEventBackgroundColor());

    })
    

    return (

            <div className="pt-[1.5vw] h-full w-full full-calender">
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-[1vw] filters'>
                    <CustomSelectInput label='Brand Name' options={brandOptions} />
                    <CustomSelectInput label='Content Type' options={contentTypeOptions}/>
                    <CustomBtn btnColor="white" word='clear' onClick={()=> console.log('clear')} style={{width:'max-content'}}/>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next title today',
                        right: ''
                    }}
                    initialView="dayGridMonth"
                    events={[
                        { title: 'event 1', start: '2024-04-26', end: '2024-04-30', backgroundColor: "#09c" , constraint: true},
                        { title: 'event 2', date: '2024-04-26', backgroundColor: "#F36F24" },
                        { title: 'event 2', date: '2024-04-26', backgroundColor: "#000" },
                        { title: 'event 2', date: '2024-04-26', backgroundColor: "rgba(95, 168, 91, 0.71)" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-02', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-09', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-09', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-09', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-09', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-16', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-16', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-16', backgroundColor: "#F36F24" },
                        { title: 'event 3', date: '2024-04-16', backgroundColor: "#F36F24" },
                    ]}
                    
                    eventBackgroundColor={handleEventBackgroundColor()}
                    eventClick={(e) => handleCustomButtonClick(e)}
                    height={'100%'}
                    eventBorderColor='transparent'
                    dayMaxEvents= {2}
                    aspectRatio={1}
                    
                />
                </div>
    )
}