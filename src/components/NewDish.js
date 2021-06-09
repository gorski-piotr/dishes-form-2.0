function NewDish(props) {
  //   console.log("props", props);
  return (
    <div className="text-green-600">
      <p className="font-bold">Congratulations! You have created a new dish!</p>
      <ul>
        <li>Name: {props.newDish.name}</li>
        <li>Preparation time: {props.newDish.preparation_time}</li>
        <li>Type: {props.newDish.type}</li>
        {props.newDish.type === "pizza" && (
          <>
            <li>Slices of pizza: {props.newDish.no_of_slices}</li>
            <li>Diameter: {props.newDish.diameter}</li>
          </>
        )}
        {props.newDish.type === "soup" && (
          <li>Spiciness scale: {props.newDish.spiciness_scale}</li>
        )}
        {props.newDish.type === "sandwich" && (
          <li>Slices of bread: {props.newDish.slices_of_bread}</li>
        )}
      </ul>
    </div>
  );
}

export default NewDish;
