import { useState } from 'react'
import { categories } from './data/categories'
import './App.css'

function App() {
    const [modal, setModal] = useState(false)
    
    const toggleModal = () => {
        setModal(!modal)
    }
    
    return (
        <>
            <button onClick={toggleModal}>Añadir ítem</button>
            <div style={{display: modal ? '' : 'none'}}>
                <div onClick={toggleModal} id={'modal-bg'} /> {/* BLACK OVERLAY */}
                <div className={'modal'}>
                    <div className={'close-button'} onClick={toggleModal}>&times;</div>
                    <div>
                        <b>Añadir ítem</b>
                    </div>
                    <div className={'custom-form'}>
                        <form>
                            <div className='form-div form-div-flex'>
                                <label>Nombre</label>
                                <input type="text"></input>
                            </div>
                            <div className='form-div form-div-cols'>
                                <div>
                                    <label>Año</label>
                                    <input type="number"></input>
                                </div>
                                <div>
                                    <label>Categoría</label>
                                    <select>
                                        <option>---</option>
                                        {
                                            categories.map(category => (
                                                <option key={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='form-div'>
                                <button>Añadir</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
