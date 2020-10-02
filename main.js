
// getting the location form

const locationForm = document.getElementById("location-form");
locationForm.addEventListener('submit', geocode);


function geocode (e){
    
    //preventing default form submit
    e.preventDefault();


    let locaion = document.getElementById("location-input").value;

    //google api url
    axios.get('https://maps.googleapis.com/maps/api/geocode/json' , {
        params:{
            address: location,
            //enteryour google api key here for geocade api project
            key: '< your geocoding api key>'
        }
    })
    .then(function(response){
        //log full response
            console.log(response)
//---------------------------------  FORMATTED ADDRESS-------------------------------------//
        //getting the formatted address
        let formattedAddress = response.data.results[0].formatted_address;
        
        let formattedAddressOutput = `
        
        <ul class="list-group"> 
            <li class="list-group-item"> ${formattedAddress}</li>
         <ul> 
        `;

         //Output formatted Address to  your app
         document.getElementById('formattedAddress').innerHTML =formattedAddressOutput;

//---------------------------------  ADDRESS COMPONENTS-------------------------------------//
        //Address Components
        let addressComponents = response.data.results[0].address_components;
        
        let addressComponentsOutput = '<ul class="list-group"> ';
                //looping through the adress components and displaying each one of them athat are availble
        for(i=0;i < addressComponents.length ; i++){
            addressComponentsOutput += `
            <li class="list-group-item">
             <strong>${formattedAddress[i].types[0]} </strong> : ${addressComponents[i].long_name}</li>
            </li>

            `;
        }
        addressComponentsOutput += '</ul>';

          //Output formatted Address to  your app
          document.getElementById('addressComponents').innerHTML = addressComponentsOutput;

//---------------------------------  LONGITUDE & LATITUDE-------------------------------------//

        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;

        let geometryOutput = `

        <ul class="list-group"> 
            <li class="list-group-item"> <strong> Latitude </strong>: ${lat}</li>
            <li class="list-group-item"> <strong> Longitude </strong>: ${lng}</li>

        <ul> 
        
        `;

        //Output Longitude and Latitude to your app
        document.getElementById('geometry').innerHTML =  geometryOutput;


    })
    .catch(function(error){

        alert(error)
    })
}