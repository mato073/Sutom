import React from 'react'
import './index.scss'

type NotificationType = {
    type: 'success' | 'error' | 'info' | 'warning'
    message: string;
}

const Notification = () => {
    const [notification, setNotification] = React.useState<NotificationType>();

    React.useEffect(() => {
        window.addEventListener('notification', ((event: CustomEvent) => {
            setNotification(event.detail);
        }) as EventListener);

        return () => {
            window.removeEventListener('notification', ((event: CustomEvent) => {
                setNotification(event.detail);
            }) as EventListener);
        }
    }, [])

    const onAnimationEndAnimation = () => {
        setNotification(undefined);
    }

    return (
        <div>
            {notification &&
                <div onAnimationEnd={onAnimationEndAnimation} className='notification'>
                    <div className={`notification__content ${notification.type}`}>
                        {notification.message}
                    </div>
                </div>
            }
        </div>
    )

}

export default Notification;