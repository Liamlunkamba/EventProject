if (error.response) {
  if (error.response.status === 400) {
    setErrorMessage("Invalid input. Please check your fields.");
  } else {
    setErrorMessage(error.response.data || "An error occurred. Please try again.");
  }
} else if (error.request) {
  setErrorMessage("No response from the server. Please try again later.");
} else {
  setErrorMessage("An unexpected error occurred.");
}

