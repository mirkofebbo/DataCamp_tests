import React, { Component } from 'react';

class Humans extends React.Component {
    constructor(props) {
        super(props);

        this.humanSelection = ['None','None'];
        // Generic avatar 
        this.defaultImg = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp';
        // Image for character selection
        this.imageLink_1 = this.defaultImg;
        this.imageLink_2 = this.defaultImg;

        // method
        this.selectFirstHuman = this.selectFirstHuman.bind(this);
        this.selectSecondHuman = this.selectSecondHuman.bind(this);
        this.findEpisodes = this.findEpisodes.bind(this);

        // The Json
        this.state = {
            actors: [],
            episodes: []
        };
    }
//-------------------------------------------------------------------------------------
// LOADING THE DATA 
//-------------------------------------------------------------------------------------
    componentDidMount(){
        // get the list of all the humans
        fetch("https://www.breakingbadapi.com/api/characters")
        .then(d => d.json())
        .then(d => {
            this.setState({
                actors: d
            })
        })
        // list of all the episodes 
        fetch("https://www.breakingbadapi.com/api/episodes")
        .then(d => d.json())
        .then(d => {
            this.setState({
                episodes: d
            })
        })
    }    
//-------------------------------------------------------------------------------------
// EXTRACTING THE EPISODES
//-------------------------------------------------------------------------------------
  findEpisodes(){
    let searchActor_1 = this.humanSelection[0];
    let searchActor_2 = this.humanSelection[1];

    const {episodes} = this.state;

    let episodesActor_1 = [];
    let episodesActor_2 = [];
    this.intersection = [];
    
    for(var i = 0; i < episodes.length; i++){
        for(var j = 0; j < episodes[i].characters.length; j ++){
            if(episodes[i]['characters'][j] == searchActor_1){
                let season = episodes[i].season.trim();// episode 7 se 1 has a white space
                let episode = episodes[i].episode;
                let title = episodes[i].title;

                if(season < 10) season = "0"+season;
                if(episode < 10) episode = '0'+episode;

                let text = "S" + season + episode + " - " + title;
                console.log(text)
                episodesActor_1.push(text);
            }

            if(episodes[i]['characters'][j] == searchActor_2){
                let season = episodes[i].season.trim();
                let episode = episodes[i].episode;
                let title = episodes[i].title;

                if(season < 10) season = "0"+season;
                if(episode < 10) episode = "0"+episode;

                let text = "S" + season + episode + " - " + title;
                console.log(text)
                episodesActor_2.push(text);            } 
        }
    }

    if(searchActor_1 != 'None' && searchActor_2 != 'None'){

        this.intersection  = episodesActor_1.filter(element => episodesActor_2.includes(element));
    } else {
        if(searchActor_1 != 'None') {
            this.intersection = episodesActor_1;
        }
        if(searchActor_2 != 'None'){
            this.intersection = episodesActor_2;
        }
    }

    document.getElementById("episodes_results").innerHTML =  this.intersection ;
    if(this.intersection.length > 0) {
        let text = '';
        for(let i = 0; i < this.intersection.length; i ++){
            text += this.intersection[i] + '\n';
        }
        document.getElementById("episodes_results").innerHTML = text;
    }
    else document.getElementById("episodes_results").innerHTML = "no shared shows"
  }   
//-------------------------------------------------------------------------------------
// FIRST SELECTION ELEMENT  
//-------------------------------------------------------------------------------------
  selectFirstHuman = (elem) =>{
    // extracting the index value/actor id 
    const {actors} = this.state;

    let search_actor;
    // extracting the elements from the selction menu
    let index = elem.target.selectedIndex; // Get index

    // avoiding the 'no selection' of the menu  
    if(index<62){
         // The episode API refer to him has Hank and not henry 
         if(actors[index].name == "Henry Schrader") search_actor = "Hank Schrader";
         else search_actor = actors[index].name;
        document.getElementById("img_1").src =elem.target.value;
    }
    else {
        search_actor =  'None';
        document.getElementById("img_1").src = this.defaultImg;
    } 
    // Selection to compare 
    this.humanSelection[0] = search_actor;
    console.log(this.humanSelection);
    // Look for episodes
    this.findEpisodes();
  }
//-------------------------------------------------------------------------------------
// SECOND SELECTION ELEMENT  
//-------------------------------------------------------------------------------------
  selectSecondHuman = (elem) =>{
    const {actors} = this.state;

    let search_actor;

    let index =  elem.target.selectedIndex;
    document.getElementById("img_2").src =elem.target.value;

    if(index<62){
        if(actors[index].name == "Henry Schrader") search_actor = "Hank Schrader";
        else search_actor = actors[index].name;
        document.getElementById("img_2").src =elem.target.value;
    }
    else {
        search_actor =  'None';
        document.getElementById("img_2").src = this.defaultImg;
    } 

    this.humanSelection[1] = search_actor;

    this.findEpisodes();
  }
//-------------------------------------------------------------------------------------
// DISPLAY
//-------------------------------------------------------------------------------------
  render() {
    //https://scriptverse.academy/tutorials/reactjs-select.html

    const {actors} = this.state;
    let actorsList = actors.length > 0
    	&& actors.map((item, i) => {

      return (
        <option key={i} value = {item.img}> {item.name}</option>
      )
    }, this);

    return (
        
      <div>
        <div className='grid_items'>
                <select id="selection_1" onChange={this.selectFirstHuman}>
                {actorsList}
                <option value = '0'> No Selection</option>
                </select>
                <select id="selection_2" onChange={this.selectSecondHuman}>
                {actorsList}
                <option value = '0'> No Selection</option>
                </select>
                <div className='image_wrap'>
                    <img id="img_1" src={this.imageLink_1}></img>
                </div>
                <div className='image_wrap'>
                    <img id="img_2" src={this.imageLink_2}></img>
                </div>
        </div>
        <div className='title_line'></div>      
        <h2> List of shared episodes </h2>
        <div className='result_wrap'>
            <pre id="episodes_results" ></pre>
        </div>
      </div>
    );
  }
}

export default Humans;