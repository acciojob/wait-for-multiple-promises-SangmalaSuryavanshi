//your JS code here. If required.
// script.js

// Function to create a random promise that resolves after a random delay
function createRandomPromise(promiseName) {
  const randomTime = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime * 1000); // Convert time to milliseconds
  }).then(time => ({ promiseName, time: time.toFixed(3) }));
}

// Create the three promises
const promise1 = createRandomPromise('Promise 1');
const promise2 = createRandomPromise('Promise 2');
const promise3 = createRandomPromise('Promise 3');

// Display "Loading..." message before promises resolve
document.getElementById('output').innerHTML = `
  <tr>
    <td colspan="2" id="loading">Loading...</td>
  </tr>
`;

// Use Promise.all to wait for all promises to resolve
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // Get the output table body element
    const outputTable = document.getElementById('output');

    // Remove the "Loading..." row (if it exists) from the table body
    outputTable.innerHTML = '';

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

    // Calculate total time to resolve all promises
    const totalTime = results.reduce((total, result) => total + parseFloat(result.time), 0).toFixed(3);
    
    // Add the total row to the table
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
    console.error('Error occurred:', error);
  });
