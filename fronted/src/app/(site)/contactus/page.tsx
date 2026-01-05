// "use client"
// import { Icon } from '@iconify/react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import toast from 'react-hot-toast';

// export default function ContactUs() {
//   const { data: session } = useSession();
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.phone || !formData.email || !formData.message) {
//       setErrorMessage('Please fill in all fields');
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const response = await fetch('http://localhost:3001/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userId: session?.user?.id || null
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage('Message sent successfully! We will get back to you soon.');
//         toast.success('Message sent successfully! We will get back to you soon.');
//         setFormData({
//           name: '',
//           phone: '',
//           email: '',
//           message: ''
//         });
//       } else {
//         setErrorMessage(data.message || 'Failed to send message');
//         toast.error(data.message || 'Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setErrorMessage('Failed to send message. Please try again.');
//       toast.error('Failed to send message. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
//       <div className='mb-16'>
//         <div className='flex gap-2.5 items-center justify-center mb-3'>
//           <span>
//             <Icon
//               icon={'ph:house-simple-fill'}
//               width={20}
//               height={20}
//               className='text-primary'
//             />
//           </span>
//           <p className='text-base font-semibold text-badge dark:text-white/90'>
//             Contact us
//           </p>
//         </div>
//         <div className='text-center'>
//           <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
//             Have questions? ready to help!
//           </h3>
//           <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
//             Looking for your dream home or ready to sell? Our expert team offers
//             personalized guidance and market expertise tailored to you.
//           </p>
//         </div>
//       </div>
//       {/* form */}
//       <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
//         <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
//           <div className='relative w-fit'>
//             <Image
//               src={'/images/contactUs/contactUs.jpg'}
//               alt='wall'
//               width={497}
//               height={535}
//               className='rounded-2xl brightness-50 h-full'
//               unoptimized={true}
//             />
//             <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
//               <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
//                 Contact information
//               </h5>
//               <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
//                 Ready to find your dream home or sell your property? We’re here
//                 to help!
//               </p>
//             </div>
//             <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
//               <Link href={'/'} className='w-fit'>
//                 <div className='flex items-center gap-4 group w-fit'>
//                   <Icon icon={'ph:phone'} width={32} height={32} />
//                   <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
//                     +1 0239 0310 1122
//                   </p>
//                 </div>
//               </Link>
//               <Link href={'/'} className='w-fit'>
//                 <div className='flex items-center gap-4 group w-fit'>
//                   <Icon icon={'ph:envelope-simple'} width={32} height={32} />
//                   <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
//                     support@gleamer.com
//                   </p>
//                 </div>
//               </Link>
//               <div className='flex items-center gap-4'>
//                 <Icon icon={'ph:map-pin'} width={32} height={32} />
//                 <p className='text-sm xs:text-base mobile:text-xm font-normal'>
//                   Blane Street, Manchester
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className='flex-1/2'>
//             {/* Success and Error Messages */}
//             {successMessage && (
//               <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   {successMessage}
//                 </div>
//               </div>
//             )}
            
//             {errorMessage && (
//               <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   {errorMessage}
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className='flex flex-col gap-8'>
//                 <div className='flex flex-col lg:flex-row gap-6'>
//                   <input
//                     type='text'
//                     name='name'
//                     id='name'
//                     autoComplete='name'
//                     placeholder='Name*'
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
//                   />
//                   <input
//                     type='tel'
//                     name='phone'
//                     id='phone'
//                     autoComplete='tel'
//                     placeholder='Phone number*'
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
//                   />
//                 </div>
//                 <input
//                   type='email'
//                   name='email'
//                   id='email'
//                   autoComplete='email'
//                   placeholder='Email address*'
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline'
//                 />
//                 <textarea
//                   rows={8}
//                   cols={50}
//                   name='message'
//                   id='message'
//                   placeholder='Write here your message'
//                   required
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline'></textarea>
//                 <button 
//                   type='submit'
//                   disabled={isSubmitting}
//                   className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
//                   {isSubmitting ? 'Sending...' : 'Send message'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }







// "use client";
// import { Icon } from '@iconify/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import toast from 'react-hot-toast';

// export default function ContactUs() {
//   const { data: session } = useSession();
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.email || !formData.message) {
//       setErrorMessage('Please fill in all fields');
//       toast.error('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const response = await fetch('http://localhost:3001/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userId: session?.user?.id || null
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage('Message sent successfully! We will get back to you soon.');
//         toast.success('Message sent successfully! We will get back to you soon.');
//         setFormData({
//           name: '',
//           phone: '',
//           email: '',
//           message: ''
//         });
//       } else {
//         setErrorMessage(data.message || 'Failed to send message');
//         toast.error(data.message || 'Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setErrorMessage('Failed to send message. Please try again.');
//       toast.error('Failed to send message. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
//       {/* Header */}
//       <div className='mb-16 text-center'>
//         <div className='flex gap-2.5 items-center justify-center mb-3'>
//           <Icon icon={'ph:house-simple-fill'} width={20} height={20} className='text-gold' />
//           <p className='text-base font-semibold text-black dark:text-white/90'>Contact us</p>
//         </div>
//         <h3 className='text-4xl sm:text-5xl font-semibold text-black dark:text-white mb-3 leading-snug'>
//           Have questions? ready to help!
//         </h3>
//         <p className='text-sm font-normal text-black/60 dark:text-white/60 leading-6'>
//           Looking for your dream home or ready to sell? Our expert team offers personalized guidance and market expertise tailored to you.
//         </p>
//       </div>

//       {/* Card */}
//       <div className='bg-white dark:bg-[#2C2C2C] border border-black/10 dark:border-white/20 rounded-2xl p-6 shadow-lg dark:shadow-black/40'>
//         <div className='flex flex-col lg:flex-row gap-6'> {/* Reduced gap from 12 to 6 */}
          
//           {/* Left Image Section */}
//           <div className='relative w-full lg:w-7/12 rounded-2xl overflow-hidden shadow-lg'>
//             <Image
//               src={'/images/contactUs/contactUs.jpg'}
//               alt='Contact Us'
//               width={600}
//               height={535}
//               className='rounded-2xl object-cover brightness-75 dark:brightness-50'
//               unoptimized={true}
//             />
//             <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2 max-w-[90%]'>
//               <h5 className='text-xl xs:text-2xl font-semibold text-white'>Contact information</h5>
//               <p className='text-sm xs:text-base text-white/80'>
//                 Ready to find your dream home or sell your property? We’re here to help!
//               </p>
//             </div>
//             <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
//               <Link href={'/'} className='w-fit'>
//                 <div className='flex items-center gap-4 group'>
//                   <Icon icon={'ph:phone'} width={28} height={28} className='text-gold' />
//                   <p className='text-sm xs:text-base group-hover:text-gold transition'>+1 0239 0310 1122</p>
//                 </div>
//               </Link>
//               <Link href={'/'} className='w-fit'>
//                 <div className='flex items-center gap-4 group'>
//                   <Icon icon={'ph:envelope-simple'} width={28} height={28} className='text-gold' />
//                   <p className='text-sm xs:text-base group-hover:text-gold transition'>support@gleamer.com</p>
//                 </div>
//               </Link>
//               <div className='flex items-center gap-4'>
//                 <Icon icon={'ph:map-pin'} width={28} height={28} className='text-gold' />
//                 <p className='text-sm xs:text-base'>Blane Street, Manchester</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Form Section */}
//           <div className='flex-1 flex flex-col justify-between'> {/* Ensure form fills vertical space */}
//             <div>
//               {successMessage && (
//                 <div className='mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 rounded-lg'>
//                   {successMessage}
//                 </div>
//               )}
//               {errorMessage && (
//                 <div className='mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg'>
//                   {errorMessage}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
//                 <div className='flex flex-col lg:flex-row gap-6'>
//                   <input
//                     type='text'
//                     name='name'
//                     placeholder='Name*'
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className='px-6 py-3.5 w-full border border-black/10 dark:border-white/20 rounded-full outline-gold focus:outline-gold dark:bg-[#2C2C2C] dark:text-white transition'
//                   />
//                   <input
//                     type='tel'
//                     name='phone'
//                     placeholder='Phone number*'
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     className='px-6 py-3.5 w-full border border-black/10 dark:border-white/20 rounded-full outline-gold focus:outline-gold dark:bg-[#2C2C2C] dark:text-white transition'
//                   />
//                 </div>
//                 <input
//                   type='email'
//                   name='email'
//                   placeholder='Email address*'
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className='px-6 py-3.5 w-full border border-black/10 dark:border-white/20 rounded-full outline-gold focus:outline-gold dark:bg-[#2C2C2C] dark:text-white transition'
//                 />
//                 <textarea
//                   name='message'
//                   placeholder='Write your message here...'
//                   rows={6}
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   required
//                   className='px-6 py-3.5 w-full border border-black/10 dark:border-white/20 rounded-2xl outline-gold focus:outline-gold dark:bg-[#2C2C2C] dark:text-white transition resize-none'
//                 />
//                 <button
//                   type='submit'
//                   disabled={isSubmitting}
//                   className='px-8 py-4 w-full lg:w-auto bg-gradient-to-r from-gold to-[#a6871f] text-black dark:text-white font-semibold rounded-full 
//                              hover:from-[#a6871f] hover:to-[#a6871f] dark:hover:from-[#a6871f] dark:hover:to-[#a6871f] disabled:opacity-50 disabled:cursor-not-allowed transition'
//                 >
//                   {isSubmitting ? 'Sending...' : 'Send message'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client"
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function ContactUs() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({ name:'', phone:'', email:'', message:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e:any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(!formData.name || !formData.phone || !formData.email || !formData.message){
      setErrorMessage('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(''); setErrorMessage('');

    try{
      const res = await fetch('http://localhost:3001/contact',{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ ...formData, userId:session?.user?.id || null })
      });

      const data = await res.json();
      if(res.ok){
        setSuccessMessage('Message sent successfully! We will get back to you soon.');
        toast.success('Message sent successfully!');
        setFormData({name:'',phone:'',email:'',message:''});
      } else { toast.error(data.message || "Failed."); }
    } catch{ toast.error("Network error."); }
    finally{ setIsSubmitting(false); }
  }

  return (
    <>
    <div className='full-page'>

      {/* Heading */}
      <div className='text-center mb-16'>
        <div className='flex items-center gap-2 justify-center'>
          <Icon icon="ph:house-simple-fill" width="22"
          className='text-[#A78256] dark:text-[#C9A646]'/>
          <p className='text-sm font-medium text-[#5B4E43] dark:text-[#E5D9C5]'>Contact Us</p>
        </div>

        <h3 className='title'>Have questions? We're ready to help!</h3>
        <p className='subtitle'>Reach out — support is one message away.</p>
      </div>

      {/* Main Card */}
      <div className='card-container'>

        <div className='card-grid'>

          {/* IMAGE PANEL */}
          <div className='img-box'>
            <Image unoptimized width={520} height={560}
            src="/images/contactUs/contactUs.jpg"
            alt="contact" className='img'/>

            <div className="img-label">
              <h4>Contact Information</h4>
              <p>We're here for guidance & real support.</p>
            </div>

            <div className='img-links'>
              <Link href="#" className='link'><Icon icon="ph:phone" width="24"/><span>+1 0239 0310 1122</span></Link>
              <Link href="#" className='link'><Icon icon="ph:envelope-simple" width="24"/><span>support@gleamer.com</span></Link>
              <p className='flex gap-2 items-center link'><Icon icon="ph:map-pin" width="24"/><span>Blane Street, Manchester</span></p>
            </div>
          </div>

          {/* FORM */}
          <div className='form-area'>
            {successMessage && <div className="success">{successMessage}</div>}
            {errorMessage && <div className="error">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="form">

              <div className='flex gap-6 flex-col md:flex-row'>
                <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name*" className='input'/>
                <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone*" className='input'/>
              </div>

              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address*" className='input'/>
              <textarea name="message" rows={7} value={formData.message} onChange={handleInputChange} placeholder="Write your message..." className='textarea'/>

              <button disabled={isSubmitting} className='btn'>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>

    {/* 🔥 FULL STYLING INSIDE THIS FILE — NO GLOBAL CSS NEEDED */}
    <style jsx global>{`
      
      .full-page{
        width:100%; min-height:100vh; padding:130px 4% 80px;
        background:#F5F0E1; color:#3B2F2F;
      }
      :global(.dark) .full-page{ background:#1E1B18; color:#F2E9E1; }

      /* Heading */
      .title{ font-size:42px; font-weight:600; margin-top:6px; }
      .subtitle{ margin-top:10px; opacity:.75; }

      /* Main Card */
      .card-container{
        width:100%; max-width:1220px; margin:auto;
        background:#F0E3D6; border:1px solid #DCCAB0;
        border-radius:25px; padding:50px;
      }
      :global(.dark) .card-container{
        background:#2C2B28; border-color:#3A352F;
      }

      .card-grid{
        display:grid; gap:40px;
        grid-template-columns:1fr 1fr;
      }
      @media(max-width:950px){ .card-grid{ grid-template-columns:1fr; } }

      /* IMAGE SECTION */
      .img-box{ position:relative; border-radius:22px; overflow:hidden; }
      .img{ width:100%; height:100%; object-fit:cover; }

      .img-label{
        position:absolute; top:20px; left:20px; color:white;
        text-shadow:0 3px 10px rgba(0,0,0,.6);
      }

      .img-links{
        position:absolute; bottom:25px; left:25px;
        display:flex; flex-direction:column; gap:12px; color:white;
      }
      .link{ display:flex; gap:10px; align-items:center; }
      .link:hover span{ color:#DCCAB0; transition:.3s; }

      /* FORM */
      .form-area{ width:100%; }
      .form{ display:flex; flex-direction:column; gap:18px; }

      .input, .textarea{
        width:100%; background:white; border:1px solid #DCCAB0;
        border-radius:32px; padding:15px 22px; transition:.3s;
      }
      .textarea{ border-radius:18px; }

      :global(.dark) .input, :global(.dark) .textarea{
        background:#3A352F; border-color:#6B5E4D;
      }

      .input:focus, .textarea:focus{
        border-color:#A78256; box-shadow:0 0 0 2px #A7825630;
      }
      :global(.dark) .input:focus, :global(.dark) .textarea:focus{
        border-color:#C9A646; box-shadow:0 0 0 2px #C9A64630;
      }

      /* BUTTON */
      .btn{
        width:220px; margin:auto; margin-top:8px;
        padding:14px 0; border-radius:40px; font-weight:600;
        background:#DCCAB0; color:#3B2F2F; transition:.3s;
      }
      .btn:hover{ background:#CBB292; }
      :global(.dark) .btn{ background:#A78256; color:#FFF1CE; }
      :global(.dark) .btn:hover{ background:#C49A47; }
      .btn:disabled{ opacity:.4; }

      /* Alerts */
      .success{ background:#d7f7dd; border:1px solid #49b96d; padding:10px 14px; border-radius:10px; }
      .error{ background:#ffd6d6; border:1px solid #b94f4f; padding:10px 14px; border-radius:10px; }
    `}</style>
    </>
  )
}
