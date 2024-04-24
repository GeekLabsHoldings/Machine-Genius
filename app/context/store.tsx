'use client';
import {createContext,useContext,Dispatch,SetStateAction,useState} from 'react';

interface contextProps {
    selectedText : string[],
    // setSelectedText :Dispatch<SetStateAction<string[]>>
    setSelectedText : Dispatch<SetStateAction<string[]>>
}

const GlobalContext = createContext<contextProps>({
    selectedText:[],
    setSelectedText:(): string[] => []
})

export const GlobalContextProvider = ({children}) =>{
    const [selectedText,setSelectedText]= useState<string[]>([])
    return(
        <GlobalContext.Provider value={{selectedText,setSelectedText}}>{children}</GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=> useContext(GlobalContext);