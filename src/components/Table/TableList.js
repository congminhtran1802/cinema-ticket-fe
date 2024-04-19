import React from "react";
import { NavLink } from "react-router-dom";

export default function TableList(props) {
  const { listFilm, setOpenPopup, setFilm } = props;

  if (!listFilm) {
    return <p>Loading...</p>; // or any other handling for the absence of filmList
  }

  const handleEdit = (film) => {
    setOpenPopup(true);
    setFilm(film);
  }

  return (
    // tạo table show các phim từ filmList
    <table className="table table-striped table-inverse table-hover">
        <thead className="thead-inverse">
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>smallImageURl</th>
            <th>shortDescription</th>
            <th>director</th>
            <th>actors</th>
            <th>categories</th>
            <th>releaseDate</th>
            <th>duration</th>
            <th>trailerURL</th>
            <th>language</th>
            <th>rated</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {listFilm.map((film, index) => {
            return (
                <tr key={index}>
                <td>{film.id}</td>
                <td>{film.name}</td>
                <td>
                    <img src={film.smallImageURl} alt={film.name} width="100px" />
                </td>
                <td>{film.shortDescription}</td>
                <td>{film.director}</td>
                <td>{film.actors}</td>
                <td>{film.categories}</td>
                <td>{film.releaseDate}</td>
                <td>{film.duration}</td>
                <td>{film.trailerURL}</td>
                <td>{film.language}</td>
                <td>{film.rated}</td>
                <td>
                    
                    <button className="btn btn-primary" onClick={() => handleEdit(film)}>Sửa</button>
                    <button className="btn btn-danger ml-2">Xóa</button>
                </td>
                </tr>
            );
            })}
        </tbody>
    </table>
  );
}
