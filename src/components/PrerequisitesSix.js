import React, {useState, useEffect} from 'react'
import EnterpriseNav from './EnterpriseNav'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Alert from '../components/Alerts/Alert';

export default function Summary({ 
    openPreSix, 
    setOpenPreSix
}) {
    const {id} = useParams();

    const [vehicleEquipment, setVehicleEquipment] = useState([]);
    const [adHocServices, setAdHocServices] = useState([]);
    const [documentation, setDocumentation] = useState([]);
    const [personalProtective, setPersonalProtective] = useState([]);
    const [goodsInTransit, setGoodsInTransit] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [openSpinner, setOpenSpinner] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [close, setclose] =useState(false);
    const [vehicleType, setVehicleType] = useState(["Abnormal"])
    const navigate = useNavigate();

    const handleContinue = () =>{
        setPrerequisites({
            vehicleEquipment:vehicleEquipment,
            adHocServices:adHocServices,
            documentation:documentation,
            personalProtective:personalProtective,
            goodsInTransit:goodsInTransit,
            prerequisites:prerequisites
        })

        const selectPrerequis = [{prerequisites:{
                    vehicle_equipment:vehicleEquipment,
                    ad_hoc_services:adHocServices,
                    documentation:documentation,
                    personal_protective:personalProtective,
                    goods_in_transit:goodsInTransit,
                },
                date:new Date()
        }]

        localStorage.setItem("Prerequisites", JSON.stringify(selectPrerequis));
        setOpenSpinner(true)
        setTimeout(() => {
            setOpenSpinner(false)
        },1000)
        navigate('/schedule')
    }

    useEffect(() => {
        localStorage.setItem("vehicleType", JSON.stringify(vehicleType));
    }, [])

  return (
    <div className='summary'>
      <div className='modal-summary'>
        <h3 className='container-prerequiz'>Abnormal Prerequisites</h3>
        <div className="summary-wrapper">
            <div>
                <div>
                    <p className='summary-title'>Ad-hoc Services Required</p>
                </div>
                <div>
                    <p className='summary-title'>Documentation</p>
                </div>
                <div>
                    <p className='summary-title'>Personal Protective Equipment</p>
                </div>
                <div>
                    <p className='summary-title'>Vehicle Equipment</p>
                </div>
                <div>
                    <p className='summary-title'>Insurance (Goods in Transit)</p>
                </div>
            </div>
            <div>
                <div style={{height:"70px"}}>
                    <div>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }} >Solas / Verified Gross Mass</p>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Storage</p>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Crane truck (Load/Offload Container)</p>
                    </div>
                    <div>
                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} value="Rear Mount Container" onChange={(e) => {
                            setAdHocServices([...adHocServices, e.target.value])
                                e.target.style.background="#ffe201"
                            }}/>
                            Rear Mount Container
                        </label>
                    </div>
                </div>

                <div>
                    <div>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>ID/Passport</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Driver's License</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Public Driving Permit</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Medical Certificate</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Safety Hat</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Safety Goggles</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Reflector Jacket</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Full Overall</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Ear Plugs</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Dust Mask</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Genset</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p onClick={(e) => {
                           setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}                        
                        >2 Stop Blocks</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Reverse Hooter</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>9kg Fire Extinguiser</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Beacon Light</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Dunnage</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Straps</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Tarpaulin</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Chains</p>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} value="350 000" onClick={(e) => {
                            setGoodsInTransit([e.target.value])
                            e.target.style.background="#ffe201"
                        }}/>
                            R350 000
                        </label>

                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} value="500 000" onClick={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                            R500 000
                        </label>

                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} value="750 000" onClick={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                            R750 000
                        </label>
                    </div>
                    <input type="text" placeholder='Other' className='other' onChange={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                </div>
            </div>
        </div>
        <div className='continue-btn-container' style={{width:"441px"}}>
            <button 
                className='summary-one-close' 
                onClick={handleContinue}
            >
                Continue &nbsp; <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div> 
      </div>
      
    </div>
  )
}
