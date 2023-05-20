import React from 'react';

export default ({ fill = '#000000' }) => {
    return (<svg fill="none" viewBox="0 0 24 24" className='svg_smile'>
        <circle cx="12" cy="12" r="9" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className='svg_part_stroke' />
        <circle cx="9.5" cy="9.5" r="1.5" fill={fill} className='svg_part_stroke' />
        <circle cx="14.5" cy="9.5" r="1.5" fill={fill} className='svg_part_stroke' />
        <path d="m16.462 14.394c-1.2551 1.0383-2.8331 1.6064-4.462 1.6064s-3.2068-0.5681-4.462-1.6064" stroke={fill} className='svg_part_stroke' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>)

}