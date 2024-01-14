import d20 from 'd20';

function rollDiceServ(diceString, mess) {
    // format text to avoid wrong typing
    diceString = diceString.replace(/\s/g, '').toLowerCase()

    try {
        if(!isDiceStringValid(diceString)) {
            errorWarning(mess);
        } else {
            sucessResponse(diceString, mess);
        }

    } catch (error) {
        console.error("Error in rollDiceServ:", error);
        throw error;
    }
}

function isDiceStringValid(diceString){
    const isValid = /^[0-9d+]*$/.test(diceString);
    return isValid;
}

function sucessResponse(diceString, mess){
    const result = d20.verboseRoll(diceString);
    let numToAdd;
    let rollValue = `${result.join(', ')}`;
    let rollText = `You rolled: ${rollValue}`;
    if(diceString.includes('+')){
        numToAdd = result.pop();
        rollValue = `(${result.join(', ')})`;
        rollText = `You rolled: ${rollValue} + ${numToAdd}`;
    }
    const maxRollValue = Math.max(...result);
    const maxRollText = `Max value: ${maxRollValue}`;
    const totalValue = result.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalText = `Total: ${totalValue}`
    const replyText = result.length > 1 ? `${rollText}\n${maxRollText}\n${totalText}` : rollText;
    mess.reply(replyText);
}

function errorWarning(mess){
    mess.reply('Wrong type of input, try something like "4d20+5"');
}

export default rollDiceServ;