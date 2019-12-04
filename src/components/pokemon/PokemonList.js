import React, { Component } from 'react'
import PokemonCard from './PokemonCard';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'


export default class PokemonList extends Component {
    state= {
        pokemon: null,
        offset: null,
        limit: 30
    };

    componentDidMount() {
        const { pokemon, offset, limit } = this.state;
        axios
            .get(`https://pokeapi.co/api/v2/pokemon`)          
            .then(res => this.setState({ pokemon: res.data['results']}));
    }

    loadFunc = () => {
        const { pokemon, offset, limit } = this.state;
        this.setState({ offset: this.state.offset + limit });
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/`)          
            .then(res => this.setState({ pokemon: this.state.pokemon.concat(res.data)}));

    }

    render() {
        return (
            <React.Fragment>
            <InfiniteScroll
                dataLength={this.state.pokemon}
                next={this.loadFunc}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
            {this.state.pokemon ? (<div className="row">
                    {this.state.pokemon.map(pokemon => (
                        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />))}
                    </div>) : (<h1>Loading Pokemons</h1>)}
            </InfiniteScroll>
            </React.Fragment>
        )
    }
}
