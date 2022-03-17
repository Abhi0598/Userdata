import React from 'react';
import './App.css';
import logo from './logo.svg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dataIsLoaded: false,
      searchText: ""
    }
  }

  async componentDidMount() {
    fetch(
      "https://randomuser.me/api/?results=15")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json.results
        });
      })
  }


  handleSearch(event) {
    this.setState({
      searchText: event.target.value
    })
  }


  render() {
    const userData = this.state.data.filter((user, index) => {
      return user.name.first.toLowerCase().includes(this.state.searchText.toLowerCase());
    });
    return (
      <div>
        <div className='header'>
          <img src={logo} style={{ height: "50px" }} />
          <input className='searchTextField' placeholder='search user...' type="text" value={this.state.searchText} onChange={this.handleSearch.bind(this)} />
        </div>
        <div className='userCardWrapper'>
          {this.state.data.length > 0 && userData.length > 0  ? userData.map(userDetails => {
            return (
              <div className='userCard'>
                <img className='roundimg' src={userDetails.picture.thumbnail} />
                <div>
                  <p className='removedptagmargin'> {userDetails.name.title}. {userDetails.name.first} {userDetails.name.last} | {userDetails.dob.age}</p>
                  <p className='removedptagmargin'>  {userDetails.email}</p>
                  <p className='removedptagmargin'>  {userDetails.location.street.number} {userDetails.location.street.name} {userDetails.location.city} {userDetails.location.state} {userDetails.location.country} {userDetails.location.postcode}</p>
                </div>
                <div className='nat'>{userDetails.nat} </div>
              </div>
            )
          }) : <div className='Nouser'> NO Data Found</div>
          }
        </div>
      </div>
    );
  }

}
export default App;
