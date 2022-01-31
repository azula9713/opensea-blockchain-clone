import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { FaBars } from 'react-icons/fa'

import openseaLogo from '../assets/opensea.png'

const Header: FC = () => {
  const [headerOpen, setHeaderOpen] = useState(false)

  const style = {
    wrapper: `bg-[#04111d] left-0 right-0 top-0 px-[1.2rem] py-[0.8rem] flex justify-between lg:justify-start items-center`,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `hidden lg:flex flex-1 mx-[0.8rem] xl:w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: `hidden lg:flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,

    mobileHeaderIcon: `flex flex-col lg:hidden`,
    mobileHeaderSidebar: `lg:hidden fixed top-0 right-0 bottom-0 bg-white w-[300px] z-20 p-[20px] flex-col flex transition-transform duration-300 ${
      headerOpen ? 'translate-x-0' : 'translate-x-full'
    }`,
    mobileHeaderItems: `lg:hidden flex flex-col items-end justify-center`,
  }

  const Items: FC = () => {
    return (
      <>
        <div className={style.headerItem}>Stats</div>
        <div className={style.headerItem}>Resources</div>
        <div className={style.headerItem}>Create</div>
        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
      </>
    )
  }

  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={openseaLogo} height={40} width={40} />
          <div className={style.logoText}>Opensea</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          type="search"
          className={style.searchInput}
          placeholder="Search items, collections and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <Link href="/collections/0x7370315Ba25589333Cb6964f1530381f71E28601">
          <div className={style.headerItem}>Collections</div>
        </Link>
        <Items />
      </div>
      <div className={style.mobileHeaderIcon}>
        <button
          onClick={() => {
            setHeaderOpen(true)
          }}
        >
          <FaBars color="white" />
        </button>
      </div>
      <div className={style.mobileHeaderSidebar}>
        <div className={style.mobileHeaderItems}>
          <button
            onClick={() => {
              setHeaderOpen(false)
            }}
          >
            <AiOutlineClose />
          </button>
          <Items />
        </div>
      </div>
    </div>
  )
}

export default Header
