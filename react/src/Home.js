import React from 'react';
import './Style/home.css';
import Quickcontent from './Quickcontent'
import axios from 'axios';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            location :[],
            mealtype:[],
            suggestions:[],
            text:'',
            restaurants:[]
        }
    }
    componentDidMount(){
        sessionStorage.setItem('area',undefined);
        sessionStorage.setItem('city',undefined);
        axios({
            method:'GET',
            url:'http://localhost:3131/apirequest/city',
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({location:response.data.location})).catch(err=>console.log(err))
        axios({
            method:'GET',
            url:'http://localhost:3131/apirequest/mealtype',
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({mealtype:response.data.mealtype})).catch(err=>console.log(err))
    }

    handlechange=(event)=>{

        const area=event.target.value.split('-')[0];
        const city=event.target.value.split('-')[1];

        sessionStorage.setItem('area',area);
        sessionStorage.setItem('city',city);

        axios({
            method:'GET',
            url:`http://localhost:3131/apirequest//getrestaurantbycityparam/${city}`,
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({restaurants:response.data.restaurent})).catch(err=>console.log(err))
    }
    ontextchange=(e)=>{
        const value=e.target.value;
        const {restaurants}=this.state;
        let suggestions=[];
        if(value.length>0){
            suggestions=restaurants.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState(()=>({
            suggestions:suggestions,text:value
        }))
    }
    rendersuggestions=()=>{
        let {suggestions}=this.state;
        if(suggestions.length===0){
            return null;
        }
        return(<ul>
            {
                suggestions.map((item,index)=>(<li key={index}  onClick={()=>this.selectedtext(item)} className="liprop">{`${item.name},${item.city}`}</li>))
            }
        </ul>);
    }
    selectedtext=(item)=>{
        this.setState({
            text:item.name,
            suggestions:[],
        },()=>{
            this.props.history.push(`/details/${item._id}`)
        })
    }
    render() {
        const {location,mealtype}=this.state;
        var text; 
        return (
            <div>
                <img src={require('./assets/main.jpg')} alt="" style={{ width: '100%', margin: 'auto', height: '450px', position: 'relative', objectFit: 'cover' }} />
                <div className="maincontent">
                    <span className="hnavleft">
                        <a href={"/"} className="logo">e!</a>
                    </span>
                    <div className="hmainhead"> <h1 >Find the best restaurants, cafes, and bars </h1></div>
                    <select className="hselect" id="location" onClick={this.handlechange}>
                    <option  value="0">Select Location</option>
                        {location.map((item,index)=>{
                            return <option key={index} value={`${item.location_id}-${item.city_id}`} >{item.name}</option>
                        })}
                    </select>
                    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                        <div className="listn">
                        <input className="hinput" type="text" alt="" placeholder='Search for restaurants' value={text} onChange={this.ontextchange}  />
                        {this.rendersuggestions()}
                        </div>
                        <span class="glyphicon glyphicon-search search"></span>
                    </div>
                </div>
               <Quickcontent mealtypes={mealtype}/>
            </div>
        )
    }
}

export default Home;