/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from 'react'
import ProduitAddCard from './produitAddCard';
import { produits } from '@/data/produit';
import Link from 'next/link';
import { Check, Plus, Trash2 } from 'lucide-react';
import { ProduitType } from '@/types/produitsType';
import { LigneFactureInterface } from '@/interface/ligneFacture';

interface LigneFactureProps {
    ligneFacture: LigneFactureInterface[],
    index: number,
    supprimerLigne: (index: number) => void,
    setLigneFacture: (ligne: LigneFactureInterface[]) => void
}

const LigneAjouter = ({ index, supprimerLigne, setLigneFacture, ligneFacture }: LigneFactureProps) => {
    const [estDesignation, setEstDesignation] = useState<boolean>(false)
    const [produitSearch, setProduitSearch] = useState<string>("")
    const [produitSelected, setProduitSelected] = useState<ProduitType | null>(null)
    
    const produitFiltered = produits.filter((produit) => (
        produit.nomProduit.toLowerCase().includes(produitSearch.toLowerCase())
    ))

    const handleAjouter = (produitId: number, ligneId: number) => {
        const nouvelleLigne = ligneFacture.map(ligne => {
            if(ligne.id === ligneId) {
                return {...ligne, produitId}
            }
            return ligne
        })        
        setLigneFacture(nouvelleLigne)
    }

    return (
        <div className='relative w-[80%] flex items-start justify-center flex-col gap-2.5'>  
            <div className='w-full flex items-center justify-between gap-2'>
                <input type="text" value={produitSearch} onChange={(e) => setProduitSearch(e.target.value)} className={`border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Zoro' ${produitSelected ? "hidden" : ""}`} placeholder='ex: Zoro' />
                <div className="flex items-center justify-center gap-2">
                    <input id={`checkbox-ligne-${index}`}checked={estDesignation} onChange={(e) => setEstDesignation(e.target.checked)} type="checkbox" className="sr-only" />
                    <label htmlFor={`checkbox-ligne-${index}`}className={`w-4 h-4 rounded-sm cursor-pointer flex items-center justify-center ${estDesignation ? "bg-vert" : "bg-gray-700"}`}>
                        {
                            estDesignation &&
                            <Check size={12} strokeWidth={4} className="stroke-noir" />
                        }
                    </label>
                    <button onClick={() => supprimerLigne(index)} className={`cursor-pointer flex items-center justify-center group`}>
                        <Trash2 size={20} strokeWidth={2} className="stroke-rouge group-hover:underline" />                        
                    </button>
                </div>
            </div>                                              
            {
                produitSearch && !estDesignation &&
                <div className='absolute top-full left-0 z-30 px-2.5 pt-2.5 pb-8 rounded-lg bg-fonce-600 w-full max-h-[328.833px] flex items-center justify-start flex-col gap-4'> 
                    <div className='w-full flex items-start justify-start flex-col gap-4 overflow-auto'>
                        {
                            produitFiltered.map((produit, i) => (
                                <ProduitAddCard
                                    key={i}
                                    ligneId={index}
                                    produitProps={produit}   
                                    btnAjouter 
                                    handleAjouter={handleAjouter}                                                                       
                                />
                            ))
                        }                                                      
                    </div>
                    {
                        produitFiltered.length === 0 &&
                        <div className='relative -top-3 w-full flex items-center justify-center'>
                            <span className='text-gray-500 text-lg font-semibold'>Aucun produit trouvé</span>
                        </div>
                    }                                     
                    <div className='absolute bottom-0 bg-gray-800 rounded-b-lg w-full'>
                        <Link href={"/inventaire/nouveau"} className={`cursor-pointer flex items-center justify-center group`}>
                            <Plus size={16} strokeWidth={2} className="stroke-vert group-hover:underline" />
                            <span className="text-vert text-lg font-semibold group-hover:underline">Ajouter un Produit</span>
                        </Link>
                    </div>                                 
                </div>
            }
        </div>
    )
}

export default LigneAjouter
