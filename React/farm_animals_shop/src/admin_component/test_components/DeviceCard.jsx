// src/components/DeviceCard.js
import React, { useState } from 'react';

const DeviceCard = ({ device }) => {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="card p-3 text-center">
            <h5>{device}</h5>
            <button className={`btn btn-sm ${isOn ? 'btn-danger' : 'btn-success'}`} onClick={() => setIsOn(!isOn)}>
                {isOn ? 'OFF' : 'ON'}
            </button>
        </div>
    );
};

export default DeviceCard;
