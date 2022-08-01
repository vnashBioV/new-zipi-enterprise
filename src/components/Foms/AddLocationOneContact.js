import React, { useState } from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import Alert from '../Alerts/Alert';
import Spinner from '../Spinner';

export default function AddLocationOneContact({
        setBookingArray, 
        businessType, 
        handleBusiness, 
        residenceType, 
        handleResidence,
        closeLocationModal,
        bookingArray,
        puDetails,
        setPuDetails
    }) {

    const iconName = ("Jane").substring(0,2);
    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);

    //=========STATES ARRAY=========================================================================
    const [bookingArrayInst, setBookingArrayInst] = useState([])
    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
    console.log(bookingArray)
    console.log("booking working array",bookingArray.length)
    //========END CONSOLE LOGS======================================================================

    //==========FUNCTIONS===========================================================================
    
    //==========END FUNCTIONS=======================================================================


    //=========USE EFFECTS==========================================================================

    //===========END USE EFFECFS====================================================================

  return (
    <div className='modal-container'>
        <div className='modal'>
        <div className='add-contacts-wrapper' style={{width: "709px"}}>
        <div>
            <h2>New address</h2>
            <p>Add a new contact by adding their information</p>
            <div className='address-type'>
                <label 
                    className={!businessType ? 'btn-address-type' : 'deactivate'}
                    onClick={handleBusiness}
                    value="business"
                >
                    Business
                </label>
                <label 
                    className={!residenceType ? 'btn-address-type' : 'deactivate'}
                    onClick={handleResidence}
                    value="residence"
                >
                    Residence
                </label>
            </div>
            <input 
                type="text" 
                placeholder='Company Name'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puCompanyName:e.target.value
                    } 
                }))
            }
            />
            <input 
                type="text" 
                placeholder='Physical Address'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puAddress:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='City Name'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puCityName:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='Complex / Building'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puComplexBuilding:e.target.value
                    } 
                    }))
                }
            />
            <p className='complex-label'>Building or complex name, floor or unit number</p>
            <div className='text-area-wrap'>
                <textarea 
                    cols="20" 
                    rows="5" 
                    placeholder='Special instructions for driver'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        puDetails:{
                            ...prevState.puDetails,
                            puSpecialInstructions:e.target.value
                        } 
                        }))
                    }
                >
                </textarea>
            </div>
            <span style={{display:"flex", alignItems:"center"}}>
                <h2 style={{fontSize:"13px", marginTop:"11px", marginBottom:"8px"}}>Operating Hours</h2>
                <i className="fa-solid fa-asterisk" style={{fontSize:"10px", color:"red", marginLeft:"5px"}}></i>
            </span>
            <div className='operating-hours'>
                <div>
                    <div>Open</div>
                    <div>Close</div>
                    <div>24hrs</div>
                </div>

                <div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="text" 
                            placeholder=':'
                            onChange={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.puOperatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="text" 
                            placeholder=':'
                            onChange={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.puOperatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            onClick={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.operatingHours,
                                            twentyFourHours:true
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                </div>

                

            </div>
            <div className='operating-hours'>
                <h3 style={{fontSize:"13px", marginTop:"10px", marginBottom:"12px"}}>Public Holidays</h3>
                <div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="text" 
                            placeholder=':'
                            onChange={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.puOperatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="text" 
                            placeholder=':'
                            onChange={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.operatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            onClick={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puOperatingHours:{
                                        ...prevState.puDetails.operatingHours,
                                            twentyFourHours:true
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                </div>
                
            </div>
            <div className='horizontal'>
                <hr />
            </div>
            <input 
                type="text" 
                placeholder='Email'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puEmail:e.target.value
                    } 
                    }))
                }
            />
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Name'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        puDetails:{
                            ...prevState.puDetails,
                            puName:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Surname'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        puDetails:{
                            ...prevState.puDetails,
                            puSurname:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Phone'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        puDetails:{
                            ...prevState.puDetails,
                            puPhone:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Telephone'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        puDetails:{
                            ...prevState.puDetails,
                            puTelephone:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <select 
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    puDetails:{
                        ...prevState.puDetails,
                        puNotificationType:e.target.value
                    } 
                    }))
                }
            >
                <option value="">Notification Type</option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="Both">Both</option>
            </select>
            <div className='add-to-contact'>
                <button 
                    onClick={() =>{
                            setBookingArrayInst([bookingArray])
                            const newBooking = {date: new Date(), bookingArray}
                            console.log("newBooking", newBooking)
                            setPuDetails([...puDetails, newBooking])
                            localStorage.setItem("Booking", JSON.stringify([...puDetails, newBooking]));
                            setOpenSpinner(true)
                            setTimeout(() =>{
                                setOpenSpinner(false)  
                            }, 2000);
                            setOpenSpinner(true)
                            const closeSpinner = () => {
                               setOpenSpinner(false)
                            }
                            setTimeout(closeSpinner, 1000);
                            const openAlert = ()=>{
                                setAlert(true);
                            }
                            const closeAlert = ()=>{
                               setAlert(false);
                           } 
                           setTimeout(openAlert, 2000); 
                           setTimeout(closeAlert, 5000); 
                        }
                    }
                >
                    Add to contacts
                </button>
                {openSpinner && <Spinner/>}
                {openAlert && 
                    <Alert >
                        <div style={{width:"256px"}}>
                            <p style={{
                                position:"absolute",
                                right:"0px",
                                top:"0px",
                                padding:"7px",
                                cursor:"pointer",
                                fontWeight:"bold"
                            }}
                            onClick={() => setAlert(false)}
                            >X</p>
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact Successfully added...</h1>
                        </div>
                    </Alert>
                }
            </div>
        </div>
        <div>
            <h2 style={{marginBottom:"17px"}}>Contacts</h2>
            {puDetails.length > 0 ? puDetails.map((booking) =>(
                <React.Fragment key={booking.id}>
                    <div className='contact-wrapper'>
                        <Avatar className='Enterprise-icon'>{booking.bookingArray.puDetails.puName.toUpperCase().substring(0,2)}</Avatar>
                        <div>
                            <p>{booking.bookingArray.puDetails.puName}</p>
                            <p>{booking.bookingArray.puDetails.puEmail}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))
            
            : <div className='no-contacts'>
                <p>
                    You currently don't have any contact for the 
                    new address. Fill in the contact details here.
                </p>
                <div>
                    <i class="fa-solid fa-arrow-trend-down"></i>
                </div>
            </div>
            }
        </div>
        </div>
        <div className='cancel-add-btn'>
            <button onClick={closeLocationModal}>Cancel</button>
            <button onClick={closeLocationModal}>Save</button>
        </div> 
        </div>

           

    </div>

    
  )
}
