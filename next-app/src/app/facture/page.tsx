"use client"
import { clientData } from '@/data/clientData'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import ClientAddCard from '@/components/clientAddCard'
import { SimpleInformation } from '@/interface/simpleInformation'
import { LigneFactureInterface } from '@/interface/ligneFacture'
import ProduitAddCard from '@/components/produitAddCard'
import { produits } from '@/data/produit'
import SelecteurProduitLigneFacture from '@/components/selecteurProduit'
import { ProduitType } from '@/types/produitsType'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { useForm } from 'react-hook-form'

interface FormData {
    clientSearch: string,
    objet: string,
    doit: string,
}

const NouveauFacture = () => {
    const [estDefinitive, setEstDefinitive] = useState(false)    
    const [clientSelected, setClientSelected] = useState<SimpleInformation | null>(null)
    const [ligneFacture, setLigneFacture] = useState<LigneFactureInterface[]>([])  
    const { register, handleSubmit, watch } = useForm<FormData>()

    const submit = (data: FormData) => {
        console.log(data)
    }
    
    const clientSearch = watch("clientSearch")

    const clientFiltered = clientData.filter((clientitem) => (
        `${clientitem.nom} ${clientitem.prenom}`.toLowerCase().includes(clientSearch?.toLowerCase())
    ))

    const handleClick = (id: number) => {        
        const clientTrouve = clientFiltered.find(e => e.id === id)        

        if (clientTrouve) {
            setClientSelected({
                id: clientTrouve.id,
                image: clientTrouve.image,
                nom: clientTrouve.nom,
                prenom: clientTrouve.prenom,
                email: clientTrouve.email,
            })
        }
    }    

    const ajouterLigne = (estDesignation: boolean) => {
        if(estDesignation) {
            setLigneFacture(prev => ([
                ...prev, { 
                    id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
                    designation: "",
                    estDesignation: true,
                    typeQuantite: "",
                    quantite: 0,
                    prixUnitaire: 0,
                    prixTotal: 0                
                }
            ]));
            return
        }

        setLigneFacture(prev => ([
            ...prev, { 
                id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1,
                quantite: 0,
                estDesignation: false,
                typeQuantite: "",
                prixUnitaire: 0,
                prixTotal: 0                
            }
        ]));
    };

    const ajouterProduit = (produitId: number, ligneId: number) => {    
        const nouvelleLigne = ligneFacture.map(ligne => {
            if(ligne.id === ligneId) {
                const produit = produits.find(e => e.id === produitId)
                if(!produit) return ligne

                return {...ligne, produitId, prixUnitaire: produit.prixVente}
            }
            return ligne
        })        
        setLigneFacture(nouvelleLigne)
    }

    const modifierDesignation = (e: ChangeEvent<HTMLInputElement>, ligneId?: number) => {
        const lignesModifier = ligneFacture.map((ligne) => {
            if(ligne.id === ligneId) {
                return {...ligne, designation: e.target.value}
            }
            return ligne
        })

        setLigneFacture(lignesModifier)
    }

    const modifierTypeQuantite = (e: DropdownChangeEvent, ligneId?: number) => {
        const lignesModifier = ligneFacture.map((ligne) => {
            if(ligne.id === ligneId) {
                return {...ligne, typeQuantite: e.value}
            }
            return ligne
        })

        setLigneFacture(lignesModifier)
    }

    const modifierQuantite = (e: ChangeEvent<HTMLInputElement>, ligneId?: number) => {
        const nouvelleQuantite = Number(e.target.value) || 0;                   

        setLigneFacture((prev) => 
            prev.map((ligne) =>{

                if(ligne.estDesignation) {
                    return ligne.id === ligneId ? { ...ligne, quantite: nouvelleQuantite, prixTotal: nouvelleQuantite * ligne.prixUnitaire } : ligne
                }

                if(ligne.produitId && ligne.id === ligneId) {
                    return { ...ligne, quantite: nouvelleQuantite, prixTotal: nouvelleQuantite * ligne.prixUnitaire }
                }
                
                return ligne
            })
        );
    };    

    const modifierPrixU = (e: ChangeEvent<HTMLInputElement>, ligneId?: number) => {
        const nouveauPrix = Number(e.target.value) || 0;                   

        setLigneFacture((prev) => 
            prev.map((ligne) =>{

                if(ligne.estDesignation) {
                    return ligne.id === ligneId ? { ...ligne, prixUnitaire: nouveauPrix, prixTotal: nouveauPrix * ligne.quantite } : ligne
                }

                if(ligne.produitId && ligne.id === ligneId) {
                    return { ...ligne, prixUnitaire: nouveauPrix, prixTotal: nouveauPrix * ligne.quantite }
                }
                
                return ligne
            })
        );
    };

    const supprimerLigne = (idToRemove: number) => {        
        setLigneFacture(prev => prev.filter((e) => e.id !== idToRemove))
    }

    // console.log(ligneFacture)

    return (
        <section className="relative bg-noir w-full h-screen flex items-center justify-start flex-col gap-8">
            <div className='border-b border-gray-600 w-full flex items-center justify-between'>
                <Link href="/factures" className="border-r border-gray-600 w-64 px-6 py-6 self-start cursor-pointer flex items-start justify-start gap-2 group">
                    <ArrowLeft size={28} strokeWidth={2} className="stroke-gray-500 transition duration-200 ease-in group-hover:stroke-bleu" />
                    <span className="text-gray-500 text-xl font-semibold transition duration-200 ease-in group-hover:text-bleu">Retour</span>
                </Link>
                <span className='text-2xl text-white font-semibold'>Nouvelle facture</span>
                <div className='border-l border-gray-600 py-[19.5px] px-6 flex items-center justify-center gap-3'>
                    <label htmlFor='switch' className={`flex relative cursor-pointer w-20 h-9 rounded-full transition-all duration-300 ${estDefinitive ? "bg-vert": "bg-fonce-400"}`}>
                        <input id='switch' checked={estDefinitive} onChange={(e) => setEstDefinitive(e.target.checked)} type="checkbox" className='sr-only peer' />
                        <span className='w-2/5 h-[85%] bg-white rounded-full absolute left-1 top-[3px] peer-checked:left-11 transition-all duration-300'></span>
                    </label>
                    <span className='text-white text-xl font-semibold'>Facrure Définitive</span>
                </div>
            </div>            
            <div className='border border-white p-4 w-[80%] h-[90%] flex items-center justify-center gap-4 overflow-hidden'>
                <div className='border border-fonce-400 p-4 rounded-xl bg-transparent w-1/2 h-full flex items-start justify-start flex-col gap-4'>
                    <span className='text-white text-2xl font-semibold'>Détails de la Facture</span>
                    <form onSubmit={handleSubmit(submit)} className='px-2 py-1 w-full h-[96%] flex items-start justify-start flex-col gap-4 overflow-auto'>
                        <div className='relative w-3/5 flex items-start justify-center flex-col gap-2.5'>
                            <span className="text-gray-50 text-lg font-medium">Client</span>
                            <input {...register("clientSearch")} type="text" className={`border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Zoro' ${clientSelected ? "hidden" : ""}`} placeholder='ex: Zoro' />
                            {
                                clientSelected &&
                                <div className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg'>
                                    <ClientAddCard 
                                        client={clientSelected}
                                        btnRemove={true}
                                        handleRemove={() => setClientSelected(null)}
                                    />
                                </div>
                            }
                            {
                                clientSearch && !clientSelected &&
                                <div className='absolute top-full left-0 z-30 px-2.5 pt-2.5 pb-8 rounded-lg bg-fonce-600 w-full max-h-[328.833px] flex items-center justify-start flex-col gap-4'> 
                                    <div className='w-full flex items-start justify-start flex-col gap-4 overflow-auto'>
                                        {
                                            clientFiltered.map((client, index) => (
                                                <ClientAddCard 
                                                    key={index}
                                                    client={client}
                                                    handleClick={handleClick}
                                                    btnAdd={true}
                                                /> 
                                            ))
                                        }                                        
                                    </div>
                                    {
                                        clientFiltered.length === 0 &&
                                        <div className='relative -top-3 w-full flex items-center justify-center'>
                                            <span className='text-gray-500 text-lg font-semibold'>Aucun client trouvé</span>
                                        </div>
                                    }                                     
                                    <div className='absolute bottom-0 bg-gray-800 rounded-b-lg w-full'>
                                        <Link href={"/client/nouveau"} className={`cursor-pointer flex items-center justify-center group`}>
                                            <Plus size={16} strokeWidth={2} className="stroke-vert group-hover:underline" />
                                            <span className="text-vert text-lg font-semibold group-hover:underline">Ajouter un client</span>
                                        </Link>
                                    </div>                                 
                                </div>
                            }
                        </div>
                        <div className='relative w-3/5 flex items-start justify-center flex-col gap-2.5'>
                            <span className="text-gray-50 text-lg font-medium">Objet</span>
                            <input {...register("objet")} type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Facture de paiement' />
                        </div>
                        <div className='relative w-3/5 flex items-start justify-center flex-col gap-2.5'>
                            <span className="text-gray-50 text-lg font-medium">Doit</span>
                            <input {...register("doit")} type="text" className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Facture de paiement' />
                        </div>
                        <div className='w-full flex items-start justify-start flex-col gap-4'>
                            <span className='text-white text-2xl font-semibold'>Produits</span>
                            <div className="relative w-full h-auto flex flex-col items-start justify-start gap-4">
                                {
                                    ligneFacture.map((ligne, index) => {
                                        if(ligne.estDesignation) {
                                            return (
                                                <div key={index} className="w-[80%] border-b border-gray-600 pb-4 flex items-center justify-start flex-col gap-4">
                                                    <div className='w-full flex items-start justify-between gap-2'>
                                                        <input value={ligne.designation ?? ""} onChange={e => modifierDesignation(e, ligne.id)} type="text" className='border border-fonce-400 w-[90%] py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='Saisir le designation de la ligne...' />
                                                        <button onClick={() => supprimerLigne(ligne.id)} className="cursor-pointer w-10 h-10 rounded-xl bg-fonce-200 flex items-center justify-center">
                                                            <X size={24} strokeWidth={2} className="stroke-gray-500" />
                                                        </button>
                                                    </div>                                    
                                                    <div className='w-full flex items-center justify-between'>
                                                        <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                            <span className="text-gray-50 text-lg font-medium">Quantité</span>
                                                            <input value={ligne.quantite?.toString() ?? ""} onChange={(e) => modifierQuantite(e, ligne.id)} type="text" className='border border-fonce-200 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-300 focus:border focus:border-gray-300 placeholder:text-gray-400' placeholder='0' />
                                                        </div>
                                                        <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                            <span className="text-gray-50 text-lg font-medium">Type Quantité</span>
                                                            <div className='w-full'>
                                                                <Dropdown
                                                                    value={ligne.typeQuantite ?? ""}                               
                                                                    options={["Piece", "Jour", "Mois", "Annee", "Autres"]}
                                                                    optionLabel="label"
                                                                    onChange={(e) => modifierTypeQuantite(e, ligne.id)}
                                                                    placeholder="Aucun..."
                                                                    highlightOnSelect={false}
                                                                    checkmark={false}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                            <span className="text-gray-50 text-lg font-medium">Prix Unitaire</span>
                                                            <input value={ligne.prixUnitaire?.toString() ?? ""} onChange={e => modifierPrixU(e, ligne.id)} type="text" className='border border-fonce-200 w-full py-1.5 px-2 rounded-lg text-gray-50 text-base font-medium outline-none focus:ring-gray-300 focus:border focus:border-gray-300 placeholder:text-gray-400' placeholder='0' />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }                                        

                                        return (                                            
                                            <div key={index} className="w-[80%] border-b border-gray-600 pb-4 flex items-center justify-start flex-col gap-4">                                                
                                                <SelecteurProduitLigneFacture ligne={ligne} ajouterProduit={ajouterProduit} supprimerLigne={supprimerLigne} />
                                                {   
                                                    ligne.produitId &&
                                                    <ProduitAddCard                                                
                                                        produitProps={produits.find(e => e.id === ligne.produitId) as ProduitType}
                                                        btnSupprimer={true} 
                                                        handleSupprimer={supprimerLigne}
                                                        ligneId={ligne.id}                                     
                                                    />
                                                }
                                                <div className='w-full flex items-center justify-between'>
                                                    <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                        <span className="text-gray-50 text-lg font-semibold">Quantité</span>
                                                        <input value={ligne.quantite?.toString() ?? ""} onChange={(e) => modifierQuantite(e, ligne.id)} type="text" className='border border-fonce-200 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-semibold outline-none focus:ring-gray-300 focus:border focus:border-gray-300 placeholder:text-gray-400' placeholder='0' />
                                                    </div>
                                                    <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                        <span className="text-gray-50 text-lg font-medium">Type Quantité</span>
                                                        <div className='w-full'>
                                                            <Dropdown
                                                                value={ligne.typeQuantite ?? ""}                               
                                                                options={["Piece", "Jour", "Mois", "Annee", "Autres"]}
                                                                optionLabel="label"
                                                                onChange={(e) => modifierTypeQuantite(e, ligne.id)}
                                                                placeholder="Aucun..."
                                                                highlightOnSelect={false}
                                                                checkmark={false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='w-[32%] flex items-start justify-center flex-col gap-3'>
                                                        <span className="text-gray-50 text-lg font-semibold">Prix Unitaire</span>
                                                        <input value={ligne.prixUnitaire?.toString() ?? ""} onChange={e => modifierPrixU(e, ligne.id)} type="text" className='border border-fonce-200 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-semibold outline-none focus:ring-gray-300 focus:border focus:border-gray-300 placeholder:text-gray-400' placeholder='0' />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }                                                                
                                <div className='flex items-center justify-center gap-4'>
                                    <button onClick={() => ajouterLigne(false)} className={`cursor-pointer flex items-center justify-center group`}>
                                        <Plus size={16} strokeWidth={2} className="stroke-vert group-hover:underline" />
                                        <span className="text-vert text-lg font-semibold group-hover:underline">Produit</span>
                                    </button>
                                    <button onClick={() => ajouterLigne(true)} className={`cursor-pointer flex items-center justify-center group`}>
                                        <Plus size={16} strokeWidth={2} className="stroke-vert group-hover:underline" />
                                        <span className="text-vert text-lg font-semibold group-hover:underline">Designation</span>
                                    </button>
                                </div>                                
                            </div>
                        </div>
                    </form>
                </div>
                <div className=' bg-fonce-800 p-4 rounded-xl w-1/2 h-full'>
                    
                </div>
            </div>
        </section>
    )
}

export default NouveauFacture
