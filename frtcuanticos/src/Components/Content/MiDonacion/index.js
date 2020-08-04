import React, {Component} from 'react';
import Page from '../../Page';
import { getDonacion} from './actions';
//import './donacion.css';


import {
    Card,CardText,CardBody,CardTitle,CardSubtitle,Button,Container,Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav,NavItem, NavLink
} from 'reactstrap';

import {Redirect} from 'react-router-dom';


export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: false,
            tab: "1",
            existe_donacion: true

        }
    }
    onClickButtonSalir(e) {
        this.setState({redirectTo: true})
    }
    onClickButtonPagar(e) {
    
    }
    
    async componentDidMount()
    {
        try
        {
            let existe_donacion = await getDonacion(id);
            const id = this.props.match.params.id;
            this.setState({...this.state, existe_donacion: existe_donacion});
            console.log(existe_donacion); 
        }
        catch(err)
        {
            console.log(err);
        }
    }

    render() {
        if (this.state.redirectTo) {
            return (
                <Redirect to={'/'}/>
            )
        }

        return (
            <div>
                <Container>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                        <Page showHeader={true} showFooter={true} title="Resumen de Donaciones " auth={this.props.auth}>
                            <Card >
                            
                                
                            

                                {this.state.existe_donacion?
                                <CardBody>
                                    <Card body className="main">
                                        
                                    <p  class="font-weight-bold"  >  <CardSubtitle  >Canastas Predeterminadas</ CardSubtitle > </p>  
                                   
                                        <Form>
                                            <FormGroup row>
                                                <Label for="nombre"
                                                    sm={1}>
                                                    Kit Salud</Label>
                                                <Col sm={1}>
                                                    <Input type="number" name="nombre" id="nombre" placeholder="1"/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="nombre"
                                                    sm={1}>
                                                    Kit Higiene Personal</Label>
                                                <Col sm={1}>
                                                    <Input type="number" name="nombre" id="nombre" placeholder="1"/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="nombre"
                                                    sm={1}>
                                                    Otros Kit</Label>
                                                <Col sm={1}>
                                                    <Input type="number" name="nombre" id="nombre" placeholder="1"/>
                                                </Col>
                                            </FormGroup>
                                           
                                        </Form>
                                        <CardSubtitle>Metodos de Pago</CardSubtitle>

                        <Nav tabs>

                        <NavItem>
                        <NavLink onClick={() => { this.setState({tab:"1"})}}>PayPal</NavLink>
                        </NavItem>
                        <NavItem>
                           <NavLink onClick={() => { this.setState({tab:"2"})}}>two</NavLink>
                          </NavItem>
                          <NavItem>
                          <NavLink onClick={() => { this.setState({tab:"3"})}}>three</NavLink>
                           </NavItem>
                               


                            </Nav>
                            <TabContent activeTab={this.state.tab}>
                          <TabPane tabId="1">
                            Paypal
                          </TabPane>
                           <TabPane tabId="2">
                            

                           </TabPane>
                             <TabPane tabId="3">
                                

                            </TabPane>

                            </TabContent>


                                </Card>
                                </CardBody>
                                :
                                <div>
                                    <Card  body className="text-center">
                                        <CardBody>
                                            <CardSubtitle>
                                            
                                            No hay Donaciones Vigentes
                                        

                                            </CardSubtitle>

                                        </CardBody>

                                    </Card>
    
                                </div>}

                                
                            </Card>
                            <Button onClick={()=>this.onClickButtonSalir()} outline color="info">Regresar</Button>
                         {this.state.existe_donacion ?
                         <Button onClick={()=>this.onClickButtonPagar()} outline color="success" href = "https://paypal.me/Donaciones750204 ">Pagar</Button>:console.log("no hay facutra")}
                         </Page>
                        </Col>
                       
                    </Row>
                    <br/>
                    <br/>


                </Container>
            </div>
        )
    }
}