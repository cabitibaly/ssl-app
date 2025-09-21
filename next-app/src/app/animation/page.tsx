/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Page = () => {
    const imageFirstRef = useRef<HTMLImageElement>(null);
    const imageSecondRef = useRef<HTMLImageElement>(null);
    const imageThirdRef = useRef<HTMLImageElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const linefirstRef = useRef<HTMLDivElement>(null);
    const lineSecondRef = useRef<HTMLDivElement>(null);
    const lineThirdRef = useRef<HTMLDivElement>(null);

    useEffect(() => {        
        const imageFirst = imageFirstRef.current;
        const imageSecond = imageSecondRef.current
        const imageThird = imageThirdRef.current
        const reveal = revealRef.current;
        const lineFirst = linefirstRef.current;
        const lineSecond = lineSecondRef.current;
        const lineThird = lineThirdRef.current;

        if (!imageFirst || !imageSecond || !imageThird || !reveal || !lineFirst || !lineSecond || !lineThird) return;
        
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(imageThird, {
            y: 150,
            duration: 1,
            ease: "power3.inOut",
        }).to(imageSecond, {
            y: 150,
            duration: 1,
            ease: "power3.inOut",
        }) 
        
        const timeline = gsap.timeline();

        timeline.fromTo(
            lineFirst,
            {scaleX: 1, transformOrigin: "left center"},
            {scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.inOut"},
            "< + 0.3"
        ).fromTo(
            lineSecond,
            {scaleX: 1, transformOrigin: "left center"},
            {scaleX: 0, transformOrigin: "left center", duration: 1, delay: 0.2, ease: "power3.inOut"},
            "< + 0.3"
        ).fromTo(
            lineThird,
            {scaleX: 1, transformOrigin: "left center"},
            {scaleX: 0, transformOrigin: "left center", duration: 1, delay: 0.25, ease: "power3.inOut", onComplete: () => {reveal.style.display = "none"; document.body.style.overflow = "unset"}},
            "< + 0.3"
        ).fromTo(
            "#text",
            {y: 50, opacity: 0},
            {y: 0, opacity: 1, duration: 1, ease: "power3.inOut"},
            "< + 0.3"
        )

        document.body.style.overflow = "hidden"

    }, []);


    return (
        <>
            <section className="sticky top-0 w-screen h-screen flex items-center justify-center overflow-hidden flex-col">
                <div className="border border-red-300 relative p-4 flex items-center justify-center gap-4 overflow-hidden">
                    <h1 id="text" className="text-7xl">Votre partenaire</h1>
                    <div className="relative -top-3 p-4 w-[90px] h-[90px] flex items-center justify-center overflow-hidden">
                        <Image ref={imageFirstRef} src={"/nami.jpg"} alt="luffy" width={100} height={400} className="absolute z-[1] object-cover"/>
                        <Image ref={imageSecondRef} src={"/zoro.jpg"} alt="luffy" width={100} height={400} className="absolute z-[2] object-cover"/>
                        <Image ref={imageThirdRef} src={"/nero.jpg"} alt="luffy" width={100} height={400} className="absolute z-[3] object-cover"/>
                    </div>
                    <h1 className="text-7xl">de confiance</h1>
                </div>
                <div ref={revealRef} className="absolute z-10 top-0 left-0 bg-transparent w-screen h-screen flex items-center justify-center flex-col">
                    <div ref={linefirstRef} className="bg-blue-200 w-full h-1/3"></div>
                    <div ref={lineSecondRef} className="bg-blue-400 w-full h-1/3"></div>
                    <div ref={lineThirdRef} className="bg-blue-600 w-full h-1/3"></div>
                </div>
            </section>
            <section className="relative z-20 w-screen h-screen bg-gray-200 flex items-center justify-center">
                <div className="border border-green-500 w-full max-w-5xl mx-auto carousel carousel-center rounded-box gap-16">
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/ligdicash.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/auben.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/unb.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/esi.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/ubc.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    <div className="carousel-item">                        
                        <div className="w-28 h-28 flex items-center justify-center">
                            <Image src={"/sonabel.png"} alt="luffy" width={150} height={400} className="object-cover"/>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <div className="bg-red-300 w-60 h-60 flex items-center justify-center">2</div>
                    </div>
                    <div className="carousel-item">
                        <div className="bg-emerald-300 w-60 h-60 flex items-center justify-center">3</div>
                    </div>
                    <div className="carousel-item">
                        <div className="bg-orange-300 w-60 h-60 flex items-center justify-center">4</div>
                    </div>
                    <div className="carousel-item">
                        <div className="bg-stone-300 w-60 h-60 flex items-center justify-center">5</div>
                    </div>
                    <div className="carousel-item">
                        <div className="bg-orange-300 w-60 h-60 flex items-center justify-center">6</div>
                    </div>
                    <div className="carousel-item">
                        <div className="bg-stone-300 w-60 h-60 flex items-center justify-center">7</div>
                    </div> */}
                </div>
            </section>
            <section className="relative p-10 w-screen h-screen bg-white flex items-center justify-center flex-col gap-8 max-1080:px-4 max-md:p-3">        
                <div className="bg-transparent  flex items-center justify-center gap-0 flex-col max-lg:w-full">
                    <span className="self-start text-noir text-base mb-2 max-sm:text-xs">Nous créons, nous résolvons</span>
                    <div className="w-full grid grid-row-3 gap-4 max-sm:gap-2">
                        <div className="w-full flex">
                            <div className="flex items-center justify-start gap-4 flex-wrap overflow-hidden max-sm:gap-2">
                                <h1 className="my-0 text-noir max-md:text-5xl max-sm:text-4xl max-xs:text-[25px]">Votre partenaire</h1>
                                <div className="relative -top-0.5 max-sm:w-[50px] max-sm:h-[35px] flex items-center justify-center overflow-hidden max-md:w-[60px] max-md:h-[40px]">
                                    <Image src={"/image-1.png"} alt="luffy" width={100} height={400} className="absolute z-[1] object-cover max-xl:w-[70px]"/>
                                    <Image src={"/image-2.png"} alt="luffy" width={100} height={400} className="absolute z-[2] object-cover max-xl:w-[70px]"/>
                                    <Image src={"/image-2.png"} alt="luffy" width={100} height={400} className="absolute z-[3] object-cover max-xl:w-[70px]"/>
                                </div>
                            </div>
                        </div>
                        <div className="max-md:w-[85%] max-xxs:w-full">
                            <h1 className=" text-noir leading-12 max-md:text-5xl max-sm:text-4xl max-xs:text-[25px] max-xs:leading-9">de confiance pour des solutions fiables et</h1>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-start gap-4 flex-wrap overflow-hidden max-sm:gap-2">                                
                                <div className="relative -top-0.5 max-sm:w-[50px] max-sm:h-[35px] flex items-center justify-center overflow-hidden max-md:w-[60px] max-md:h-[40px]">
                                    <Image src={"/image-1.png"} alt="luffy" width={100} height={400} className="absolute z-[1] object-cover max-xl:w-[70px]"/>
                                    <Image src={"/image-2.png"} alt="luffy" width={100} height={400} className="absolute z-[2] object-cover max-xl:w-[70px]"/>
                                    <Image src={"/image-2.png"} alt="luffy" width={100} height={400} className="absolute z-[3] object-cover max-xl:w-[70px]"/>
                                </div>
                                <h1 className="my-0 text-noir max-md:text-5xl max-sm:text-4xl max-xs:text-[25px]">innovantes</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page
