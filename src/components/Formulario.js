import React,{useState} from 'react';
import PropTypes from 'prop-types';

import Error from './Error';


const Formulario = ({setBusqueda,busqueda,setConsultar}) => {

 
    const [error,setError]=useState(false)

    //extraer ciudad y pais
    const {ciudad,pais}=busqueda;

    // funcion que coloca los elementos en el state

    const _handleChange=e=>{
        //actualizar state
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
       
    }
    const _handleSubmit=e=>{
        e.preventDefault();

        //validar
        if(ciudad.trim()===''|| pais.trim()===''){
            setError(true);
            return;
        }
        setError(false);
        setConsultar(true)


        //a componente principal
    }

    return (
        <form
        onSubmit={_handleSubmit}
        >
            {error?<Error mensaje="Todos los campos son obligatorios"/>:null}
            <div className="input-field col s12">
                <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={ciudad}
                placeholder="Ej.Cordoba"
                onChange={_handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={_handleChange}
                >
                    <option value=""> --Seleccione un pais--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>

                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
            <input
                type="submit"
                value="Buscar clima"
                className="waves-effect waves-light btn-large btn-block yellow accent-4"
            />
            </div>
        </form>
    );
}

Formulario.propTypes={
    busqueda:PropTypes.object.isRequired,
    setBusqueda:PropTypes.func.isRequired,
    setConsultar:PropTypes.func.isRequired
}
export default Formulario;