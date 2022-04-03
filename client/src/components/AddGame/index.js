import Select from "react-select"
import { useState } from 'react';
import Files from 'react-files'
import { useNavigate } from 'react-router';
import placeHolderImage from "../../assets/light_grey_square.png"

const AddGame = () => {

  //To navigate
  const navigate = useNavigate();
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

  // Submits the form
  const uploadFile = (e) => {
    e.preventDefault();

    if (isSelected && selected) {

      var formData = new FormData();
      formData.append('file', selectedFile);
      updateImage(formData);

      const img = "https://rottengames.blob.core.windows.net/gameimages/" + selectedFile.name;

      let rating = 0
      let description = e.target.description.value
      let name = e.target.gameName.value
      let platform = e.target.platform.value
      let date = e.target.releaseDate.value
      let reviews = []

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, description, name, platform, date, reviews, img })
      };
      fetch("/api/games/", requestOptions)
        .then(response => {
          if (response.status === 200) {
            window.alert("Game Added to the Database");
            navigate("/games")
          }
          else{
            window.alert("Game Already Exists");
          }
        }
        )
    }
    else if (!isSelected) {
      window.alert("Choose an image to add a game.");
    }
    else {
      window.alert("Choose a platform to add a game.");
    }
  }

  const onFilesChange = (files) => {
    const file = files[0]
    console.log(file)
    setSelectedFile(file);
    setIsSelected(true);
    onImageChange(files)
  }

  const onImageChange = (event) => {
    setImage(URL.createObjectURL(event[0]));
  }

  const onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }

  function updateImage(formData) {
    const requestOptions = {
      method: 'POST',
      headers: {
      },
      body: formData
    };
    fetch('api/images/fileUpload', requestOptions)
      .then(response => console.log('Image Submitted successfully'))
      .catch(error => console.log('Form submit error', error))
  }

  //Sets a placeholder image when it is unable to get the profile picture from google
  function setPlaceHolder(e){
    e.target.src = placeHolderImage
}

  // Creates the form for adding a game
  return (
    <div className="box flex justify-evenly m-0 lg:w-4/12 h-full p-5 bg-white border-2 border-black-700 rounded-3xl dark:bg-slate-300">
      <form className="addGameForm flex flex-col justify-evenly" onSubmit={uploadFile}>
        <p className="text-3xl font-semibold text-center">Add Game Form</p>
        <br></br>
        <label for="gameName">Game Name : </label>
        <input className="border-solid border-2 my-2  dark:border-gray-700 dark:bg-sky-50" type="text" name="gameName" value={name} onChange={(e) => setName(e.target.value)} required></input>
        <label for="description">Description : </label>
        <textarea className="border-solid border-2 h-16 my-2 dark:border-gray-700 dark:bg-sky-50 dark:text-black" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <label for="platform">Platform : </label>
        <Select
          className="my-2 dark:bg-sky-50 dark:border-gray-700"
          name="platform"
          isClearable={true}
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select :"}
        />
        <label for="releaseDate">Release Date : </label>
        <input className="border-solid border-2 my-2 dark:border-gray-700 dark:bg-sky-50 dark:text-black" type="date" id="releaseDate" name="releaseDate" value={date} onChange={(e) => setDate(e.target.value)} required></input>
        <label for="lname">Image : </label>
        <div className="files">
          <Files
            className='files-dropzone border-solid border-2 my-2 p-2 dark:border-gray-700 dark:text-black dark:bg-sky-50'
            onChange={onFilesChange}
            onError={onFilesError}
            accepts={['image/png', 'image/jpg', 'image/jpeg', 'image/gif']}
            multiple={false}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
            Drop files here or click here to upload
            <img className="gameImage object-cover h-40 w-40 m-auto block my-2" src={image} alt="" onError={setPlaceHolder}/>
          </Files>

        </div>
        <button className="text-white bg-black" type="submit">Add Game</button>
      </form>
    </div>);
};


export default AddGame;
