'use client'
import styles from './Comments.module.css'
import AccountList from './_account-list/account-list'
import AllCampaigns from './_all-campaigns/all-campaigns'
import Notifications from './_notifications/notifications'


const Comments = () => {



    return (
        <div className="flex flex-col h-full">
            <div className={"flex flex-col w-full h-[80vh] py-[1vw] " + styles.comments_wrapper}>
                <div className={"tabs " + styles.tabs}>
                    <input type="radio" name="tabs" className="tab" aria-label="Account Lists" defaultChecked/>
                    <div className="tab-content h-[75vh] pt-[1vw]"> <AccountList /></div>

                    <input type="radio" name="tabs" className="tab" aria-label="All Campaigns"  />
                    <div className="tab-content h-[75vh] pt-[1vw]"><AllCampaigns/></div>

                    <input type="radio" name="tabs" className="tab" aria-label="Notifications"  />
                    <div className="tab-content h-[75vh] pt-[1vw]">
                        <Notifications/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments
