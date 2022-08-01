import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
// import BiddingDetails from '../components/BiddingDetails';

export default function SelectedBooking({
    setFirstPrice, 
    setDeactivateAccept,
    settleAmount,
    firstPrice,
    setSettleAmount,
    deactivateAccept,
    bookingId,
    booking,
    booking_ref,
    handleAccept,
    handleSettle,
    allPrices,
}) {

  return (
    <div>
      <div className='actual-offers'>
          <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{booking_ref}</h2>
          <div className='loads-offered'>
            <div>
                <p>10 loads offered</p>
                <p>Transporter Quotation: R{firstPrice}</p>
                
            </div>
            <div>
              <div>
                <input type="text" placeholder='Amount (R)' onChange={(e) => setSettleAmount(e.target.value)}/>
                <button onClick={() => handleSettle(booking)}>Settle</button>
              </div>
            </div>
            <div>
              <button className={!deactivateAccept ? 'accept-offer' : 'accept-deactivated'} onClick={() => handleAccept(booking)}>Accept</button>
            </div>
          </div>
      </div>        
    </div>
  )
}
