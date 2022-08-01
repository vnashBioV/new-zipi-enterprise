import React, {useState, useEffect} from 'react'
import EnterpriseNav from './EnterpriseNav'
import { useParams, Link, useNavigate  } from 'react-router-dom'
import '../css/prerequisites.css'


export default function Summary({
    // vehicleType,
    openPre, 
    setOpenPre
}) {
    const {id} = useParams();
    const [vehicleEquipmentArray, setVehicleEquipment] = useState([])
    const [adHocServices, setAdHocServices] = useState([]);
    const [documentation, setDocumentation] = useState([]);
    const [personalProtective, setPersonalProtective] = useState([]);
    const [goodsInTransit, setGoodsInTransit] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [vehicleType, setVehicleType] = useState(["Car Carrier"])
    const navigate = useNavigate();

    const vehicleEquipment = (e) => {
        setVehicleEquipment([...vehicleEquipmentArray, e.target.textContent])
        e.target.style.background="#ffe201"
    }
    const goodsInTransitFnc =(e)=>{
        setGoodsInTransit(parseInt(e.target.value))
    }
    console.log("vehicleEquipmentArray", vehicleEquipmentArray);
    console.log("goods In Transit", goodsInTransit);

    const handleContinue = ()=>{
        setPrerequisites({
            prerequisites:{
                vehicle_equipment:vehicleEquipmentArray,
                goods_in_transit:goodsInTransit,
                vehicle_type:vehicleType
            }
        })
        const selectPrerequis = [{prerequisites:{
            vehicle_equipment:vehicleEquipmentArray,
            ad_hoc_services:["Not selected"],
            documentation:["Not selected"],
            personal_protective:["Not selected"],
            goods_in_transit:goodsInTransit,
        },
        date:new Date()
}]
        setOpenPre(prev => !prev)
        localStorage.setItem("Prerequisites", JSON.stringify(selectPrerequis));
        navigate('/schedule')
    }

    // const handleContinue = () => {
    //     setOpenPre(prev => !prev)
    // }

    console.log("vehicle prerequisites", prerequisites)
    useEffect(() => {
            localStorage.setItem("vehicleType", JSON.stringify(vehicleType));
    }, [])
    

  return (
    <>{ openPre ? 
            (<div className='modal-container'>
                <div className='modal' style={{width:"34%"}}>
                    <h3 className='container-prerequiz'>Car Carrier Prerequisites</h3>
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
                                    <p onClick={vehicleEquipment}>Dunnage</p>
                                    <p onClick={vehicleEquipment}>Straps</p>
                                    <p onClick={vehicleEquipment}>Tarpaulin</p>
                                    <p onClick={vehicleEquipment}>Chains</p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="Rear Mount Container" className='summary-label'>
                                        <input value="350 000" name='transit' type="radio" style={{marginRight:"10px"}} onClick={goodsInTransitFnc} />
                                        R350 000
                                    </label>

                                    <label htmlFor="Rear Mount Container" className='summary-label'>
                                        <input value="500 000" name='transit' type="radio" style={{marginRight:"10px"}} onClick={goodsInTransitFnc}/>
                                        R500 000
                                    </label>
                                    <input onChange={goodsInTransitFnc}type="text" placeholder='Other' className='other' style={{marginTop:"23px"}}/>
                                </div>
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
                
            </div>)
        : null}
    </>
  )
}
