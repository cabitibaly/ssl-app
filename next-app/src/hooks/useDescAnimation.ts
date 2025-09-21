import gsap from "gsap"
import { useEffect } from "react"

type DescModalAnimation = {
    parentRef: React.RefObject<HTMLDivElement | null>,
    firstChildRef: React.RefObject<HTMLDivElement | null>,
    isClosing: boolean,
    setOpen: (open: boolean) => void,
}

export const useDescAnimation = ({ parentRef, firstChildRef, isClosing, setOpen }: DescModalAnimation) => {
    useEffect(() => {
        const parent = parentRef?.current    
        const firstChild = firstChildRef.current

        if (!parent || !firstChild) return
        
        const tl = gsap.timeline()

        tl.fromTo(
            parent,
            { opacity: 0, scale: 0, duration: 0.4, ease: 'power3.out' },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        ).fromTo(
            firstChild,
            {x: 10000, duration: 0.9, ease: 'power3.out'},
            {x: 0, duration: 0.9, ease: 'power3.out'},
            "< + 0.3"
        )        

    }, [firstChildRef, parentRef])

    useEffect(() => {
        const parent = parentRef.current
        const firstChild = firstChildRef.current

        if (!parent || !firstChild) return
        const tl = gsap.timeline()

        if(isClosing){
            tl.fromTo(
                firstChild,
                {x: 0},
                {x: 1000, duration: 0.5, ease: 'power2.inOut', onComplete: () => {firstChild.style.display = "none"}},
            ).fromTo(
                parent,
                { opacity: 1, scale: 1, },
                { opacity: 0, scale: 0, transformOrigin: "center center", duration: 0.7, ease: 'power2.out', onComplete: () => setOpen(false) },                
            )
        }       

    }, [isClosing, setOpen, firstChildRef, parentRef])
}