import React, { Component } from 'react';
import Page from '../../Page';
import { getDonacion } from './actions';

//import './papier.css';
//import './miDonacion.css';


import { Redirect } from 'react-router-dom';

let cont = 0, i=0;
let Item;
let prods = [];
let tipo_donacion = "";
let total = 0;

export default class extends Component {
    constructor() {
        super();

        this.state = {
            redirectTo: false,
            donacion: []
        }
    }

    onClickButtonSalir(e) {
        this.setState({ redirectTo: true })
    }

    onClickButtonPagar(e) {

    }

    async componentDidMount() 
    {
        try 
        {
            let donacion = await getDonacion(this.props.auth.id);
            tipo_donacion = donacion.tipo_donacion;
            total = donacion.total;

            for (let i = 0; i < donacion.productos.length; i++)
            {
                console.log("ENTRO FOR CREAR prods Array");
                prods.push([donacion.productos[i].id_producto, donacion.productos[i].descripcion, donacion.productos[i].cantidad, donacion.productos[i].precio, donacion.productos[i].subtotal]);
                // prods.push([donacion.productos[i].id_producto]);
                // prods.push([donacion.productos[i].descripcion]);
                // prods.push([donacion.productos[i].cantidad]);
                // prods.push([donacion.productos[i].precio]);
                // prods.push([donacion.productos[i].subtotal]);
                console.log("1P DESC: "+prods[0][1]);
            }

            //donacion = JSON.parse(donacion);

            //let newd = JSON.parse(donacion);

            //console.log(newd.productos);

            console.log(total);
            console.log(prods);

        }
        catch (err) {
            console.log(err);
        }
    }

