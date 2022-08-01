import React, {useState, useEffect} from 'react'
import {Avatar} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function DriverTrackingBar({
    booking,
    setBookingDriver,
    bookingDriver,
    driverData
}) {

    const handleDriverClick = (booking) => {
        setBookingDriver([booking])
    }

  return (
      <>
        {driverData.length > 0 ? driverData.map((driver) => (
            <div className='driver-tracking-bar-container' onClick={() => handleDriverClick(booking)} key={uuidv4()}>
            <div className='driver-profile'>
                <div>
                    <div>
                        <Avatar className='Enterprise-icon'>{driver.fleet_name.toUpperCase().substring(0,2)}</Avatar>                    
                    </div>
                    <div>
                        <h1>{driver.fleet_name}</h1>
                        <p>Trip ID: {booking.booking_ref}</p>
                    </div>
                </div>
                <div>
                    <p>vehicle type</p>
                </div>
            </div>
            <div className='progress-bar'>
                <progress 
                    value={10} 
                    max={100} 
                    className="progress-bars"
                />
            </div>
        </div>
        ))
            : <></>
        }
      </>
  )
}
