import React from 'react';
import './Style/details.css'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '5'
    }
};
class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurents: {},
            itemmodalopen: false,
            detailmodelopen: false,
            paymentmodel: false,
            N: '',
            MN: '',
            adr: '',
            restaurentid:[],
            items:[],
            show:[],
            subtotal:0
        }
    }
    componentDidMount() {
        const restaurentid = this.props.location.pathname.split('/')[2];
        axios({
            method: 'GET',
            url: 'https://foodiesshop.herokuapp.com/apirequest/restaurantbyid/' + restaurentid,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => this.setState({ restaurents: response.data.restaurent[0] ,restaurentid:restaurentid})).catch(err => console.log(err));
    }
    handlefooditem = () => {
        const {restaurentid} = this.state;
        this.setState({ itemmodalopen: true })
        axios({
            method: 'GET',
            url: 'https://foodiesshop.herokuapp.com/apirequest/itemslist/'+ restaurentid,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => this.setState({ items: response.data.response })).catch(err => console.log(err));
    }
    handleadd=(item)=>{

        var {items,subtotal}=this.state;
        const e=items.findIndex((obj=>obj.name==item));
        items[e].qty=items[e].qty+1;
        subtotal=Number(subtotal)+Number(items[e].cost);
           this.setState({items:items,subtotal:subtotal})   
        // const costd=Number(cost);
        // this.setState({x:x+costd})
    }
    handlesub=(item)=>{
        var {items,show,subtotal}=this.state;
        const e=items.findIndex((obj=>obj.name==item));
        if(items[e].qty>=1){
        items[e].qty=items[e].qty-1;
        subtotal=subtotal-items[e].cost
           this.setState({items:items,subtotal:subtotal})}
           if(items[e].qty==0){           
               show[e]=0;
               items[e].qty=1;
            this.setState({items:items,show:show,subtotal:subtotal}) 
           }
    }
     additem=(item)=>{
        var {items,show,subtotal}=this.state;
        const e=items.findIndex((obj=>obj.name==item));
        show[e]=1;
        subtotal=subtotal+items[e].qty*items[e].cost
         this.setState({show:show,subtotal:subtotal})
     }
    handlefooditemclose = () => {
        this.setState({ itemmodalopen: false,subtotal:0 ,show:[]})
    }
    handledetailsmodel = () => {
        this.setState({ detailmodelopen: true })
    }
    handledetailsmodeclose = () => {
        this.setState({ detailmodelopen: false })
    }
    handlepaymentmodel = () => {
        this.setState({ paymentmodel: true })
    }
    handlepaymentclose = () => {
        this.setState({ paymentmodel: false ,detailmodelopen: false})
    }
    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    }
   putshow(){
       var {show,items}=this.state;
       if(show.length<items.length)
       {show.push(0);
       this.setState({show:show})}
       else{return null}
   }
    render() {
        const { restaurents, paymentmodel, itemmodalopen, detailmodelopen, N, MN, adr,items,show,subtotal } = this.state;
        var x=0;
        return (
            <div>
                {restaurents != null ? <div>    <div>
                    {/* <Carousel showThumbs={false} showArrows={false} > */}

                    <div><img alt="" src={restaurents && restaurents.thumb && restaurents.thumb[0]} style={{ width: '90%', margin: 'auto', marginInlineStart: '4%', marginInlineEnd: '4%', height: '555px', objectFit: 'cover', position: 'relative' }} /></div>

                    {/* </Carousel> */}
                    <button className="cdbutton" >Click to see Image Gallery</button>
                </div>
                    <div className="dheading">{restaurents.name}</div>
                    <button className="btn-account" style={{ float: "right", marginRight: "10%", fontSize: "18px", width: "160px" }} onClick={this.handlefooditem} >Place Online Order</button>
                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-1">Overview</label>

                            <div className="dcontent">
                                <div className="about">About this place</div>
                                <div className="head">Cuisine</div>
                                {restaurents && restaurents.Cuisine && restaurents.Cuisine.map((item) => {
                                    return <div className="value">{item.name}</div>
                                })}
                                <div className="head">Average Cost</div>
                                <div className="value">₹ {restaurents.cost}for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div className="dcontent">
                                <div className="head">Phone Number</div>
                                <div className="value">{restaurents.contact_number}</div>
                                <div className="head">{restaurents.name}</div>
                                <div className="value">{restaurents.address}</div>
                            </div>
                        </div>

                        <Modal isOpen={itemmodalopen} style={customStyles}>

                            <div >
                                <div className="glyphicon glyphicon-remove lose" onClick={this.handlefooditemclose}></div>
                                <h3 className="mm">{restaurents.name}</h3>
                                {items.map((item)=>{
                                     return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                     <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                         <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                             <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                 <span className="card-body">
                                                     <h5 className="card-title">{item.name}</h5>
                                                     <h5 className="card-title">{item.cost}</h5>
                                                     <p className="card-text">{item.description}</p>
                                                 </span>
                                             </div>
                                             {this.putshow()}
                                             
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center" src={item.thumb} alt="" style={{ height: '100px', width: '100px', margin: 'auto', marginInlineStart: '-13%', marginInlineEnd: '4%', objectFit: 'cover', position: 'relative' ,zIndex:'-1'}} />
                                            
                                            {
                                            show[x++]==0 ?<button className="itembutton" onClick={()=>this.additem(item.name)}>ADD</button>:<div className="itemaddsub" >
        <button  className="itemco" onClick={()=>this.handlesub(item.name)}>-</button>
        {item.qty}
        <button className="itemco" onClick={()=>this.handleadd(item.name)}>+</button>
    </div>} 
                                              
                                             
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                })}
                                <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>
                                    <div className="row">
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" style={{paddingLeft:'26px'}}><h5>Subtotal</h5></div>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><h5>₹{subtotal}</h5></div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"><button className="btn-account" style={{marginLeft: '30px'}} onClick={this.handledetailsmodel}>Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <Modal isOpen={detailmodelopen} style={customStyles}>

                            <div >
                                <div className="glyphicon glyphicon-remove lose" onClick={this.handledetailsmodeclose}></div>
                                <h3 className="mm">{restaurents.name}</h3>

                                <hr />
                                {/* <h1>User Registeration</h1> */}
                                {/* <form onSubmit={this.handleSubmit}> */}
                                <label>Name : </label>
                                <input type="text" className=" mhinput" value={N} onChange={(event) => this.handleChange(event, 'N')} /><br />
                                <label>Mobile No: </label>
                                <input type="text" value={MN} className=" mhinput" onChange={(event) => this.handleChange(event, 'MN')} /><br />
                                <label>Address : </label>
                                <textarea rows="10" cols="22" style={{ height: '80px' }} value={adr} className=" mhinput" onChange={(event) => this.handleChange(event, 'adr')} /><br />

                                <button className="btn-account" style={{ float: 'right' }} onClick={this.handlepaymentmodel}>PROCEED</button>
                                {/* </form> */}
                            </div>
                        </Modal>

                        <Modal isOpen={paymentmodel} style={customStyles}>
                                
                             
                                <div className="glyphicon glyphicon-remove lose" onClick={this.handlepaymentclose}></div>
                                <h3 className="mm">Add payment method</h3>
                                <h5 className="mm">Add new card</h5>
                                <hr />
                                <div className='row'  style={{ width: '100%'}}>
                                <div className=' col-sm-4 col-md-4 col-lg-4' >
                                <ul class="list-group">
          <li class="list-group-item">Credit/Debit Cards</li>
          <li class="list-group-item">Wallets</li>
          <li class="list-group-item">UPI</li>
          <li class="list-group-item">Credit</li>
          <li class="list-group-item">Netbanking</li>
          <li class="list-group-item">Food Cards</li>

        </ul>
                                </div>
                                <div className=' col-sm-8 col-md-8 col-lg-8' >
                                <div>
                                    <input type="text" className=" pmhinput" style={{ width: '95%', margin: '0px' }} value={N} onChange={(event) => this.handleChange(event, 'N')} placeholder="Card Number" />
                                </div>
                                <span>
                                    <input type="text" value={MN} className=" pmhinput" style={{ width: '47.5%', margin: '0px' }} onChange={(event) => this.handleChange(event, 'MN')} placeholder="Valid through(MM/YY)" />
                                    <input type="text" value={MN} className=" pmhinput" style={{ width: '47.5%', margin: '0px' }} onChange={(event) => this.handleChange(event, 'MN')} placeholder="CVV" />
                                </span>
                                <div>
                                    <input type="text" value={MN} className=" pmhinput" style={{ width: '95%', margin: '0px' }} onChange={(event) => this.handleChange(event, 'MN')} placeholder="Name on card" />
                                </div>    <br />
                               
                                <button className="btn-account" style={{ width: '95%', margin: '0px' }} onClick={this.handlepaymentclose}>₹{subtotal}</button>
                                </div>
                                {/* </form> */}
                            </div>
                        </Modal>


                    </div></div> : null}



            </div>
        )
    }
}

export default Details;
