import React from 'react';

const Form: React.FC<{
  id: string;
  update: (id: string) => (event: React.SyntheticEvent) => void;
}> = ({ update, id }) => {
  return (
    <div>
      <form onSubmit={update(id)}>
        <label htmlFor='input-wieght'>
          Weight: <input type='number' name='weight' id='input-weight' />
        </label>
        <label htmlFor='input-date'>
          Date:
          <input type='date' name='date' id='input-date' />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
