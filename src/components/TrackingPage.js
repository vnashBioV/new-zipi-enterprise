import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import '../css/tracking.css'
import filterIcon from '../icons/bars.png'
import downIcon from '../icons/download-pdf.png'
import {Avatar} from '@mui/material';
import printIcon from '../icons/awesome-print.png'
import chatIcon from '../icons/chat.png';
import { v4 as uuidv4 } from 'uuid';
import DriverTrackingBar from '../components/DriverTrackingBar'

export default function TrackingPage() {
    const [userEmail, setUserEmail] = useState("");
    const [company, setCompany] = useState("")
    const [userUid, setUserUid] = useState("")
    const [user, setUser] = useState("")
    const [allBookingarr, setAllBookingarr] = useState([])
    const [bookingDriver, setBookingDriver] = useState([])
    const [driverData, setDriverData] = useState([])
    const [userArray, setUserArray] = useState([])
    var bookingArray = []

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUser(user)
              var uid = user.uid;
              setUserUid(uid)
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
        document.body.style.cssText="margin-top:98px !important";
        return () => {
            document.body.style.marginTop= "0px";
        };
    }, []);

    useEffect(() => {
        if(localStorage.getItem("userUid")){
            const Uid = JSON.parse(localStorage.getItem("userUid"))
            const bookingRef = firebase.database().ref('booking').orderByChild('booking_party_uid').equalTo(Uid);
            var childrenArray = []
            bookingRef.once('value', (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                var childKeys = childSnapshot.val()
                childrenArray.push(childKeys)
              });
              console.log(childrenArray);
              setAllBookingarr(childrenArray.filter(filter => filter.booking_bids_fleet_id));
              localStorage.setItem("AllMyBookings", JSON.stringify(childrenArray));
           });
        }
      }, [])

      const getDriverDataFnc = (booking) =>{
        const fleetId = booking.booking_bids_fleet_id
        const bookingId = booking.booking_id
        firebase.database().ref('/fleets/' + fleetId).once('value', (snapshot) => {
            console.log("the driver info", snapshot.val())
            setDriverData([snapshot.val()])
        });
      }

    console.log("all the booking", allBookingarr);
    console.log("the booking driver", bookingDriver);
    console.log("user information", userArray);
    // console.log("selected booking side", selectedDriverBook)

    return (
    <div className='tracking'>
        <EnterpriseNav name={company}/>
        <div  className='nav-tracking'>
            <Link to='/bidding' style={{textDecoration:"none"}} className="nav-nav-link"><i className="fa-solid fa-chevron-left"></i></Link>&nbsp;&nbsp;
            <span className='bidding-navigation'>
                <p style={{color:"grey"}}>Requests</p> <p>&nbsp;&nbsp;&nbsp;/&nbsp; Tracking Page</p> 
            </span>
        </div>
        <h1 style={{fontWeight:"normal"}}>Load Summary</h1>
        <div className='tracking-child'>
            <div className='left-tracking-info'>
                    {/* <div className='load-shipping'>
                        <div>
                            <p style={{color:"grey"}}>Booking Party</p>
                            <p>Zipity Doo</p>
                            <p>Shaun Mendez</p>
                            <p>0813917127</p>
                            <p>shaun@zipitydoo.io</p>
                        </div>
                        <div>
                            <p style={{color:"grey"}}>Pick-up</p>
                            <p>Land and Sea Shuipp</p>
                            <p>769 Cascadinia Ave, Randpark Ridge</p>
                            <p>Roodepoort, 1734</p>
                        </div>
                        <div>
                            <p style={{color:"grey"}}>Drop off</p>
                            <p>Land and Sea Shuipp</p>
                            <p>769 Cascadinia Ave, Randpark Ridge</p>
                            <p>Roodepoort, 1734</p>
                        </div>
                    </div> */}

                    <div className='load-shipping'>
                        <div>
                            <p style={{color:"grey"}}>Booking Party</p>
                            <p>Company Name</p>
                            <p>telephone</p>
                            <p>userEmail</p>
                        </div>
                        <div>
                            <p style={{color:"grey"}}>Pick-up</p>
                            <p>Company Name</p>
                            <p>Address</p>
                            <p>CityName</p>
                        </div>
                        <div>
                            <p style={{color:"grey"}}>Drop off</p>
                            <p>Company Name</p>
                            <p>Address</p>
                            <p>CityName</p>
                        </div>
                    </div>

                    <div className='cargo-cargo'>
                        <div>
                            <p style={{color:"grey"}}>Cargo</p>
                            <p>Manganese</p>
                            <p>SKU: 001232MANG</p>

                            <p style={{color:"grey", marginTop:"10px"}}>Packaging</p>
                            <div className='package-type-container'>
                                <div>
                                    <p>Package Type:</p>
                                    <p>Dimensions:</p>
                                    <p>Quantity:</p>
                                    <p>Total Weight:</p>
                                </div>
                                <div>
                                    <p>Box</p>
                                    <p>120cm x 120cm x 100cm</p>
                                    <p>30</p>
                                    <p>32t</p>
                                </div>
                            </div>
                            <p style={{marginTop:"10px"}}>
                                This cargo is fragile, must be contained in temperatures between -20°C 
                                and 0°C and is hazardous.
                            </p>
                            <button className="btn-download">Download SDS <span><img src={downIcon} alt="" /></span></button>
                        </div>

                        <div>
                                <p style={{color:"grey"}}>Vehicle</p>
                                <p>Side Tipper</p>
                                <p>Mercedes Benz Actross</p>
                                <p></p>
                                <div className='marcedes-container'>
                                    <div>
                                        <p>Net Weight:</p>
                                        <p>Horse:</p>
                                        <p>Trailer:</p>
                                        <p>VIN:</p>
                                    </div>
                                    <div>
                                        <p>34t</p>
                                        <p>757JCYGP</p>
                                        <p>HL76BDMP</p>
                                        <p>123456789</p>
                                    </div>
                                </div>
                                <p style={{color:"grey", marginTop:"10px"}}>Transit</p>
                                <div className='estimated-time'>
                                    <div>
                                        <p>Estimated Time of Arrival: </p>
                                    </div>
                                    <div>
                                        <p>17:20 11 May 2022</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className='print-block'>
                        <span >
                            <span><img src={printIcon} alt="" /></span> <p>Print</p>
                        </span>
                        <span>
                            <span style={{marginLeft:"10px"}}><img src={downIcon} alt="" /></span> <p>Download PDF</p>
                        </span>

                        <div style={{marginLeft:"10px", width:"60%", display:"flex", justifyContent:"end", alignItems:"center"}}>
                            <Avatar className='Enterprise-icon'>{company.toUpperCase().substring(0,2)}</Avatar>
                            <span style={{
                                display:"flex",
                                flexDirection:"column",
                                marginLeft:"10px"
                            }}>
                                <p>Manqoba Mshunqisi</p>
                                <p>757JCYGP</p>
                            </span>
                            <span className='chat-ico'>
                                <img src={chatIcon} alt="" />
                            </span>
                        </div>
                    </div>
            </div>
            <div>
                <h1>Overview</h1>
                <div className='bound-btns'>
                    <button>
                        Inbound
                    </button>
                    <button style={{background:"#fff"}}>
                        Outbound
                    </button>
                </div>
                <div className='tracking-pannel'>
                    <h1>Tracking</h1>
                    <div className='search-panel'>
                        <input type="text" placeholder='Advanced search'/>
                        <div><img src={filterIcon} alt="" /></div>
                    </div>

                    {allBookingarr.length > 0 ? allBookingarr.map((booking) => {
                        getDriverDataFnc(booking)
                        return(
                            <DriverTrackingBar
                                booking={booking}
                                setBookingDriver={setBookingDriver}
                                bookingDriver={bookingDriver}
                                key={uuidv4()}
                                driverData={driverData}
                            />
                        )
                        })
                        : <></>
                    }

                    {/* {allBookingArray.length > 0 ? allBookingArray.filter(item => item.booking_bids_fleet_id).map((booking) =>{
                        fetchDriverDataFnc(booking)
                        return (
                            <div key={uuidv4()} className="driver-container" onClick={() => {
                                setSelectedDriverBook([booking])
                            }}>
                                <div className='driver-profile'>
                                    <div>
                                        <div>
                                            {bookingDriver.length > 0 ? bookingDriver.map((driver) => (
                                                <Avatar className='Enterprise-icon'>{driver.fleet_name.toUpperCase().substring(0,2)}</Avatar>
                                            ))
                                            :  <Avatar className='Enterprise-icon'>DR</Avatar>   
                                            
                                            }
                                            
                                        </div>
                                            {bookingDriver.length > 0 ? bookingDriver.map((driver) => (
                                                <div>
                                                    <h1>{driver.fleet_name}</h1>
                                                    <p>Trip ID: {booking.booking_ref}</p>
                                                </div>
                                                
                                            ))
                                            :  
                                                <div>
                                                    <h1>Fleet Name</h1>
                                                    <p>Trip ID: </p>
                                                </div>
                                            }
                                                                                        
                                    </div>
                                    <div>
                                        <p>{booking.cargoInformation.vehicle_type}</p>
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
                        )
                    })
                      : <></>
                    } */}
                    
                </div>
            </div>
        </div>
    </div>
  )
}
