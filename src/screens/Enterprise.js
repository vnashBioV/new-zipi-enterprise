import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import LocationTitle from '../components/LocationTitle'
import Search from '../components/Search'
import searchIcon from '../icons/search-icon.png';
import ellipse from '../icons/ellipse.png';
import '../css/enterprise.css'
import ContactsDetails from '../components/ContactsDetails';
import Default from '../components/Default';
import AddContacts from '../components/Foms/AddContacts'
import AddLocationOneContact from '../components/Foms/AddLocationOneContact';
import AddLocationTwoContact from '../components/Foms/AddLocationTwoContact';
import NextButtonComp from '../components/NextButtonComp';
import AddCargo from '../components/Foms/AddCargo'
import firebase from '../firebase-config';
import Spinner from '../components/Spinner';
import bikeIcon from "../icons/sg-bike.png"
import carIcon from "../icons/sg-car.png"
import panelIcon from "../icons/sg-panel-van.png"
import smallBakkieIcon from "../icons/sg-bakkie.png"
import truckIcon from   "../icons/sg-truck.png"
import carCarrier from "../icons/car-carier.png"
import container from "../icons/container.png"
import tanker from "../icons/tanker.png"
import tautliner from "../icons/tautliner.png"
import refrigerated from "../icons/refrigerated.png"
import abnormal from "../icons/abnormal.png"
import Alert from '../components/Alerts/Alert';
import Prerequisites from '../components/Prerequisites' 
import PrerequisitesTwo from '../components/PrerequisitesTwo'
import emptyIcon from '../icons/box.png'
import PrerequisitesThreee from '../components/PrerequisitesThreee'
import PrerequisitesFour from '../components/PrerequisitesFour'
import PrerequisitesFive from '../components/PrerequisitesFive'
import PrerequisitesSix from '../components/PrerequisitesSix'
import { TweenMax, TimelineLite, Power3 } from 'gsap';

