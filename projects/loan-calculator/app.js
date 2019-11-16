// Event Listener
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide Results
  document.getElementById("results").style.display = "none";
  // Show loader
  document.getElementById("loading").style.display = "block";

  // Calculate results after 1 second
  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  // DOM variables
  const amountUI = document.getElementById("amount");
  const interestUI = document.getElementById("interest");
  const yearsUI = document.getElementById("years");
  const monthtlyPaymentUI = document.getElementById("monthly-payment");
  const totalPaymentUI = document.getElementById("total-payment");
  const totalInterestUI = document.getElementById("total-interest");

  // Loan formulas
  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;

  // Compute montlhy payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  // Hide loader after calculations are done
  document.getElementById("loading").style.display = "none";

  // Check and show rsults or throw error
  if (isFinite(monthly)) {
    monthtlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestUI.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    // Show results if no errors
    document.getElementById("results").style.display = "block";
  } else {
    // Calls showError function with argument
    showError("Please check your numbers");
  }

  e.preventDefault();
}

function showError(error) {
  // Create div
  const errorDiv = document.createElement("div");
  // Get Elements
  const cardUI = document.querySelector(".card");
  const headingUI = document.querySelector(".heading");

  // Add error bootstrap classes
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Instert error above heading
  cardUI.insertBefore(errorDiv, headingUI);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clar error
function clearError() {
  document.querySelector(".alert").remove();
}
