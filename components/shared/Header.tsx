import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import Navitems from './Navitems'

const Header = () => {
  return (
    <div>
      <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
           <Link href="/" className='w-36'>
             <Image 
                 src="" width={120} height={30} alt="college Management app"
             />
           </Link>
           <SignedIn>
            <nav  className="md:flex-between hidden w-full max-w-xs" >
              <Navitems/>
            </nav>
           </SignedIn>
           <div className="">
              <SignedIn>
                <UserButton afterSignOutUrl='/' />
              </SignedIn>
               <SignedOut>
                <Button asChild className="rounded-full" size="lg">
                  <Link href='/sign-in'>
                     Login
                  </Link>
                </Button>
               </SignedOut>
           </div>
        </div>
      </header>

    </div>
  )
}

export default Header

