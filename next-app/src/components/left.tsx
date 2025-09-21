'use client'
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Left = ({setOpen} : {setOpen: (open: boolean) => void}) => {
    const [isClosing, setIsClosing] = useState(false);
    const parenRef = useRef<HTMLDivElement>(null); 
    const childRef = useRef<HTMLDivElement>(null);   

    useEffect(() => {
        const parent = parenRef.current;
        const child = childRef.current;
    
        if (!parent || !child) return;
    
        const tl = gsap.timeline();
    
        tl.fromTo(
          parent,
          {scaleX: 0, transformOrigin: "left right"},
          {scaleX: 1, transformOrigin: "left right", duration: 0.7, ease: "power2.out"}
        ).fromTo(
            child,
            {opacity: 0},
            {opacity: 1, duration: 0.7, ease: "power2.out"},
        )
    
    }, []);

    useEffect(() => {
        const parent = parenRef.current;
        const child = childRef.current;
    
        if (!parent || !child) return;
    
        const tl = gsap.timeline();

        if(isClosing) {
            tl.fromTo(
                child,
                {opacity: 1},
                {opacity: 0, duration: 0.7, ease: "power2.out"},
            ).fromTo(
                parent,
                {scaleX: 1, transformOrigin: "left right"},
                {scaleX: 0, scaleY: 1, transformOrigin: "left right", duration: 0.7, ease: "power2.out", onComplete: () => setOpen(false)},
            )
        }

    }, [isClosing, setOpen])

    return (
        <div ref={parenRef} className="absolute left-28 bottom-48 p-4 rounded-2xl w-96 h-96 bg-black/90 flex items-start justify-center">          
            <div ref={childRef} className="w-full flex items-center justify-between">
                <span className="text-white text-2xl font-bold tracking-wide">Nouvel Ajustement</span>
                <X type='button' onClick={() => setIsClosing(!isClosing)} size={30} strokeWidth={2} className="stroke-gray-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default Left;
