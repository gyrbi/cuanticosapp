
import Page from '../../Page';
//import { getDonacion} from './actions';
import React, {Component} from 'react'
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Container,
    Row,
    Col,
    CardImg
} from 'reactstrap';

import {Redirect, NavLink} from 'react-router-dom';

export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipocuenta: true
        };

    }

    // async componentDidMount() {
    //     try {
    //         let apiReturns = await getall();
    //         this.setState({tipocuenta: apiReturns.data});
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    render() {

        if (this.props.auth.tipoCuenta == "Donante")
        {
        return (
            <Page showHeader={true} showFooter={true} title="Cuánticos App" auth={this.props.auth}>

            <div>
                <Container>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            <Card body className="text-center">

                                <CardBody>
                                    <CardSubtitle>
                                    <img width="10%" src="https://image.flaticon.com/icons/svg/3082/3082029.svg" alt="Canasta"/>
                                    <br/>
                                    <br/>

                                    
                                        <NavLink to="/armaTuCanasta">
                                            Arma tu Canasta</NavLink>
                                    </CardSubtitle>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            <Card body className="text-center">

                                <CardBody>
                                <img width="10%" src="https://image.flaticon.com/icons/svg/1057/1057418.svg" alt="Canasta"/>
                                    <br/>
                                    <br/>
                                    <CardSubtitle>
                                        <NavLink to="/canastaPredt">
                                            Elije una Canasta Predeterminado</NavLink>
                                    </CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                    <br/> {/* esta en una condicion if revisa el estado de esa variable, si le retorna true imprimi el component si es false solo hace un br en al line */}
                    {
  
                    <Row>
                        <Col>
                            <Card body className="text-center">

                                <CardBody>
                                <img width="10%" src="https://image.flaticon.com/icons/svg/2904/2904921.svg" alt="Canasta"/>
                                    <br/>
                                    <br/>
                                    <CardSubtitle>
                                            <NavLink to="/otrasDonaciones">
                                            Otras Donaciones</NavLink>
                                    </CardSubtitle>

                                </CardBody>
                            </Card>
                        </Col>
                        <br/>
                        <br/>
                    </Row>
                }
                    <br/>
                    <br/>
                    {/* <Row>
                        <Col>
                            <Card body className="text-center">

                                <CardBody>
                                    <img width="10%" src="https://image.flaticon.com/icons/svg/3039/3039826.svg" alt="Canasta"/>
                                    <br/>
                                    <br/>
                                                                        <CardSubtitle>
                                        <NavLink to="/voluntariado">
                                            Voluntariado
                                        </NavLink>
                                    </CardSubtitle>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row> */}
                </Container>
            </div>
            </Page>
        )
        }//fi if
        else
        {
            return (
                <Page showHeader={true} showFooter={true} title="Cuánticos App" auth={this.props.auth}>

                    <div>
                        <Container>
                            <br />
                            <br />
                            <Row>
                                <Col>
                                    <Card body className="text-center">

                                        <CardBody>
                                            <CardSubtitle>
                                                <img width="10%" src="https://image.flaticon.com/icons/svg/3082/3082029.svg" alt="Canasta" />
                                                <br />
                                                <br />


                                                <NavLink to="/armaTuCanasta">
                                                    Arma tu Canasta</NavLink>
                                            </CardSubtitle>


                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <br />
                            <br />
                            <Row>
                                <Col>
                                    <Card body className="text-center">

                                        <CardBody>
                                            <img width="10%" src="https://image.flaticon.com/icons/svg/1057/1057418.svg" alt="Canasta" />
                                            <br />
                                            <br />
                                            <CardSubtitle>
                                                <NavLink to="/canastaPredt">
                                                    Elije una Canasta Predeterminado</NavLink>
                                            </CardSubtitle>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Page>
            )
        }
    }
}