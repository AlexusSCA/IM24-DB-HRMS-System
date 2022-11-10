import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InsertQuery } from "../../data/Data";
import CloseIcon from "@mui/icons-material/Close";
import "./InsertData.css";
import {
	Button,
	TextField,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
} from "@mui/material";

function InsertData({ refreshState, setInsertModal }) {
	const { register, handleSubmit, errors } = useForm(),
		[fNameError, setfNameError] = useState(null),
		[lNameError, setLNameError] = useState(null),
		[phoneNumError, setPhoneNumError] = useState(null);

	const onSubmit = (data) => {
		InsertQuery(data);
		refreshState();
		setInsertModal(false);
	};

	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		age: "",
		sex: "",
		phoneNumber: "",
	});
	console.log(...values.keys());
	console.log(lNameError);

	const handleChange = (props) => (event) => {
		setValues({ ...values, [props]: event.target.value });
	};

	useEffect(() => {
		if (values.firstName.length > 40) {
			setfNameError("Invalid Input: Characters must not exceed up to 40");
		} else {
			setfNameError(null);
		}
	}, [values.firstName, fNameError]);

	useEffect(() => {
		if (values.lastName.length > 40) {
			setLNameError("Invalid Input: Characters must not exceed up to 40");
		} else {
			setLNameError(null);
		}
	}, [values.lastName, lNameError]);

	useEffect(() => {
		if (values.phoneNumber.length > 11) {
			setPhoneNumError("Input must not exceed up to 11 digits");
		} else {
			setPhoneNumError(null);
		}
	}, [values.phoneNumber, phoneNumError]);

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<CloseIcon
					className="titleCloseBtn"
					onClick={() => {
						setInsertModal(false);
					}}
				/>

				<h1 className="title">Insert Employee</h1>

				<form className="insertForm" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						required
						{...register("firstName")}
						error={values.firstName.length > 40}
						helperText={fNameError}
						name="firstName"
						autoFocus
						autoComplete="off"
						sx={{ my: 1 }}
						label="First Name"
						variant="outlined"
						size="small"
						onChange={handleChange("firstName")}
					/>

					<TextField
						{...register("lastName", { required: true })}
						error={values.lastName.length > 40}
						helperText={lNameError}
						required
						name="lastName"
						sx={{ my: 1 }}
						label="Last Name"
						autoComplete="off"
						variant="outlined"
						size="small"
						onChange={handleChange("lastName")}
					/>

					<TextField
						required
						name="age"
						{...register("age", { required: true })}
						sx={{ my: 1 }}
						label="Age"
						variant="outlined"
						autoComplete="off"
						type="number"
						size="small"
						InputProps={{ inputProps: { min: 1, max: 99 } }}
						onChange={handleChange("age")}
					/>

					<FormControl sx={{ my: 1 }}>
						<FormLabel required>Sex</FormLabel>
						<RadioGroup
							name="sex"
							{...register("sex", { required: true })}
							row
							onChange={handleChange("sex")}
						>
							<FormControlLabel
								label="Male"
								value="M"
								control={<Radio required={true} />}
							/>
							<FormControlLabel
								label="Female"
								value="F"
								control={<Radio required={true} />}
							/>
						</RadioGroup>
					</FormControl>

					<TextField
						required
						{...register("phoneNumber", { required: true })}
						error={values.phoneNumber.length > 11}
						helperText={phoneNumError}
						name="phoneNumber"
						sx={{ my: 1 }}
						label="Phone Number"
						autoComplete="off"
						variant="outlined"
						size="small"
						onChange={handleChange("phoneNumber")}
					/>

					<footer>
						<Button
							className="cancel-btn"
							variant="contained"
							size="small"
							onClick={() => {
								setInsertModal(false);
							}}
						>
							Cancel
						</Button>
						<Button
							className="confirm-btn"
							variant="contained"
							size="small"
							color="success"
							type="submit"
							disabled={Object.values(values).includes("")}
						>
							Confirm
						</Button>
					</footer>
				</form>
			</div>
		</div>
	);
}

export default InsertData;
