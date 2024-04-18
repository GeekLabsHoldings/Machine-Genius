import React from 'react'
import TitleOfPage from '../_components/TitleOfPage/TitleOfPage'
import CustomSelectInput from '../_components/CustomSelectInput/CustomSelectInput'



const contentCreator = () => {

  const selectOptions=[
    "PST","Street Politics","Movie Myth","Investorcracy","Mega Projects","PST Canada"
  ]
  
  return (
    <div>
      <TitleOfPage title='Templates'/>
      <CustomSelectInput label="Select Content Type" options={selectOptions} />
    </div>
  )
}

export default contentCreator
