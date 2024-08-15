import PortCard from "./PortCard";
import { PortTypes, SwitchProps } from "../../../../redux/groupList";
import { Dispatch, useEffect, useRef, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { customCardStyle, filterBtn } from "./details";

interface PortDetailsProps{
    portDetails: SwitchProps | undefined;
    setShowDetails: React.Dispatch<React.SetStateAction<string>>;
    dispatch: Dispatch<AnyAction>;
};

const PortDetails: React.FC<PortDetailsProps> = ({setShowDetails, portDetails, dispatch}) =>{
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    const [filterStatus, setFilterStatus] = useState("all");
    const [filteredPorts, setFilteredPorts] = useState<PortTypes[]>([]);

    const scrollToComponent = (port_no: number) => {
        refs.current[port_no]?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() =>{
        var filteredPorts: PortTypes[] = [];
        if(filterStatus === "all"){
            filteredPorts = portDetails?.ports || [];
        }else{
            portDetails?.ports.map((port, i) =>{
                if(port.status === filterStatus){
                    filteredPorts.push(port);
                }
            });
        }
        setFilteredPorts(filteredPorts);
    }, [filterStatus, portDetails]);

    return(
        <div >
            <h1 className="px-4">
                <small className="text-body-secondary">Switch {portDetails?.switch_no}</small>
            </h1>
            <div className="d-flex col-md-6 col-lg-4 justify-content-between mx-3 py-2 mx-md-5 mb-2">
                {filterBtn.map((btn, i) => {
                    // Truncate the button text if it's longer than 6 characters
                    const {text, css} = btn;
                    const displayText = text.length > 6 ? `${text.slice(0, 6)}..` : text;
                    return (
                        <button key={i} onClick={() => setFilterStatus(text)}
                        className={`${text === filterStatus ? "active " : ""} btn btn-sm ${css} text-capitalize`}>
                            {displayText}
                        </button>
                    );
                })}
            </div>
            <div className="d-flex">
                <div className="px-4 col-10 col-md-11 d-flex flex-wrap gap-4 portsCard">
                    {
                        filteredPorts.map((port, i) =>(
                            <PortCard 
                                key={i}
                                id={i}
                                refs={refs}
                                port = {port}
                                dispatch={dispatch}
                            />
                        ))
                    }
                </div>
                <div className="d-flex flex-column gap-2 col-2 col-md-1 ">
                    {
                        filteredPorts.map((port, i)=>(
                            <button key={i}
                                onClick={() => scrollToComponent(port.port_number)}
                                disabled= { false}
                                className={`${customCardStyle[port.status].text} btn btn-light text-primary bold`}  >
                                    {port.port_number}
                            </button>
                        ))
                    }
                        <button onClick={() =>{setShowDetails("list")}} 
                            disabled= { false}
                            className={`btn btn-secondary bold`}  >
                                Back
                        </button>
                </div>
            </div>
        </div>
    )
};

export default PortDetails;