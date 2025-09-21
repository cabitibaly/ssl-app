import gsap from "gsap";
import { useEffect } from "react";

type ajustementAnimation = {
    parentRef: React.RefObject<HTMLDivElement | null>;
    childRef: React.RefObject<HTMLDivElement | null>;
    isClosing: boolean;
    setAjustementOpen: (open: boolean) => void;
};

export const useAjustementAnimation = ({ parentRef, childRef, isClosing, setAjustementOpen }: ajustementAnimation) => {
    
    useEffect(() => {
        const parent = parentRef.current
        if (!parent || !childRef.current) return

        const tl = gsap.timeline()

        tl.fromTo(
            parent,
            {width: 0, duration: 0.7, ease: 'power3.out'},
            {width: "50%", duration: 0.7, ease: 'power3.out'},
        ).fromTo(
            childRef.current,
            {opacity: 0},
            {opacity: 1, duration: 0.7, ease: 'power3.out'},            
        )

    }, [parentRef, childRef])

    useEffect(() => {
        const parent = parentRef.current
        if (!parent || !childRef.current) return

        const tl = gsap.timeline()        

        if(isClosing) {
            tl.fromTo(
                childRef.current,                
                {opacity: 1, duration: 0.7, ease: 'power3.out'},   
                {opacity: 0, duration: 0.7, ease: 'power3.out'},         
            ).fromTo(
                parent,
                {scaleX: 1, transformOrigin: "left right", duration: 0.7, ease: 'power3.out'},
                {scaleX: 0, scaleY: 1, transformOrigin: "left right", duration: 0.7, ease: 'power3.out', onComplete: () => setAjustementOpen(false)},
            )
        }

    }, [isClosing, setAjustementOpen, parentRef, childRef])
}