export default function Enterprise() {
    const [locationOneSearch, setLocationOneSearch] = useState(false);
    const [locationTwoSearch, setLocationTwoSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [pickDefault, setPickDefault] = useState(true);
    const [pickDefaultTwo, setPickDefaultTwo] = useState(true);
    const [trackLocation, setTrackLocation] = useState(false);
    const [trackLocationTwo, setTrackLocationTwo] = useState(false);
    const [reasonLocation, setReasonLocation] = useState(false);
    const [pickHomeIcon, setPickHomeIcon] = useState(false);
    const [addLocationOne, setAddLocationOne] = useState(false);
    const [addLocationTwo, setAddLocationTwo] = useState(false);
    const [nextBtn, setNextBtn] = useState(true);
    const [nextBtnTwo, setNextBtnTwo] = useState(true);
    const [businessType, setBusinessType] = useState(false);
    const [businessTypeTwo, setBusinessTypeTwo] = useState(false);
    const [residenceType, setResidenceType] = useState(false);
    const [residenceTypeTwo, setResidenceTypeTwo] = useState(false);
    const [contactDate, setContactDate] = useState(true);
    const [contactDateTwo, setContactDateTwo] = useState(true);
    const [pickSelected, setPickSelected] = useState([])
    const [dropSelected, setDropSelected] = useState([])
    const [locationtitle, setLocationtitle] = useState(true);
    const [locationtitleTwo, setLocationtitleTwo] = useState(true)
    const [searchLocationOne, setSearchLocationOne] = useState(true)
    const [searchLocationTwo, setSearchLocationTwo] = useState(true)
    const [contactBackground, setContactBackground] = useState(true)
    const [contactBackgroundTwo, setContactBackgroundTwo] = useState(true)
    const [locationOneWrapper, setLocationOneWrapper] = useState(false)
    const [locationTwoWrapper, setLocationTwoWrapper] = useState(false)
    const [changeContact, setChangeContact] = useState(true)
    const [changeContactTwo, setChangeContactTwo] = useState(true)
    const [openCargoModal, setOpenCargoModal] = useState(false);
    const [userEmail,setUserEmail] = useState("")
    const [company, setCompany] = useState("")
    const [typeOfVehicle, setTypeOfVehicle] = useState("")
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openAlert, setAlert] = useState(false)
    const [openSpinnerTwo, setOpenSpinnerTwo] = useState(false);
    const [openAlertTwo, setAlertTwo] = useState(false)
    const [openPre, setOpenPre] = useState(false)
    const [openPreTwo, setOpenPreTwo] = useState(false)
    const [openPreThree, setOpenPreThree] = useState(false)
    const [openPreFour, setOpenPreFour] = useState(false)
    const [openPreFive, setOpenPreFive] = useState(false)
    const [openPreSix, setOpenPreSix] = useState(false)
    const [prerequisites, setPrerequites] = useState([])
    const [vehicleType, setVehicleType] = useState([]);
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [pickHomeIconTwo,setPickHomeIconTwo] = useState(false)

    //=======ARRAY STATES==========================================================================
    const [bookingArray, setBookingArray] = useState([]);
    const [bookingArrayTwo, setBookingArrayTwo] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [puDetails, setPuDetails] = useState([]);
    const [doDetails, setDoDetails] = useState([]);
    const [cargoDetails, setCargoDetails] = useState([])
    const [cargoDetailsArray, setCargoDetailsArray] = useState([])
    const [fileUrl, setFileUrl] = useState(null)
    const [selectedbookingThree, setSelectedBookingThree] = useState([])
    const [bookingArrayThree, setBookingArrayThree] = useState([])
    const [pickLocal, setPickLocal] = useState([])
    const [quantity, setQuantity] = useState(0)
    //=======END ARRAY STATES======================================================================

    //==========USE REF============================================================================
    const contactOneClick = useRef();
    // let enterprise = useRef(null);
    // let blocks = useRef(null);
    //==========END REF============================================================================
    
    //========FUNCTIONS============================================================================
  

    const onSearchChange = (query) =>{
        let matches = []
        if (query.length>0){
            matches = bookingArray.filter(booking =>{
                const regex = new RegExp(`${query}`, "gi");
                return booking.booking.puDetails.puName.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQuery(query)
    }

   const handleBusiness = (e)=>{
        if(residenceType === false){
            setBusinessType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }else if(residenceType === true){
            setResidenceType(false)
            setBusinessType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }
   }

   const handleBusinessTwo = (e)=>{
    if(residenceTypeTwo === false){
        setBusinessTypeTwo(true)
        const value = e.target.textContent
        setBookingArrayTwo((prevState) => ({
            ...prevState,
            doDetails:{
                ...prevState.doDetails,
                doBusinessType:value
            } 
        }))
    }else if(residenceTypeTwo === true){
        setResidenceTypeTwo(false)
        setBusinessTypeTwo(true)
        const value = e.target.textContent
        setBookingArray((prevState) => ({
            ...prevState,
            doDetails:{
                ...prevState.doDetails,
                doBusinessType:value
            } 
        }))
    }
}

   const handleResidence = (e)=>{
        if(businessType === false){
            setResidenceType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }else if(businessType === true){
            setBusinessType(false)
            setResidenceType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }
    } 

    const handleResidenceTwo = (e)=>{
        if(businessTypeTwo === false){
            setResidenceTypeTwo(true)
            const value = e.target.textContent
            setBookingArrayTwo((prevState) => ({
                ...prevState,
                doDetails:{
                    ...prevState.doDetails,
                    doBusinessType:value
                } 
            }))
        }else if(businessTypeTwo === true){
            setBusinessTypeTwo(false)
            setResidenceTypeTwo(true)
            const value = e.target.textContent
            setBookingArrayTwo((prevState) => ({
                ...prevState,
                doDetails:{
                    ...prevState.doDetails,
                    doBusinessType:value
                } 
            }))
        }
    } 

    const openPreModal = () =>{
        setOpenPre(prev => !prev)
    }

    const openPreModalTwo = () =>{
        setOpenPreTwo(prev => !prev)
    }

    const openPreModalThree = () =>{
        setOpenPreThree(prev => !prev)
    }

    const openPreModalFour = () =>{
        setOpenPreFour(prev => !prev)
    }

    const openPreModalFive = () =>{
        setOpenPreFive(prev => !prev)
    }

    const openPreModalSix = () =>{
        setOpenPreSix(prev => !prev)
    }

    const closeLocationModal = ()=>{
        setAddLocationOne(false)
    }  
    const closeLocationModalTwo = ()=>{
        setAddLocationTwo(false)
    } 

    const handleContactClick = (event, booking) =>{
        setPickHomeIcon(true)
        setPickDefault(false)
        event.target.style.background="#F0F0F0"
        setPickSelected(puDetails.filter((b) => booking.date == b.date ))
        const selected = puDetails.filter((b) => booking.date == b.date )

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
        setTimeout(closeAlert, 6000); 

        setPuDetails(selected)
        setTrackLocation(true)
        setContactDate(false)
        setLocationtitle(false)
        setSearchLocationOne(false)
        setContactBackground(false)
        setLocationOneWrapper(true)
        setChangeContact(false)
        setNextBtn(false)
        localStorage.setItem("pickSelectd", JSON.stringify(selected));

    }

    const handleContactClickTwo = (event, booking) =>{
        setPickHomeIconTwo(true)
        setPickDefaultTwo(false)
        event.target.style.background="#F0F0F0"
        setDropSelected(doDetails.filter((b) => booking.date == b.date ))
        const selected = doDetails.filter((b) => booking.date == b.date )
        setOpenSpinnerTwo(true)
        const closeSpinner = () => {
        setOpenSpinnerTwo(false)
        }
        setTimeout(closeSpinner, 1000);
        const openAlert = ()=>{
            setAlertTwo(true);
        }
        const closeAlert = ()=>{
        setAlertTwo(false);
        } 
        setTimeout(openAlert, 2000); 
        setTimeout(closeAlert, 6000); 

        setDoDetails(selected)
        setTrackLocationTwo(true)
        setContactDateTwo(false)
        setLocationtitleTwo(false)
        setSearchLocationTwo(false)
        setContactBackgroundTwo(false)
        setLocationTwoWrapper(true)
        setChangeContactTwo(false)
        setNextBtnTwo(false)
        localStorage.setItem("dropSelectd", JSON.stringify(selected));
    }
    // const handlePreClose =() =>{
    //     setOpenPre(false)
    // }

    var VarBookingArrayThree = bookingArrayThree;
    //========END FUNCTIONS===============================================================================

    //=========USE EFFECTS================================================================================

    // useEffect(() => {
    //     //Blocks var
    //     // const heading = blocks.firstElementChild
    //     // const paragraph = blocks.lastElementChild

    //     let tl = new TimelineLite()

    //     TweenMax.to(enterprise, 0, {css: {visibility: "visible"}});
    //     // tl.from(blocks, 1.2, {y: 1280, ease: Power3.easeOut})
    //     // tl.from(blocks, 1.2, {y: 100, ease: Power3.easeOut})

    // }, [])
    

    useEffect(() => {
        document.body.style.cssText="margin-top:117px !important";
        return () => {
            document.body.style.marginTop= "0px";
        };
    }, []);

    //LOCATION ONE 
    useEffect(() => {
        if(localStorage.getItem("Booking")){
            const storedList = JSON.parse(localStorage.getItem("Booking"))
            setPuDetails(storedList);
        }
      }, [])

      //LOCATION TWO
    useEffect(() => {
        if(localStorage.getItem("BookingTwo")){
            const storedList = JSON.parse(localStorage.getItem("BookingTwo"))
            setDoDetails(storedList);
        }
      }, []) 
      
    //LOCATION THREE
    var VarBookingArrayThree = bookingArrayThree;
    useEffect(() => {
        if(localStorage.getItem("localBookingThree")){
            const storedListThree = JSON.parse(localStorage.getItem("localBookingThree"))
            setBookingArrayThree(storedListThree);
            VarBookingArrayThree = storedListThree
            // console.log(storedListThree);
        }
      }, []) 

    // useEffect(() => {
    //     localStorage.setItem("sdsFileUrl", JSON.stringify(fileUrl));
    // }, []) 

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
              var uid = user.uid;
              localStorage.setItem("userUid", JSON.stringify(uid));
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const userInfo = snapshot.val();
                    const company = snapshot.val().companyDetails.registeredCompanyName
                    localStorage.setItem("userInformation", JSON.stringify(userInfo));
                    setCompany(company)
                });
              // ...
            } else {
            }
        });
    }, [])

    //===========END USE EFFECFS==========================================================================

    //===========CONSOLE LOGS=============================================================================
    console.log(bookingArray);
    console.log("after contact has been selected", pickSelected)
    console.log("cargo details", cargoDetails)
    console.log("company", company)
    console.log("cargo details array", cargoDetailsArray)

    //Selected Information 
    console.log("selected pick up", pickSelected)
    console.log("selected drop off", dropSelected)
    console.log("selected cargo", selectedbookingThree)

    //============END CONSOLE LOGS========================================================================

  return (
    <div>
        <EnterpriseNav name={company}/>
        <div className='enterprise-booking-page'>

{/*==================================LOCATION ONE================================================================================================= */}
            <div className={locationOneWrapper ? 'location-style' : ""}>
                <h1>Location 1</h1>
                {locationtitle ? 
                    <LocationTitle>
                        <p>Choose first location contact from the list below. This is a contact that you've previously 
                            registered in your entry. Alternatively, you can opt to add a new contact by clicking 
                            the "New contact" button.
                        </p>
                        {/* <p>Create your route by nominating addresses in the expected supply chain order.</p> */}
                    </LocationTitle>
                    : <></>
                }

                {searchLocationOne ?
                    <Search>
                        <div className={!locationOneSearch ? "search-container" : "not-search-container"} >
                            <span className='search-wrapper'>
                                <input type="text" placeholder='Search' className='pick-search' onChange={e => onSearchChange(e.target.value)} value={query}  />
                                <img src={searchIcon} alt="" />
                            </span> 
                            <button><img src={ellipse} alt="" onClick={() => setAddLocationOne(true)}/></button>
                        </div>
                    </Search>
                    : <></>
                }
                <div className='pu-containing'>
                    {puDetails.length > 0 ? puDetails.map((booking) =>(
                        <ContactsDetails key={booking.date}>
                            <div
                                onClick={(event) => handleContactClick(event, booking)}
                                className={contactBackground ? "" : "contact-no-background"}
                            >
                                <div>
                                    <i className={!pickHomeIcon ? "fa-solid fa-house-chimney" : "fa-solid fa-house-chimney pick-house"}></i>
                                    <div> 
                                        <p>{booking.bookingArray.puDetails.puName}</p>
                                        <p>{booking.bookingArray.puDetails.puCompanyName}</p>
                                        <p>{booking.bookingArray.puDetails.puEmail}</p>
                                    </div>
                                </div>
                                
                                <div className='delete-contact'>
                                    <p 
                                        className={!trackLocation ? "hide-location-icon" : "location-icon"} 
                                        style={{fontSize:"12px", fontWeight:"normal"}} 
                                        onClick={() => {
                                            // setReasonLocation(true)
                                            // console.log("The reason for the address",reasonLocation)
                                        }}
                                    >
                                        <i class="fa-solid fa-location-dot location-icon"></i>
                                    </p>
                                    <p className={!changeContact ? "change-contact" : "no-change-contact"} onClick={() => {
                                        if(localStorage.getItem("BookingTwo")){
                                            const storedList = JSON.parse(localStorage.getItem("BookingTwo"))
                                            setDoDetails(storedList);
                                            setTrackLocation(false)
                                            setContactDate(true)
                                            setLocationtitle(true)
                                            setSearchLocationOne(true)
                                            setContactBackground(true)
                                            setLocationOneWrapper(false)
                                            setChangeContact(true)
                                            setNextBtn(true)
                                            // setChangeContact(false)
                                        }
                                    }}><i class="fa-solid fa-pen"></i> Change</p>
                                    {/* <Default>
                                        <span className={pickDefault ? "not-active-class" : "set-default"}>Set as default</span>
                                    </Default> */}
                                    <p className={contactDate ? "" : "hide-date"}>{((booking.date).toString()).substring(0,10)}</p>
                                </div>
                            </div>
                        </ContactsDetails>
                        ))
                        
                        : <div className='no-contact-added'>
                            <h1 className='add-contacts'>Currently there are no pick up contacts please click the plus button to add contacts</h1>
                            <img style={{width:'7%'}} src={emptyIcon} alt="" />
                        </div>
                    }
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
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact Selected, please add second location</h1>
                            
                        </div>
                    </Alert>
                }
                
                {/* {nextBtn ? 
                    <NextButtonComp>
                        <button
                            onClick={(e)=>{
                                setPuDetails(pickSelected)
                                setTrackLocation(true)
                                setContactDate(false)
                                setLocationtitle(false)
                                setSearchLocationOne(false)
                                setContactBackground(false)
                                setLocationOneWrapper(true)
                                setChangeContact(false)
                                setNextBtn(false)
                                localStorage.setItem("pickSelectd", JSON.stringify(pickSelected));
                            }}
                        >
                            Next 
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </NextButtonComp>
                    : <></>
                } */}
                   

                {/* ======================================Modal Popup============================================================== */}
                {
                    addLocationOne ?
                        <AddLocationOneContact
                            setBookingArray={setBookingArray}
                            businessType={businessType}
                            handleBusiness={handleBusiness}
                            residenceType={residenceType}
                            handleResidence={handleResidence}
                            closeLocationModal={closeLocationModal}
                            bookingArray={bookingArray}
                            puDetails={puDetails}
                            setPuDetails={setPuDetails}
                        />
                    : <></>
                }
                {/* ====================================================End Modal==================================================== */}
                             
            </div>
{/*==============================================END LOCATION ONE================================================================================ */}

