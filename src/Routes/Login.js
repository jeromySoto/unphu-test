import React, { Component } from 'react';
import "./Login.css";
import RenderIf from "../RenderIf";
import { createStore } from 'redux'

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_ADMIN':
            return state.concat([action.userdata])
        default:
            return state
    }
}

const users = createStore(todos, [])


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Login: true,
            LoginActive: "Login_section_selector_btn--active",
            RegistrerActive: "Login_section_selector_btn",
        }
    }
    showlogin() {
        if (this.state.Login !== true) {
            this.setState({
                Login: true,
                LoginActive: "Login_section_selector_btn--active",
                RegistrerActive: "Login_section_selector_btn"
            })
        }
    }
    showregistrer() {
        if (this.state.Login !== false) {
            this.setState({
                Login: false,
                LoginActive: "Login_section_selector_btn",
                RegistrerActive: "Login_section_selector_btn--active"
            })
        }

    }
    componentDidMount() {

        users.dispatch({
            type: 'ADD_ADMIN',
            userdata: {
                "user": "ADMIN",
                "password": "ADMIN"
            }

        })
    }
    render() {
        return (
            <div className="Login_Main_container">
                <div id="Login_Form_Container">
                    <div id="Login_section_selector">
                        <div className={this.state.LoginActive} onClick={() => this.showlogin()}>
                            <p>Acceder</p>
                        </div>
                        <div className={this.state.RegistrerActive} onClick={() => this.showregistrer()}>
                            <p>Registrarse</p>
                        </div>
                    </div>
                    {RenderIf(this.state.Login === true, <FormLogin />)}
                    {RenderIf(this.state.Login === false, <FormRegistrer />)}
                </div>
                <div style={{display: "flex", width: "60%", padding: "1rem",}}>
                    <img src={this.state.Login ? require("../Assets/Rectangle.png") : require("../Assets/ilustration.png")} style={{width: "100%", height: "auto"}} alt="art"/>
                </div>
            </div>
        );
    }
}


class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
        }
    }
    userhandle = (event) => {
        this.setState({ user: event.target.value });
    }
    passwordhandle = (event) => {
        this.setState({ password: event.target.value });
    }
    login = () => {
        var user = this.state.user
        var password = this.state.password
        var listadeadministradores = users.getState();
        for (let x = 0; x < listadeadministradores.length; x++) {
            var listauser = listadeadministradores[x].user;
            var listapassword = listadeadministradores[x].password;
            if (user === listauser || password === listapassword) {
                localStorage.setItem('loged', true);
                window.location.href = "/dashboard"
            } else {
                alert("Verifique sus datos");
            }

        }


    }
    render() {
        return (
            <div id="Form_login">
                <p>Usuario</p>
                <input onChange={this.userhandle} value={this.state.user} />
                <p>Contraseña</p>
                <input onChange={this.passwordhandle} value={this.state.password} type="password" />
                <button onClick={this.login}>Entrar</button>
            </div>
        );
    }
}
class FormRegistrer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
        }
    }

    userhandle = (event) => {
        this.setState({ user: event.target.value });
    }
    passwordhandle = (event) => {
        this.setState({ password: event.target.value });
    }
    registrer = () => {

        users.dispatch({
            type: 'ADD_ADMIN',
            userdata: {
                "user": this.state.user,
                "password": this.state.password
            }

        });
        localStorage.setItem('loged', true);
        window.location.href = "./dashboard";

    }
    render() {
        return (
            <div id="Form_login">
                <p>Usuario</p>
                <input onChange={this.userhandle} value={this.state.value} />
                <p>Contraseña</p>
                <input onChange={this.passwordhandle} value={this.state.value} type="password" />
                <div id="FormRegistrer_EnterBlock">
                    <button onClick={this.registrer}>Entrar</button>

                </div>
            </div>
        );
    }
}

export default Login;