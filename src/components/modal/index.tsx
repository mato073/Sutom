import React from 'react';
import './index.scss';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal = React.memo(({ isOpen, children }: ModalProps) => {

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
    }, [isOpen]);

    return (
        <>
            {isOpen ?
                <div className="modal">
                    <div className="modal-content" onClick={e => { e.stopPropagation() }}>
                        {children}
                    </div>
                </div>
                :
                null
            }
        </>
    );

})

export default Modal;