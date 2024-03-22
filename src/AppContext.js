import { createContext, useState } from 'react';
import EmployeeTaskPagination from './components/common/EmployeeTaskPagination';


const appContext = createContext();
function AppContext() {
  const [value,setValue] = useState('');
  const updateValue = (data) =>{
    setValue(data)
  }
  return (
    <appContext.Provider value={{value,updateValue}}>
      <EmployeeTaskPagination/>
    </appContext.Provider>
  );
}

export default AppContext;
export {appContext}