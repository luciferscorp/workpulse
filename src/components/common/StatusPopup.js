import React,{useState,useEffect} from "react";
import './../assets/css/StatusPopup.css';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
export default function StatusPopup({ message, timeout }) {

  function refreshPage() {
    window.location.reload();
     }
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        refreshPage();
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, ]);

  if (!show) {
    return null;
  }

  return <div className="auto-close-message">{message}</div>;
  // return(
  
  //   <Stack sx={{ width: '100%' ,zIndex:"+4", position:'absolute',marginTop:"2%"}} spacing={2}>
  //     <Alert variant="filled" severity="success">
  //       This is a filled success Alert.
  //     </Alert>
  //   </Stack>

  // );
};