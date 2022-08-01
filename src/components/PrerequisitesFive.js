import React, {useState, useEffect} from 'react'
import EnterpriseNav from './EnterpriseNav'
import { useParams, Link, useNavigate  } from 'react-router-dom'

export default function Summary({ 
    openPreFive, 
    setOpenPreFive
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
    const [vehicleType, setVehicleType] = useState(["Tautliner"])
    const navigate = useNavigate();

    const goodsInTransitFnc =(e)=>{
        setGoodsInTransit([e.target.value])
    }

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
                    ad_hoc_services:["Not selected"],
                    documentation:["Not selected"],
                    personal_protective:["Not selected"],
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
      <div className='modal-summary' style={{width:"34%"}}>
        <h3 className='container-prerequiz'>Tautliner Prerequisites</h3>
        <div className="summary-wrapper">
            <div>
                <div>
                    <p className='summary-title'>Vehicle Equipment</p>
                </div>
                <div>
                    <p className='summary-title'>Insurance (Goods in Transit)</p>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <p onClick={(e) => {
                           setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Dunnage</p>
                        <p onClick={(e) => {
                           setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Straps</p>
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
        <div className='continue-btn-container' style={{width:"100%"}}>
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
