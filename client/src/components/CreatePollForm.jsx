import React, { useState } from 'react';

const CreatePollForm = (props) => {

  const [name, setName] = useState(null);
  const [options, setOptions] = useState([]);
  const [newOption, setNew] = useState(null);

  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions(options.concat(newOption));
  }

  const getOptionsList = () => {
    if (options.length) {
      return options.map(option => {
        return <div>{option}</div>;
      });
    } else {
      return <div>none</div>;
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(name, options);
  }

  return (
    <div>
      <form onSubmit={(e) => {onFormSubmit(e)}}>
        Name:<input type="text" onChange={(e) => {setName(e.target.value)}}></input>
        <input type="submit" value="New Poll"></input>
      </form>
        Options: {getOptionsList()}
      <form onSubmit={(e) => {handleAddOption(e)}}>
        New Option: <input type="text" onChange={(e) => {setNew(e.target.value)}}></input>
        <input type="submit" value="Add"></input>
      </form>
    </div>
  );
}

export default CreatePollForm;