// document.getElementById('pdfCustomizationForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Construct the data object from the form
//     const formData = new FormData(event.target);
//     const data = {};
//     formData.forEach((value, key) => {
//         // Convert checkbox values to boolean
//         if (value === 'on') {
//             data[key] = true;
//         } else {
//             // Convert position values to PointF structure
//             if (key.includes('Position')) {
//                 const [property, axis] = key.split('Position');
//                 data[property] = data[property] || {};
//                 data[property][axis.toLowerCase()] = parseFloat(value);
//             } else {
//                 data[key] = value;
//             }
//         }
//     });

//     // Update the preview
//     updatePdfPreview(data);

//     // Send the data to the backend
//     fetch('/api/generate-pdf', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('PDF generated:', result);
//         // Handle the response, e.g., show a link to the generated PDF
//         // Assuming the result contains a URL to the generated PDF
//         const pdfLink = document.createElement('a');
//         pdfLink.href = result.pdfUrl; // Replace 'pdfUrl' with the actual property name from the result that contains the URL
//         pdfLink.textContent = 'Download PDF';
//         pdfLink.target = '_blank';
//         document.body.appendChild(pdfLink);
//     })
//     .catch(error => {
//         console.error('Error generating PDF:', error);
//     });
// });

// function updatePdfPreview(data) {
//     const previewArea = document.getElementById('pdfPreview');
//     previewArea.innerHTML = ''; // Clear the preview area

//     // Loop through the data and create elements for the preview
//     for (const key in data) {
//         if (data.hasOwnProperty(key) && key.includes('include') && data[key]) {
//             const elementName = key.replace('include', '').toLowerCase();
//             const element = document.createElement('div');
//             element.classList.add('pdfElement');
//             element.textContent = elementName; // Placeholder text

//             // Set the position based on the form data
//             if (data[elementName + 'Position']) {
//                 element.style.left = data[elementName + 'Position'].x + 'px';
//                 element.style.top = data[elementName + 'Position'].y + 'px';
//             }

//             previewArea.appendChild(element);
//         }
//     }
// }


// document.addEventListener('DOMContentLoaded', function() {
//     var legends = document.querySelectorAll('legend');
//     legends.forEach(function(legend) {
//       legend.addEventListener('click', function() {
//         var fieldset = this.parentNode;
//         fieldset.classList.toggle('open');
//       });
//     });
//   });
  
// document.addEventListener('DOMContentLoaded', function() {
//     // Function to toggle the display of email position labels
//     function togglePositionLabels() {
//       var checkbox = document.querySelector('.checkbox-custom');
//       var labels = document.querySelectorAll('.position-label');
      
//       // Loop through all labels and toggle visibility
//       labels.forEach(function(label) {
//         label.style.display = checkbox.checked ? 'block' : 'none';
//       });
//     }
  
//     // Attach the change event listener to the checkbox
//     document.querySelector('.checkbox-custom').addEventListener('change', togglePositionLabels);
  
//     // Call the function on page load to set the initial state
//     togglePositionLabels();
//   });
  
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the display of position labels associated with a checkbox
    function togglePositionLabel(checkbox) {
      // Find the parent label of the checkbox
      const parentLabel = checkbox.closest('label');
      // Find the next sibling label which contains the position inputs
      const positionLabelX = parentLabel.nextElementSibling;
      const positionLabelY = positionLabelX ? positionLabelX.nextElementSibling : null;
  
      // Check if the fieldset is open
      const fieldset = checkbox.closest('fieldset');
      const isOpen = fieldset.classList.contains('open');
  
      // Toggle the display of the position labels based on checkbox checked state and fieldset open class
      if (isOpen && checkbox.checked) {
        positionLabelX.style.display = 'block';
        if (positionLabelY) positionLabelY.style.display = 'block';
      } else {
        positionLabelX.style.display = 'none';
        if (positionLabelY) positionLabelY.style.display = 'none';
      }
    }
  
    // Attach the change event listener to all checkboxes with class 'checkbox-custom'
    const checkboxes = document.querySelectorAll('.checkbox-custom');
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        togglePositionLabel(checkbox);
      });
  
      // Initialize the display state based on the checkbox checked state
      togglePositionLabel(checkbox);
    });
  
    // Function to toggle the .open class on fieldsets when the legend is clicked
    const legends = document.querySelectorAll('legend');
    legends.forEach(function(legend) {
      legend.addEventListener('click', function() {
        const fieldset = this.parentNode;
        fieldset.classList.toggle('open');
        // Update the display of all position labels within this fieldset
        const checkboxes = fieldset.querySelectorAll('.checkbox-custom');
        checkboxes.forEach(function(checkbox) {
          togglePositionLabel(checkbox);
        });
      });
    });
  });
  