import { useEffect, useState } from "react"
import type { Category, Item } from "../types/types"

type ItemFormTypes = {
    categories : Category[],
    state : Item,
}

export default function ItemForm({categories, state} : ItemFormTypes)
{
    const category : Category = {
        id: '',
        name: 'Desconocido',
    }

    const [item, setItem] = useState<Item>({
        id: '',
        name: '',
        year: 0,
        category: category,
        genre: ''
    })

    useEffect(() => {
        setItem(state)
    }, [state])

    const handleChange = (event : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setItem({
            ...item,
            [event.target.id]: event.target.value
        })
    }

    return (
        <>
            <div className='form-div form-div-flex'>
                <label>Nombre</label>
                <input type="text" name="name" id="name" value={item.name} onChange={handleChange}></input>
            </div>
            <div className='form-div form-div-cols'>
                <div>
                    <label>Año</label>
                    <input type="number" name="year" id="year" value={item.year}  onChange={handleChange}></input>
                </div>
                <div>
                    <label>Categoría</label>
                    <select name="category" id="category">
                        <option>---</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id} selected={category.id === item.category.id ? true : false}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='form-div form-div-flex'>
                <label>Género</label>
                <input type="text" name="genre" id="genre" value={item.genre} onChange={handleChange}></input>
            </div>
        </>
    )
}