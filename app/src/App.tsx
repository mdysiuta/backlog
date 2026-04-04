import { useState } from 'react'
import { categories } from './data/categories'
import './App.css'
import type { Category, Item } from './types/types'
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [modal, setModal] = useState(false)
    const [addItemModalOpen, setAddItemModalOpen] = useState(false)
    const [showItemModalOpen, setShowItemModalOpen] = useState(false)

    const [items, setItems] = useState<Item[]>([])
    
    const toggleModal = () => {
        setModal(false)
        setAddItemModalOpen(false)
        setShowItemModalOpen(false)
    }

    const toggleAddItemModal = () => {
        setModal(!modal)
        setAddItemModalOpen(!addItemModalOpen)
    }

    const toggleShowItemModal = (item : Item) => {
        setModal(!modal)
        setShowItemModalOpen(!showItemModalOpen)

        const name : Element | null = document.querySelector('#show-item-name')
        name!.innerHTML = item.name
    }

    const addItem = (data: { get: (arg0: string) => any }) => {
        const category : Category = {
            id: 0,
            name: 'Desconocido',
        }

        const newItem : Item = {
            id: uuidv4(),
            name: data.get('name'),
            year: data.get('year'),
            genre: data.get('genre'),
            category: category
        }

        setItems([...items, newItem])
        toggleModal()
    }
    
    return (
        <>
            <div id='main-container'>
                <div>
                    <button onClick={toggleAddItemModal}>Añadir ítem</button>
                </div>
                <div id='backlog-items'>
                    {
                        items.map(item => (
                            <div className='backlog-item' onClick={() => toggleShowItemModal(item)}>
                                <div className='item-title'>{item.name}</div>
                                <div className='item-properties'>
                                    {item.year} | {item.genre}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{display: modal ? '' : 'none'}}>
                <div onClick={toggleModal} id={'modal-bg'} /> {/* BLACK OVERLAY */}

                {/* ADD ITEM MODAL START */}
                <div className={'modal'} style={{display: addItemModalOpen ? '' : 'none'}}>
                    <div className={'close-button'} onClick={toggleModal}>&times;</div>
                    <div>
                        <b>Añadir ítem</b>
                    </div>
                    <div className={'custom-form'}>
                        <form action={addItem} id='add-item-form'>
                            <div className='form-div form-div-flex'>
                                <label>Nombre</label>
                                <input type="text" name="name"></input>
                            </div>
                            <div className='form-div form-div-cols'>
                                <div>
                                    <label>Año</label>
                                    <input type="number" name="year"></input>
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
                            <div className='form-div form-div-flex'>
                                <label>Género</label>
                                <input type="text" name="genre"></input>
                            </div>
                            <div className='form-div'>
                                <button>Añadir</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* ADD ITEM MODAL END */}

                {/* SHOW ITEM MODAL START */}
                <div className={'modal'} style={{display: showItemModalOpen ? '' : 'none'}}>
                    <div className={'close-button'} onClick={toggleModal}>&times;</div>
                    <div id='show-item-name'>

                    </div>
                </div>
                {/* SHOW ITEM MODAL END */}
            </div>
        </>
    )
}

export default App
