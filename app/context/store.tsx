// 'use client';
// import {createContext,useContext,Dispatch,SetStateAction,useState} from 'react';

// // const [selectedText, setSelectedText] = useState<string[]>([]);

// interface contextProps {
//     selectedText : string[],
//     // setSelectedText :Dispatch<SetStateAction<string[]>>
//     setSelectedText : (val:string)=> void
// }

// const GlobalContext = createContext<contextProps>({
//     selectedText:[],
//     setSelectedText:(): string[] => []
// })

// export const GlobalContextProvider = ({children}) =>{
//     const [selectedText,setSelectedText]= useState([])
//     return(
//         <GlobalContext.Provider value={{selectedText,setSelectedText}}>{children}</GlobalContext.Provider>
//     )
// }

// export const useGlobalContext = ()=> useContext(GlobalContext)