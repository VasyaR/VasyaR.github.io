import { createPortal } from "react-dom"


export const Portal = ({children}) => {
    const modal = document.getElementById('modal')
    return createPortal(children, modal)
}