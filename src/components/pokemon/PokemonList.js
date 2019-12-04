import React, { Component } from 'react'
import PokemonCard from './PokemonCard';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'


export default class PokemonList extends Component {
    state= {
        pokemon: [],
        count:0,
        limit: 30
    };

    componentDidMount() {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.count}&limit=${this.state.limit}`)          
            .then(res => this.setState({ pokemon: res.data['results']}));
    }

    loadFunc = () => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.count}&limit=${this.state.limit}`)          
            .then(res => this.setState({ pokemon: [...this.state.pokemon, ...res.data['results']],
            count: this.state.count + this.state.limit
            })
        );

    };

    render() {
        return (
            <React.Fragment>
            <InfiniteScroll
                dataLength={this.state.pokemon.length}
                next={this.loadFunc}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
            {this.state.pokemon ? (<div className="row">
                    {this.state.pokemon.map(pokemon => (
                        <PokemonCard key={pokemon.id} name={pokemon.name} url={pokemon.url} />))}
                    </div>) : (<h1>Loading Pokemons</h1>)}
            </InfiniteScroll>
            </React.Fragment>
        )
    }
}
