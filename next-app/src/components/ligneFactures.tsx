"use client"

import { produits } from "@/data/produit"
import { Check, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ProduitAddCard from "./produitAddCard"
import { LigneFactureInterface } from "@/interface/ligneFacture"

interface LigneFactureProps {
    ligne: LigneFactureInterface[],
    index: number,
    supprimerLigne: (index: number) => void,
    setLigneFacture: (ligne: LigneFactureInterface[]) => void
}

const LigneFactures = ({index, supprimerLigne}: LigneFactureProps) => {
    const [estDesignation, setEstDesignation] = useState<boolean>(false)
    const [designation, setDesignation] = useState<string>("")

    const produitFiltered = produits.filter((produit) => (
        produit.nomProduit.toLowerCase().includes(designation.toLowerCase())
    ))    

    return (
        <tr className="bg-transparent">                                            
            <th scope="row" className="relative px-0 py-1 font-medium text-gray-300 whitespace-nowrap">
                <input value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Facture de paiement' />
                {   
                    designation && !estDesignation &&
                    <div className="absolute top-full left-0 z-30 px-2.5 pt-2.5 pb-8 rounded-lg bg-fonce-600 w-[400px] max-h-[328.833px] flex items-center justify-start flex-col gap-4 overflow-auto">
                        <div className='w-full flex items-start justify-start flex-col gap-4 overflow-auto'>
                            {
                                produitFiltered.map((produit, index) => (
                                    <ProduitAddCard
                                        key={index}
                                        ligneId={index}
                                        produitProps={produit}   
                                        btnAjouter                                                                        
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
                                <span className="text-vert text-lg font-semibold group-hover:underline">Ajouter un produit</span>
                            </Link>
                        </div>
                    </div>
                }
            </th>
            <td className="px-2 py-2">
                <input type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='0' />
            </td>
            <td className="px-2 py-2">
                <input type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='0' />
            </td>
            <td className="px-2 py-2">
                <input type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='0' />
            </td>
            <td className="w-4 p-2">
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
            </td>
        </tr>
    )
}

export default LigneFactures
