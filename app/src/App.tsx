import { useEffect, useState } from 'react'
import { categories } from './data/categories'
import './App.css'
import type { Category, Item } from './types/types'
import { v4 as uuidv4 } from 'uuid';
import ItemForm from './components/ItemForm';

function App() {
    const category : Category = {
        id: 0,
        name: 'Desconocido',
    }

    const emptyItem : Item = {
        id: '',
        name: '',
        year: 0,
        category: category,
        genre: ''
    }

    const initialItems = () => {
        const itemsJson = localStorage.getItem('items')
        return itemsJson ? JSON.parse(itemsJson) : []
    }

    const [modal, setModal] = useState(false)
    const [activeItem, setActiveItem] = useState<Item>(emptyItem)
    const [activeModal, setActiveModal] = useState('')

    const [items, setItems] = useState<Item[]>(initialItems())

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])
    
    const closeModal = () => {
        setModal(false)
        setActiveModal('')
    }

    const openAddItemModal = () => {
        setModal(true)
        setActiveModal('addItem')
        setActiveItem(emptyItem)
    }

    const updateShowItemInfo = (item : Item) => {
        document.querySelector('#show-item-name')!.innerHTML = item.name
        document.querySelector('#show-item-year')!.innerHTML = item.year ? item.year.toString() : 'n/a'
        document.querySelector('#show-item-category')!.innerHTML = item.category.name
        document.querySelector('#show-item-genre')!.innerHTML = item.genre ? item.genre : 'Desconocido'
    }

    const openShowItemModal = (item : Item) => {
        setModal(true)
        setActiveItem(item)
        setActiveModal('showItem')
        updateShowItemInfo(item)
    }

    const openEditItemModal = () => {
        setModal(true)
        setActiveModal('editItem')
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
        closeModal()
    }

    const editActiveItem = (data: { get: (arg0: string) => any }) => {
        const editedItem : Item = {
            id: activeItem!.id,
            name: data.get('name'),
            year: data.get('year'),
            genre: data.get('genre'),
            category: activeItem!.category
        }

        setItems(items.map(item => {
            if (item.id !== activeItem!.id) return item
            else return editedItem
        }))

        updateShowItemInfo(editedItem)
        setActiveModal('showItem')
    }
    
    return (
        <>
            <div id='main-container'>
                <div>
                    <button onClick={openAddItemModal}>Añadir ítem</button>
                </div>
                <div id='backlog-items'>
                    {
                        items.map(item => (
                            <div className='backlog-item' key={item.id} onClick={() => openShowItemModal(item)}>
                                <div className='item-title'>{item.name}</div>
                                <div className='item-properties'>
                                    {item.year ? item.year : 'n/a'} | {item.genre ? item.genre : 'No especificado'}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{display: modal ? '' : 'none'}}>
                <div onClick={closeModal} id={'modal-bg'} /> {/* BLACK OVERLAY */}

                {/* ADD ITEM MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'addItem' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
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

                {/* EDIT ITEM MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'editItem' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
                    <div>
                        <b>Editar ítem</b>
                    </div>
                    <div className={'custom-form'}>
                        <form action={editActiveItem} id='edit-item-form'>
                            <ItemForm categories={categories} state={activeItem}></ItemForm>
                            <div className='form-div'>
                                <button>Editar</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* EDIT ITEM MODAL END */}

                {/* SHOW ITEM MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'showItem' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
                    <div><b>Nombre</b></div>
                    <div id='show-item-name'/>
                    <div><b>Año</b></div>
                    <div id='show-item-year'/>
                    <div><b>Categoría</b></div>
                    <div id='show-item-category'/>
                    <div><b>Género</b></div>
                    <div id='show-item-genre'/>
                    <div>
                        <a href='#' onClick={openEditItemModal}>🖉 Editar</a>
                    </div>
                </div>
                {/* SHOW ITEM MODAL END */}
            </div>
        </>
    )
}

export default App
