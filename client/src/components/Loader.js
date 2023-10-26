import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import { useState } from "react";




function Loader() {
    let [loading, setLoading] = useState(true);


    return (
        <div>
            <div className="sweet-loading text-center">

                <BounceLoader


                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
};

export default Loader