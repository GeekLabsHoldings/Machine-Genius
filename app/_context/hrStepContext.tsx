import React, { createContext, useState } from 'react'
import useSessionStorage from '../_hooks/useSessionStorage';


export const StepContext = createContext<any>(null);
export const HrStepContextProvider = ({children}: {children: React.ReactNode}) => {
    const [step, setStep] = useSessionStorage('HR-step', null);
      return (
    <StepContext.Provider value={{step, setStep}}>
        {children}
    </StepContext.Provider>
  )
}

export default HrStepContextProvider