import React from 'react'
import Navbar from '../../common/Navbar'
import Sidebar from '../../common/Sidebar'
import LoginPage from '../Login/Login'



function Home() {

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

  const userData=getItemFromLocal("user_crypt");

  const { 
    Role,
    EmployeeName
  } = userData;

  return (
    <>
      <div className='home-body'>

        <Navbar />
        <Sidebar />
      

      </div>
    </>
  )
}

export default Home