import React, {useEffect, useState, useRef} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import EnterpriseNav from '../components/EnterpriseNav';
import '../css/schedule.css'
import firebase from '../firebase-config';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import Alert from '../components/Alerts/Alert'
import Spinner from '../components/Spinner'
import axios from 'axios';
import Box from '@mui/material/Box';
import DateRangePick from '../components/DateRangePick'
// import 'rsuite/dist/styles/rsuite-default.css';
// import { LicenseInfo } from '@mui/x-data-grid-pro';




export default function SchedulingPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userUid, setUserUid] = useState("");
    const [company, setCompany] = useState("");
    const [pickUpDetails , setPickUpDetails] = useState([])
    const [dropDetails , setDropDetails] = useState([])
    const [cargoDetails , setCargoDetails] = useState([])
    const [prerequisites , setPrerequisites] = useState([])
    const [fileUrl, setFileUrl] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [cargoSchedule, setCargoSchedule] = useState([]);
    const [operationDays, setOperationDays] = useState([])
    const [includeHolidays, setIncludeHolidays] = useState(false)
    const [rateIndication, setRateIndication] = useState(null)
    const [finalPick, setFinalPick] = useState([])
    const [finalDrop, setFinalDrop] = useState([])
    const [prerequisitesArray, setPrerequisitesArray] = useState([]);
    const [vehicleType, setVehicleType] = useState([])
    const [gateInOutDuration, setGateInOutDuration] = useState([]);
    const [bays, setBays] = useState(0);
    const [loadCalChange,setLoadCalChange] = useState(0);
    const navigate = useNavigate();
    const [rangeValue, setRangeValue] = useState(0);
    const [loadsCount, setLoadsCount] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [numberChangeVal, setNumberChangeVal] = useState(numberOfDays);
    const [moredayss, setMoredayss] = useState(() => 0)

    
    // const [valueNewRange, setValueNewRange] = useState(new Date())

    var loadcal = []
    var moreloadss = loadcal
    var moreloadCal = loadcal

    //email
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("hello")

    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);

    const rangeRef = useRef()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            setUserEmail(user.email);
              setUserUid(user.uid);
              var uid = user.uid
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const company = snapshot.val().companyDetails.registeredCompanyName
                    setCompany(company)
                });
              // ...
            } else {
            }
        });
    }, [])

    useEffect(() => {
        if(localStorage.getItem("pickSelectd")){
            const storedList = JSON.parse(localStorage.getItem("pickSelectd"))
            setPickUpDetails(storedList);
            setFinalPick(storedList[0].bookingArray.puDetails);
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("dropSelectd")){
            const storedList = JSON.parse(localStorage.getItem("dropSelectd"))
            setDropDetails(storedList);
            setFinalDrop(storedList[0].bookingArrayTwo.doDetails);
        }
    }, [])

    // useEffect(() => {
    //     return () => {
    //         if(localStorage.getItem("vehicleType")){
    //             const storedList = JSON.parse(localStorage.getItem("vehicleType"))
    //             setVehicleType(storedList);
    //         }
    //       }
    // }, [])

    useEffect(() => {
        if(localStorage.getItem("cargoSelectd")){
            const storedList = JSON.parse(localStorage.getItem("cargoSelectd"))
            const vehicleType = JSON.parse(localStorage.getItem("vehicleType"))
            storedList.map((cargo) =>(
                cargo.bookingThree.cargoDetails.vehicle_type = vehicleType[0]
            ));
            setCargoDetails(storedList);
            console.log("This is the new cargo", storedList);
        }
        
    }, [])
    
    useEffect(() => {
        return () => {
            if(localStorage.getItem("Prerequisites")){
                const storedList = JSON.parse(localStorage.getItem("Prerequisites"))
                setPrerequisites(storedList);
            }
          }
    }, [])
    

    useEffect(() => {
        const startDateString = startDate.toString().substring(0,16)
        const endDateString = endDate.toString().substring(0,16)
        setCargoSchedule({
            pickUpDetails: pickUpDetails,
            dropDetails: dropDetails,
            prerequisites:prerequisites,
            startDateString: startDateString,
            endDateString: endDateString,
            operationDays: operationDays,
            includeHolidays: includeHolidays,
            rateIndication: rateIndication
        })
        const cargo = cargoSchedule
        // localStorage.setItem("cargoSchedule", JSON.stringify([cargo]))
    }, [])

    const getBookingIFnc = async ()=>{
        return  await firebase.database().ref().push()
    }

    console.log("Selected pick up details", pickUpDetails);
    console.log("This is is is prerequisites", prerequisites);
    console.log("start date", startDate)
    console.log("end date", endDate)
    console.log("cargo schedule", cargoSchedule)
    console.log("operation days", operationDays)
    console.log("rate indication", rateIndication)
    console.log("this is bays", bays)
    console.log("this is gate in out duration", gateInOutDuration)
    console.log("range value", rangeValue)

    useEffect(() => {
        document.body.style.cssText="margin-top:98px !important";
    
        return () => {
            document.body.style.marginTop= "0px";
        };
    }, []);
    
        //Calculate number of days from start date to end date
        const d1 = startDate,
        d2 = endDate,
        diff = (d2-d1)/864e5,
        dateFormat = {weekday:'long',month:'short',day:'numeric'},
        dates = Array.from(
            {length: diff+1},
            (_,i) => {
            const date = new Date() 
            date.setDate(d1.getDate()+i) 
            const [weekdayStr, dateStr] = date.toLocaleDateString('en-US',dateFormat).split(', ')
            return `${dateStr} ${weekdayStr}`
            }
        )
            
    console.log("Dates between", dates);
    console.log("vehicle type", prerequisites)
    console.log("start date", startDate.toISOString().substring(8,10));
    console.log("end date", endDate.toISOString().substring(8,10));
    console.log("number of days", numberOfDays);
    console.log("numberChangeVal", numberChangeVal);

  return (
    <div className='schedule-page'>
         <EnterpriseNav 
            name={company}
        />
        <div  style={{display:"flex", alignItems:"center", marginBottom:"17px"}}>
            <Link to='/enterprise' style={{textDecoration:"none"}}><i className="fa-solid fa-chevron-left"></i></Link>
            <span className='schedule-navigation'>
                <p>Booking</p>
                <p>/</p>
                <p>Schedule</p>
            </span>
        </div>
        <div className='schedule-sum'>
            <div>
                <div>
                    <p>Summary</p>
                    <div>
                        <p>Empty Depot</p>
                    </div>
                    <div>
                        <p>Load Cargo</p>
                    </div>
                    <div>
                        <p>Staging Area</p>
                    </div>
                    <div>
                        <p>Offload Cargo</p>
                    </div>
                    <div style={{height:"399px"}}>
                        <p>Cargo</p>
                    </div>
                    {/* <div style={{height:"199px"}}>
                        <p>Vehicle</p>
                    </div> */}
                    <div>
                        <p>Prerequisites</p>
                    </div>
                </div>
                <div>
                    <p style={{marginBottom:"36px"}}></p>
                    <div style={{height: "69px"}}>
                       <p>Not selected</p>
                    </div>

                    {pickUpDetails.length > 0 ? pickUpDetails.map((pick) =>(
                        <React.Fragment key={pick.date}>
                            <div style={{height: "69px"}}>
                                <p>{pick.bookingArray.puDetails.puName}</p> 
                                <p>{pick.bookingArray.puDetails.puCompanyName}</p> 
                                <p>{pick.bookingArray.puDetails.puAddress}</p>    
                            </div>
                        </React.Fragment>
                    ))
            
                    : <div style={{height: "69px"}}><p>Not selected</p></div> 
                    }
                    

                    <div style={{height: "69px"}}>
                       <p>Not selected</p>
                    </div>
                    {dropDetails.length > 0 ? dropDetails.map((drop) =>(
                        <React.Fragment key={drop.date}>
                            <div style={{height: "69px"}}>
                                <p>{drop.bookingArrayTwo.doDetails.doName}</p> 
                                <p>{drop.bookingArrayTwo.doDetails.doCompanyName}</p> 
                                <p>{drop.bookingArrayTwo.doDetails.doAddress}</p>    
                            </div>
                        </React.Fragment>
                    ))
            
                    : <div style={{height: "69px"}}><p>Not selected</p></div> 
                    }

                    <div className='cargo-sum-sched'>
                        {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                            <React.Fragment key={cargo.date}>
                                <div>
                                    <h1>{cargo.bookingThree.cargoDetails.productName}</h1> 
                                    <p>SKU: {cargo.bookingThree.cargoDetails.productCode}</p> 
                                </div>
                            </React.Fragment>
                        ))
                
                            : <div>
                                <h1>Not selected</h1>
                                <p>Not selected</p>
                            </div>
                        }
                        <div>
                            <div className='quantity-plus-info'> 

                                <div>
                                    <p>Quantity</p>
                                    <p>Length</p>
                                    <p>Breadth</p>
                                    <p>Height</p>
                                </div>

                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                <React.Fragment key={cargo.date}>
                                    <div>
                                        <p>: {cargo.bookingThree.cargoDetails.quantity}</p> 
                                        <p>: {cargo.bookingThree.cargoDetails.lengthValue} cm</p> 
                                        <p>: {cargo.bookingThree.cargoDetails.breadth} cm</p> 
                                        <p>: {cargo.bookingThree.cargoDetails.height} cm</p> 
                                    </div>
                                </React.Fragment>
                                ))
                        
                                    : <div>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                    </div>
                                }
                            </div>

                            <div className='quantity-plus-info'>
                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                <React.Fragment key={cargo.date}>
                                    <div>
                                        <p>{
                                                cargo.bookingThree.cargoDetails.lengthValue *
                                                cargo.bookingThree.cargoDetails.breadth *
                                                cargo.bookingThree.cargoDetails.height

                                            }cm&#179; :</p> 
                                        <p>{
                                                cargo.bookingThree.cargoDetails.lengthValue *
                                                cargo.bookingThree.cargoDetails.breadth *
                                                cargo.bookingThree.cargoDetails.height

                                            }cm&#179; :</p> 
                                        <p>Not selected</p> 
                                        <p>Not selected</p> 
                                    </div>
                                </React.Fragment>
                                ))
                        
                                    : <div>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                    </div>
                                }

                                <div>
                                    <p>Net Volume</p>
                                    <p>Total Volume</p>
                                    <p>Net Weight</p>
                                    <p>Total Weight</p>
                                </div>
                            </div>
                        </div>

                        <div className='hazardous-cargo'>
                            <div>
                                <p>Hazardous Cargo</p>
                            </div>
                            <div className='hazardous-wrapper'>
                                <div className='hazardous-second-child'>
                                    <div>
                                        <p>Package Type</p>
                                        <p>Fragile Cargo</p>
                                    </div>
                                    {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo.date}>
                                        <div style={{textAlign:"start"}}>
                                            <p>: {cargo.bookingThree.cargoDetails.packageType}</p> 
                                        <p>: No</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                    }

                                </div>

                                <div className='hazardous-second-child'>
                                    {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo.date}>
                                        <div style={{justifyContent:"end", textAlign:"end"}}>
                                            <p>{cargo.bookingThree.cargoDetails.imoClass} :</p> 
                                            <p>{cargo.bookingThree.cargoDetails.unNumber} :</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                    }

                                    <div>
                                        <p>IMO</p>
                                        <p>UN Number</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='temperature-controlled'>
                            <div>
                                <p>Temperature Controlled Cargo</p>
                            </div>
                            <div className='hazardous-second-child'>
                                <div>
                                    <p>Min</p>
                                    <p>Max</p>
                                </div>
                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo.date}>
                                        <div style={{justifyContent:"start", textAlign:"start"}}>
                                            <p>: {cargo.bookingThree.cargoDetails.min}</p> 
                                            <p>: {cargo.bookingThree.cargoDetails.max}</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                }
                            </div>
                        </div>

                        {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                            <React.Fragment key={cargo.date}>
                                 <a href={cargo.sdsUrl}  className='view-sds'>View SDS <i className="fa-solid fa-eye"></i></a>
                            </React.Fragment>
                            ))
                    
                                : <a href="" className='view-sds'>View SDS <i className="fa-solid fa-eye"></i></a>

                        }                    
                    </div>

                    <div className='prerequisites'>
                        <h2>{vehicleType}</h2>
                        <div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Ad-hoc Services</p>
                                {prerequisites.length > 0  ? prerequisites[0].prerequisites.ad_hoc_services.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                    { pre && <p>{pre}</p> }
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Documentation</p>
                                {prerequisites.length > 0 ? prerequisites[0].prerequisites.documentation.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>{pre}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                        </div>

                        <div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Personal Protective Equipment</p>
                                {prerequisites.length > 0 ? prerequisites[0].prerequisites.personal_protective.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>{pre}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Vehicle Equipment</p>
                                <div>
                                    {prerequisites.length > 0 ? prerequisites[0].prerequisites.vehicle_equipment.map((pre, key) =>{
                                    return(
                                        <p key={uuidv4()}>{pre}</p>
                                    )})
                                        : <p>Not selected</p>
                                    }
                                </div>
                                
                            </div>
                        </div>
                        <div className='insurance'>
                            <h2>Insurance (Goods in Transit)</h2>
                            {prerequisites.length > 0 ? prerequisites.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>R{pre.prerequisites.goods_in_transit}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className='schedule-the-cargo'>
                <h2>Schedule this cargo</h2>
                <p>When would you like to move this cargo?</p>
                <div className='pick-the-date'>
                        <DateRangePick
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            numberOfDays={numberOfDays}
                            setNumberOfDays={setNumberOfDays}
                        />
                </div>
                <p style={{marginTop:"10px", marginBottom:"10px"}}>Handling Operation Days</p>
                <div className='days-of-week' style={{marginBottom:"10px"}}>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Monday">M</button>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Tuesday">T</button>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Wednesday">W</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Thursday">T</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Friday">F</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Saturday">S</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Sunday">S</button>
                </div>
                <label htmlFor="" style={{fontSize:"12px"}}>
                    <input type="checkbox" name="" id="" style={{marginRight:"8px"}} onClick={() => setIncludeHolidays(true)}/>
                    Include public holidays
                </label>

                {/* <div className='exclude-dates'>
                    <p>Exclude Dates</p>
                    <p>5 selected</p>
                </div> */}
                <div className='gate-duration'>
                    <p>Gate in - gate out duration</p>
                    <div className='gate-in-out'>
                        <label htmlFor="15 mins">
                            <input value="15 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            15 mins
                        </label>
                        <label htmlFor="30 mins">
                            <input value="30 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            30 mins
                        </label>
                        <label htmlFor="60 mins">
                            <input value="60 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            60 mins
                        </label>
                    </div>

                    <div className='gate-in-out'>
                        <label htmlFor="90 mins">
                            <input value="90 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            90 mins
                        </label>
                        <label htmlFor="2 hrs">
                            <input value="2 hrs" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            2 hrs
                        </label>
                        <label htmlFor="3 hrs">
                            <input value="3 hrs" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            3 hrs
                        </label>
                    </div>
                    <div className='other-mins'>
                        <input type="text" placeholder='Other mins' onChange={(e) => setGateInOutDuration(e.target.value)}/>
                    </div>
                    <div className='bay-container'>
                        <div className='bays'>
                            <p>Bays</p>
                            <input type="text" placeholder='e.g 5' onChange={(e) => {
                                setBays(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <p>Daily Load Capacity</p>
                            {pickUpDetails.length > 0 ? pickUpDetails.map((booking) =>{
                                const Closehours = booking.bookingArray.puDetails.puOperatingHours.close.substring(0,2)
                                const Openhours =  booking.bookingArray.puDetails.puOperatingHours.open.substring(0,2)
                                const OH = (Closehours - Openhours)*(60)
                                  loadcal.push(((OH)/(parseFloat(gateInOutDuration)))*(bays))
                                console.log("loadsCount: ", loadcal);
                                return(
                                    <p key={uuidv4()} style={{marginTop:"7px"}}>{loadcal} per day</p>
                                )})
                                    : <p style={{marginTop:"7px"}}>N/A</p>
                            }
                        </div>
                    </div>
                    <div className='time-loads'>
                        <p>Time vs Loads</p>
                        <p style={{fontSize:"10px"}}>Move the slider to see how it's going to affect loads and duration.</p>
                        <input 
                            type="range" 
                            max={dates.length} 
                            min={1} 
                            onChange={(e) =>{
                                setRangeValue(e.target.value)
                            }}
                            className='range-input'
                        />
                        <div className='track-label'>
                            <div>
                                <p>More days</p>
                                <p>{rangeValue} days</p>
                            </div>
                            <div>
                                <p>More loads</p>
                                <p key={uuidv4()} style={{color: 'red'}}>{moreloadCal} per day</p>
                                {/* <p style={{color: 'red'}}>{loadcal} per day</p> */}
                            </div>
                        </div>
                        <div className='load-required-date'>
                            <p style={{fontSize: '11px'}}>Loads Required</p>
                            <p style={{fontSize: '14px'}}>{loadcal}</p>
                            <p style={{fontSize: '11px'}}>Est. Date of Completion</p>
                            <p style={{fontSize: '14px'}}>{endDate.toISOString().substring(0,10)}</p>
                        </div>
                    </div>
                </div>
                <span style={{ display:"flex"}}>
                    <h2 style={{fontSize:"11px", fontWeight:"normal", marginBottom:"10px"}}>Rate Indication per Truck</h2><i className="fa-solid fa-info"></i>
                </span>
                <span style={{display:"flex"}} className="book-btn-proceed">
                    <input type="text" name="" placeholder='e.g 17 00' id="" onChange={(e) => setRateIndication(e.target.value)}/>
                    <button onClick={() => {
                            const startDateString = startDate.toISOString().substring(0,10)
                            const endDateString = endDate.toISOString().substring(0,10)
                            const cargo = cargoDetails[0].bookingThree.cargoDetails
                            const cargoSds = cargoDetails[0].sdsUrl
                            var booking_id 
                            
                            getBookingIFnc().then((data ) => {
                               booking_id = data.key
                               firebase.database().ref('booking/' + booking_id).update({
                                puDetails: finalPick,
                                doDetails: finalDrop,
                                prerequisites:prerequisites[0].prerequisites,
                                dates_time_selection: {
                                    start_date_string: startDateString,
                                    end_date_string: endDateString,
                                    operation_days: operationDays,
                                    include_holidays: includeHolidays,
                                    bays: bays
                                },
                                rate_required: parseFloat(rateIndication),
                                booking_party_uid: userUid,
                                date_created: (new Date()).toISOString().substring(0,10),
                                gate_in_gate_out_duration: gateInOutDuration,
                                cargoInformation: cargo,
                                booking_ref: booking_id.substring(1,7),
                                booking_id: booking_id,
                                sdsUrl: cargoSds,
                            }).then(() => {
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
                                setTimeout(() => {
                                    navigate('/bidding')
                                }, 6000); 

                                // setTimeout(() => {
                                //     handleSendEmail();
                                // }, 7000); 
                            });
                            });

                            var message = 'hello world'
                            var type="text"
                            //create a new XMLHttpRequest
                            var xhr = new XMLHttpRequest();
                            //Get a callback when a server responds
                            xhr.addEventListener('lod', () => {
                                /// update th    e email statuus with the response
                                console.log(xhr.responseText);
                            })
                            xhr.open('GET', 'https://developer.zipi.co.za/my-new-request.php?sendto=' + userEmail + 
                                '&name=' + company + 
                                '&message=' + message +
                                '&date=' + new Date() +
                                '&type=' + type 
                            )
                            //send the request
                            xhr.send()

                            console.log("Final pick details", pickUpDetails);
                            console.log("Final drop details", dropDetails);
                            console.log("Final prerequisite", prerequisites);
                            console.log("Final start date", startDateString);
                            console.log("Final end", endDateString);
                            console.log("Final operation days", operationDays);
                            console.log("Final include holidays", includeHolidays);
                            console.log("Final rateIndication", rateIndication);

                            setPrerequisitesArray({prerequisites:prerequisites[0].prerequisites})
                            
                    }}>Book Now <i className="fa-solid fa-chevron-right"></i></button>
                </span>
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
                    <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Requet Successfully made</h1>
                </div>
            </Alert>
        }
    </div>
  )
}
