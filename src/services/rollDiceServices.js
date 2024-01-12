import d20 from 'd20';

function rollDiceServ(diceString) {
    try {
        if(!isDiceStringValid(diceString)) {
            console.log('falou merda paisão');
            return
        }

        const result = d20.verboseRoll(diceString);
        console.log("Iniciando rollDiceServ");

        if(diceString.includes('+')) {
            console.log('includes')
            const numToMult = result.pop();
            console.log(numToMult)
            console.log(result)
            console.log(result.length)
            for(let i = 0; i < result.length; i++){
                console.log(result)
            }
            return
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