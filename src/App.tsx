import React from 'react';
import Person from './components/Person';
import './App.css';
import { generate } from 'shortid';
import { map } from 'lodash';

type IState = {
  people: person[];
};

type data = {
  weight: number;
  date: Date;
};

interface person {
  id: string;
  name: string;
  data: data[];
}

export default class App extends React.Component<any, IState> {
  readonly state: IState = { people: [] };

  async componentDidMount() {
    const data: string | null = localStorage.getItem('weight-tracker-data');
    const people: person[] = JSON.parse(data || '[]');
    if (people) {
      await this.setState({ people });
    }
  }

  _addPerson = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    this.setState(
      {
        people: this.state.people.concat({
          id: generate(),
          name: target.name.value,
          data: [],
        }),
      },
      () => {
        localStorage.setItem(
          'weight-tracker-data',
          JSON.stringify(this.state.people)
        );
      }
    );
  };

  _updateInformation = (id: string) => (e: React.FormEvent): void => {
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
        person.data.push({ weight, date });
      }
    });

    this.setState({
      people,
    });

    localStorage.setItem(
      'weight-tracker-data',
      JSON.stringify(this.state.people)
    );
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
                data={person.data}
                update={this._updateInformation}
              />
            );
          })}
        <form onSubmit={this._addPerson}>
          <label htmlFor=''>
            <input type='text' name='name' id='person-name' />
          </label>
          <button>Add person</button>
        </form>
      </div>
    );
  }
}
