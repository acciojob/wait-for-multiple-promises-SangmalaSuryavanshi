// script.js

// Function to create a random promise that resolves after a random delay
function createRandomPromise(promiseName) {
  const randomTime = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = Math.random() < 0.1; // Simulate an error 10% of the time (adjust as needed)
      
      if (error) {
        reject(`Error occurred in ${promiseName}`); // Reject the promise with an error message
      } else {
        resolve(randomTime); // Resolve the promise with the time taken
      }
    }, randomTime * 1000); // Convert time to milliseconds
  }).then(time => {
    return { promiseName, time: time.toFixed(3) }; // If resolved, return the time in 3 decimal places
  }).catch(error => {
    console.error(error); // Log the error message to the console
    return { promiseName, time: 'Error' }; // Return 'Error' if the promise was rejected
  });
}

// Create the three promises
const promise1 = createRandomPromise('Promise 1');
const promise2 = createRandomPromise('Promise 2');
const promise3 = createRandomPromise('Promise 3');

// Display "Loading..." message before promises resolve
document.getElementById('output').innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

// Use Promise.all to wait for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // Get the output table body element
    const outputTable = document.getElementById('output');

    // Remove the "Loading..." row (if it exists) from the table body
    outputTable.innerHTML = ''; // This clears the "Loading..." row

    // Populate the table with results from each promise
    results.forEach(result => {
      const row = document.createElement('tr');
      const promiseNameCell = document.createElement('td');
      const timeCell = document.createElement('td');
      
      promiseNameCell.textContent = result.promiseName;
      timeCell.textContent = result.time;
      
      row.appendChild(promiseNameCell);
      row.appendChild(timeCell);
      outputTable.appendChild(row);
    });

    // Add total time row
    const totalTime = results.reduce((total, result) => total + (result.time === 'Error' ? 0 : parseFloat(result.time)), 0).toFixed(3);
    const totalRow = document.createElement('tr');
    const totalLabelCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');
    
    totalLabelCell.textContent = 'Total';
    totalTimeCell.textContent = totalTime;
    
    totalRow.appendChild(totalLabelCell);
    totalRow.appendChild(totalTimeCell);
    outputTable.appendChild(totalRow);
  })
  .catch(error => {
    console.error('Error handling promises:', error);
  });
