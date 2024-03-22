import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = ({ Component }, UserRole) => {

  const decipher = (salt) => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
  }
    const myDecipher =  decipher('mySecretSalt')
  
  function getItemFromLocal(localData) {
    let form_data = JSON.parse(myDecipher(localStorage.getItem(localData)));
    return form_data;
    
  }

  const userData = getItemFromLocal("user_crypt");
  const Role=1;

  const [isAuthenticated, setIsAuthenticated] = useState('');

  useEffect(() => {
 
      setIsAuthenticated(true)
    
  }, []);


  // Your authentication logic goes here...

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;