import React, { Component } from 'react';
import Select from "react-select"
import {useState} from 'react';
import {MultiSelect} from "react-multi-select-component";
import Files from 'react-files'

const AddGame = () => {

  // State for the game name
  const [name, setName] = useState("")
  // State for the new game's description
  const [description, setDescription] = useState("")
  // State for the new game's release date
  const [date, setDate] = useState("")
  // State for the options selected for the platforms
  const [selected, setSelected] = useState(null)
  // State for selected file
  const [selectedFile, setSelectedFile] = useState()
  // State for the options selected (platforms)
  const [isSelected, setIsSelected] = useState(false)
  // State for the game image
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(date)
    console.log(selected[0].value)
  }

  // Submits the form
  // const uploadFile =(e) => {
  //   e.preventDefault();
  //   var formData = new FormData();
  //   formData.append('file', selectedFile);
  //   updateImage(formData);
  //   const url = ("/api/games/add")
  //   let rating = 0
  //   let description = e.target.description.value
  //   // let image = 
  //   let name = e.target.gameName.value
  //   let platform = e.target.platform.value
  //   let date = e.target.releaseDate.value
  //   let reviews = []

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ rating, description, name, platform, date, reviews})
  //   };
  //   fetch(url, requestOptions)
  //     .then(response => console.log('Submitted successfully'))
  //     .catch(error => console.log('Form submit error', error))
  // }

  // Stores platform options for the add game form
  const options = [
    { label: "PlayStation 1", value: "ps1" },
    { label: "PlayStation 2", value: "ps2" },
    { label: "PlayStation 3", value: "ps3" },
    { label: "PlayStation 4", value: "ps4" },
    { label: "PlayStation 5", value: "ps5" },
    { label: "PlayStation Vita", value: "psVita" },
    { label: "PSP", value: "psp" },
    { label: "Xbox", value: "xbox" },
    { label: "Xbox 360", value: "xbox360" },
    { label: "Xbox One", value: "xbox1" },
    { label: "Xbox Series X|S", value: "xboxSeries" },
    { label: "Ninentendo NES", value: "NES" },
    { label: "Nintendo SNES", value: "SNES" },
    { label: "Nintendo 64", value: "N64" },
    { label: "GameCube", value: "gameCube" },
    { label: "Game Boy Advance", value: "gameBoy" },
    { label: "Wii", value: "wii" },
    { label: "Wii U", value: "wiiU" },
    { label: "DS", value: "ds" },
    { label: "3DS", value: "3ds" },
    { label: "Switch", value: "switch" },
    { label: "Windows", value: "windows" },
    { label: "Mac", value: "mac" },
    { label: "Linux", value: "linux" },
    { label: "Dreamcast", value: "dreamcast" },
    { label: "Stadia", value: "stadia" },
  ];


  const itemRenderer = ({ checked, option, onClick, disabled }) => {
    return (
      <div>
        <input
          id={option.label}
          type="checkbox"
          onChange={onClick}
          checked={checked}
          disabled={disabled}
        />
        <label id="platforms" className="text-base italic" for={option.label}>{option.label}</label>
      </div>
    );
  };

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    // onImageChange()
  }

  const onFilesChange = (files) => {
    console.log(files)
    try {
      setImage(URL.createObjectURL(files[0]));
    }
    catch (e) {
      console.log('error')
    }
  }

  const onFilesError = (error, file) => {
    // console.log('error code ' + error.code + ': ' + error.message)
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

  function updateImage(formData) {
    return fetch('/image', {
      method : 'POST',
      headers : {        
      },
      body : formData
    }).then(data => data.json)
  }

  // Creates the form for adding a game
  return (
    <div className="box flex justify-evenly m-0 mt-12 lg:w-4/12 h-full p-5 bg-white border-2 border-black rounded-3xl">
      {/* FUNCTION handleSubmit ON ONSUBMIT */}
      <form className="addGameForm flex flex-col justify-evenly" onSubmit={handleSubmit}>
      <p className="text-2xl">Add Game Form</p>
        <label for="gameName">Game Name : </label>
        <input type="text" name="gameName" value={name} onChange={(e) => setName(e.target.value)} required></input>
        <label for="description">Description : </label>
        <input type="text" className="h-12" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></input>
        <label for="platform">Platform : </label>
        <Select
          name = "platform"
          isClearable={true}
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select :"}
          // ItemRenderer={itemRenderer}
        />
        <label for="releaseDate">Release Date : </label>
        <input type="date" id="releaseDate" name="releaseDate" value={date} onChange={(e) => setDate(e.target.value)}></input>
        <label for="lname">Image : </label>
        {/* <input type="file" id="lname" name="lname" onChange={onImageChange}></input> */}
        <img className="gameImage h-40 w-40" src={image} alt="preview"/>
        <br></br>
        <div className="files">
        <Files
          className='files-dropzone'
          onChange={onFilesChange}
          onError={onFilesError}
          accepts={['image/png', 'image/jpg', 'image/jpeg']}
          multiple={false}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click here to upload
        </Files>
      </div>
        <button type="submit">Add Game</button>
        {/* <pre>{JSON.stringify(selected)}</pre> */}
      </form>
    </div>);
};


export default AddGame;
