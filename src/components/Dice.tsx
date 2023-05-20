import React from 'react';

export default ({ fill = '#000000' }) => {
    return (
        <svg viewBox="0 0 20 20" className='svg_dice'>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(-380 -8079)" fill={fill} className='svg_part '>
                    <g transform="translate(56 160)">
                        <path d="m333 7926.1c0 1.105-0.896 2-2 2s-2-0.895-2-2 0.896-2 2-2 2 0.895 2 2zm0 6c0 1.105-0.896 2-2 2s-2-0.895-2-2 0.896-2 2-2 2 0.895 2 2zm6-6c0 1.105-0.896 2-2 2s-2-0.895-2-2 0.896-2 2-2 2 0.895 2 2zm0 6c0 1.105-0.896 2-2 2s-2-0.895-2-2 0.896-2 2-2 2 0.895 2 2zm3 3.895c0 0.553-0.448 1-1 1h-14c-0.552 0-1-0.447-1-1v-14c0-0.552 0.448-1 1-1h14c0.552 0 1 0.448 1 1v14zm0-17h-16c-1.104 0-2 0.896-2 2v16c0 1.105 0.896 2 2 2h16c1.105 0 2-0.895 2-2v-16c0-1.104-0.895-2-2-2z"></path>
                    </g>
                </g>
            </g>
        </svg>
    )

}