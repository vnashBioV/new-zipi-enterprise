import React, { useState } from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import Alert from '../Alerts/Alert';
import Spinner from '../Spinner';

export default function AddLocationOneContact({
        setBookingArrayTwo, 
        businessTypeTwo, 
        handleBusinessTwo, 
        residenceTypeTwo, 
        handleResidenceTwo,
        closeLocationModalTwo,
        bookingArrayTwo,
        doDetails,
        setDoDetails
    }) {

    const iconName = ("Jane").substring(0,2);
    // var bookingWorkingArray = []

    //=========STATES ARRAY=========================================================================
    const [bookingArrayTwoInst, setBookingArrayTwoInst] = useState([])
    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);
    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
    console.log(bookingArrayTwo)
    console.log("booking working array",bookingArrayTwo.length)
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
                    className={!businessTypeTwo ? 'btn-address-type' : 'deactivate'}
                    onClick={handleBusinessTwo}
                    value="business"
                >
                    Business
                </label>
                <label 
                    className={!residenceTypeTwo ? 'btn-address-type' : 'deactivate'}
                    onClick={handleResidenceTwo}
                    value="residence"
                >
                    Residence
                </label>
            </div>
            <input 
                type="text" 
                placeholder='Company Name'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doCompanyName:e.target.value
                    } 
                }))
            }
            />
            <input 
                type="text" 
                placeholder='Physical Address'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doAddress:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='City Name'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doCityName:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='Complex / Building'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doComplexBuilding:e.target.value
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
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doSpecialInstructions:e.target.value
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.operatingHours,
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.operatingHours,
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
                            onClick={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.operatingHours,
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doPublicHolidays:{
                                        ...prevState.doDetails.operatingHours,
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doPublicHolidays:{
                                        ...prevState.doDetails.operatingHours,
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
                            onClick={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.operatingHours,
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
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doEmail:e.target.value
                    } 
                    }))
                }
            />
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Name'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doName:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Surname'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doSurname:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Phone'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doPhone:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Telephone'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doTelephone:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <select 
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doNotificationType:e.target.value
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
                            setBookingArrayTwoInst([bookingArrayTwo])
                            const newBookingTwo = {date: new Date(), bookingArrayTwo}
                            console.log("newBookingTwo", newBookingTwo)
                            setDoDetails([...doDetails, newBookingTwo])
                            localStorage.setItem("BookingTwo", JSON.stringify([...doDetails, newBookingTwo]));

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
            {doDetails.length > 0 ? doDetails.map((booking) =>(
                <React.Fragment key={booking.id}>
                    <div className='contact-wrapper'>
                        <Avatar className='Enterprise-icon'>{booking.bookingArrayTwo.doDetails.doName.toUpperCase().substring(0,2)}</Avatar>
                        <div>
                            <p>{booking.bookingArrayTwo.doDetails.doName}</p>
                            <p>{booking.bookingArrayTwo.doDetails.doEmail}</p>
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
            <button onClick={closeLocationModalTwo}>Cancel</button>
            <button onClick={closeLocationModalTwo}>Save</button>
        </div> 
        </div>   

    </div>

    
  )
}
