import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'fname', label: 'Company Name', minWidth: 100 },
    { id: 'destination', label: 'Destination', minWidth: 100 },
    { id: 'price', label: 'Price per Person', minWidth: 100 },
    { id: 'start_date', label: 'Trip Start Date', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'duration', label: 'duration', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }, // New column for the button
];

function MyQuotes() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsData, setRowsData] = useState([]);
    const [people, setPeople] = useState(0);
    const [quoteID, setQuoteID] = useState('');

    const handlePeopleChange = (event) => {
        setPeople(event.target.value);
    };

    const handleSubmitTrip = async () => {
        console.log(people)
        console.log(quoteID)
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/create-checkout-session-booktrip`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: people,
                requestquote_id: quoteID,
            }),
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.text().then((error) => {
                        throw new Error('Failed to fetch data');
                    });
                }
            })
            .then((data) => {
                window.location.href = data;
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    const formatDate = (inputDate) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        const date = new Date(inputDate);
        return date.toLocaleDateString(undefined, options);
    };

    const rows = [];

    for (let i = 0; i < rowsData.length; i++) {
        const { fname, destination, price, start_date, duration, type, status, id } = rowsData[i];
        const dataObject = createData(fname, destination, price, formatDate(start_date).split("at")[0], duration + " days", type, status, id);
        rows.push(dataObject);
    }

    function createData(fname, destination, price, start_date, duration, type, status, id) {
        return { fname, destination, price, start_date, duration, type, status, id };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getMyQuotes = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/traveler/quoterequests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return response.text().then((error) => {
                        console.log(error);
                    });
                }
            })
            .then((data) => {
                setRowsData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        getMyQuotes();
    }, []);

    return (
        <>
            <div
                className="flex flex-col justify-center items-center"
                style={{ width: '90%', margin: '0 auto' }}
            >
                <h1 class="mt-20 text-xl font-bold leading-tight text-secondary-focus mb-6">
                    Your Quotes
                </h1>

                <Paper
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: 'var(--trans-Footer-Color)', // Change table background color
                    }}
                >
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: 'var(--trans-Header-Color)', // Change table heading color
                                                color: 'var(--trans-Header-Text-Color)', // Change table heading text color
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                                style={{
                                                    backgroundColor: 'var(--trans-Table-Color)', // Change table lines (dividers) color
                                                }}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ color: 'var(--trans-Text-Color)' }}
                                                        >
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : column.id === 'action' ? (
                                                                    // Conditionally render the button based on the status
                                                                    row.status === 'Accepted' ? (
                                                                        <button
                                                                            type="button"
                                                                            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-blue-900"
                                                                            onClick={() => {
                                                                                setQuoteID(row.id)
                                                                                document.getElementById('packageModal').showModal();
                                                                            }}
                                                                        >
                                                                            Book this trip
                                                                        </button>
                                                                    ) : null // Don't render the button if status is not "Accepted"
                                                                ) : (
                                                                    value
                                                                )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            color: 'var(--trans-Footer-Text-Color)',
                        }}
                        labelRowsPerPage="Rows:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} rows`}
                        nextIconButtonText="Next Page"
                        backIconButtonText="Previous Page"
                    />
                </Paper>
            </div>
            <dialog id="packageModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="mb-10 font-bold text-lg">Plan Booking Information</h3>
                    <label className="label">
                        <span className="label-text">{`Select the number of people ( ${people} )`}</span>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max="5"
                        className="range"
                        step="1"
                        value={people}
                        onChange={handlePeopleChange}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-outline"
                            onClick={handleSubmitTrip}>
                            Confirm Booking</button>
                        <form method="dialog">
                            <button className="btn">Discard booking</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
export default MyQuotes;
