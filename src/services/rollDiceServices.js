import d20 from 'd20';
import { DefaultUserAgent } from 'discord.js';

function rollDiceServ(diceString, mess) {
    try {
        if(!isDiceStringValid(diceString)) {
            wrongWarning('Wrong type of input, try something like "4d20+5"', mess);
        } else {
            const result = d20.verboseRoll(diceString);

            if(diceString.includes('+')) {
                const numToAdd = result.pop();
                const newResult = result.map(num = num + numToAdd);
                defaultResponse(newResult, mess, true);
            }

            defaultResponse(result, mess, false);
            return;
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

function defaultResponse(diceValue, mess){
    console.log(diceValue)
    const rollText = `You rolled ${diceValue.join(', ')}`;
    const maxRollText = `Max value: ${Math.max(...diceValue)}`;
    const sumValue = diceValue.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalText = `Total: ${sumValue}`

    const replyText = diceValue.length > 1 ? `${rollText}\n${maxRollText}\n${totalText}` : rollText;

    mess.reply(replyText);
}

function wrongWarning(string, mess){
    mess.reply(string);
}

export default rollDiceServ;