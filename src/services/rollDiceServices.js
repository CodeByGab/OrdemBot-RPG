import d20 from 'd20';

function rollDiceServ(diceString) {
    try {
        if(!isDiceStringValid(diceString)) {
            console.log('falou merda paisão');
            return
        }

        const result = d20.verboseRoll(diceString, true);
        console.log("Starting rollDiceServ");

        if(diceString.includes('+')) {
            const numToAdd = result.pop();
            console.log(numToAdd);
            console.log(result.length);
            console.log(result);
            for(let i = 0; i < result.length; i++){
                result[i] = result[i] + numToAdd;
            }
            console.log(result);
            return result;
        }

        console.log("Resultado da rolagem:", result);
        return result;

    } catch (error) {
        console.error("Erro em rollDiceServ:", error);
        throw error;
    }
}

function isDiceStringValid(diceString){
    const isValid = /^[0-9d+]*$/.test(diceString);
    return isValid
}

export default rollDiceServ;