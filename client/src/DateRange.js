import React, { useState } from "react";

export default function DateRange() {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	return (
		<div className="mb-3 row">
			<div className="col">
				<label>Start date</label>
				<input className="form-control" value={startDate} onInput={(e) => setStartDate(e.target.value)} type="date" />
			</div>
			<div className="col">
				<label>End date</label>
				<input className="form-control" value={endDate} onInput={(e) => setEndDate(e.target.value)} type="date" />
			</div>
		</div>
	);
}
