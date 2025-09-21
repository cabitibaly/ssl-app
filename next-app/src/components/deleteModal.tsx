"use client"
import { useEditAnimation } from "@/hooks/useEditAnimation"
import { useRef, useState } from "react"

interface Props {
    setOpen: (open: boolean) => void,
}

const DeleteModal = ({ setOpen }: Props) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [isClosing, setIsClosing] = useState(false)
    useEditAnimation({ parentRef, childRef, isClosing, setOpen })    

    return (
        <div ref={parentRef} onClick={() => setIsClosing(!isClosing)} className='fixed top-0 left-0 z-[1000] p-4 bg-noir/70 w-full h-full flex items-center justify-center'>
            <div ref={childRef} className="w-1/3 h-full bg-white rounded-lg flex items-center justify-center">

            </div>
        </div>
    )
}

export default DeleteModal
