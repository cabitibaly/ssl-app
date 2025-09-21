'use client'
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import {Button} from 'primereact/button';
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import fr from "../../constants/fr.json";
import { Dropdown } from 'primereact/dropdown';

addLocale("fr", fr.fr)

const Fad = () => {
    const reponseRef = useRef<HTMLDivElement>(null);
    // const parentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = React.useState<Date | null>(new Date())
    const [count,setCount] = useState<number>(0);
    const [option, setOption] = useState<string>("");

    const handleclick = () => {
        const response = reponseRef.current;        

        if (!response) return;

        if (!isOpen) {
            gsap.to(response, {
                height: 'auto',
                opacity: 1,
                duration: .5,
                ease: 'power1.inOut',
                onComplete: () => {
                    setIsOpen(true)
                },
            })           
        }

        if (isOpen) {
            gsap.to(response, {
                height: 0,
                opacity: 0,
                duration: .5,
                ease: 'power1.inOut',
                onComplete: () => {
                    setIsOpen(false)
                }
            })
        }
        
    }

    // const bgAnimation = () => {
    //     const parent = parentRef.current;

    //     if (!parent) return;

    //     gsap.to(parent, {
    //         backgroundColor: "rgba(255, 255, 255, 0.5)",
    //         duration: .5,
    //     })
    // }

    return (
        <section className='p-20 w-screen h-screen bg-white flex flex-col items-center justify-center gap-8'>
            <div className='relative border border-blue-200 p-4 w-[30vw] flex items-center justify-between flex-col gap-6'>                                        
                <Calendar  
                    id='calendar'                  
                    onChange={(e) => setDate(e.value as Date | null)}
                    value={date}                               
                    locale="fr" 
                    placeholder="Choisir une date"
                    showIcon={false}
                />  
                <div className='border border-amber-300 p-2 w-64'>
                    <Dropdown 
                        id='dropdown'
                        options={["bonjour", "bonsoir"]}
                        placeholder="Choisir une option"
                        value={option}
                        onChange={(e) => setOption(e.value as string)}
                        checked={true}
                        highlightOnSelect={false}
                    />
                </div>                
            </div>
            <div className='border-t border-b border-black py-2 pl-8 pr-4 w-2/4 flex items-start justify-between flex-col gap-4'>
                <button onClick={() => handleclick()} className='mt-3 text-2xl text-black font-normal cursor-pointer'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</button>
                <div ref={reponseRef} className='border border-black overflow-hidden w-full h-0 opacity-0'>
                    <p className='text-neutral-800 text-lg font-normal'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Praesentium, saepe, consequatur ipsum iusto dolores repudiandae officiis explicabo, 
                        debitis sapiente modi atque odio recusandae optio mollitia reiciendis eaque error fugiat corrupti.
                    </p>
                </div>
            </div>
            <Button label="Click" icon="pi pi-plus" onClick={() => setCount(count + 1)}></Button>
            {count}
            <div className='w-auto flex items-center justify-center'>
                {/* <div className='border border-blue-200 p-4 flex items-center justify-center gap-4'>
                    <div className='border border-red-400 p-2 rounded-full w-10 h-10 flex items-center justify-center text-red-400'>
                        1
                    </div>
                    <span className='text-red-400'>Etape 1</span>
                    <hr className='w-32 text-red-200' />
                </div> */}
                {/* <div className='border border-blue-200 p-4 flex items-center justify-center gap-4'>
                    <div className='border border-red-400 p-2 rounded-full w-10 h-10 flex items-center justify-center'>
                        1
                    </div>
                    <span>Etape 1</span>
                    <hr className='w-32 text-red-400' />
                </div>
                <div className='border border-blue-200 p-4 flex items-center justify-center gap-4'>
                    <div className='border border-red-400 p-2 rounded-full w-10 h-10 flex items-center justify-center'>
                        1
                    </div>
                    <span>Etape 1</span>
                    <hr className='w-32 text-red-400' />
                </div> */}                
            </div>
        </section>
    )
}

export default Fad
