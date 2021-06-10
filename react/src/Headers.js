import React from 'react';
import './Style/header.css';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Headers extends React.Component {
    constructor() {
        super();
        this.state = {
            signupmodalopen: false,
            FN: '',
            LN: '',
            pw: '',
            email: '',
            loginmodalopen: false,
            isloggedin: false
        }
    }
    signup = () => {
        this.setState({ signupmodalopen: true })
    }
    loginup = () => {
        this.setState({ loginmodalopen: true })
    }
    handleclose = () => {
        this.setState({ signupmodalopen: false })
    }
    handleloginclose = () => {
        this.setState({ loginmodalopen: false })
    }
    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    }
    handlelogin = () => {
        const { email, pw } = this.state;
        const loginobj = {
            email:email,
            password:pw
        }
        axios({
            method: 'POST',
            url: 'https://foodiesshop.herokuapp.com/apirequest/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginobj
        }).then(response => {
            this.setState({ isloggedin: response.data.isauthenticated, pw: '', email: '', loginmodalopen: false });
            sessionStorage.setItem('isLoggedin', response.data.isauthenticated);
            alert(response.data.message);
        }).catch(err=>console.log(err))
    }
    handleSignup = () => {
        const { email, FN, LN, pw } = this.state;
        const signupobj = {
            email:email,
            firstname:FN,
            lastname:LN,
            password:pw
        }
        axios({
            method:'POST',
            url: 'https://foodiesshop.herokuapp.com/apirequest/signup',
            headers: { 'Content-Type': 'application/json' },
            data: signupobj
        }).then(response => {
            if (response.data.message =="User signedup sucessfully") {
                this.setState({
                    signupmodalopen: false, FN: '',
                    LN: '',
                    pw: '',
                    email: ''
                });
                alert("Sign up sucessfully");
            }
            else {
                this.setState({
                    signupmodalopen: false, FN: '',
                    LN: '',
                    pw: '',
                    email: ''
                });
                alert("Sign Up failed");
            }
        }).catch(err=>console.log(err))
    }
    handleReset = () => {
        this.setState({
            FN: '',
            LN: '',
            email: '',
            pw: ''
        })
    }
    render() {
        const { signupmodalopen, FN, LN, email, pw, loginmodalopen } = this.state;
        return (
            <div>
                <nav className="nav">
                    <span className="navleft">
                        <a href={'/'} className="logos">
                            e!
                </a>
                    </span>
                    <span className="navright">
                        <button className="login" onClick={this.loginup}>
                            Login
                </button>
                        <button className="createaccount" onClick={this.signup}>
                            Create a account
                </button>
                    </span>
                </nav>


                <Modal isOpen={signupmodalopen} style={customStyles}>

                    <div >
                        <div className="glyphicon glyphicon-remove lose" onClick={this.handleclose}></div>
                        <h1 className="mm">Sign Up</h1>
                        <p className="mm">Please fill in this form to create an account.</p>
                        <hr />
                        {/* <h1>User Registeration</h1> */}
                        {/* <form onSubmit={this.handleSubmit}> */}
                            <label>First Name : </label>
                            <input type="text" className=" mhinput" value={FN} onChange={(event) => this.handleChange(event, 'FN')} /><br />
                            <label>Last Name : </label>
                            <input type="text" value={LN} className=" mhinput" onChange={(event) => this.handleChange(event, 'LN')}  /><br />
                            <label>Email : </label>
                            <input type="text" value={email} className=" mhinput" onChange={(event) => this.handleChange(event, 'email')}  /><br />
                            <label>Password : </label>
                            <input type="text" value={pw} className=" mhinput" onChange={(event) => this.handleChange(event, 'pw')}/><br />
                            <button className="btn-account" onClick={this.handleSignup}>Sign up</button>
                            <input type="reset" className="btn-account" onClick={this.handleReset} />
                        {/* </form> */}
                    </div>

                </Modal>

                <Modal isOpen={loginmodalopen} style={customStyles}>

                    <div >
                        <div className="glyphicon glyphicon-remove lose" onClick={this.handleloginclose}></div>
                        <h1 className="mm">Login</h1>
                        <hr />
                        {/* <h1>User Registeration</h1> */}
                        {/* <form onSubmit={this.handlelogin}> */}
                            <label>Email </label>
                            <input type="text" className=" mhinput" value={email} onChange={(event) => this.handleChange(event, 'email')} /><br />
                            <label>Password</label>
                            <input type="text" value={pw} className=" mhinput" onChange={(event) => this.handleChange(event, 'pw')} /><br />
                            <input type="submit" className="btn-account" value="Login" onClick={this.handlelogin} />
                            <input type="reset" className="btn-account" onClick={this.handleReset} />
                        {/* </form> */}
                    </div>

                </Modal>

            </div>
        )
    }
}

export default Headers;
