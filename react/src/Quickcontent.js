import React from 'react';
import './Style/home.css';
import {withRouter} from 'react-router'

class Quickcontent extends React.Component {
    handleclick=(id)=>{
        const area=sessionStorage.getItem('area');
        const city=sessionStorage.getItem('city');
        this.props.history.push(`/filter/?mealtype_id=${id}&area=${area}&city=${city}`,);
        
    }
    render() {
        const {mealtypes}=this.props;
        return (
            <div>
                <div className="hheading"><h1>Quick Searches</h1></div>
                <div className="hheading2"><h4>Discover restaurants by type of meal</h4></div>
                <div className="hcontent">
                    <div className="container">
                        <div className="row">
                            {mealtypes.map((item)=>{
                                
                                return <div className="col-sm-9 col-md-6 col-lg-4" onClick={()=>this.handleclick(item._id)}>
                                <div className="itembox" >
                                    <div className="itemimage">
                                        <img src={require('./'+item.image)} alt="" width="160px" height="160px" />
                                    </div>
                                    <div className="itemdetails">
                            <h4>{item.name}</h4>
                                        <h6>{item.content}</h6>
                                    </div>
                                </div>
                            </div>
                            })}
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Quickcontent);