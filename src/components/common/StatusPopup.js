import React,{useState,useEffect} from "react";
import './../assets/css/StatusPopup.css';
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
  }, [show, timeout]);

  if (!show) {
    return null;
  }

  return <div className="auto-close-message">{message}</div>;
}