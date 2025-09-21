import gsap from "gsap";
import { useEffect } from "react";

type EditModalAnimation = {
    parentRef: React.RefObject<HTMLDivElement | null>,
    childRef: React.RefObject<HTMLDivElement | null>,
    isClosing: boolean,
    setOpen: (open: boolean) => void,
}

export const useEditAnimation = ({ parentRef, childRef, isClosing, setOpen }: EditModalAnimation) => {

    useEffect(() => {
        const parent = parentRef.current;
        const child = childRef.current;
    
        if (!parent || !child) return;
    
        const tl = gsap.timeline();
    
        tl.fromTo(
          parent,
          {
            scaleX: 0,
            scaleY: 0.005,
            transformOrigin: "center center",
          },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.out",
          }
        )    
        .to(parent, {
          scaleY: 1,
          duration: 0.7,
          ease: "power2.inOut",
        }).fromTo(
            child,
            {scale: 0, transformOrigin: "center center"},
            {scale: 1, transformOrigin: "center center", duration: 0.7, ease: "power2.out"},
        )
    
    }, [parentRef, childRef]);

    useEffect(() => {
        const parent = parentRef.current;
        const child = childRef.current;
    
        if (!parent || !child) return;
    
        const tl = gsap.timeline();

        if(isClosing) {
            tl.fromTo(
                child,
                {scale: 1, transformOrigin: "center center"},
                {scale: 0, transformOrigin: "center center", duration: 0.7, ease: "power2.out"},                
            ).fromTo(
                parent,
                {scaleY: 1, transformOrigin: "center center"},
                {scaleY: 0.005, transformOrigin: "center center", duration: 0.7, ease: "power2.out"},
            ).to(
                parent,
                {scaleX: 0, transformOrigin: "center center", duration: 0.7, ease: "power2.out", onComplete: () => setOpen(false)},
            )
        }

    }, [isClosing, setOpen, parentRef, childRef])

}