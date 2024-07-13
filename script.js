document
  .getElementById('displayButton')
  .addEventListener('click', async function () {
    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');

    // Clear previous output
    outputDiv.innerText = '';
    outputDiv.classList.remove('error');

    // Validate URL
    try {
      new URL(userInput);
    } catch (error) {
      outputDiv.innerText = 'Invalid URL';
      outputDiv.classList.add('error');
      return;
    }

    try {
      const response = await fetch('./phishtank.json');
      const data = await response.json();

      // Check if the input URL is in the fetched data
      const urlExists = data.some((item) => item.url === userInput);
      if (urlExists) {
        outputDiv.innerText = 'Phishing URL';
        outputDiv.classList.add('error');
      } else {
        // Perform simple client-side validation
        const isPhishing = checkForPhishingSigns(userInput);
        if (isPhishing) {
          outputDiv.innerText = 'Potential Phishing URL';
          outputDiv.classList.add('error');
        } else {
          outputDiv.innerText = 'Safe URL';
        }
      }
    } catch (error) {
      outputDiv.innerText = 'Error fetching data from the JSON file.';
      outputDiv.classList.add('error');
    }
  });

function checkForPhishingSigns(url) {
  const phishingSigns = [
    /login/,
    /update/,
    /verify/,
    /account/,
    /secure/,
    /bank/,
    /paypal/,
    /alert/,
    /ebay/,
    /password/,
    /free/,
    /offer/,
    /bonus/,
    /prize/,
    /gift/,
    /suspicious/,
    /verify/,
    /safety/,
    /confirmation/,
    /delivery/,
    /support/,
    /help/,
    /confirm/,
    /urgent/,
  ];

  // Check for common phishing signs in the URL
  return phishingSigns.some((sign) => sign.test(url.toLowerCase()));
}
