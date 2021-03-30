// Write your JavaScript code here!

window.addEventListener("submit", function() {
   
   event.preventDefault()
    
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let launchData = {
         pilotName: pilotNameInput.value, 
         copilotName: copilotNameInput.value,
         fuelLevel: Number(fuelLevelInput.value),
         cargoMass: Number(cargoMassInput.value)
       }
       let launchChecklist = {
          pilotReady: false,
          copilotReady: false,
          fuelLevelReady: false,
          cargoMassReady: false,
          readyForLaunch: false
       }
 
      let  validInfoCheck = function() {
         if ((pilotNameInput.value === "" || copilotNameInput.value === "") || (fuelLevelInput.value === "" || cargoMassInput.value === "")) {
            alert("All fields are required!");
            event.preventDefault();  
         } else if (
            !isNaN(pilotNameInput.value)  ||
            !isNaN(copilotNameInput.value)||
            (isNaN(fuelLevelInput.value)) || 
            (isNaN(cargoMassInput.value))
            ) {
            alert("Make sure you enter valid information into each field.")
            event.preventDefault()
         } else { launchChecklist.pilotReady = true, launchChecklist.copilotReady = true 
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotNameInput.value} is ready for launch`;
         }
         return console.log("info Checked")
      };

      let fuelLevelCheck = function () {
         if (fuelLevelInput.value < 10000 && launchChecklist.pilotReady === true)  {
            event.preventDefault()
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red"
            document.getElementById("fuelStatus").innerHTML = "Fuel level not high enough for launch";
            launchChecklist.fuelLevelReady = false;
         } else 
         //if (fuelLevelInput.value > 10000 && cargoMassInput.value > 10000 && launchChecklist.pilotReady === true) 
         {
            document.getElementById("faultyItems").style.visibility = "hidden";
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
            launchChecklist.fuelLevelReady = true;
         }
         return console.log("fuel level Checked") 
      }

      let cargoMassCheck = function() {
         if (cargoMassInput.value > 10000 && launchChecklist.pilotReady === true) {
            event.preventDefault()
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red"
            document.getElementById("cargoStatus").innerHTML = "Cargo Mass too high for launch ";
            launchChecklist.cargoMassReady = false;
         } else if (cargoMassInput.value < 10000 && fuelLevelInput.value > 10000 && launchChecklist.pilotReady === true){
            document.getElementById("faultyItems").style.visibility = "hidden";
            document.getElementById("cargoStatus").innerHTML = "Cargo Mass low enough for launch ";
            launchChecklist.cargoMassReady = true;
         }
         return console.log("cargo mass checked")
      };
      let shuttleReady = function(){
         
         if (launchChecklist.pilotReady === true && launchChecklist.copilotReady === true && launchChecklist.fuelLevelReady === true && launchChecklist.cargoMassReady === true ) {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for lanuch!`;
            document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotNameInput.value} is ready for launch`;
         launchChecklist.readyForLaunch = true
         }
         return console.log("shuttle ready checked")
      }
      console.log(launchChecklist)
      validInfoCheck()
      fuelLevelCheck()
      cargoMassCheck()
      shuttleReady()
       console.log(launchChecklist)
   });

  window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         console.log(json[0]);
         const div = document.getElementById("missionTarget");
         selected = json[0]
   div.innerHTML = `
   <h2>Mission Destination</h2>
   <ol>
      <li>Name: ${selected.name}</li>
      <li>Diameter: ${selected.diameter}</li>
      <li>Star: ${selected.star}</li>
      <li>Distance from Earth: ${selected.distance}</li>
      <li>Number of Moons: ${selected.moons}</li>
   </ol>
   <img src="${selected.image}">
   `;
      });
   });
});
