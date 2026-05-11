import { type ReactNode } from "react"

type ModalContainerTypes = {
    active : boolean
    closeModalFunc : () => void
    children : ReactNode
}

export default function ModalContainer({active, closeModalFunc, children} : ModalContainerTypes) {
    return (
        <div style={{display: active ? '' : 'none'}}>
            <div onClick={closeModalFunc} id={'modal-bg'} /> {/* BLACK OVERLAY */}

            <div className={'modal'}>
                <div className={'close-button'} onClick={closeModalFunc}>&times;</div>
                {children}
            </div>
        </div>
    )
}