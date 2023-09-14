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
	{ id: 'from', label: 'From ID', minWidth: 100 },
	{ id: 'to', label: 'To ID', minWidth: 100 },
	{ id: 'amount', label: 'Amount', minWidth: 100 },
	{ id: 'date', label: 'Date', minWidth: 100 },
	{ id: 'type', label: 'Transaction Type', minWidth: 100 },
	{ id: 'status', label: 'Status', minWidth: 100 },
];

function Transactions() {
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
		const { from_id, to_id, amount, date, type, status } = rowsData[i];
		const dataObject = createData(from_id, to_id, amount, formatDate(date).split("at")[0], type, status);
		rows.push(dataObject);
	}

	function createData(from, to, amount, date, type, status) {
		return { from, to, amount, date, type, status };
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const getTransactions = async () => {
		await fetch(`${process.env.REACT_APP_BACKEND_URL}/MyTransactions`, {
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
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
	}

	useEffect(() => {
		getTransactions();
	}, []);

	return (
		<div
			className="flex flex-col justify-center items-center"
			style={{ width: '90%', margin: '0 auto' }}
		>
			<h1 class="mt-20 text-xl font-bold leading-tight text-secondary-focus mb-6">
				Your Latest Transaction
			</h1>

			<div className="stats bg-primary text-primary-content">
				<div className="stat">
					<div className="stat-title text-neutral-focus">Amount</div>
					<div className="stat-value">{rowsData.length > 0 ? rowsData[0].amount : '0.0'}</div>
					<div className="stat-actions">
						Date{' '}
						<div className="badge badge-outline">
							{rowsData.length > 0 ? formatDate(rowsData[0].date).split("at")[0] : '--/--/----'}
						</div>
					</div>
				</div>

				<div className="stat">
					<div className="stat-title text-neutral-focus">From</div>
					<div className="stat-value">
						{rowsData.length > 0 ? rowsData[0].from_id : '----------'}
					</div>
					<div className="stat-title text-neutral-focus">To</div>
					<div className="stat-value">
						{rowsData.length > 0 ? rowsData[0].to_id : '----------'}
					</div>
				</div>
			</div>

			<h1 class="mt-20 text-xl font-bold leading-tight text-secondary-focus mb-6">
				All Your Transactions
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
														style={{ color: 'var(--trans-Text-Color)' }} // Change text color
													>
														{column.format && typeof value === 'number'
															? column.format(value)
															: value}
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
export default Transactions;
