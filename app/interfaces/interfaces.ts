import { ReactElement } from "react";

export interface IBtn {
    word:string,
    btnColor:'white'|'black'|null,
    icon?: ReactElement,
    href:string
}
// HTMLImageElement