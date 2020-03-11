import React, { Component } from 'react';
import "./Dashboard.css";
import CardsUsers from "../Components/CardsUsers/CardsUsers";
import FormUser from "../Components/FormUser/FormUser";
import RenderIf from "../RenderIf";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            registrer: false,
            clients: [],
            showAll: false,
            init: 0,
            finish: 3
        }
        this.hideregistrer = this.hideregistrer.bind(this);
        this.showregistrer = this.showregistrer.bind(this);
        this.hidemenu = this.hidemenu.bind(this);
        this.showAll = this.showAll.bind(this);
    }
    showmenu() {
        if (this.state.menu !== true) {
            this.setState({ menu: true })
        }
    }
    hidemenu() {
        if (this.state.menu !== false) {
            this.setState({ menu: false })
        }
    }
    showregistrer() {
        if (this.state.registrer !== true) {
            this.setState({ registrer: true })
        }
    }
    hideregistrer() {
        if (this.state.registrer !== false) {
            this.setState({ registrer: false })
        }
    }
    showAll() {
        this.setState({ showAll: !this.state.showAll })
    }
    leave() {
        localStorage.setItem('loged', false);
        window.location.href = "/";
    }
    next = () => {
        this.setState({
            init: this.state.init + 4,
            finish: this.state.finish + 4,
        })
    }
    prev = () => {
        this.setState({
            init: this.state.init - 4,
            finish: this.state.finish - 4,
        })
    }
    componentDidMount() {
        var that = this;
        var loged = localStorage.getItem('loged');
        if (loged === "true") {
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var request = indexedDB.open('CLIENT_DB', 1);
            request.onsuccess = function (event) {
                var db = event.target.result;
                var transaction = db.transaction('clientes', 'readwrite');
                // create an object store on the transaction
                var objectStore = transaction.objectStore("clientes");

                // Make a request to get a record by key from the object store
                var objectStoreRequest = objectStore.getAll();
                objectStoreRequest.onsuccess = function () {
                    var AllClients = objectStoreRequest.result;
                    that.setState({ clients: AllClients })

                }
            }
        }
        if (loged === "false") {
            window.location.href = "/";

        }
    }
    render() {
        return (
            <div className="Dashboard">
                {RenderIf(this.state.registrer === true, <FormUser hideregistrer={this.hideregistrer} />)}
                {RenderIf(this.state.menu === true,
                    <MenuActive
                        hidemenu={this.hidemenu}
                        showregistrer={this.showregistrer}
                        showAll={this.showAll}
                        leave={this.leave}

                    />
                )}
                {RenderIf(this.state.menu === false,
                    <div className="Dashboard_menu_switch" onClick={() => this.showmenu()}>
                        <img src={require("../Assets/more.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--list" >

                        </img>

                    </div>
                )}
                <div id="MainContainer">
                    <h1>Bienvenido</h1>
                    <h2>
                        {this.state.showAll ? 'Todos los contactos.' : 'Contactos añadidos recientemente.'}
                    </h2>
                    
                    <div id="listContainer">
                            {/* eslint-disable-next-line */}
                            {this.state.clients.map((item, i) => {
                                
                                if (this.state.showAll === true) {
                                    
                                    for (let x = this.state.init; x < this.state.finish; x++) {
                                        return (
                                            <CardsUsers
                                                key={i}
                                                userdata={item}
                                            />
                                        )
                                    } 
                                   

                                } else {
                                    
                                    if(i < 4){
                                        return (
                                            <CardsUsers
                                                key={i}
                                                userdata={item}
                                            />
                                        )
                                    }
                                }
                            })}


                        </div>

                  {/*   <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div className="PaginationBtn" onClick={this.prev}>
                            <img src={require("../Assets/previus.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--shrink" />
                        </div>

                        <div className="PaginationBtn" onClick={this.next}>
                            <img src={require("../Assets/next.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--shrink" />
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}



class MenuActive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registrer: false,
        }
    }
    render() {
        return (

            <div className="Dashboard_menu--active">
                <div className="Dashboard_menu_btn" id="menu_btn_shrink" onClick={this.props.hidemenu}>
                    <img src={require("../Assets/less.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--shrink" />

                </div>
                <div className="Dashboard_menu_btn" id="menu_btn_addUser" onClick={this.props.showregistrer}>
                    <img src={require("../Assets/adduser.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--addUser" />
                </div>
                <div className="Dashboard_menu_btn" id="menu_btn_list" onClick={this.props.showAll}>
                    <img src={require("../Assets/list.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--list" />
                </div>
                <div className="Dashboard_menu_btn" id="menu_btn_exit" onClick={this.props.leave}>
                    <img src={require("../Assets/exit.png")} className="Dashboard_menu_btn_icon" alt="Menu_icon--exit" />
                </div>
            </div>

        );
    }
}
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var request = indexedDB.open('CLIENT_DB', 1);
request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var store = db.createObjectStore('clientes', { keyPath: 'id', unique: true });
    store.createIndex("Nombres", "Nombres", { unique: false });
    store.createIndex("Primer_Apellido", "Primer_Apellido", { unique: false });
    store.createIndex("Segundo_Apellido", "Segundo_Apellido", { unique: false });
    store.createIndex("Cedula", "Cedula", { unique: true });
    store.createIndex("Edad", "Edad", { unique: false });
    store.createIndex("Genero", "Genero", { unique: false });
    store.createIndex("Dirección1", "Dirección1", { unique: false });
    store.createIndex("Dirección2", "Dirección2", { unique: false });
    store.createIndex("Teléfono", "Teléfono", { unique: false });
    store.createIndex("Correoelectrónico", "Correoelectrónico", { unique: false });
    store.createIndex("Estadocivil", "Estadocivil", { unique: false });
    store.createIndex("hijos", "hijos", { unique: false });
    store.createIndex("Fechadenacimiento", "Fechadenacimiento", { unique: false });
};
request.onsuccess = function (event) {
    var client = [
        {
            id: 1,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678901",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
        {
            id: 2,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678902",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
        {
            id: 3,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678903",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
        {
            id: 4,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678904",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
        {
            id: 5,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678905",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
        {
            id: 6,
            Nombres: "jeromy",
            Primerapellido: "soto",
            Segundoapellido: "baez",
            Cédula: "12345678906",
            Edad: "20",
            Género: "masculino",
            Dirección1: "StoreOfClients.Dirección1",
            Dirección2: "StoreOfClients.Dirección2",
            Teléfono: "8095543232",
            Correoelectrónico: "StoreOfClients.Correoelectrónico",
            Estadocivil: "soltero",
            hijos: "0",
            Fechadenacimiento: "05/12/199",
        },
    ];
    // get database from event
    var db = event.target.result;
    // create transaction from database
    var transaction = db.transaction('clientes', 'readwrite');
    // add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onsuccess = function (event) {
    };
    // get store from transaction
    // returns IDBObjectStore instance
    var productsStore = transaction.objectStore('clientes');
    // put products data in productsStore
    client.forEach(function (client) {
        //eslint-disable-next-line
        var db_op_req = productsStore.add(client);

    });

};
export default Dashboard;