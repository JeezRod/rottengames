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

  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch("/")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilesChange()
    console.log("url"+image)
    console.log(e.target.description.value)
    console.log(e.target.platform.value)
  }

  // Submits the form
  const uploadFile = (e) => {
    e.preventDefault();
    // var formData = new FormData();
    // formData.append('file', selectedFile);
    // updateImage(formData);
    const url = ("/api/games/add")
    let rating = 0
    let description = e.target.description.value
    let image = image
    let name = e.target.gameName.value
    let platform = e.target.platform.value
    let date = e.target.releaseDate.value
    let reviews = []

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, description, name, platform, date, reviews})
    };
    fetch(url, requestOptions)
      .then(response => console.log('Submitted successfully'))
      .catch(error => console.log('Form submit error', error))
  }

  // Stores platform options for the add game form
  const options = [
    { label: "PlayStation", value: "PlayStation" },
    { label: "PlayStation 2", value: "PlayStation 2" },
    { label: "PlayStation 3", value: "PlayStation 3" },
    { label: "PlayStation 4", value: "PlayStation 4" },
    { label: "PlayStation 5", value: "PlayStation 5" },
    { label: "PlayStation Vita", value: "PlayStation Vita" },
    { label: "PSP", value: "PSP" },
    { label: "Xbox", value: "Xbox" },
    { label: "Xbox 360", value: "Xbox 360" },
    { label: "Xbox One", value: "Xbox One" },
    { label: "Xbox Series X|S", value: "Xbox Series X" },
    { label: "Nintendo 64", value: "Nintendo 64" },
    { label: "GameCube", value: "GameCube" },
    { label: "Game Boy Advance", value: "Game Boy Advance" },
    { label: "Wii", value: "Wii" },
    { label: "Wii U", value: "Wii U" },
    { label: "DS", value: "DS" },
    { label: "3DS", value: "3DS" },
    { label: "Switch", value: "Switch" },
    { label: "Windows;Mac;Linux", value: "windows;mac;linux" },
    { label: "Dreamcast", value: "Dreamcast" },
    { label: "Stadia", value: "Stadia" },
  ];


  // const itemRenderer = ({ checked, option, onClick, disabled }) => {
  //   return (
  //     <div>
  //       <input
  //         id={option.label}
  //         type="checkbox"
  //         onChange={onClick}
  //         checked={checked}
  //         disabled={disabled}
  //       />
  //       <label id="platforms" className="text-base italic" for={option.label}>{option.label}</label>
  //     </div>
  //   );
  // };

  const onFilesChange = (files) => {

    // const fileChangeHandler = (event) => {
    //   setSelectedFile(event.target.files[0]);
    //   setIsSelected(true);
    //   // onImageChange()
    // }

    // const onImageChange = (event) => {
    //  if (event.target.files && event.target.files[0]) {
    //    setImage(URL.createObjectURL(event.target.files[0]));
    //  }
    // }

    // console.log(files)
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

  function updateImage(formData) {
    // /image??
    return fetch('/fileUpload', {
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
      </form>
    </div>);
};


export default AddGame;
