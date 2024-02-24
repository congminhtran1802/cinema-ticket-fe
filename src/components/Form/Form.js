import React from "react";
import { useState } from "react";
import { TextField } from "@material-ui/core";

export default function Form(props) {
    const { onSubmit, film, forceUpdate} = props;

    const [filmEdit, setFilmEdit] = useState(film);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "duration") {
            setFilmEdit({
                ...filmEdit,
                [name]: parseInt(value),
            });
            return;
        }
        console.log("preEdit", filmEdit);
        setFilmEdit({
            ...filmEdit,
            [name]: value,
        });
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        forceUpdate();
        onSubmit(filmEdit);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên phim"
            type="text"
            fullWidth
            variant="standard"
            value={filmEdit.name}
            name="name"
            onChange={handleChange}
          />

            <TextField
            autoFocus
            margin="dense"
            id="duration"
            label="Duration"
            type="number"
            fullWidth
            variant="standard"
            value={filmEdit.duration}
            name="duration"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
    );
}
