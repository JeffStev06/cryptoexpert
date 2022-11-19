
export function checkNumber(n) {
  // check if the passed value is a number
  if(typeof n == 'number' && !isNaN(n)){
    return true;
  } else {
      return false;
  }
  
}
