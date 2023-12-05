import React, { useState, useEffect } from 'react';
import getAirConditions from '../../api/airConditions';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';
import './SitePageAirConditions.css';

const SitePageAirConditions = () => {
    const [airConditionsData, setAirConditionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAirConditions(
            (success) => {
                setIsLoading(false);
                setAirConditionsData(success?.data);
            },
            (fail) => {
                setIsLoading(false);
                toastError(fail);
            },
        );
    }, []);
    // console.log('AC data', airConditionsData);
    const items = Object.keys(airConditionsData).map((arrayOfObj) => (airConditionsData[arrayOfObj].map((obj, index) => (
        (index > 0 && obj.branch === airConditionsData[arrayOfObj][index - 1].branch) ? (
            <tr>
                <td>{obj.store}</td>
                <td className="map">
                    <a className="btn" target="blank" href={obj.map_link}>
                        Map
                    </a>
                </td>
                {/* <td>{obj.manager}</td> */}
                <td>
                    <a href={`tel:${obj.phone}`}>{obj.phone}</a>
                </td>
            </tr>
        ) : (
            <tr>
                <th scope="row" rowSpan={airConditionsData[arrayOfObj].length}>
                    {obj.branch}
                </th>
                <td>{obj.store}</td>
                <td className="map">
                    <a className="btn" target="blank" href={obj.map_link}>
                        Map
                    </a>
                </td>
                {/* <td>{obj.manager}</td> */}
                <td>
                    <a href={`tel:${obj.phone}`}>{obj.phone}</a>
                </td>
            </tr>
        )
    ))));
    // const items = Object.keys(airConditionsData).map((arrayOfObj) => airConditionsData[arrayOfObj].map((obj) => (
    //     <tr>
    //         <th scope="row" rowSpan={airConditionsData[arrayOfObj].length}>
    //             {obj.branch}
    //         </th>
    //         <td>{obj.store}</td>
    //         <td className="map">
    //             <a className="btn" href={obj.map_link}>
    //                 Map
    //             </a>
    //         </td>
    //         <td>{obj.manager}</td>
    //         <td>
    //             <a href={`tel:${obj.phone}`}>{obj.phone}</a>
    //         </td>
    //     </tr>
    // )));
    // const items = airConditionsData.map((item) => (
    //     <tr>
    //         <th scope="row">{item.branch}</th>
    //         <td>{item.store}</td>
    //         <td className="map">
    //             <a className="btn" href={item.map_link}>
    //                 Map
    //             </a>
    //         </td>
    //         <td>{item.manager}</td>
    //         <td>
    //             <a href={`tel:${item.phone}`}>
    //                 {item.phone}
    //             </a>
    //         </td>
    //     </tr>
    // ));
    if (isLoading) return <BlockLoader />;
    return (
        <div className="image-container">
            <div
                className="mb-4 split-ac"
            />
            <div
                className="table-container "
                dir="ltr"
            >
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th scope="col">Branch</th>
                            <th scope="col">Store</th>
                            <th scope="col">Map Link</th>
                            {/* <th scope="col">Manager</th> */}
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>{items}</tbody>
                </table>
            </div>
        </div>
    );
};

export default SitePageAirConditions;
