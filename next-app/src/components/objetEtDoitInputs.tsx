import { useFormContext } from "react-hook-form";

const ObjetEtDoitInputs = () => {
    const { register } = useFormContext();
  
    return (
      <>
        <div className='w-3/5 flex flex-col gap-2.5'>
          <span className='text-gray-50 text-lg font-medium'>Objet</span>
          <input {...register("objet")} className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Facture de paiement' />
        </div>
        <div className='w-3/5 flex flex-col gap-2.5'>
          <span className='text-gray-50 text-lg font-medium'>Doit</span>
          <input {...register("doit")} className='border border-fonce-400 w-full py-1.5 px-2 rounded-lg text-gray-50 text-lg font-medium outline-none focus:ring-gray-600 focus:border-gray-600 placeholder:text-gray-400' placeholder='ex: Nom du client' />
        </div>
      </>
    );
};
  
 export default ObjetEtDoitInputs;