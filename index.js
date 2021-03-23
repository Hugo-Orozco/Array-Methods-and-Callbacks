import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

const Filter = fifaData.filter(data => data.Year === 2014 && data.Stage === 'Final').pop();

console.log(Filter);

//(a) Home Team name for 2014 world cup final

console.log(Filter['Home Team Name']);

//(b) Away Team name for 2014 world cup final

console.log(Filter['Away Team Name']);

//(c) Home Team goals for 2014 world cup final

console.log(Filter['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final

console.log(Filter['Away Team Goals']);

//(e) Winner of 2014 world cup final */

console.log(Filter['Home Team Goals'] > Filter['Away Team Goals'] ? Filter['Home Team Name'] : Filter['Away Team Name']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   return data.filter(data => data.Stage === 'Final');
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinals) {
    const years = getFinals(array).map(data => data.Year);
    return years;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:
1. Receives an array
2. Receives the callback function getFinals from task 2
3. Determines the winner (home or away) of each `finals` game.
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(array, getFinals) {
    const winners = getFinals(array).filter(data => data['Home Team Goals'] !== data['Away Team Goals']).map(data => data['Home Team Goals'] > data['Away Team Goals'] ? data['Home Team Name'] : data['Away Team Name']);
    return winners;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!"

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getYears, getWinners) {
    return array.filter((data) => data.Stage === 'Final').map((data, i) => `In ${getYears(array)[i]}, ${getWinners(array)[i]} won the world cup!`);
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following:
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place.

 (Hint: use .reduce and do this in 2 steps)

 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinals) {
    const home = getFinals.map(data => data['Home Team Goals']);
    const away = getFinals.map(data => data['Away Team Goals']);

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    return parseFloat(average(home) + average(away)).toFixed(2);
}

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had.

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {

    const wins = data.filter(data => data.Stage === 'Final' && data['Home Team Goals'] !== data['Away Team Goals'] && ((data['Home Team Initials'] === teamInitials && data['Home Team Goals'] > data['Away Team Goals']) || (data['Away Team Initials'] === teamInitials && data['Away Team Goals'] > data['Home Team Goals'])));

    return wins.length;

}

console.log(getCountryWins(fifaData, 'ITA'));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    const total = data.filter(data => data.Stage === 'Final');

    const test = [];

    total.forEach((data) => {

        if (test.some(item => item[data['Home Team Initials']])) {
            test.find(item => item[data['Home Team Initials']])[data['Home Team Initials']] += data['Home Team Goals'];
        }

        else {
            test.push({ [data['Home Team Initials']]: data['Home Team Goals'] });
        }

        if (test.some(item => item[data['Away Team Initials']])) {
            test.find(item => item[data['Away Team Initials']])[data['Away Team Initials']] += data['Away Team Goals'];
        }

        else {
            test.push({ [data['Away Team Initials']]: data['Away Team Goals'] });
        }

    });

    return test.sort((a, b) => Object.values(a) - Object.values(b)).pop();

}

console.log(getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {

    const total = data.filter(data => data.Stage === 'Final' && data['Home Team Goals'] !== data['Away Team Goals']).map(data => data['Home Team Goals'] > data['Away Team Goals'] ? `${data['Home Team Initials']} (${data['Home Team Goals']}) scored more than ${data['Away Team Initials']} (${data['Away Team Goals']}).` : `${data['Away Team Initials']} (${data['Away Team Goals']}) scored more than ${data['Home Team Initials']} (${data['Home Team Goals']}).`);

    return total;

}

console.log(badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
};