    render()
     {
        return (
                <Page showHeader={true} showFooter={true} title="Resumen de Donaciones" auth={this.props.auth}>
                    <h2>No Disponible</h2>
                </Page>
            );

        // if (prods) 
        // {
        //     return (
        //         <Redirect to={'/'} />
        //     )
        // }

        //if (prods.length != 0) 
        //{



            //             return (
            //                 Item = () => 
            //         {
            //             for (i = 0; i < prods.length; i++) 
            //             {
            //                 return(
            //                 <section className="row">
            //                     <section className="col-12 col-md-8 col-offset-2">
            //                         <table className="full-width ">
            //                             <thead>
            //                                 <tr>
            //                                     <th>Linea</th>
            //                                     <th>Producto</th>
            //                                     <th>Cantidad</th>
            //                                     <th>Precio Unitario</th>
            //                                     <th>Total</th>
            //                                     <th>&nbsp;</th>
            //                                 </tr>
            //                             </thead>

            //                             <tbody className="zebra">
            //                                 <tr>
            //                                     <td>{cont + 1}</td>
            //                                     <td>{prods[0][1]}</td>
            //                                     <td className="right">{prods[0][2]}</td>
            //                                     <td className="right">{prods[0][3]}</td>
            //                                     <td className="right">{prods[0][4]}</td>
            //                                     <td className="center ">
            //                                         <a className="btn s-padding mdftocart"><span className="iconify" data-icon="el:minus" data-inline="false"></span></a>
            //                                     &nbsp;
            //                                     <a href="" className="btn s-padding mdftocart"><span className="iconify" data-icon="el:plus" data-inline="false"></span></a>
            //                                     </td>
            //                                 </tr>
            //                             </tbody>
            //                         </table>
            //                     </section>
            //                 </section>
            //                 )
            //             }
            //         }
            //     );
            //         //}
            // }


            // console.log("ENTRO IF");
            // Item = prods.map((d) => {
            //     //let productos = d.productos;
            //     //productos = productos.map((p)=>{
            //         return (
            //             <section class="row" key={d.id_producto}>
            //                 <section class="col-12 col-md-8 col-offset-2">
            //                     <table class="full-width ">
            //                         <thead>
            //                             <tr>
            //                                 <th>Linea</th>
            //                                 <th>Producto</th>
            //                                 <th>Cantidad</th>
            //                                 <th>Precio Unitario</th>
            //                                 <th>Total</th>
            //                                 <th>&nbsp;</th>
            //                             </tr>
            //                         </thead>

            //                         <tbody class="zebra">
            //                             <tr>
            //                                 <td>{cont + 1}</td>
            //                                 <td>{d.descripcion}</td>
            //                                 <td class="right">{d.cantidad}</td>
            //                                 <td class="right">{d.precio}</td>
            //                                 <td class="right">{d.subtotal}</td>
            //                                 <td class="center ">
            //                                 <a class="btn s-padding mdftocart"><span class="iconify" data-icon="el:minus" data-inline="false"></span></a>
            //                                  &nbsp;
            //                                 <a href="" class="btn s-padding mdftocart"><span class="iconify" data-icon="el:plus" data-inline="false"></span></a>
            //                                 </td>
            //                             </tr>
            //                         </tbody>

            //                         <tfooter>
            //                             <tr>
            //                                 <td colSpan="2" class="center">
            //                                     <a class="btn m-padding bg-red center rmvcart" href="index.php?page=rmvAllCart"> <span class="ion-trash-b s4"></span> &nbsp;Cancelar </a>
            //                                 </td>
            //                                 <td class="right">{d.total}</td>
            //                                 <td class="pay">
            //                                     <a href="index.php?page=checkout" class="btn btn-primary m-padding bg-green"><span class="iconify" data-icon="fa-solid:cash-register"></span>&nbsp;Pagar</a>
            //                                 </td>
            //                             </tr>
            //                         </tfooter>
            //                     </table>
            //                 </section>
            //             </section>
            //         );
            //     //});

            // });
                // items = () => 
                // {
                //     for (i = 0; i < this.state.donacion.productos.length; i++) 
                //     {
                //         i++;
                //         return (
                //             <section className="row">
                //                 <section className="col-12 col-md-8 col-offset-2">
                //                     <table className="full-width ">
                //                         <thead>
                //                             <tr>
                //                                 <th>Linea</th>
                //                                 <th>Producto</th>
                //                                 <th>Cantidad</th>
                //                                 <th>Precio Unitario</th>
                //                                 <th>Total</th>
                //                                 <th>&nbsp;</th>
                //                             </tr>
                //                         </thead>

                //                         <tbody className="zebra">
                //                             <tr>
                //                                 <td>{cont + 1}</td>
                //                                 <td>{this.state.donacion.productos[i].descripcion}</td>
                //                                 <td className="right">{this.state.donacion.productos[i].cantidad}</td>
                //                                 <td className="right">{this.state.donacion.productos[i].precio}</td>
                //                                 <td className="right">{this.state.donacion.productos[i].subtotal}</td>
                //                                 <td className="center ">
                //                                     <a className="btn s-padding mdftocart"><span className="iconify" data-icon="el:minus" data-inline="false"></span></a>
                //                                 &nbsp;
                //                                 <a href="" className="btn s-padding mdftocart"><span className="iconify" data-icon="el:plus" data-inline="false"></span></a>
                //                                 </td>
                //                             </tr>
                //                         </tbody>
                //                     </table>
                //                 </section>
                //             </section>
                //         );
                //     }
                // }

            // return (
            //     <Page showHeader={true} showFooter={true} title="Resumen de Donaciones" auth={this.props.auth}>
            //     {Item()}

            //     <table>
            //         <tfoot>
            //             <tr >
            //                 <td colSpan="2" className="center">
            //                     <a className="btn m-padding bg-red center rmvcart" href="index.php?page=rmvAllCart"> <span className="ion-trash-b s4"></span> &nbsp;Cancelar </a>
            //                 </td>
            //                 <td className="right">{total}</td>
            //                 <td className="pay">
            //                     <a href="index.php?page=checkout" className="btn btn-primary m-padding bg-green"><span className="iconify" data-icon="fa-solid:cash-register"></span>&nbsp;Pagar</a>
            //                 </td>
            //             </tr>
            //         </tfoot>
            //     </table>
            //     </Page>
            // );

        //}
        // else {
        //     return (
        //         <Page showHeader={true} showFooter={true} title="Resumen de Donaciones" auth={this.props.auth}>
        //             <h2>No Donación</h2>
        //         </Page>
        //     );
        // }
    }
}