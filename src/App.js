import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
function PropertyList({ properties }) {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');

  return (
    <div className="p-2">
      <SearchBar 
        location={location} 
        title={title} 
        onLocationChange={setLocation} 
        onTitleChange={setTitle} />
      <PropertyTable 
        properties={properties} 
        location={location}
        title={title} />
    </div>
  );
}

function PropertyTable({ properties, location, title }) {
  let data = [];
  properties.forEach((property) => {
    if (location &&
      property.location.toLowerCase().indexOf(
        location.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (title &&
      property.title.toLowerCase().indexOf(
        title.toLowerCase()
      ) === -1
    ) {
      return;
    }

    data.push(property);
  });

  const FullProperty = (property) => {
    return (<div>{<div>
      <p class="card-text">{"Amenities : " + property.amenities}</p>
      <p class="card-text">{"Bedrooms : " + property.bedrooms}</p>
      <p class="card-text">{"Service Fee: " + property.servicefee}</p>
      <p class="card-text">{"Cleaning Fee: " + property.cleaningfee}</p>
    </div>}</div>
    );
  }

  return (
    <div>
      {data.map((property) => (
        <div className="card p-2">
          <div className="card-body">
            <div class = "d-flex">
              <div class = "col-6">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src={property.image1} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                      <img src={property.image2} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                      <img src={property.image3} class="d-block w-100" alt="..."/>
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div  class = "col-6 p-5">
                <h1 class="card-title">{property.title}</h1>
                <h5 class="card-title">{property.location}</h5>
                <p class="card-text">{property.description}</p>
                <a href="#" class="btn btn-primary">{property.nightlyfee}</a>
                <div>
                  <button class = "btn btn-secondary mt-2" onClick = {
                  () => { FullProperty(property)}}> More Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
}

function SearchBar({
  location,
  title,
  onLocationChange,
  onTitleChange
}) {
  return (
    <form>
        <label> Search by</label>
        <input 
          type="text" 
          value={location} placeholder="Location..." 
          style = {{margin:10}}
          onChange={(e) => onLocationChange(e.target.value)} />
        <input 
          type="text" 
          checked={title} placeholder="Title..." 
          style = {{margin:10}}
          onChange={(e) => onTitleChange(e.target.value)} />
    </form>
  );
}


const [properties, setproperties] = useState([]);
const list=()=>{
  fetch('properties.json'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(function(response){
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      setproperties(myJson)
    });
}
useEffect(()=>{
  list()
},[])

return <PropertyList properties={properties} />;

}

export default App;