import React from 'react';
import './index.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = React.memo(({ isOpen, onClose, children }: ModalProps) => {

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "scroll";
        }
    }, [isOpen]);

    return (
        <>
            {isOpen ?
                <div className="modal" onClick={onClose} >
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