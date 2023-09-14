import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'; // Import the Button component

const columns = [
    { id: 'admin_id', label: 'Admin ID', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'about', label: 'About', minWidth: 100 },
    { id: 'request_email', label: 'Email', minWidth: 100 },
    { id: 'documents', label: 'Documents', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }, // New column for the button

];

function LocalGuideRequests() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsData, setRowsData] = useState([]);

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
        const { admin_id, country, city, about, request_email, documents, status } = rowsData[i];
        const dataObject = createData(admin_id, country, city, about, request_email, documents, status);
        rows.push(dataObject);
    }

    function createData(admin_id, country, city, about, request_email, documents, status) {
        return { admin_id, country, city, about, request_email, documents, status };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getLocalGuideRequests = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/company-requests/pending`, {
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
                console.log(data);
                setRowsData(data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }

    useEffect(() => {
        getLocalGuideRequests();
    }, []);

    return (
        <div
            className="flex flex-col justify-center items-center"
            style={{ width: '90%', margin: '0 auto' }}
        >
            <h1 class="mt-20 text-xl font-bold leading-tight text-secondary-focus mb-6">
                Companies Requests
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
                                                                row.status === 'Pending' ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={() => console.log(row)}
                                                                    >
                                                                        Action
                                                                    </Button>
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
    );
}
export default LocalGuideRequests;
