import React, { useState } from 'react'
import { ColorColumn } from './ColorColumn'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown-menu'
import { Copy, Edit, Menu, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AlertModal } from '../modals/AlertModal'

interface IcolorActionsProps{
    data : ColorColumn
}

const ColorActions:React.FC<IcolorActionsProps> = ({
    data
}) => {
    const { storeId } = useParams();
    const { id:colorId } = data;
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleCopy = () => {
        navigator.clipboard.writeText(colorId);
        toast.success(`color Id copied to clipboard`);
    }

    const handleDelete = async() => {
        try {
                setLoading(true);
                await axios.delete(`/api/${storeId}/color/${colorId}`);
                toast.success('color Deleted');
                setIsOpen(false);
                router.refresh();
            } catch (error) {
                toast.error(`Something went wrong`);
                console.log(`Error in handleDelete ${error}`);
            }finally{
                setLoading(false);
            }
    }
  return (
    <main>
        <AlertModal
            isOpen={isOpen}
            loading={loading}
            onClose={() => setIsOpen(false)}
            onConform={handleDelete}
        />
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    className=''
                    onClick={ () => handleCopy()}
                >
                    <Copy className='w-4 h-4 mr-3'/> Copy color Id
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={ () => router.push(`/${storeId}/colors/${colorId}`)}
                >
                    <Edit className='w-4 h-4 mr-3'/> Edit color 
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={ () => setIsOpen(true)}
                >
                    <Trash className='w-4 h-4 mr-3'/> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </main>
  )
}

export default ColorActions