{/*==============================LOCATION TWO==================================================================================================== */}
            <div className='location-two'>
                <h1>Location 2</h1>
                {locationtitleTwo ? 
                    <LocationTitle>
                        <p>Choose second location contact from the list below. This is a contact that you've previously 
                            registered in your entry. Alternatively, you can opt to add a new contact by clicking 
                            the "New contact" button.
                        </p>
                        {/* <p>Create your route by nominating addresses in the expected supply chain order.</p> */}
                    </LocationTitle>
                    : <></>
                }

                {searchLocationTwo ?
                    <Search>
                        <div className={!locationTwoSearch ? "search-container" : "not-search-container"} >
                            <span className='search-wrapper'>
                                <input type="text" placeholder='Search' className='pick-search' onChange={e => onSearchChange(e.target.value)} value={query}  />
                                <img src={searchIcon} alt="" />
                            </span> 
                            <button><img src={ellipse} alt="" onClick={() => setAddLocationTwo(true)}/></button>
                        </div>
                    </Search>
                    : <></>
                }
                <div className='do-containing'>
                    {doDetails.length > 0 ? doDetails.map((booking) =>(
                        <ContactsDetails key={booking.date}>
                            <div
                                onClick={(event) => handleContactClickTwo(event, booking)}
                                className={contactBackgroundTwo ? "" : "contact-no-background"}
                            >
                                <div>
                                    <i className={!pickHomeIconTwo ? "fa-solid fa-house-chimney" : "fa-solid fa-house-chimney pick-house"}></i>
                                    <div> 
                                        <p>{booking.bookingArrayTwo.doDetails.doName}</p>
                                        <p>{booking.bookingArrayTwo.doDetails.doCompanyName}</p>
                                        <p>{booking.bookingArrayTwo.doDetails.doEmail}</p>
                                    </div>
                                </div>
                                
                                <div className='delete-contact'>
                                    <p 
                                        className={!trackLocationTwo ? "hide-location-icon" : "location-icon"} 
                                        style={{fontSize:"12px", fontWeight:"normal"}} 
                                        onClick={() => {
                                            // setReasonLocation(true)
                                            // console.log("The reason for the address",reasonLocation)

                                        }}
                                    >
                                        <i class="fa-solid fa-location-dot location-icon"></i>
                                    </p>
                                    <p className={!changeContactTwo ? "change-contact" : "no-change-contact"}onClick={() => {
                                        if(localStorage.getItem("BookingTwo")){
                                            const storedList = JSON.parse(localStorage.getItem("BookingTwo"))
                                            setDoDetails(storedList);
                                            setTrackLocationTwo(false)
                                            setContactDateTwo(true)
                                            setLocationtitleTwo(true)
                                            setSearchLocationTwo(true)
                                            setContactBackgroundTwo(true)
                                            setLocationTwoWrapper(false)
                                            setChangeContactTwo(true)
                                            setNextBtnTwo(true)
                                            setChangeContact()
                                        }
                                    }}><i class="fa-solid fa-pen"></i> Change</p>
                                    {/* <Default>
                                        <span className={pickDefault ? "not-active-class" : "set-default"}>Set as default</span>
                                    </Default> */}
                                    <p className={contactDateTwo ? "" : "hide-date"}>{((booking.date).toString()).substring(0,10)}</p>
                                </div>
                            </div>
                        </ContactsDetails>
                        ))
                        
                        : <div className='no-contact-added'>
                            <h1 className='add-contacts'>Currently there are no pick up contacts please click the plus button to add contacts</h1>
                            <img style={{width:'7%'}} src={emptyIcon} alt="" />
                        </div>
                    }
                </div>

                {openSpinnerTwo && <Spinner/>}
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
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact selected, please add Cargo</h1>
                        </div>
                    </Alert>
                }

                {/* {nextBtnTwo ? 
                    <NextButtonComp>
                        <button
                            onClick={(e)=>{
                                setDoDetails(dropSelected)
                                setTrackLocationTwo(true)
                                setContactDateTwo(false)
                                setLocationtitleTwo(false)
                                setSearchLocationTwo(false)
                                setContactBackgroundTwo(false)
                                setLocationTwoWrapper(true)
                                setChangeContactTwo(false)
                                setNextBtnTwo(false)
                                localStorage.setItem("dropSelectd", JSON.stringify(dropSelected));
                            }}
                        >
                            Next 
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </NextButtonComp>
                    : <></>
                } */}

                {/* ======================================Modal Popup============================================================== */}
                {
                    addLocationTwo ?
                        <AddLocationTwoContact
                            setBookingArrayTwo={setBookingArrayTwo}
                            businessTypeTwo={businessTypeTwo}
                            handleBusinessTwo={handleBusinessTwo}
                            residenceTypeTwo={residenceTypeTwo}
                            handleResidenceTwo={handleResidenceTwo}
                            closeLocationModalTwo={closeLocationModalTwo}
                            bookingArrayTwo={bookingArrayTwo}
                            doDetails={doDetails}
                            setDoDetails={setDoDetails}
                        />
                    : <></>
                }
                {/* ====================================================End Modal==================================================== */}
                
            </div>
{/*===========================================END LOCATION TWO========================================================================================== */}
            
