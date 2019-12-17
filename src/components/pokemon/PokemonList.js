import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import { URLs } from "../../constants/URLs";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default class PokemonList extends Component {
  state = {
    pokemon: [],
    count: 0,
    limit: 30
  };

  componentDidMount() {
    // this.loadFunc()
    axios
      .get(
        URLs.pokeAPI +
          "offset=" +
          `${this.state.count}` +
          "&limit=" +
          `${this.state.limit}`
      )
      .then(res =>
        this.setState({
          pokemon: res.data["results"],
          count: this.state.count + this.state.limit
        })
      );
  }

  loadFunc = () => {
    axios
      .get(
        URLs.pokeAPI +
          "offset=" +
          `${this.state.count}` +
          "&limit=" +
          `${this.state.limit}`
      )
      .then(res =>
        this.setState({
          pokemon: [...this.state.pokemon, ...res.data["results"]],
          count: this.state.count + this.state.limit
        })
      );
  };

  render() {
    return (
      <div className="container">
        <InfiniteScroll
          dataLength={this.state.pokemon.length}
          next={this.loadFunc}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}
