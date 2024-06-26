import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createCategory, getAllCategories } from "@/lib/Actions/category.actions"
import { Icategory } from "@/lib/database/models/categorySchema"
import { startTransition, useEffect, useState } from "react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"


type DropDownprops = {
    value?: string,
    onChangeHander?: () => void
}

const Dropdown = ({ value, onChangeHander }: DropDownprops) => {

    const [categories, setCategories] = useState<Icategory[]>([])
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim()
        })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            categoryList && setCategories(categoryList as Icategory[])
        }

        getCategories();
    }, [])


    return (
        <Select onValueChange={onChangeHander} defaultValue={value}>
            <SelectTrigger className="select-field ">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id.toString()} value={category._id.toString()} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
            <AlertDialog>
                <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new category</AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>New Category</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </Select>

    )
}

export default Dropdown
