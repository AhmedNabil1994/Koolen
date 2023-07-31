import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useIntl } from 'react-intl';
import getAirConditions from '../../api/airConditions';
import { toastError } from '../toast/toastComponent';
import BlockLoader from '../blocks/BlockLoader';

const SitePageAirConditions = () => {
    const [airConditionsData, setAirConditionsData] = useState([]);
    const { formatMessage } = useIntl();
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        {
            accessorKey: 'branch', // simple recommended way to define a column
            header: formatMessage({ id: 'branch' }),
        },
        {
            accessorKey: 'store', // simple recommended way to define a column
            header: formatMessage({ id: 'store' }),
            enableGrouping: false,
        },
        {
            accessorKey: 'map_link', // simple recommended way to define a column
            header: formatMessage({ id: 'mapLink' }),
            Cell: ({ cell }) => (
                <a className="primary" href={cell.getValue()}>{formatMessage({ id: 'map' })}</a>
            ),
            enableGrouping: false,
        },
        {
            accessorKey: 'manager', // simple recommended way to define a column
            header: formatMessage({ id: 'manager' }),
            enableGrouping: false,
        },
        {
            accessorKey: 'phone', // simple recommended way to define a column
            header: formatMessage({ id: 'phoneNumber' }),
            Cell: ({ cell }) => (
                <a className="primary" href={`tel:${cell.getValue()}`}>{cell.getValue()}</a>
            ),
            enableGrouping: false,
        },
    ];

    useEffect(() => {
        getAirConditions((success) => {
            setIsLoading(false);
            setAirConditionsData(success?.data);
        }, (fail) => {
            setIsLoading(false);
            toastError(fail);
        });
    }, []);

    if (isLoading) return <BlockLoader />;
    return (
        <div className="">
            <div
                className="mb-4"
                style={{
                    background: "url('/images/air-con-slider.jpg') no-repeat center center",
                    width: '100%',
                    height: '496px',
                    backgroundSize: 'contain',
                }}
            />
            <div className="px-4" dir="ltr">

                {
                    airConditionsData.length
                        ? (
                            <MaterialReactTable
                                columns={columns}
                                data={airConditionsData}
                                // data={[]}
                                enableRowSelection={false}
                                enableColumnActions={false}
                                enablePagination={false}
                                enableGrouping
                                manualGrouping={false}
                                initialState={{ grouping: ['branch'], expanded: true }}
                            />
                        )
                        : <React.Fragment />
                }

            </div>
        </div>

    );
};

export default SitePageAirConditions;
