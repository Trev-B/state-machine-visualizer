import React, { useEffect } from 'react';
import './Transition.css';

const Transition = ({num, transFrom, symbol, transTo, moved}) => {

    useEffect(() => {

        calculateTransitionPosition();

    }, [moved])

    const calculateTransitionPosition = () => {

        const from = document.getElementById(transFrom).getBoundingClientRect();
        const to = document.getElementById(transTo).getBoundingClientRect();
        const me = document.getElementById(num);

        const x1 = (from.right + from.left)/2;
        const y1 = (from.top + from.bottom)/2;

        const x2 = (to.right + to.left)/2;
        const y2 = (to.top + to.bottom)/2;

        const distance = Math.sqrt( (x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
        const angle = Math.atan2( y2 - y1, x2 - x1 ) * ( 180 / Math.PI );

        me.style.top = '0px';    
        me.style.left = '0px';         
        me.style.transform = ` translate(${x1}px, ${y1}px) rotate(${angle}deg) scaleX(${distance/2}) `;

        const transInfo = document.getElementById(num + 'info');  
        transInfo.style.top = '0px';
        transInfo.style.left = '0px';
        transInfo.style.transform = ` translate(${(x2+x1)/2}px, ${(y2+y1)/2}px) `;
         
        // const symbol = document.getElementById(num + 'symbol');  
        // symbol.style.top = '0px';
        // symbol.style.left = '0px';
        // symbol.style.transform = ` translate(${(x2+x1)/2}px, ${(y2+y1)/2}px) `;

        const arrow = document.getElementById(num + 'arrow');
        // arrow.style.top = '0px';
        // arrow.style.left = '0px';
        // arrow.style.transform = ` translate(${(x2+x1)/2 }px, ${(y2+y1)/2 }px) rotate(${angle}deg)`;
        arrow.style.transform = `  rotate(${angle}deg)`;
    }

    return (
        <div className='Transition'>

            <div className='Line' id={num}></div>

            <div className='TransInfo' id={num + 'info'}> 
                <div className='Arrow' id={num + 'arrow'}>&#62;</div>
                <div className='TransSymbol' id={num + 'symbol'}>{symbol}</div>
            </div>

        </div>
    );
}

export default Transition;
