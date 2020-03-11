import React, { Component } from 'react';
import Clients from "../../Stores/Clients";
import "./FormUser.css";
class FormUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nombres: "",
            Primerapellido: "",
            Segundoapellido: "",
            Cédula: "",
            Edad: "",
            Género: "",
            Dirección1: "",
            Dirección2: "",
            Teléfono: "",
            Correoelectrónico: "",
            Estadocivil: "",
            hijos: "",
            Fechadenacimiento: "", clientslength: "",
        }
    }
    Nombres = (event) => {
        this.setState({ Nombres: event.target.value });
    }
    apellido1 = (event) => {
        this.setState({ Primerapellido: event.target.value });
    }
    apellido2 = (event) => {
        this.setState({ Segundoapellido: event.target.value });
    }
    Cédula = (event) => {
        this.setState({ Cédula: event.target.value });
    }
    Edad = (event) => {
        this.setState({ Edad: event.target.value });
    }
    Género = (event) => {
        this.setState({ Género: event.target.value });
    }
    Dirección1 = (event) => {
        this.setState({ Dirección1: event.target.value });
    }
    Dirección2 = (event) => {
        this.setState({ Dirección2: event.target.value });
    }
    Teléfono = (event) => {
        this.setState({ Teléfono: event.target.value });
    }
    Correoelectrónico = (event) => {
        this.setState({ Correoelectrónico: event.target.value });
    }
    Estadocivil = (event) => {
        this.setState({ Estadocivil: event.target.value });
    }
    hijos = (event) => {
        this.setState({ hijos: event.target.value });
    }
    Fechadenacimiento = (event) => {
        this.setState({ Fechadenacimiento: event.target.value });
    }
    registrer() {
        var client = this.state;
        let that = this;


        if (client.Nombres.length > 1 && client.Primerapellido.length > 1 && client.Cédula.length === 11 && client.Dirección1.length > 1 && client.Teléfono.length === 10) {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var request = indexedDB.open('CLIENT_DB', 1);
            request.onsuccess = function (event) {
                // some sample products data

                var db = event.target.result;
                var transaction = db.transaction('clientes', 'readwrite');
                transaction.onsuccess = function (event) {
                    console.log('[Transaction] ALL DONE!');
                };
                var objectStore = transaction.objectStore("clientes");
                var objectStoreRequest = objectStore.getAll();
                objectStoreRequest.onsuccess = function () {
                    var AllClients = objectStoreRequest.result;
                    that.setState({ clientslength: AllClients.length }, function () {

                        var products = [
                            {
                                id: that.state.clientslength + 1,
                                Nombres: client.Nombres,
                                Primerapellido: client.Primerapellido,
                                Segundoapellido: client.Segundoapellido,
                                Cédula: client.Cédula,
                                Edad: client.Edad,
                                Género: client.Género,
                                Dirección1: client.Dirección1,
                                Dirección2: client.Dirección2,
                                Teléfono: client.Teléfono,
                                Correoelectrónico: client.Correoelectrónico,
                                Estadocivil: client.Estadocivil,
                                hijos: client.hijos,
                                Fechadenacimiento: client.Fechadenacimiento,
                            },
                        ];
                        var productsStore = transaction.objectStore('clientes');
                        products.forEach(function (product) {
                            //eslint-disable-next-line
                            var db_op_req = productsStore.add(product);
                            console.log(product)
                            Clients.dispatch({
                                type: 'ADD_CLIENT',
                                clientdata: {
                                    id: product.id,
                                    Nombres: product.Nombres,
                                    Primerapellido: product.Primerapellido,
                                    Segundoapellido: product.Segundoapellido,
                                    Cédula: product.Cédula,
                                    Edad: product.Edad,
                                    Género: product.Género,
                                    Dirección1: product.Dirección1,
                                    Dirección2: product.Dirección2,
                                    Teléfono: product.Teléfono,
                                    Correoelectrónico: product.Correoelectrónico,
                                    Estadocivil: product.Estadocivil,
                                    hijos: product.hijos,
                                    Fechadenacimiento: product.Fechadenacimiento,
                                }

                            });
                        });
                    }
                    )

                }
            };
            this.props.hideregistrer();
            window.location.reload();
        } else {
            alert("Verifique los datos insertados")
        }
        


    }

    render() {
        return (
            <div id="FormUserComponent">
                <div className="FormUserComponent_Container">
                    <div className="FormUser_header">
                        <h2>Añadir cliente</h2>
                        <img alt="close" className="FormUser_close" src={require("../../Assets/close.png")} onClick={this.props.hideregistrer} />

                    </div>
                    <div className="FormUser_body">
                        <div className="FormUser_body_row">
                            <p className="FormUser_Text" >Nombres</p>
                            <input className="FormUser_Input" onChange={this.Nombres} value={this.state.Nombres} required />
                            <p className="FormUser_Text">Primer apellido</p>
                            <input className="FormUser_Input" onChange={this.apellido1} value={this.state.Primerapellido} required />
                            <p className="FormUser_Text">Segundo apellido</p>
                            <input className="FormUser_Input" onChange={this.apellido2} value={this.state.Segundoapellido} />
                            <p className="FormUser_Text" type="text" pattern="[0-9]*" min="11" max="11">Cédula</p>
                            <input className="FormUser_Input" onChange={this.Cédula} value={this.state.Cédula} required />
                            <p className="FormUser_Text" type="text" pattern="[0-9]*">Edad</p>
                            <input className="FormUser_Input" onChange={this.Edad} value={this.state.Edad} />
                            <p className="FormUser_Text">Género</p>
                            <input className="FormUser_Input" onChange={this.Género} value={this.state.Género} />

                        </div>

                        <div className="FormUser_body_row">
                            <p className="FormUser_Text">Dirección</p>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                <input className="FormUser_Input" onChange={this.Dirección1} value={this.state.Dirección1} style={{ marginRight: "2rem" }} required />
                                <input className="FormUser_Input" onChange={this.Dirección2} value={this.state.Dirección2} />

                            </div>
                            <p className="FormUser_Text">Teléfono</p>
                            <input className="FormUser_Input" onChange={this.Teléfono} value={this.state.Teléfono} required />
                            <p className="FormUser_Text">Correo electrónico</p>
                            <input className="FormUser_Input" onChange={this.Correoelectrónico} value={this.state.Correoelectrónico} />
                            <p className="FormUser_Text">Estado civil</p>
                            <input className="FormUser_Input" onChange={this.Estadocivil} value={this.state.Estadocivil} />
                            <p className="FormUser_Text">Hijos?</p>
                            <input className="FormUser_Input" onChange={this.hijos} value={this.state.hijos} />
                            <p className="FormUser_Text">Fecha de nacimiento</p>
                            <input className="FormUser_Input" type="date" onChange={this.Fechadenacimiento} value={this.state.Fechadenacimiento} />

                        </div>



                    </div>

                    <div className="confirmblock">
                        <div onClick={this.props.hideregistrer}>
                            <img src={require("../../Assets/reject.png")} alt="reject" />

                        </div>
                        <div onClick={() => this.registrer()}>
                            <img src={require("../../Assets/confirm.png")} alt="confirm" />

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default FormUser;