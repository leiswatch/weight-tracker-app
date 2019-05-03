import React from 'react';
import Person from './components/Person';
import './App.css';
import { generate } from 'shortid';
import { map } from 'lodash';

type IState = {
  people: person[];
};

interface person {
  id: string;
  name: string;
  weight: number[];
  date: Date[];
}

export default class App extends React.Component<any, IState> {
  readonly state: IState = { people: [] };

  _addPerson = () => {
    this.setState({
      people: this.state.people.concat({
        id: generate(),
        name: '',
        weight: [],
        date: [],
      }),
    });
  };

  _updateInformations = (id: string) => (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      weight: { value: number };
      date: { value: Date };
    };

    const weight = target.weight.value;
    const date = target.date.value;

    const people: person[] = [...this.state.people];
    map(people, (person: person) => {
      if (person.id === id) {
        person.weight.push(weight);
        person.date.push(date);
      }
    });

    this.setState({
      people,
    });
  };

  render() {
    return (
      <div className='App'>
        {this.state.people &&
          this.state.people.map((person: person) => {
            return (
              <Person
                key={person.id}
                id={person.id}
                name={person.name}
                update={this._updateInformations}
              />
            );
          })}
        <button onClick={this._addPerson}>Add person</button>
      </div>
    );
  }
}