{/*===============================================CARGO========================================================================================== */}
            <div className='cargo'>
                <h1>Cargo</h1>
                <p>Choose the cargo you would like to transport below.</p>
                <div className='search-container'>
                    <span className='search-wrapper'>
                        <input type="text" placeholder='Search' className='pick-search'/>
                        <img src={searchIcon} alt="" />
                    </span> 
                    <button><img src={ellipse} alt="" onClick={() => setOpenCargoModal(true)}/></button>
                </div>
                
                <div className='cargo-container'>
                <p style={{fontSize:"14px", marginBottom:"14px"}}>Please select products that are suitable to be in the same vehicle together.</p>
                    
                </div> 
                <div className='cargo-next'>
                    {/* <button ref={cargoNextBtn} onClick={() => {
                        VarBookingArrayThree = selectedbookingThree 
                    }}>
                        Next <i class="fa-solid fa-chevron-right"></i>
                    </button> */}
                </div>
                <div className='cargo-wrapper'>
                    {bookingArrayThree.length > 0 ? bookingArrayThree.map((cargo, i) =>{
                        const weightTon = parseFloat(cargo.bookingThree.cargoDetails.weight)/907.185
                        return(
                        <React.Fragment key={i}>
                                <div className='pill-container' onClick={(e) => {
                                        const CargSelected = bookingArrayThree.filter((b) => cargo.date == b.date );
                                        // setSelectedBookingThree([CargSelected])
                                        setBookingArrayThree(CargSelected)
                                        e.target.style.cssText="background:rgb(212, 212, 212)"

                                        localStorage.setItem("cargoSelectd", JSON.stringify(CargSelected));
                                    }}>
                                    <div className='box-icon'>
                                        <span><i class="fa-solid fa-cube"></i></span>
                                    </div>
                                    <div className='cargo-for'>
                                        <h1>{cargo.bookingThree.cargoDetails.productName}</h1>
                                        <p>USK: {cargo.bookingThree.cargoDetails.productCode}</p>
                                        <p>Package: {cargo.bookingThree.cargoDetails.packageType}</p>
                                        <p>Dimensions: {weightTon.toFixed(3)}t - {cargo.bookingThree.cargoDetails.volume}m&sup3;</p>
                                        {/* <p onClick={openModalFour}>Read more</p> */}
                                    </div>
                                    <div>
                                        <h1>QTY :</h1>
                                        <input type="text" className='cargo-quantity' onChange={(e) => {
                                            const selectedCargoDetails = JSON.parse(localStorage.getItem("cargoSelectd"))
                                            console.log("quantity array", selectedCargoDetails)
                                            selectedCargoDetails.map((sel) => (
                                                sel.bookingThree.cargoDetails.quantity = e.target.value
                                            ))
                                            console.log(selectedCargoDetails);
                                            localStorage.setItem("cargoSelectd", JSON.stringify(selectedCargoDetails));
                                        }}/>
                                    </div>
                                </div>
                        </React.Fragment>
                        )})
                        : 
                        <div className='no-contact-added'>
                            <h1 className='add-contacts'>Currently there are no cargo please click the plus button to add cargo</h1>
                            <img style={{width:'7%'}} src={emptyIcon} alt="" />
                        </div>
                    }
                </div>

                {openCargoModal?
                    <AddCargo
                        setOpenCargoModal={setOpenCargoModal}
                        cargoDetails={cargoDetails}
                        setCargoDetails={setCargoDetails}
                        setFileUrl={setFileUrl}
                        fileUrl={fileUrl}
                        bookingArrayThree={bookingArrayThree}
                        setBookingArrayThree={setBookingArrayThree}
                    />
                    : <></>
                }
            </div>

