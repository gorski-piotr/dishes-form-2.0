import { useState } from "react";

function DishesForm() {
  // state Hooks for the input fields:
  const [name, setName] = useState("");
  const [preparation_time, setPreparation_time] = useState("00:00:00");
  const [type, setType] = useState("");
  const [no_of_slices, setNo_of_slices] = useState("");
  const [diameter, setDiameter] = useState("");
  const [spiciness_scale, setSpiciness_scale] = useState("");
  const [slices_of_bread, setSlices_of_bread] = useState("");

  // state Hook for the error message (form validation)
  const [errorMessage, setErrorMessage] = useState("");

  //state Hooks for active errors (used for inputs stylinig)
  const [non_field_errorActive, setNon_field_errorActive] = useState(false);
  const [no_of_slicesErrorActive, setNo_of_slicesErrorActive] = useState(false);
  const [diameterErrorActive, setDiameterErrorActive] = useState(false);
  const [spiciness_scaleErrorActive, setSpiciness_scaleErrorActive] =
    useState(false);
  const [slices_of_breadErrorActive, setSlices_of_breadErrorActive] =
    useState(false);

  // console.log("name:", name);
  // console.log("preparation time", preparation_time);
  // console.log("type:", type);
  // console.log("no_of_slices:", no_of_slices);
  // console.log("diameter:", diameter);
  // console.log("spiciness:", spiciness_scale);
  // console.log("slices_of_bread:", slices_of_bread);

  //form reset function - set all the inputs states to the initial value after submitting the form
  const formReset = () => {
    setName("");
    setPreparation_time("00:00:00");
    setType("");
    setNo_of_slices("");
    setDiameter("");
    setSpiciness_scale("");
    setSlices_of_bread("");
    setErrorMessage("");
    //input styling reset
    setNon_field_errorActive(false);
    setNo_of_slicesErrorActive(false);
    setDiameterErrorActive(false);
    setSpiciness_scaleErrorActive(false);
    setSlices_of_breadErrorActive(false);
  };

  // handle form submit button:
  const handleSubmit = (e) => {
    e.preventDefault(); //to stop the form submitting prevent from reloading the page
    setErrorMessage(""); //to clear previous error messages

    //input styling reset
    setNon_field_errorActive(false);
    setNo_of_slicesErrorActive(false);
    setDiameterErrorActive(false);
    setSpiciness_scaleErrorActive(false);
    setSlices_of_breadErrorActive(false);

    let errors = []; //initializing the errors array

    //form validation:
    // if (name.trim() === "") {
    //   errors.push("Set the dish name!");
    // }
    // if (preparation_time.trim() === "00:00:00") {
    //   errors.push("Set the preparation time!");
    // }
    // if (type === "") {
    //   errors.push("Set the dish type!");
    // }
    // if (type === "pizza" && no_of_slices < 1) {
    //   errors.push("Set the number of pizza slices!");
    // }
    // if (type === "pizza" && diameter < 10) {
    //   errors.push("Set the correct pizza diameter! (Minimum 10cm)");
    // }
    // if (type === "soup" && (spiciness_scale > 10 || spiciness_scale < 1)) {
    //   errors.push("Set the correct spiciness scale! (between 1 and 10)");
    // }
    // if (type === "sandwich" && slices_of_bread < 1) {
    //   errors.push("Set the number of bread slices!");
    // }

    // mapping through the errors array and setting the error message
    if (errors.length > 0) {
      const errorItems = errors.map((element, index) => (
        <li key={index}>{element}</li>
      ));
      setErrorMessage(errorItems);
      return;
    }

    // if errors array is empty then show an alert and proceed with form submitting
    alert("Congratulations! Form submitted!");

    // create an Object you want to submit (depending on the dish type)
    let dish;
    if (type === "pizza") {
      dish = {
        name: name,
        preparation_time: preparation_time,
        type: type,
        no_of_slices: parseInt(no_of_slices),
        diameter: parseFloat(diameter),
      };
    }
    if (type === "soup") {
      dish = {
        name: name,
        preparation_time: preparation_time,
        type: type,
        spiciness_scale: parseInt(spiciness_scale),
      };
    }
    if (type === "sandwich") {
      dish = {
        name: name,
        preparation_time: preparation_time,
        type: type,
        slices_of_bread: parseInt(slices_of_bread),
      };
    }

    // POST REQUEST using FETCH API
    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
      method: "POST",

      body: JSON.stringify(dish),
    })
      .then((res) => res.json())
      .then((resJSON) => {
        if (resJSON.id) {
          //if no errors then reset the form and show the alert with the JSON response
          console.log("response", resJSON);
          formReset();
          alert(JSON.stringify(resJSON));
        } else {
          alert(`There was an error`);
          console.log("error", resJSON);
          let error = resJSON;

          if (error.non_field_error) {
            let errorString = JSON.stringify(error.non_field_error);
            setErrorMessage(errorString.slice(1, -1));
            setNon_field_errorActive(true);
          }
          if (error.no_of_slices) {
            let errorString = JSON.stringify(error.no_of_slices);
            setErrorMessage(errorString.slice(1, -1));
            setNo_of_slicesErrorActive(true);
          }
          if (error.diameter) {
            let errorString = JSON.stringify(error.diameter);
            setErrorMessage(errorString.slice(1, -1));
            setDiameterErrorActive(true);
          }
          if (error.spiciness_scale) {
            let errorString = JSON.stringify(error.spiciness_scale);
            setErrorMessage(errorString.slice(1, -1));
            setSpiciness_scaleErrorActive(true);
          }
          if (error.slices_of_bread) {
            let errorString = JSON.stringify(error.slices_of_bread);
            setErrorMessage(errorString.slice(1, -1));
            setSlices_of_breadErrorActive(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error); //if errors then diplay them in the console
      });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} action="#">
        {/* Text input for dish name */}
        <div className="my-1">
          <label htmlFor="name">Dish name:</label>
          <input
            className="border-black border rounded p-1 mx-2"
            type="text"
            name="name"
            id="name"
            placeholder="Dish name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Time input for preparation time */}
        <div className="my-1">
          <label htmlFor="preparation_time">Preparation time:</label>

          <input
            className="border-black border rounded p-1 mx-2"
            type="time"
            step="1"
            name="preparation_time"
            id="preparation_time"
            value={preparation_time}
            onChange={(e) => setPreparation_time(e.target.value)}
          />
        </div>

        {/* Select input for dish type */}
        <div className="my-1">
          <label htmlFor="type">Dish type:</label>
          <select
            className={
              non_field_errorActive
                ? "border-red-500 border-2 rounded p-1 mx-2"
                : "border-black border rounded p-1 mx-2"
            }
            name="type"
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type ? type : ""}
          >
            <option hidden>Choose a dish type</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>

        {/********** Conditial rendering (depending on dish type) **********/}

        {/* additional fields for pizza */}
        {type === "pizza" && (
          <div>
            <div className="my-1">
              <label htmlFor="no_of_slices">Number of slices:</label>
              <input
                className={
                  no_of_slicesErrorActive
                    ? "border-red-500 border-2 rounded p-1 mx-2"
                    : "border-black border rounded p-1 mx-2"
                }
                type="number"
                id="no_of_slices"
                name="no_of_slices"
                min="1"
                onChange={(e) => setNo_of_slices(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label htmlFor="diameter">Diameter:</label>
              <input
                className={
                  diameterErrorActive
                    ? "border-red-500 border-2 rounded p-1 mx-2"
                    : "border-black border rounded p-1 mx-2"
                }
                type="number"
                step="0.1"
                id="diameter"
                name="diameter"
                min="10"
                onChange={(e) => setDiameter(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* additional fields for soup */}
        {type === "soup" && (
          <div>
            <div className="p-2">
              <label htmlFor="spiciness_scale">Spiciness:</label>
              <div
                className={
                  spiciness_scaleErrorActive
                    ? "border-red-500 border-2 rounded p-1 mx-2 inline"
                    : "border-black border rounded p-1 mx-2 inline"
                }
              >
                <input
                  type="range"
                  id="spiciness_scale"
                  name="spiciness_scale"
                  min="1"
                  max="10"
                  onChange={(e) => setSpiciness_scale(e.target.value)}
                />
                <span>{spiciness_scale}</span>
              </div>
            </div>
          </div>
        )}

        {/* additional fields for sandwich */}
        {type === "sandwich" && (
          <div>
            <label htmlFor="slices_of_bread">Slices of bread:</label>
            <input
              className={
                slices_of_breadErrorActive
                  ? "border-red-500 border-2 rounded p-1 mx-2"
                  : "border-black border rounded p-1 mx-2"
              }
              type="number"
              id="slices_of_bread"
              name="slices_of_bread"
              min="1"
              onChange={(e) => setSlices_of_bread(e.target.value)}
            />
          </div>
        )}
        <input className="p-2 m-2 rounded" type="submit" value="Submit"></input>
      </form>
      <ul className="text-red-600 font-bold">{errorMessage}</ul>
    </div>
  );
}

export default DishesForm;
