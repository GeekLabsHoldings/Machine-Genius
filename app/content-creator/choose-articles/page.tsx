import CustomBtn from '@/app/_components/Button/CustomBtn'
import React from 'react'

const chooseArticles = () => {
    return (
        <div>
            chooseArticles

            <div className="flex justify-between">
                <CustomBtn word={"Back"} btnColor="white" href={"/content-creator/working-on-article"} />
                <CustomBtn word={"Next"} btnColor="black" href={"/content-creator/create-article"} />

            </div>
        </div>
    )
}

export default chooseArticles
