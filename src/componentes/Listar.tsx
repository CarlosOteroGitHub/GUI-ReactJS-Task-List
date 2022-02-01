import React, { useState } from 'react';
type FormElement = React.FormEvent<HTMLFormElement>;

interface ITarea {
    nombre: string;
    done: boolean;
}

function Listar(): JSX.Element {

    const [nuevaTarea, setNuevaTarea] = useState<string>('');
    const [tareas, setTareas] = useState<ITarea[]>([]);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        agregarTarea(nuevaTarea);
        setNuevaTarea("");
        console.log(tareas);
    };

    const agregarTarea = (nombre:string):void => {
        if(nuevaTarea === ""){
            alert("El campo de texto esta vacio");
        } else {
            const arreglo_tareas: ITarea[] = [...tareas, {nombre: nombre, done: false}];
            setTareas(arreglo_tareas);
        }
    }

    const cambiarEstado = (i:number):void => {
        const arreglo_tareas: ITarea[] = [...tareas];
        arreglo_tareas[i].done = !arreglo_tareas[i].done;
        setTareas(arreglo_tareas);
    }

    const editarTarea = (i:number):void => {
        if(nuevaTarea === ""){
            alert("El campo de texto esta vacio");
        } else {
            const arreglo_tareas: ITarea[] = [...tareas];
            arreglo_tareas[i].nombre = nuevaTarea;
            setTareas(arreglo_tareas);
            setNuevaTarea("");
        }
    }

    const eliminarTarea = (i:number): void => {
        const arreglo_tareas: ITarea[] = [...tareas];
        arreglo_tareas.splice(i, 1);
        setTareas(arreglo_tareas);
    }

    //Proceso que muestra código en formato JSX para la visualización gráfica de todos los registros del modelo Empleados en el navegador web.
    return(
        <div className="card">
            <div className="card-header">
                <h4>Lista de Tareas</h4>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={e => setNuevaTarea(e.target.value)} value={nuevaTarea} className='form-control' placeholder='Nombre de la tarea...' autoFocus></input>
                    <br></br>
                    <button className='btn btn-success'>Agregar Tarea</button>
                </form>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>¿Realizada?</th>
                            <th>Cambiar Estado</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tareas.map(
                                (t: ITarea, i:number) => (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{t.nombre}</td>
                                        <td className={t.done == false ? 'text-danger' : 'text-success'}>{t.done == false ? 'No' : 'Sí'}</td>
                                        <td><button className="btn btn-warning" onClick={() => cambiarEstado(i)}>Cambiar</button></td>
                                        <td><button className="btn btn-primary" onClick={() => editarTarea(i)}>Editar</button></td>
                                        <td><button className="btn btn-danger" onClick={() => eliminarTarea(i)}>Eliminar</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Listar;