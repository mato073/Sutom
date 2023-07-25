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
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            {isOpen ?
                <div className="modal">
                    <div className="modal-content">
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