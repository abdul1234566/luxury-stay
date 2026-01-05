// import { NavLinks } from '@/types/navlink'
// import clsx from 'clsx'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// interface NavLinkProps {
//   item: NavLinks;
//   onClick: () => void;
// }

// const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
//   const path = usePathname()
//   const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`

//   const linkclasses = clsx(
//     'py-3 text-3xl sm:text-5xl font-medium text-white/40 rounded-full group-hover:text-primary',
//     {
//       '!text-primary': item.href === path,
//       'text-primary': path.startsWith(itemLabelToPath),
//     }
//   )

//   const liststyle = clsx(
//     'w-0 h-0.5 bg-primary transition-all duration-300',
//     {
//       '!block w-6 mr-4': item.href === path,
//       'block w-6': path.startsWith(itemLabelToPath),
//       'group-hover:block group-hover:w-6 group-hover:mr-4': true,
//     }
//   )

//   return (
//     <li className='flex items-center group w-fit'>
//       <div className={liststyle} />
//       <Link href={item.href} className={linkclasses} onClick={onClick}>
//         {item.label}
//       </Link>
//     </li>
//   )
// }

// export default NavLink





// import { NavLinks } from '@/types/navlink'
// import clsx from 'clsx'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useTheme } from 'next-themes'

// interface NavLinkProps {
//   item: NavLinks;
//   onClick: () => void;
// }

// const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
//   const path = usePathname()
//   const { theme } = useTheme()
//   const isDark = theme === 'dark'
//   const activeColor = 'text-yellow-500' // golden color for active
//   const inactiveColor = isDark ? 'text-white/80 hover:text-yellow-400' : 'text-gray-800 hover:text-yellow-600'

//   const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`

//   const linkClasses = clsx(
//     'py-2 px-2 text-sm sm:text-base font-medium rounded transition-colors duration-300',
//     {
//       [activeColor]: item.href === path || path.startsWith(itemLabelToPath),
//       [inactiveColor]: !(item.href === path || path.startsWith(itemLabelToPath)),
//     }
//   )

//   const underlineClasses = clsx(
//     'h-0.5 bg-yellow-500 transition-all duration-300',
//     {
//       'w-6 mr-2': item.href === path || path.startsWith(itemLabelToPath),
//       'w-0': !(item.href === path || path.startsWith(itemLabelToPath)),
//     }
//   )

//   return (
//     <li className='flex items-center group w-fit'>
//       <div className={underlineClasses} />
//       <Link href={item.href} className={linkClasses} onClick={onClick}>
//         {item.label}
//       </Link>
//     </li>
//   )
// }

// export default NavLink






'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export interface NavLinks {
  label: string;
  href: string;
}

export interface NavLinkProps {
  item: NavLinks;
  onClick?: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick, className }) => {
  const path = usePathname();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isActive = path === item.href;

  const linkClasses = clsx(
    'py-2 px-2 text-sm sm:text-base font-medium rounded transition-colors duration-300',
    {
      'text-yellow-500': isActive,
      'text-gray-800 hover:text-yellow-600': !isActive && !isDark,
      'text-white/80 hover:text-yellow-400': !isActive && isDark,
    },
    className
  );

  return (
    <li>
      <Link href={item.href} onClick={onClick} className={linkClasses}>
        {item.label}
      </Link>
    </li>
  );
};

export default NavLink;
