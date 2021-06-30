import React from 'react';
import { CircularProgress } from "@material-ui/core";
const Spinner =  (props) =>{
    return(
        <>
            <div style={{position: 'fixed', width: '100vw', height:'100vh', zIndex: '100', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', top: '0', left: '0'}}>
                <CircularProgress size={50} />
            </div>
        </>
    );
};
export default Spinner;