import { useEffect, useState } from 'react'
import './App.css'
import type { Category, Item } from './types/types'
import { v4 as uuidv4 } from 'uuid';
import ItemForm from './components/ItemForm';
import CategoryForm from './components/CategoryForm';

function App() {
    const category : Category = {
        id: '',
        name: 'Desconocido',
    }

    const emptyCategory : Category = {
        id: '',
        name: '',
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

    const initialCategories = () => {
        const categoriesJson = localStorage.getItem('categories')
        return categoriesJson ? JSON.parse(categoriesJson) : []
    }

    const [modal, setModal] = useState(false)
    const [activeItem, setActiveItem] = useState<Item>(emptyItem)
    const [activeCategory, setActiveCategory] = useState<Category>(emptyCategory)
    const [activeModal, setActiveModal] = useState('')

    const [items, setItems] = useState<Item[]>(initialItems())
    const [categories, setCategories] = useState<Category[]>(initialCategories())

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories))
    }, [categories])
    
    const closeModal = () => {
        setModal(false)
        setActiveItem(emptyItem)
        setActiveCategory(emptyCategory)
        setActiveModal('')
    }

    const openAddItemModal = () => {
        setModal(true)
        setActiveModal('addItem')
        setActiveItem(emptyItem)
    }

    const openAddCategoryModal = () => {
        setModal(true)
        setActiveModal('addCategory')
        setActiveCategory(emptyCategory)
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

    const openShowCategoriesModal = () => {
        setModal(true)
        setActiveModal('showCategories')
    }

    const openEditItemModal = () => {
        setModal(true)
        setActiveModal('editItem')
    }

    const openEditCategoryModal = (category : Category) => {
        setModal(true)
        setActiveCategory(category)
        setActiveModal('editCategory')
    }

    const addItem = (data: { get: (arg0: string) => any }) => {
        const newItem : Item = {
            id: uuidv4(),
            name: data.get('name'),
            year: data.get('year'),
            genre: data.get('genre'),
            category: categories.find(category => category.id === data.get('category'))!
        }

        setItems([...items, newItem])
        closeModal()
    }

    const addCategory = (data: { get: (arg0: string) => any }) => {
        const newCategory : Category = {
            id: uuidv4(),
            name: data.get('name')
        }

        setCategories([...categories, newCategory])
        closeModal()
    }

    const editActiveItem = (data: { get: (arg0: string) => any }) => {
        const editedItem : Item = {
            id: activeItem!.id,
            name: data.get('name'),
            year: data.get('year'),
            genre: data.get('genre'),
            category: categories.find(category => category.id === data.get('category'))!
        }

        setItems(items.map(item => {
            if (item.id !== activeItem!.id) return item
            else return editedItem
        }))

        updateShowItemInfo(editedItem)
        setActiveItem(editedItem)
        setActiveModal('showItem')
    }

    const editActiveCategory = (data: { get: (arg0: string) => any }) => {
        const editedCategory : Category = {
            id: activeCategory!.id,
            name: data.get('name'),
        }

        setCategories(categories.map(category => {
            if (category.id !== activeCategory!.id) return category
            else return editedCategory
        }))

        setActiveModal('showCategories')
    }
    
    return (
        <>
            <div id='main-container'>
                <div>
                    <button onClick={openAddItemModal}>Añadir ítem</button>
                    <button onClick={openAddCategoryModal}>Añadir categoría</button>
                    <button onClick={openShowCategoriesModal}>Ver categorías</button>
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
                            <ItemForm categories={categories} state={emptyItem}></ItemForm>
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

                {/* SHOW CATEGORIES MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'showCategories' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
                    {
                        categories.map(category => (
                            <div>{category.name}<a href='#' onClick={() => openEditCategoryModal(category)}>🖉 Editar</a></div>
                        ))
                    }
                </div>
                {/* SHOW CATEGORIES MODAL END */}

                {/* ADD CATEGORY MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'addCategory' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
                    <div><b>Añadir categoría</b></div>
                    <form action={addCategory}>
                        <CategoryForm activeCategory={emptyCategory}/>
                        <div className='form-div'>
                            <button type="submit">Añadir</button>
                        </div>
                    </form>
                </div>
                {/* ADD CATEGORY MODAL END */}

                {/* EDIT CATEGORY MODAL START */}
                <div className={'modal'} style={{display: activeModal === 'editCategory' ? '' : 'none'}}>
                    <div className={'close-button'} onClick={closeModal}>&times;</div>
                    <div><b>Editar categoría</b></div>
                    <form action={editActiveCategory}>
                        <CategoryForm activeCategory={activeCategory}/>
                        <div className='form-div'>
                            <button type="submit">Editar</button>
                        </div>
                    </form>
                </div>
                {/* EDIT CATEGORY MODAL END */}
            </div>
        </>
    )
}

export default App
