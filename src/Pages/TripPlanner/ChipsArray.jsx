import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray = ({ chipData, handleDelete }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        backgroundColor: "transparent",
        boxShadow: "1",
        border: "none",
        padding: "20px",
        mb: 7,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className="bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
            />
          </ListItem>
        );
      })}
      {/* <ListItem>
				<input
					type="text"
					value={newChipInput}
					onChange={(e) => setNewChipInput(e.target.value)}
					placeholder="Add a new chip"
				/>
				<button onClick={handleAddChip}>Add</button>
			</ListItem> */}
    </Paper>
  );
};

export default ChipsArray;
