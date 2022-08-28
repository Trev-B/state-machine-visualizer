import React, {useState, useEffect} from 'react';
import State from './State.jsx';
import '../styles/StateBoard.css';
import { StateObj } from '../dependencies/State.js';
import Transition from './Transition.jsx';

const StateBoard = () => {

    const [states, setStates] = useState([]);
    const [numOfStates, setNumOfStates] = useState(0);

    const [selectedStates, setSelectedStates] = useState([]);
    const [selectStatesSwitch, setSelectStatesSwitch] = useState(false);

    const [symbolPrompt, setSymbolPrompt] = useState(false);

    const [expAccepted, setExpAccepted] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    const [changeAccepting, setChangeAccepting] = useState(false);
    const [moved, setMoved] = useState(false);

    let timer = 500;

    // useEffect(() => {
    //     const test = [  new StateObj(0),
    //                     new StateObj(1),
    //                     new StateObj(2)];
        
    //     test[0].addTransition(test[1], 'a');
    //     test[1].addTransition(test[2], 'b');
    //     test[0].addTransition(test[2], 'c');

    //     setStates(test);
    //     setNumOfStates(states.length);

    // }, [])

    useEffect(() => {

        if(selectedStates.length === 2) {
            setSymbolPrompt(true);
        }

    }, [selectedStates])

    useEffect(() => {

        setNumOfStates(states.length);

    }, [states])

    const createState = () => {
     
        setStates([...states, new StateObj(numOfStates)]);
        setNumOfStates(states.length);
    }

    const setConnection = () => {
        setChangeAccepting(false);
        setSelectedStates([]);
        setSymbolPrompt(false);
        console.log(`Connection is ${!selectStatesSwitch ? 'On' : 'Off'}`)
        setSelectStatesSwitch(!selectStatesSwitch);
    }

    const addConnection = (id) => {

        if(selectStatesSwitch && selectedStates.length < 2) {
            setSelectedStates([...selectedStates, StateObj.findStateById(states, id)]);
            console.log(`selected state with id ${id}`)
        }
    }  

    const handleTransSymbol = (e) => {

        e.preventDefault();
        const input = document.getElementById("symbol").value;
        selectedStates[0].addTransition(selectedStates[1], input);
        console.log(`added connection to states ${selectedStates[0].id} and  ${selectedStates[1].id}`)
        setSelectedStates([]);
        setSymbolPrompt(false);
    }

    const animateCurrentState = (id) => {

        setTimeout(() => {
                const currState = document.getElementById(id);
                currState.classList.add('state-animate');
                setTimeout(() => {currState.classList.remove('state-animate')}, timer)
            }, timer
        );

        timer += 500;
    }

    const resetTimer = () => {timer = 500;}
    
    const testExpression = (e) => {
        e.preventDefault();
        const expression = document.getElementById("expression").value;
        const ans = StateObj.isStringAccepted(states, expression, animateCurrentState, resetTimer);
        setExpAccepted(ans);
        setFirstRender(true);
    }

    const setAcceptingState = () => {
        setSelectStatesSwitch(false);
        setSelectedStates([]);
        setSymbolPrompt(false);

        setChangeAccepting(!changeAccepting);
    }

    const clearAllStates = () => {
        setStates([]);
    }

    const renderTransitions = () => {
        return states.map((state) => {
            
            if(state.transitions.length !== 0) {

                return state.transitions.map((trans) => 
                    
                    (<Transition key={`trans${state.id}${trans.symbol}`} num={`trans${state.id}${trans.symbol}`} transFrom={state.id} transTo={trans.transition.id} symbol={trans.symbol} moved={moved}/>))
            }
        })
    }

    return (
        <div className='StateBoard' id='StateBoard'>
            {/* <h1>Number of States: {numOfStates}</h1> */}

            <div className='StateBoardButtons'>

                <button onClick={createState}>Create State</button>
                <button className='ConnectionButton'onClick={setConnection}>Set Connection</button>
                <button onClick={setAcceptingState}>Set Accepting States</button>
                <button onClick={clearAllStates}>Clear All States</button>

            </div>

            {selectStatesSwitch ? 
            <h2>Select two states to add a connection to.</h2> : <div/>}

            {changeAccepting ? 
            <h2>Click states to toggle whether they are accepting/rejecting.</h2> : <div/>}

            <div className='SelectedTransitionStates'>
                {selectedStates.map((state, index) => (<h1 key={index}>{state.id}</h1>))}
            </div>

            {symbolPrompt ? <form onSubmit={handleTransSymbol}>

                                <input type="text" id="symbol"/>
                                <button type="submit">Add Transition</button>

                            </form> : <div/>
            }

            <div className='AllTransitions'>{renderTransitions()}</div>

            <div className='ExpressionChecker'>

                <form className="ExpressionForm" onSubmit={testExpression}>

                    <input type="text" id="expression"/>
                    <button type="submit">Check Expression</button>      
                    
                </form>
                
                {firstRender ? 
                    (expAccepted ? <h1 className="ExpressionAcc">Expression Accepted</h1> : <h1 className="ExpressionRej">Expression Rejected</h1>) : <div/>
                } 

            </div>

            {states.map((state) => <State   key={state.id} 
                                            num={state.id} 
                                            addConnection={addConnection} 
                                            changeAccepting={changeAccepting} 
                                            data={state}
                                            updateMoved={setMoved} />)
            }

        </div>
    );
}

export default StateBoard;
