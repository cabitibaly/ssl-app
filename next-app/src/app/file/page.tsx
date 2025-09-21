"use client";
import { FileUpload } from 'primereact/fileupload';
import { useState } from 'react'

const File = () => {
    const [progress, setProgress] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    const handleClear = () => {
        setVisible(false);
        setProgress(0);
    }

    return (
        <div className="relative p-6 bg-noir w-full h-screen flex items-center justify-center flex-col gap-4">            
            <div id='upload' className='relative border border-fonce-400 bg-fonce-600 rounded-xl w-2/5'>
                <div className='absolute top-20 border-b border-fonce-400 w-full' />
                <FileUpload 
                    name="image" 
                    customUpload
                    // uploadHandler={(e) => uploadHandler(e.files)}
                    onSelect={() => setVisible(true)}
                    onClear={() => handleClear()}
                    onRemove={() => handleClear()}
                    multiple={true}
                    accept="image/*" 
                    emptyTemplate={<p className="m-0">Faites glisser et déposez un fichier ici pour le téléverser.</p>}
                    progressBarTemplate={() => <div className={`rounded-full bg-gray-500 h-1 absolute top-0 left-0 w-full transition-all duration-200 ease-in-out ${visible ? "" : "hidden"}`}><div className="h-full bg-vert rounded-full transition-all ease-linear duration-200" style={{ width: `${progress}%` }}></div></div>}
                    chooseLabel='Choisir'
                    uploadLabel='Téléverser'
                    cancelLabel='Annuler'
                />
            </div>
        </div>
    )
}

export default File
