let prime = 65521;

module.exports = {
  generateShares,
  evaluatePolynomial
}

// Prints a polynomial in human readable form
function printPolynomial(polynomial) {

  let output = '';

  for (let i = 0; i < polynomial.length; i++) {
    output += polynomial[i] + 'x^' + i;
    if (i !== polynomial.length - 1) output += ' + ';
  }

  console.log('Random Polynomial: ' + output);

}

// Evaluates a polynomial given an input x and an array of constant
// multipliers
function evaluatePolynomial(polynomial, x) {

  let n = polynomial.length-1;

  let result = polynomial[n];

  for (i = n-1; i >= 0; i--) {
    result = (result * x) % prime;
    result = (result + polynomial[i]) % prime;
  }

  return result;

}

// Generates an array of k shares given the secret
function generateShares(secret, k) {

  const high = prime;

  let randomPolynomial = generateRandomPolynomialWithSecret(k, high, secret);

  let shares = [];

  printPolynomial(randomPolynomial);

  for (let i = 1; i <= k; i++) {
    shares.push(evaluatePolynomial(randomPolynomial, i));
  }

  return shares;

}

// Generates a random polynomial of a certain degree
// (returns an array of constant multipliers)
// with constant multipliers up to a number, max
// Uses the secret as the degree 0 constant multiplier
function generateRandomPolynomialWithSecret(degree, max, secret) {

  let polynomial = [secret];

  for (let i = 1; i < degree; i++) {
    polynomial.push(generateRandom(max));
  }

  return polynomial;

}

// Generates a random number between 1 and the two given number (inclusive)
function generateRandom(high) {

  if (high == 1) return 1;
  return Math.floor(Math.random() * high);

}
