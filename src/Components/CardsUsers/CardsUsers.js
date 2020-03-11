import React, { Component } from 'react';
import "./CardsUsers.css"
import RenderIf from "../../RenderIf"
class CardsUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userdata,
            showbigcard: false
        }
        this.hidemodal = this.hidemodal.bind(this)
    }
    showmodal=()=> {
        if (this.state.showbigcard !== true) {
            this.setState({ showbigcard: true })
        }
    }
    hidemodal() {
        if (this.state.showbigcard !== false) {
            this.setState({ showbigcard: false })
        }
    }
    render() {
        return (
            <div>
                {RenderIf(this.state.showbigcard === true, <BigCard data={this.state.user} hider={this.hidemodal}/>)}
                <div className="card" onClick={this.showmodal}>
                    <div className="cardTittle">
                        <img alt="UserIcon" className="card_userIcon" src={require("../../Assets/avatarh.png")} />
                        <p className="card_username">{this.state.user.Nombres} {this.state.user.Primerapellido}</p>

                    </div>
                    <div className="cardBody">
                        <p className="cardBody_Info" style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {this.state.user.Correoelectrónico}<br />
                            {this.state.user.Género}
                        </p>
                        <p className="cardBody_UserID">{this.state.user.id}</p>

                    </div>

                </div>


            </div>
        );
    }
}

class BigCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: this.props.data,
            showbigcard: true
        }
    }
    componentDidMount(){
        console.log(this.state.client);
        
    }
    render() {
        return (
            <div id="FormUserComponent">
                <div className="FormUserComponent_Container">
                    <div className="FormUser_header">
                        <h2>Cliente</h2>
                        <img alt="close" className="FormUser_close" src={require("../../Assets/close.png")} onClick={this.props.hider} />

                    </div>
                    <div className="FormUser_body">
                        <div className="FormUser_body_row">
                            <p className="FormUser_Text" >Nombres</p>
                            <p>{this.state.client.Nombres}</p>
                            <p className="FormUser_Text">Primer apellido</p>
                            <p>{this.state.client.Primerapellido}</p>

                            <p className="FormUser_Text">Segundo apellido</p>
                            <p>{this.state.client.Segundoapellido}</p>
                            <p className="FormUser_Text" type="text">Cédula</p>
                            <p>{this.state.client.Cédula}</p>
                            <p className="FormUser_Text" type="text">Edad</p>
                            <p>{this.state.client.Edad}</p>
                            <p className="FormUser_Text">Género</p>
                            <p>{this.state.client.Género}</p>

                        </div>

                        <div className="FormUser_body_row">
                            <p className="FormUser_Text">Dirección</p>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                <p>{this.state.client.Dirección1}<br/>{this.state.client.Dirección2}</p>

                            </div>
                            <p className="FormUser_Text">Teléfono</p>
                            <p>{this.state.client.Teléfono}</p>
                            <p className="FormUser_Text">Correo electrónico</p>
                            <p>{this.state.client.Correoelectrónico}</p>
                            <p className="FormUser_Text">Estado civil</p>
                            <p>{this.state.client.Estadocivil}</p>
                            <p className="FormUser_Text">Hijos</p>
                            <p>{this.state.client.hijos}</p>
                            <p className="FormUser_Text">Fecha de nacimiento</p>
                            <p>{this.state.client.Fechadenacimiento}</p>

                        </div>



                    </div>


                </div>
            </div>

        );
    }
}


export default CardsUsers;