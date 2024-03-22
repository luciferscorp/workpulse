import * as React from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import "../assets/css/TimePickerComponent.css"

export default function CustomTimeFormat(props) {
  const [getValue, setgetValue] = useState([])




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
        <TimeField

          className='time-picker-field'
          defaultValue={dayjs('2022-04-17T00:00:00')}
          format="HH:mm:00"
          onChange={(e) => props.handlechange(e.$d)}
        />

      </DemoContainer>
    </LocalizationProvider>
  );
}
