import React, { useState, useEffect } from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import '../../css/cargo.css';
import firebase from '../../firebase-config'
import Spinner from '../Spinner';
import Alert from '../Alerts/Alert';

export default function Cargo({
        setOpenCargoModal,
        cargoDetails,
        setCargoDetails,
        fileUrl,
        setFileUrl,
        bookingArrayThree,
        setBookingArrayThree
    }) {

    const iconName = ("Jane").substring(0,2);
    const [fileUpload, setFileUpload] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openAlert, setAlert] = useState(false)
    const [openAlertTwo, setAlertTwo] = useState(false)

    //=========STATES ARRAY=========================================================================
    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
        console.log("file upload", fileUpload);
        console.log("file url", fileUrl);
        console.log("cargoDetails", cargoDetails)
        console.log("book array three", bookingArrayThree)
    //========END CONSOLE LOGS======================================================================
    
    //==========FUNCTIONS===========================================================================
       const handleUpload = (e) => {
            e.preventDefault()
            const storage = firebase.storage()
            if(fileUpload === null) return
            const fileRef = storage.ref(`sds-file/${fileUpload.name}`)
            fileRef.put(fileUpload).then((snapshot) => {
                const fileUrl = fileRef.getDownloadURL()
                .then((url) => {                
                    setFileUrl(url)
                })
                  .catch((error) => {
                    // Handle any errors
                  });
              });
            setAlertTwo(true) 
            setTimeout(() =>{
                setAlertTwo(false)  
            }, 2000);
        }

        
        const HandleSaveCargo = () =>{
            if(cargoDetails){
                const newBooking = {date: new Date(), sdsUrl: fileUrl ,  bookingThree: cargoDetails}

                setBookingArrayThree((prevState) => ([
                    ...prevState,
                    newBooking,

                    
                ]))
                localStorage.setItem("localBookingThree", JSON.stringify([...bookingArrayThree, newBooking]))
                console.log(bookingArrayThree)
                setCargoDetails( {
                    "cargoDetails": {
        
                    }
                })
            }
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
            setTimeout(() => {
                setOpenCargoModal(false)
            }, 5000); 
                      
        }
        
        
    //==========END FUNCTIONS=======================================================================


    //=========USE EFFECTS==========================================================================
        // useEffect(() => {
        //     setCargoDetails((prevState) => ({
        //         ...prevState,
        //         cargoDetails:{
        //             ...prevState.cargoDetails,
        //             sdsFileUrl:fileUrl
        //         } 
        //     }))
        // }, [])
        
    //===========END USE EFFECFS====================================================================

  return (
    <div className='modal-container'>
        <div className='modal' style={{width:"423px"}}>
            <div className='cargo-modal'>
                <h1>New Product</h1>  
                <p>Add a new package by adding its information</p>
                <div>
                    <input 
                        type="text" 
                        placeholder='Product Name' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                productName:e.target.value
                            } 
                            }))
                        }
                    />
                    <input 
                        type="text" 
                        placeholder='Product Number' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                productCode:e.target.value
                            } 
                            }))
                        }
                    />
                </div>
                <select name="" id=""
                     onChange={e =>setCargoDetails((prevState) => ({
                        ...prevState,
                        cargoDetails:{
                            ...prevState.cargoDetails,
                            category:e.target.value
                        } 
                        }))
                    }
                >
                    <option value="">Category</option>
                    <option value="Sand">Sand</option>
                    <option value="Bricks">Bricks</option>
                    <option value="paper">Paper</option>
                </select>
                <div className='horizontal-line'>
                    <hr />
                </div>
                <p>Packaging</p>
                <div>
                    <select name="" id=""
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                packageType:e.target.value
                            } 
                            }))
                        }
                    >
                        <option value="">Package type</option>
                        <option value="pallet">Pallet</option>
                        <option value="box">Box</option>
                        <option value="crate">Crate</option>
                        <option value="carton">Carton</option>
                        <option value="case">Case</option>
                        <option value="drum">Drum</option>
                        <option value="bucket">Bucket</option>
                        <option value="bag">Bag</option>
                        <option value="shrinkwrap">Shrinkwrap</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder='Length (cm)' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                lengthValue:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <div>
                    <input 
                        type="text"     
                        placeholder='Volume (m)'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                volume:e.target.value
                            } 
                            }))
                        }
                    />
                    <input 
                        type="text" 
                        placeholder='Breadth (cm)' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                breadth:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder='Weight'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                weight:e.target.value
                            } 
                            }))
                        }
                    />
                    <input 
                        type="text" 
                        placeholder='Height (cm)' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                height:e.target.value
                            } 
                            }))
                        }
                    />
                </div>
                <div className='horizontal-line'>
                    <hr />
                </div>
                <p>Additional Information</p>
                <div>
                    <input type="text" placeholder='Job Type' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                job_type:e.target.value
                            } 
                            }))
                        }
                    />
                      <input type="text" placeholder='HS Code' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                hs_code:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <div>
                    <input type="text" placeholder='Crane Truck' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                crane_truck:e.target.value
                            } 
                            }))
                        }
                    />
                      <input type="text" placeholder='Container Loading' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                container_loading:e.target.value
                            } 
                            }))
                        }
                    />
                </div>
                <p style={{marginTop:"15px"}}>Verified Gross Mass</p>
                <div style={{display:"flex", justifyContent:"start", fontSize:"12px", marginBottom:"10px"}}>
                    <label htmlFor="">
                        <input type="radio" 
                            onClick={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    verified_gross_mass: e.target.value
                                } 
                            }))
                        }
                        value="False"
                        />
                        False
                    </label>
                    <label htmlFor="">
                        <input type="radio" 
                            onClick={e =>setCargoDetails((prevState) => ({
                                    ...prevState,
                                    cargoDetails:{
                                        ...prevState.cargoDetails,
                                        verified_gross_mass: e.target.value
                                    } 
                                }))
                            }
                        value="True"
                        />
                        True
                    </label>
                </div>
           
                <label htmlFor="">
                    <input type="radio" 
                     onClick={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                // cargoCondition:e.target.value
                                hazard:{
                                    ...prevState.cargoDetails.hazard, 
                                    hazard_rating:e.target.value
                                }
                            } 
                        }))
                    }
                        value="Fragile"
                    />
                    Fragile
                </label>
                <label htmlFor="">
                    <input type="radio" 
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    // cargoCondition:e.target.value
                                    hazard:{
                                        ...prevState.cargoDetails.hazard, 
                                        hazard_rating:e.target.value
                                    }
                                } 
                            }))
                        }
                    value="Temperature controlled"
                    />
                    Temperature Controlled (C)
                </label>
                <div className='max-min'>
                    <input 
                        type="text" 
                        placeholder='Min'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                // cargoCondition:e.target.value
                                hazard:{
                                    ...prevState.cargoDetails.hazard, 
                                    min_temp:e.target.value
                                }
                            } 
                        }))
                    }
                    />
                    <input 
                        type="text" 
                        placeholder='Max'
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    // cargoCondition:e.target.value
                                    hazard:{
                                        ...prevState.cargoDetails.hazard, 
                                        max_temp:e.target.value
                                    }
                                } 
                            }))
                        }
                    />
                </div>
                <label htmlFor="">
                    <input 
                        type="radio" 
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    // cargoCondition:e.target.value
                                    hazard:{
                                        ...prevState.cargoDetails.hazard, 
                                        hazard_rating:e.target.value
                                    }
                                }
                            }))
                        }
                    value="Hazardous"
                    />
                    Hazardous
                </label>
                <input type="text" placeholder='IMDG Number' 
                    onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                // cargoCondition:e.target.value
                                hazard:{
                                    ...prevState.cargoDetails.hazard, 
                                    IMDG_number:e.target.value
                                }
                            }
                        }))
                    }
                />
                <div className='un-number'>
                    <input 
                        type="text" 
                        placeholder='IMO Class'
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    imoClass:e.target.value
                                } 
                            }))
                        }
                    />
                    <input 
                        type="text" 
                        placeholder='UN Number'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                unNumber:e.target.value
                            } 
                        }))
                    }
                    />
                    <label htmlFor="file" className='upload-file-label'>
                        <input type="file" id='file' accept='image/*' 
                            onChange={(e) => {setFileUpload(e.target.files[0])}}
                            // onClick={handleUpload}
                        />
                        <i class="fa-solid fa-upload"></i>
                        upload SDS
                        <button style={{
                            border:"none",
                            background:"yellow",
                            borderRadius:"100%",
                            marginLeft:"10px",
                            cursor:"pointer",
                            height:"20px",
                            width:"20px"
                        }}
                        onClick={handleUpload}
                        >+</button>
                    </label>
                    {openAlertTwo &&
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
                                onClick={() => setAlertTwo(false)}
                                >X</p>
                                <h1 style={{fontSize:"14px", fontWeight:"normal"}}>File upload complete</h1>
                            </div>
                        </Alert> 
                    }
                    {/* {
                        !fileUpload &&
                        <div className='outerbar'>
                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                        </div>
                    } */}
                </div>
            </div> 
            <div className='cancel-add-btn' style={{width:"100%"}}>
                <button onClick={() => setOpenCargoModal(false)}>Cancel</button>
                <button onClick={HandleSaveCargo}>Save</button>
            </div>     
        </div>
       
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
                        <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Cargo Successfully added...</h1>
                    </div>
                </Alert>
            }
    </div>

    
  )
}
