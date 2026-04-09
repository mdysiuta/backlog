import { useEffect, useState } from "react";
import type { Category } from "../types/types"

type CategoryFormTypes = {
    activeCategory : Category
}

export default function CategoryForm({activeCategory} : CategoryFormTypes) {
    const [category, setCategory] = useState<Category>({
        id: '',
        name: ''
    })

    useEffect(() => {
        setCategory(activeCategory)
    }, [activeCategory])

    const handleChange = (event : React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setCategory({
            ...category,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className='form-div form-div-flex'>
            <label>Categoría</label>
            <input type="text" name="name" id="name" value={category.name} onChange={handleChange}></input>
        </div>
    )
}