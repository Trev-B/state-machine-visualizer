import React, {useState, useEffect} from 'react';
import '../styles/State.css';

const State = ({num, addConnection, changeAccepting, data, updateMoved}) => {
    
    const [isAccepting, setIsAccepting] = useState(false);

    useEffect(() => {
        dragElement(document.getElementById(num))
    }, [num])

    const handleAccepting = () => {
        
        if(changeAccepting) {
            setIsAccepting(!isAccepting);
            data.accept = !data.accept;
        }
    }

    function dragElement(elmnt) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        if (document.getElementById(elmnt.id)) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } 
       
        function dragMouseDown(e) {
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
      
        function elementDrag(e) {
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            updateMoved(Math.random());
        }
      
        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    return (
        <div 
            className={`state-div ${isAccepting ? 'state-accepting' : ''} `}
            id={num}
            onClick={() => {addConnection(num); handleAccepting();}}>
                {num}
        </div>
    );
}

export default State;
