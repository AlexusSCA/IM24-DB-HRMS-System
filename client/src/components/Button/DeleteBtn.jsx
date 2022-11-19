import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn({ setDeleteModal, setDeleteId, deleteId }) {
	return (
		<IconButton
			className="delete-btn"
			variant="contained"
			size="small"
			color="error"
			onClick={() => {
				setDeleteModal(true);
				setDeleteId(deleteId);
			}}
		>
			<DeleteIcon />
		</IconButton>
	);
}

export default DeleteBtn;
