
type type = "error" | "success" | "warning"


export const notificationAction = (message: string, type: type) => {
    const event = new CustomEvent('notification', {
        detail: {
            message,
            type,
        },
    });
    window.dispatchEvent(event);
};