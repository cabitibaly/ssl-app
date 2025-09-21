"use client"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"
import Ajustement from "./ajustement"
import { useDescAnimation } from "@/hooks/useDescAnimation"

interface Props {
    setOpen: (open: boolean) => void,
}

const Modal = ({ setOpen }: Props) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const firstChildRef = useRef<HTMLDivElement>(null)
    const [isClosing, setIsClosing] = useState(false)   
    const [ajustementOpen, setAjustementOpen] = useState<boolean>(false) 
    useDescAnimation({ parentRef, firstChildRef, isClosing, setOpen })    

    return (
        <div ref={parentRef} onClick={() => setIsClosing(!isClosing)} className='fixed top-0 left-0 z-[1000] p-4 bg-noir/70 w-full h-full flex items-start justify-end'>
            <div ref={firstChildRef} onClick={(e) => e.stopPropagation()} className={`w-2/3 relative border border-fonce-400 p-4 bg-fonce-600 rounded-2xl h-full flex items-center justify-start flex-col gap-6`}>
                <div className='w-full flex items-center justify-between'>
                    <div onClick={() => setIsClosing(!isClosing)} className='cursor-pointer bg-fonce-400 p-2 rounded-xl flex items-center justify-center'>
                        <ArrowRight size={28} strokeWidth={2} className='stroke-gray-500' />
                    </div>
                    <button onClick={() => setAjustementOpen(!ajustementOpen)} className='border border-vert bg-transparent px-4 py-2 cursor-pointer rounded-xl text-vert text-lg  tracking-wide font-semibold transition duration-200 ease-in-out hover:bg-vert hover:text-fonce-600 hover:border-transparent'>
                        Modifier
                    </button>
                </div>
                { ajustementOpen && <Ajustement ajustementOpen={ajustementOpen} setAjustementOpen={setAjustementOpen} /> }
            </div>            
        </div>
    )
}

export default Modal
