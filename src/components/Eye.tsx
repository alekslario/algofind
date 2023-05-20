import React from 'react';

export default ({ fill = '#000000' }) => {
    return (
        <svg fill="none" viewBox="0 0 24 24" className='svg_eye'>
            <path d="m6.8874 5.1716c0.57806-0.57806 0.86709-0.86709 1.2346-1.0193s0.77629-0.15224 1.5938-0.15224h4.6102c0.8257 0 1.2386 0 1.6091 0.15505 0.3705 0.15506 0.6603 0.44914 1.2399 1.0373l1.674 1.6987c0.5681 0.5764 0.8521 0.86461 1.0015 1.2292 0.1495 0.36458 0.1495 0.76921 0.1495 1.5785v4.6444c0 0.8175 0 1.2263-0.1522 1.5938-0.1523 0.3676-0.4413 0.6566-1.0194 1.2347l-1.6568 1.6568c-0.5781 0.5781-0.8671 0.8671-1.2347 1.0194-0.3675 0.1522-0.7763 0.1522-1.5938 0.1522h-4.6444c-0.80926 0-1.2139 0-1.5785-0.1495-0.36458-0.1494-0.65279-0.4334-1.2292-1.0015l-1.6987-1.674c-0.58816-0.5796-0.88224-0.8694-1.0373-1.2399-0.15505-0.3705-0.15505-0.7834-0.15505-1.6091v-4.6102c0-0.81751 0-1.2263 0.15224-1.5938s0.44127-0.65657 1.0193-1.2346l1.7158-1.7158z" stroke={fill} strokeWidth="2" className='svg_part_stroke' />
            <path d="m8 11 0.42229 0.2111c2.2522 1.1262 4.9032 1.1262 7.1554 0l0.4223-0.2111" stroke={fill} strokeLinecap="round" strokeWidth="2" />
            <path d="M12 12.5V14" stroke={fill} strokeLinecap="round" strokeWidth="2" className='svg_part_stroke' />
            <path d="m9 12-0.5 1" stroke={fill} strokeLinecap="round" strokeWidth="2" className='svg_part_stroke' />
            <path d="m15 12 0.5 1" stroke={fill} strokeLinecap="round" strokeWidth="2" className='svg_part_stroke' />
        </svg>
    )

}