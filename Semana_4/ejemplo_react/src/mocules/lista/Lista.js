import ListItem from "../../atoms/listItem/ListItem";
import Message from "../../atoms/message/Message";

const Lista = (params) => {
    const { list } = params;
    return (
        <div>
            {
                list.length === 0 ? (<Message title="No hya elementos para mostrar" />)
                    :
                (list.map(item => <ListItem title= {item}/>))

            }
        </div>
    );
}

export default Lista;


