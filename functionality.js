
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('loaded');
  setTimeout(function() {
    preloader.remove();
  }, 2000);
});

function generateTable() {
   // Check if a grading scale has been selected
   var scale = document.querySelector('input[name="scale"]').value;
   if (scale === '') {
     // Display error message as a card
     var errorMessage = document.getElementById('error-message');
     if (!errorMessage) {
       errorMessage = document.createElement('div');
       errorMessage.id = 'error-message';
       errorMessage.classList.add('error-card');
       document.body.appendChild(errorMessage);
     }
     errorMessage.innerHTML = `
       <h4>Oops!</h4>
       <p>Please select a grading scale before generating the table.</p>
       <button id="close-error">Close</button>
     `;
     document.getElementById('close-error').addEventListener('click', function() {
       errorMessage.style.display = 'none';
     });
     return;
    }

  // Get the number of courses from the input field
  let courses = document.getElementById('courses').value;

  // Get the tbody element
  let tbody = document.getElementById('table_body');

  // Clear any existing rows from the tbody
  tbody.innerHTML = '';

  // Create a new row for each course and add it to the tbody
  for (let i = 0; i < courses; i++) {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td><input type="text" class="table-input"></td>
      <td><input type="number" min="1" class="table-input"></td>
      <td><input type="text" maxlength="1" class="table-input"></td>
    `;
    tbody.appendChild(row);
  }
}

const inputs = document.querySelectorAll('.table-input');

inputs.forEach((input, index) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputs[index + 1].focus();
    }
  });
});

function Result() {
   // Check if a grading scale has been selected
   var scale = document.querySelector('input[name="scale"]').value;
   if (scale === '') {
     // Display error message as a card
     var errorMessage = document.getElementById('error-message');
     if (!errorMessage) {
       errorMessage = document.createElement('div');
       errorMessage.id = 'error-message';
       errorMessage.classList.add('error-card');
       document.body.appendChild(errorMessage);
     }
     errorMessage.innerHTML = `
       <h4>Oops!</h4>
       <p>Please select a grading scale before calculating the GPA.</p>
       <button id="close-error">Close</button>
     `;
     document.getElementById('close-error').addEventListener('click', function() {
       errorMessage.style.display = 'none';
     });
     return;
    }

  var scale = document.querySelector('input[name="scale"]').value;
  var table = document.getElementById('table_body');
  var rows = table.rows;
  var totalUnits = 0;
  var totalPoints = 0;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var unitInput = row.cells[2].querySelector('input[type="number"]');
      var gradeInput = row.cells[3].querySelector('input[type="text"]');
      var unitValue = parseInt(unitInput.value);
      var gradeValue = gradeInput.value.toUpperCase();
      
      if (unitValue === 0 || isNaN(unitValue)) {
        // Display error message as a card
        var errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
          errorMessage = document.createElement('div');
          errorMessage.id = 'error-message';
          errorMessage.classList.add('error-card');
          document.body.appendChild(errorMessage);
        }
        errorMessage.innerHTML = `
          <h4>Invalid Input</h4>
          <p>Please enter a valid unit for course ${i + 1}.</p>
          <button id="close-error">Close</button>
        `;
        document.getElementById('close-error').addEventListener('click', function() {
          errorMessage.style.display = 'none';
        });
        return;
      }

      if (gradeValue === 'A') {
          gradeValue = 5;
      } else if (gradeValue === 'B') {
          gradeValue = 4;
      } else if (gradeValue === 'C') {
          gradeValue = 3;
      } else if (gradeValue === 'D') {
          gradeValue = 2;
      } else if (gradeValue === 'E') {
          gradeValue = 1;
      } else if (gradeValue === 'F') {
          gradeValue = 0;
      } else { 
        // Display error message as a card
        var errorMessage = document.getElementById('error-message');
        if (!errorMessage) {
          errorMessage = document.createElement('div');
          errorMessage.id = 'error-message';
          errorMessage.classList.add('error-card');
          document.body.appendChild(errorMessage);
        }
        errorMessage.innerHTML = `
          <h4>Invalid Input</h4>
          <p>Please enter a valid grade (A-F) for course ${i + 1}.</p>
          <button id="close-error">Close</button>
        `;
        document.getElementById('close-error').addEventListener('click', function() {
          errorMessage.style.display = 'none';
        });
        return;
      }

      if (scale === '4.0') {
          gradeValue = gradeValue * 4 / 5;
      } else if (scale === '3.0') {
          gradeValue = gradeValue * 3 / 5;
      } else if (scale === '2.0') {
          gradeValue = gradeValue * 2 / 5;
      }

      totalUnits += unitValue;
      totalPoints += unitValue * gradeValue;
            }

            var gpa = totalPoints / totalUnits;
            var resultElement = document.getElementById('display-result');
            if (!resultElement) {
                resultElement = document.createElement('h4');
                resultElement.id = 'display-result';
                document.querySelector('.main').appendChild(resultElement);
            }
            resultElement.innerText = 'Your GPA is: ' + gpa.toFixed(2);
            resultElement.style.display = 'block';
       
            // Remove the "Add Course" and "Calculate GP" buttons
            document.querySelector('#display').style.display = 'none';
            document.querySelector('button[onclick="create_tr(\'table_body\')"]').style.display = 'none';
            }


function create_tr(table_body) {
    // Check if a grading scale has been selected
    var scale = document.querySelector('input[name="scale"]').value;
    if (scale === '') {
      // Display error message as a card
      var errorMessage = document.getElementById('error-message');
      if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'error-message';
        errorMessage.classList.add('error-card');
        document.body.appendChild(errorMessage);
      }
      errorMessage.innerHTML = `
        <h4>Oops!</h4>
        <p>Please select a grading scale before adding a course.</p>
        <button id="close-error">Close</button>
      `;
      document.getElementById('close-error').addEventListener('click', function() {
        errorMessage.style.display = 'none';
      });
      return;
    }

            const table = document.getElementById(table_body);
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>
                ${table.rows.length + 1}
              </td>
              <td>
                <input type="text" class="table-input">
              </td>
              <td>
                <input type="number" min="1" class="table-input">
              </td>
              <td>
                <input type="text" maxlength="1" class="table-input">
              </td>
            `;
            table.appendChild(row);
          }
          
          function Reset() {
            // Get the table body
            var tableBody = document.getElementById('table_body');
          
            // Remove all rows from the table body
            while (tableBody.rows.length > 0) {
              tableBody.deleteRow(0);
            }
          
            // Create a new row in the table body
            var row = tableBody.insertRow(0);
          
            // Create cells in the new row
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
          
            // Add content to the cells
            cell1.textContent = '1';
            cell2.innerHTML = '<input type="text" class="table-input">';
            cell3.innerHTML = '<input type="number" min="1" class="table-input">';
            cell4.innerHTML = '<input type="text" maxlength="1" class="table-input">';
          
            // Clear the display result
            document.getElementById('display-result').textContent = '';
          
            // Clear the input fields
            document.getElementById('courses').value = '';
            document.querySelector('input[name="scale"]').value = '';

            // show Calculate GP button
            document.querySelector('#display').style.display = 'inline';
          }

          function Print() {
            // Get the table and result elements
            var table = document.getElementById('table_body');
            var resultElement = document.getElementById('display-result');
          
            // Create a new window for printing
            var printWindow = window.open('', '', 'height=500,width=700');
          
            // Create a new table in the print window
            var printTable = document.createElement('table');
            printTable.innerHTML = `
              <tr>
                <th>S/N</th>
                <th>Course</th>
                <th>Unit/hours</th>
                <th>Grade</th>
              </tr>
            `;
          
            // Add rows to the print table
            for (var i = 0; i < table.rows.length; i++) {
              var row = table.rows[i];
              var printRow = document.createElement('tr');
              printRow.innerHTML = `
                <td>${row.cells[0].textContent}</td>
                <td>${row.cells[1].children[0].value}</td>
                <td>${row.cells[2].children[0].value}</td>
                <td>${row.cells[3].children[0].value}</td>
              `;
              printTable.appendChild(printRow);
            }
          
            // Add the result to the print window
            var printResult = document.createElement('h4');
            printResult.textContent = resultElement.textContent;
          
            // Add the print table and result to the print window
            printWindow.document.body.appendChild(printTable);
            printWindow.document.body.appendChild(printResult);
          
            // Print the print window
            printWindow.print();
          
            // Close the print window
            printWindow.close();
          }

// // alert("insert og:url meta tag");
// // console.log("Welcome")
// // alert("why?")zz

// Get the nav-toggle button and the nav-links
const navToggle = document.getElementById('nav-toggle-button');
const navLinks = document.getElementById('nav-links');

function toggleNavLinks() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('show');
  } else {
    console.error('navLinks element not found');
  }
}

// Add an event listener to the nav-toggle button
navToggle.addEventListener('click', toggleNavLinks);