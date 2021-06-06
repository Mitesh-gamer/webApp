import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import Headers from './Headers';

const Router=()=>{
    return(
        <BrowserRouter>
            <Headers />
            <Route exact path="/" component={Home}/>
            <Route path="/filter" component={Filter}/>
            <Route path="/details" component={Details}/>
        </BrowserRouter>

    )
}
export default Router;