import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <>
      <Image
        src={'/images/header/logo_dark.png'}
        alt='logo'
        width={10}
        height={8}
        unoptimized={true}
        className='dark:hidden'
      />
      <Image
        src={'/images/header/logo_light.png'}
        alt='logo'
        width={10}
        height={8}
        unoptimized={true}
        className='dark:block hidden'
      />
    </>
  )
}

export default Logo
