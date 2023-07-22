import React from 'react';

type DirectionType = 'up' | 'right' | 'left' | 'down';

const getAngle = (direction: DirectionType) => {
    switch (direction) {
        case 'up': return 180;
        case 'right': return -90;
        case 'left': return 90;
        default: return 0;
    }
};

const Arrow = ({ size, color, direction }: { size: number, color: string, direction: DirectionType }) => {
    return (
        <svg
            className='arrow-icon'
            width={size}
            height={size}
            viewBox="0 0 129 129"
            color={color}
            style={{
                msTransform: `rotate(${getAngle(direction) + "deg"})`,
                WebkitTransform: `rotate(${getAngle(direction) + "deg"})`,
                OTransform: `rotate(${getAngle(direction) + "deg"})`,
                transition: 'all 0.2s ease-in-out',
            }}
            transform={`rotate(${getAngle(direction)})`}
        >
            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" fill={color} />
        </svg>
    );
};

Arrow.defaultProps = {
    color: 'black',
    direction: 'down',
    size: '10',
};

export default Arrow;