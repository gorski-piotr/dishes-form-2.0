function NewDish(props) {
  //   console.log("props", props);
  return (
    <div className="text-green-600 font-bold">
      Congratulations! You have created a new dish!
      <ul>
        <li>Name: {props.newDish.name}</li>
        <li>Preparation time: {props.newDish.preparation_time}</li>
        <li>Type: {props.newDish.type}</li>
      </ul>
    </div>
  );
}

export default NewDish;
