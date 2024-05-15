
const BotonLista = (params)=>{
    const {title, comportamiento} = params
    return   <button onClick={comportamiento}>{title}</button>
}

export default BotonLista;