import React from 'react';
import Form from '../Form';
import Chart from '../Chart';
import Collapsible from 'react-collapsible';

type data = {
  weight: number;
  date: Date;
};
interface personProps {
  id: string;
  name: string;
  data: data[];
  update: (id: string) => (event: React.FormEvent) => void;
}

const Person: React.FC<personProps> = ({ id, name, data, update }) => {
  return (
    <div>
      <Collapsible
        trigger={name}
        triggerStyle={{ 'font-size': '40px', cursor: 'pointer' }}
        lazyRender={true}
        easing='ease-out'
      >
        <Chart data={data} />
        <Form id={id} update={update} />
      </Collapsible>
    </div>
  );
};

export default Person;
