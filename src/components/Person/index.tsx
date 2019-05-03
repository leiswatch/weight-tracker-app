import React from 'react';
import Form from '../Form';

interface personProps {
    id: string,
    name: string,
    update: (id: string) => (event: React.SyntheticEvent) => void
}

const Person: React.FC<personProps> = ({ id, name, update }) => {
  return (
    <div>
      {name}
      {id}
      <Form id={id} update={update}/>
    </div>
  );
};

export default Person;
