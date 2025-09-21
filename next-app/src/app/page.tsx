'use client'
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ToWords } from 'to-words';
import Modal from "@/components/modal";
import DeleteModal from "@/components/deleteModal";
import Left from "@/components/left";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isMove, setIsMove] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  // const divRef = useRef(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)

  const sidebarRef = useRef<HTMLDivElement>(null); // Référence pour la sidebar 
  
  const toWords = new ToWords({localeCode: 'fr-FR'});
  console.log(toWords.convert(315230000))    

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const menu = menuRef.current;
    const cross = crossRef.current;
    const tl = gsap.timeline({ paused: true, reversed: true });    

    if (!sidebar || !menu || !cross) return;

    tl.to("#middle", {
      scaleX: 0,
      duration: .3,
      ease: "power1.inOut"
    }).to("#top", {
      scaleX: 0,
      duration: .3,
      ease: "power1.inOut"
    }).to("#bottom", {
      scaleX: 0,
      duration: .3,
      ease: "power1.inOut"
    }).to(sidebar, {      
      scaleX: 1,
      transformOrigin: "left right",
      delay: .3,
      duration: 0.8,
      ease: 'power3.out',
      display: 'flex'
    }).to("#left-cross", {
      scaleX: 1,
      rotation: 45,
      duration: .3,
      ease: "power1.inOut"
    }).to("#right-cross", {
      scaleX: 1,
      rotation: -45,
      duration: .3,
      ease: "power1.inOut"
    });

    const openMenu = () => tl.play();
    const closeMenu = () => tl.reverse();

    menu.addEventListener("click", openMenu);
    cross.addEventListener("click", closeMenu);

    return () => {
        menu.removeEventListener("click", openMenu);
        cross.removeEventListener("click", closeMenu);
    };

  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    // const div = divRef.current;
    const bar = barRef.current;
    // let clicked = false;
    
    if (!button || !bar) return;

    // Animation au clic
    const handleClick = () => {
      gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      // click()
    };

    const click = () => {
      gsap.timeline().to(bar, {
        scaleX: 0,
        duration: .7,        
        transformOrigin: 'left right',
        ease: "power1.inOut"
      }).to(bar, {
        scaleX: 1,
        duration: .7,
        delay: .3,
        transformOrigin: 'left right',
        ease: "power1.inOut",
        backgroundColor: "rgba(117, 106, 182, 0.9)"
      }).to(bar, {
        scaleY: 0,
        duration: .7,
        delay: .3,
        transformOrigin: 'left right',
        ease: "power1.inOut",
        backgroundColor: "rgba(255, 229, 229)",
        onComplete: () => {
          bar.style.display = "none";
        }
      })
    }

    // Animation au survol
    const handleHover = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Reset au départ du survol
    const handleHoverExit = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener('click', handleClick);
    button.addEventListener('mouseenter', handleHover);
    button.addEventListener('mouseleave', handleHoverExit);
    click();

    return () => {
      button.removeEventListener('click', handleClick);
      button.removeEventListener('mouseenter', handleHover);
      button.removeEventListener('mouseleave', handleHoverExit);
    };
  }, []);

  useEffect(() => {
    const horizontal = horizontalRef.current;

    if (!horizontal) return;

    const tl = gsap.timeline();

    tl.fromTo(
      horizontal,
      {scaleX: 0, transformOrigin: "left right"},
      {scaleX: 1, transformOrigin: "left right", duration: 1, ease: "power2.out"}
    )

  }, [isMove]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between py-4 px-16 bg-transparent">
        <Image src="/logo.png" alt="logo" width={150} height={50} className="cursor-pointer" />
        <div ref={menuRef} className="cursor-pointer rounded-lg px-4 py-2 flex items-center justify-center flex-col gap-4">
          <hr id="top" className="w-24 text-white" />
          <hr id="middle" className="w-24 text-white" />
          <hr id="bottom" className="w-24 text-white" />
        </div>
      </nav>
      <div style={{background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hand.png')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className="bg-blue-200 w-screen h-screen flex flex-col items-center justify-center gap-20">
        <div className="w-3/4 flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-center text-2xl leading-28 md:text-8xl">
            TRANSFORMING
            FINANCIAL LANDSCAPES
            INTO REAL ESTATE
          </h1>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setIsMove(!isMove)} className="px-8 py-2 w-40 bg-vert rounded-lg text-white text-2xl cursor-pointer flex items-center justify-center">left</button>
            <button ref={buttonRef} onClick={() => setOpen(!open)} className="px-8 py-2 w-40 bg-black rounded-lg text-white text-2xl cursor-pointer flex items-center justify-center">Move</button>
            <button onClick={() => setIsDelete(!isDelete)} className="px-8 py-2 w-40 bg-rouge rounded-lg text-white text-2xl cursor-pointer flex items-center justify-center">Remove</button>            
          </div>          
        </div> 
        <div ref={barRef} className="hidden absolute top-0 w-screen h-screen z-[1000] bg-amber-300 rounded-lg"></div>     
        {/* <div onClick={() => menuAnimation()} className="cursor-pointer rounded-lg px-4 py-2 flex items-center justify-center flex-col gap-2">
          <hr id="top" className="w-24 border-2 text-white " />
          <hr id="middle" className="w-24 border-2 text-white " />          
          <hr id="bottom" className="w-24 border-2 text-white " />          
        </div> */} 
        {
          isMove &&
          <Left setOpen={setIsMove} />
        }       
      </div>
      <div ref={sidebarRef} className="scale-x-0 absolute top-0 right-0 z-[500] py-20 bg-black w-1/2 h-screen flex items-start justify-end">
        <div ref={crossRef} id="cross" className="cursor-pointer rounded-lg px-4 py-2 flex items-center justify-center flex-col">
          <hr id="left-cross" className="scale-x-0 w-24 text-white rotate-45" />
          <hr id="right-cross" className="scale-x-0 w-24 text-white -rotate-45" />          
        </div>
      </div>
      {
        open && <Modal setOpen={setOpen} />
      }
      <div className="relative w-screen h-screen flex items-center justify-center">
        <div className="w-screen bg-black h-screen">

        </div>
        {
          isDelete && <DeleteModal setOpen={setIsDelete} />
        }        
      </div>      
    </>
  );
}
