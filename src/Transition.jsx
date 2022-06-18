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
         
        //document.getElementById(num + 'symbol').style.transform = `scaleX(${0})`;    

    }

    return (
        <div className='Transition' id={num}>

            {/* <p className='TransSymbol' id={num + 'symbol'}>{symbol}</p> */}

            <div className='Line'></div>

        </div>
    );
}

export default Transition;
