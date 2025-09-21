"use client"
import { useAjustementAnimation } from "@/hooks/useAjustementAnimation"
import { X } from "lucide-react"
import { useRef, useState } from "react"

interface Props {
    ajustementOpen: boolean,
    setAjustementOpen: (open: boolean) => void,
}

const Ajustement = ({ setAjustementOpen }: Props) => {
    const parentRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    const [isClosing, setIsClosing] = useState(false)
    useAjustementAnimation({ parentRef, childRef, isClosing, setAjustementOpen })

    return (
        <div ref={parentRef} onClick={() => setIsClosing(!isClosing)} className="absolute top-0 right-0 border border-gray-600 p-4 bg-fonce-600 rounded-2xl w-1/2 h-full flex items-center justify-start flex-col gap-4">
            <div ref={childRef} className="w-full flex items-center justify-between">
                <span className="text-white text-2xl font-bold tracking-wide">Nouvel Ajustement</span>
                <X type='button' onClick={() => setIsClosing(!isClosing)} size={30} strokeWidth={2} className="stroke-gray-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default Ajustement