{/*================================================END CARGO============================================================================================== */}
        
{/* ===================================================VEHICLE================================================================================================== */}
            <div>
                <h2>Vehicle</h2>
                <p>Choose a vehicle to transport your goods</p>
                <p>Distribution (0 - 3.5 Tons)</p>
                <div className='distribution-vehicle'>
                    <div>
                        <div>
                            <img src={bikeIcon} alt="" />
                        </div>
                        <div>
                            <h2>Bike</h2>
                            <p>Coming soon</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <img src={carIcon} alt="" />
                        </div>
                        <div>
                            <h2>Car</h2>
                            <p>Coming soon</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <img src={panelIcon} alt="" />
                        </div>
                        <div>
                            <h2>Panel Van</h2>
                            <p>Coming soon</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <img src={smallBakkieIcon} alt="" />
                        </div>
                        <div>
                            <h2>2.5t Bakkie</h2>
                            <p>Coming soon</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <img src={truckIcon} alt="" />
                        </div>
                        <div>
                            <h2>3.5t Van</h2>
                            <p>Coming soon</p>
                        </div>
                    </div>
                </div>
{/* ============================================================================================================================================== */}
                
                <p style={{marginTop:"10px"}}>Long Haul  (34 Tons)</p>

                <div className='distribution-vehicle'>
                    <div>
                        <div onClick={openPreModal}>
                            <img src={carCarrier} alt="" />
                        </div>
                        <div>
                            <h2>Car Carrier</h2>
                            <p style={{
                                    fontSize: "10px",
                                    fontStyle: "italic",
                                    color: "grey"
                                }}>Recommended</p>
                        </div>
                    </div>

                    <div>
                        <div onClick={openPreModalTwo}>
                            <img src={container} alt="" />
                        </div>
                        <div>
                            <h2>Container</h2>
                        </div>
                    </div>

                    <div>
                        <div onClick={openPreModalThree}>
                            <img src={refrigerated} alt="" />
                        </div>
                        <div>
                            <h2>Refrigerated</h2>
                        </div>
                    </div>

                    <div>
                        <div onClick={openPreModalFour}>
                            <img src={tanker} alt="" />
                        </div>
                        <div>
                            <h2>Tanker</h2>
                        </div>
                    </div>

                    <div>
                        <div onClick={openPreModalFive}>
                            <img src={tautliner} alt="" />
                        </div>
                        <div>
                            <h2>Tautliner</h2>
                        </div>
                    </div>
                </div>

                <p style={{marginTop:"10px"}}>Abnormal (34+ Tons)</p>

                <div className='distribution-vehicle'>
                    <div>
                        <div onClick={openPreModalSix}>
                            <img src={abnormal} alt="" />
                        </div>
                        <div>
                            <h2>Abnormal</h2>
                        </div>
                    </div>
                </div>
            </div>
{/* =======================================================END VEHICLE================================================================================================ */}

        </div>

        {/* Vehicle modals */}
        <Prerequisites openPre={openPre} setOpenPre={setOpenPre}/>
        {openPreTwo &&
            <PrerequisitesTwo openPre={openPreTwo} setOpenPreTwo={setOpenPreTwo}/>
        }

         {openPreThree &&
            <PrerequisitesThreee openPreThree={openPreThree} setOpenPreThree={setOpenPreThree}/>
        }

        {openPreFour &&
            <PrerequisitesFour openPreFour={openPreFour} setOpenPreFive={setOpenPreFour} />
        }
        {openPreFive &&
            <PrerequisitesFive openPreFive={openPreFive} setOpenPreFive={setOpenPreFive} />
        }
        {openPreSix &&
            <PrerequisitesSix openPreSix={openPreSix} setOpenPreSix={setOpenPreSix} />
        }
    </div>
  )
}
