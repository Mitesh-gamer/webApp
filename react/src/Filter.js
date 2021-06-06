import React from 'react';
import './Style/filter.css';
import axios from 'axios';
import querystring from 'query-string'

class Filter extends React.Component{
    constructor() {
        super();
        this.state = {
            restaurents:[],
            pagecount:[],
            city:"",
            cuision:"",
            mealtype:"",
            lcost:"",
            hcost:"",
            sort:1,
            page:1,
            location:[],
            mealtypename:{},
            text:'',
            cuisiona:[]
            // dataperpage:undefined 
        }
    }
    componentDidMount(){
        const queryparams= querystring.parse(this.props.location.search);
        const mealtype_id=queryparams.mealtype_id;
        const area=queryparams.area;
        const secity=sessionStorage.getItem("city");
        var city=queryparams.city;
        const filterobj={
            mealtype:mealtype_id,
            city:Number(secity)
        };
        axios({
            method:'POST',
            url:'http://localhost:3131/apirequest/restaurantbycity',
            headers:{'Content-Type':'application/json'},
            data:filterobj
        }).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,mealtype:mealtype_id,city:Number(secity)})).catch(err=>console.log(err))
        if(city=="undefined"){ axios({
            method:'GET',
            url:`http://localhost:3131/apirequest/city`,
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({location:response.data.location,text:response.data.location[0].name.split(',')[1]})).catch(err=>console.log(err))
        }else{ axios({
            method:'GET',
            url:`http://localhost:3131/apirequest/city/${Number(secity)}`,
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({location:response.data.location,text:response.data.location[0].name.split(',')[1]})).catch(err=>console.log(err))
        }
       axios({
            method:'GET',
            url:'http://localhost:3131/apirequest/mealtypebyid/'+mealtype_id,
            headers:{'Content-Type':'application/json'}
        }).then(response=>this.setState({mealtypename:response.data.mealtype[0]})).catch(err=>console.log(err))
    }
    handleclick=(id)=>{
       
        this.props.history.push(`/details/${id}`);
    }
    handlecusinechange=(cuision)=>{
        const {mealtype,cuisiona,city}=this.state;
        if(cuisiona.indexOf(Number(cuision))==-1){
            cuisiona.push(Number(cuision));
        }
        else{
            var index=cuisiona.indexOf(Number(cuision));
            cuisiona.splice(index,1);
        }
       
        const filterobj={
             cuision:cuisiona.length!=0?cuisiona:'',
            mealtype:mealtype,
            city:city
        };
        axios({
            method:'POST',
            url:'http://localhost:3131/apirequest/restaurantbycity',
            headers:{'Content-Type':'application/json'},
            data:filterobj
        }).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,cuisiona:cuisiona,city:city})).catch(err=>console.log(err))  
    }
    handlecostchange=(lcost,hcost)=>{
        const {mealtype,cuisiona,city}=this.state;
        const filterobj={
             cuision:cuisiona.length!=0?cuisiona:'',
            mealtype:mealtype,
             lcost:Number(lcost),
             hcost:Number(hcost),
             city:city
        };
        axios({
            method:'POST',
            url:'http://localhost:3131/apirequest/restaurantbycity',
            headers:{'Content-Type':'application/json'},
            data:filterobj
        }).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,cuisiona:cuisiona,lcost:lcost,
            hcost:hcost,city:city})).catch(err=>console.log(err))  
    }
    handlesortchange=(sort)=>{
        const {mealtype,cuisiona,lcost,hcost,city}=this.state;
        const filterobj={
             cuision:cuisiona.length!=0?cuisiona:'',
            mealtype:mealtype,
            lcost:Number(lcost),
            hcost:Number(hcost),
            sort:Number(sort),
            city:city
        };

        axios({
            method:'POST',
            url:'http://localhost:3131/apirequest/restaurantbycity',
            headers:{'Content-Type':'application/json'},
            data:filterobj
        }).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,cuisiona:cuisiona,lcost:lcost,
            hcost:hcost,sort:sort,city:city})).catch(err=>console.log(err))  
    }
    handlepagechange=(page)=>{
        const {mealtype,cuisiona,lcost,hcost,sort,city}=this.state;
        const filterobj={
             cuision:cuisiona.length!=0?cuisiona:'',
            mealtype:mealtype,
            lcost:lcost,
             hcost:hcost,
             sort:sort,
             city:city,
            page:Number(page)
        };
        axios({
            method:'POST',
            url:'http://localhost:3131/apirequest/restaurantbycity',
            headers:{'Content-Type':'application/json'},
            data:filterobj
        }).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,cuisiona:cuisiona,lcost:lcost,
            hcost:hcost,sort:sort,page:page,city:city})).catch(err=>console.log(err))  
    }
    handlelocationchange=(event)=>{
        let filterobj={};
         const area=event.target.value.split('-')[0];
         const city=event.target.value.split('-')[1];
        const {mealtype,cuisiona,lcost,hcost,sort,page}=this.state;

        
         filterobj={//inclued cusine 
            cuision:cuisiona.length!=0?cuisiona:'',
           mealtype:mealtype,
           lcost:lcost,//
            hcost:hcost,
            city:Number(city),
            sort:sort,
           page:Number(page)
       } 
   axios({
    method:'POST',
    url:'http://localhost:3131/apirequest/restaurantbycity',
    headers:{'Content-Type':'application/json'},
    data:filterobj
}).then(response=>this.setState({restaurents:response.data.restaurant,pagecount:response.data.Numberofpage,cuisiona:cuisiona,lcost:lcost,
    hcost:hcost,sort:sort,page:page,city:city})).catch(err=>console.log(err))  
    }
    render(){
        const {restaurents,pagecount,location,mealtypename,text,sort}=this.state;
        var secity=sessionStorage.getItem('city');
        return (
            <div>
            <span className="content">
            <div className="container">
            <div className="row">
            <div className="col-lg-12">
            
        <div className="heading"><h2> {mealtypename && mealtypename.name}{secity=="undefined" ?  ` Places in All` :` Places in ${text}`}  </h2></div></div></div>
            
            <div className="row">
            <div className=" col-lg-3 "><span className="filter">
                <div className="filtersresult">
                  <h4>Filters</h4>
                  <label>Select Location</label>
                  
                  <select name="" id="location" onChange={this.handlelocationchange}>
                  <option className="g" >Select Location</option>
                  {location.map((item,index)=>{
                            return <option className="g"  key={index} value={`${item.location_id}-${item.city_id}`} >{item.name}</option>
                        })}
                </select>
                <br/>
                <br/>
                <label>Cuisine</label>
                <input className="finput" type="checkbox" name="cos" id="northindian" onChange={()=>this.handlecusinechange('1')}/><p>North Indian</p><br/>
                <input className="finput" type="checkbox" name="cos" id="southindian" onChange={()=>this.handlecusinechange('2')}/><p>South Indian</p> <br/>
                <input className="finput" type="checkbox" name="cos" id="chinese" onChange={()=>this.handlecusinechange('3')}/><p>Chinese</p> <br/>
                <input className="finput" type="checkbox" name="cos" id="fastfood" onChange={()=>this.handlecusinechange('4')}/><p>Fast Food </p><br/>
                <input className="finput" type="checkbox" name="cos" id="streetfood" onChange={()=>this.handlecusinechange('5')}/><p>Street Food </p><br/>
                
                <br/>   
                <label>Cost For Two</label>
                <input className="finput" type="radio" name="cost" onChange={()=>this.handlecostchange('1','500')} id="verylow"/><p>Less then ₹ 500 </p><br/>
                <input className="finput" type="radio" name="cost" onChange={()=>this.handlecostchange('500','1000')} id="low"/><p>₹ 500 to ₹ 1000 </p><br/>
                <input className="finput" type="radio" name="cost"  onChange={()=>this.handlecostchange('1000','2000')}
                id="medium"/><p>₹ 1000 to ₹ 1500 </p><br/>
                <input className="finput" type="radio" name="cost" onChange={()=>this.handlecostchange('1500','2000')} id="high"/><p>₹ 1500 to ₹ 2000 </p><br/>
                <input className="finput" type="radio" name="cost" onChange={()=>this.handlecostchange('2000','10000')}id="veryhigh"/><p>₹ 2000+ </p><br/>
                <input className="finput" type="radio" name="cost" onChange={()=>this.handlecostchange('1','10000')}id="veryhigh"/><p>All </p><br/><br/>
               
                <h4>Sort</h4>
         
                <input className="finput" type="radio" name="sort" checked={sort == 1}  onChange={()=>this.handlesortchange('1')} /> <p>Price low to high</p> <br/>
                <input className="finput" type="radio" name="sort" checked={sort == -1} onChange={()=>this.handlesortchange('-1')} /> <p>Price high to low </p><br/>
            </div> 
        </span></div>
        <div className="  col-lg-9 "><span className="results">
            {restaurents.length>0 ? restaurents.map((item)=>{
             return <div className="searchresult" onClick={()=>this.handleclick(item._id)}>
                 <span>
                     <div className="row">
                    <div className="col-3 col-sm-3">   <div className="resultimg"><img className="fimg" src={item.thumb[0]} alt=""  /></div></div>
                    <div className="col-9 col-sm-9">  <div className="reultdata">
                 <h4> {item.name}</h4>
                    <h6>{item.locality}</h6>
                         <p>{item.address}</p>
                     </div></div>
                 </div>
                     <hr/>
                     <div className="price">
            <label>CUISINES:</label><p>{item.Cuisine[0].name},{item.Cuisine[1].name}</p><br/>
                     <label>COST FOR TWO:</label><p>{item.cost} </p>
                     </div>
                 </span>
                

             </div>
            }):<div className="nodata">No data Found</div>}
            
            {restaurents.length>0 ? <span className="paginatin">
                    <button className="next">{"<"}</button>
                    {pagecount.map((item)=>{
                    return <button onClick={()=>this.handlepagechange(item)}>{item}</button>
                     } )}
                    <button>{">"}</button>
                </span>:null}
           
               

            </span></div>
        </div></div>
        </span>
        
             </div>
        )
    }
}

export default Filter;