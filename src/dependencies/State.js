export class StateObj {

    constructor(id, accept=false) {
        this.id = id;
        this.transitions = [];
        this.accept = accept;
    }

    addTransition(transition, symbol) {
        if(!StateObj.prototype.alphabet.includes(symbol)) {
            StateObj.prototype.alphabet.push(symbol);
        }

        this.transitions.push({transition, symbol});
    }

    setAccept(accept) {
        this.accept = accept;
    }

    setId(id) {
        this.id = id;
    }

    static getAlphabet() {
        return StateObj.prototype.alphabet;
    }

    static findStateById(arrayOfStates, id) {
        return arrayOfStates.find(state => state.id === id);
    }

    static isStringAccepted(arrayOfStates, str, animation=null, timer=null) {
        const alpha = str.split('');

        let curr = arrayOfStates[0];

        for(let i = 0; i < alpha.length; i++) {

            try {
                
                if(animation != null) {
                    animation(curr.id);
                }

                curr = curr.transitions.find(trans => trans.symbol === alpha[i]).transition;

            } catch {
                return false;
            }
        }

        if(animation != null) {
            animation(curr.id);
            timer();
        }

        return curr.accept;
    }

}

StateObj.prototype.alphabet = [];
