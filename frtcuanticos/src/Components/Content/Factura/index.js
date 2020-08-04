import React, {Component} from 'react';
import Page from '../../Page';
import { getFactura} from './actions';

// Ejecute este comando en la consola ( npm install --save-dev reactstrap bootstrap) para que salga el disenio

import {
    Card,CardText, CardBody, CardTitle, CardSubtitle,Button,Container,Row,Col,Form,FormGroup,Label,Input,Table
} from 'reactstrap';

import {Redirect} from 'react-router-dom';


export default class extends Component {
    constructor() {
        super();
        this.state = {
           factura:[],
           loading: true,
           
          
    }}
    onClickButtonSalir(e) {
        this.setState({redirectTo:true})
       }

    async componentDidMount()
       {
           try
           {
               const id = this.props.match.params.id;
               const  met_pago = this.props.match.params.met_pago
               let factura = await getFactura(id, met_pago);
               this.setState({...this.state, factura: factura}); 
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
                       
                        <Page showHeader={true} showFooter={true} title="Factura " auth={this.props.auth}>
                            <Card body className="text-center">
                            
                                <Row>
                                    <Col lg="12">
                                    <CardTitle >Informacion Donante</CardTitle> 
                                    </Col>
                                    <Col lg="12">
                                        <img width="15%" src="https://image.flaticon.com/icons/svg/2444/2444522.svg" alt="Donante"/>
                                    </Col>
                                </Row>
                                <CardBody>
                                    <Card body className="text-center">
                                        <Form>
                                            <FormGroup row>
                                                <Label for="nombre"
                                                    sm={2}>Nombre Completo</Label>
                                                <Col sm={2}>
                                                    <Input type="nombre" name= "nombre" id= "nombre" placeholder=""  />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail"
                                                    sm={2}>Correo Electronico</Label>
                                                <Col sm={2}>
                                                    <Input type="email" name="email" id="email" placeholder="" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail"
                                                    sm={2}>Metodo de Pago</Label>
                                                <Col sm={2}>
                                                    <Input type="text" name="metododepago" id="metododepago" placeholder=""/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="extra"
                                                    sm={2}>Datos Adicionales</Label>
                                                <Col sm={2}>
                                                    <Input type="textarea" name="extra" id="extra" placeholder=""/>
                                                </Col>
                                            </FormGroup>
                                        </Form>

                                    </Card>
                                </CardBody>
                                <p  class="font-weight-bold"   >    <CardSubtitle>Comprobante de Pago de Donacion</CardSubtitle> </p>
                          
                                <Table  striped bordered hover size= 'sm'>
                                    <thead>
                                        <tr>
                                            <th>Detalle</th>
                                            <th>Cantidad</th>
                                            <th>Valor</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>Kit de Salud</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>

                                            <td>Kit de Higiene Personal</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>

                                        <td>Otros Kit</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        </tr>
                                        <tr>

                                            <td>Total</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <Button onClick={()=>this.onClickButtonSalir()} outline color="info">Salir</Button>
                                
                            </Card>
                      
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
