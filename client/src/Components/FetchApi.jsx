import React from 'react';
import axios from 'axios'; 

import 'bootstrap/dist/css/bootstrap.css';
import '../News.css'; 


export default class News extends React.Component {
    constructor(props){
        super(props);
        this.getCountryData =this.getCountryData.bind(this);
    }
    state = {
        confirmed: 0, 
        recovered: 0, 
        deaths: 0, 
        countries: [], 
    }

    componentDidMount() {
        this.getData(); 
    }

    async getData() {
        const resApi = await axios.get("https://covid19.mathdro.id/api");
        const resCountries = await axios.get("https://covid19.mathdro.id/api/countries");
        const countries = resCountries.data.countries.map(country => {
            return country.name;
        })
        this.setState({
            confirmed: resApi.data.confirmed.value, 
            recovered: resApi.data.recovered.value, 
            deaths: resApi.data.deaths.value,
            countries: countries
        });
    }

    async getCountryData(event) {
        if(event.target.value === "WorldWide"){
            return this.getData(); 
        }
        try {
            const resCountry = await axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
            this.setState({
                confirmed: resCountry.data.confirmed.value, 
                recovered: resCountry.data.recovered.value, 
                deaths: resCountry.data.deaths.value,
            })
        }
        catch(err) {
            if (err.response.status === 404)
            this.setState({
                confirmed: "no test have been conducted", 
                recovered: "No data found", 
                deaths: "No data found", 
            })
        }
    }
    
    countryOptions() {
        return this.state.countries.map((country, index) => {
            return <option key={index}>{country}</option>
        }); 
    }
    render(){
        return(
            <div className="container">
                <form clasName="wallpaper">
              
                        <h1>COVID-19 UPDATE</h1>
                        <p>Last Updated{ Date() }</p>
                        <select className="dropdown" onChange={this.getCountryData}>
                            <option>WorldWide</option>
                            {this.countryOptions()}
                        </select>
                        <p><i>*Select a country to view most recent data</i></p>
                    </form>
               
                <div className="flex">
                    <div className="box confirmed">
                        <h3>Confirmed Cases</h3>
                        <h4>{this.state.confirmed}</h4>
                    </div>

                    <div className="box recovered">
                        <h3>Recovered Cases</h3>
                        <h4>{this.state.recovered}</h4>
                    </div>

                    <div className="box deaths">
                        <h3>Deaths</h3>
                        <h4>{this.state.deaths}</h4>
                    </div>
                </div>
            </div>  
        )
    }
}