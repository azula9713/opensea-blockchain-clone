import { FC, useEffect, useState } from 'react'
import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { MarketplaceModule } from '@3rdweb/sdk'

interface Props {
  isListed: any
  selectedNft: any
  listings: any
  marketplaceModule: any
}

interface MarketNFT {
  asset: {
    id: string
  }
}

interface SelectedMarketNFT {
  id: string
}

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const Purchase: FC<Props> = ({
  isListed,
  selectedNft,
  listings,
  marketplaceModule,
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState<SelectedMarketNFT>(
    { id: '' }
  )
  const [enableButton, setEnableButton] = useState(false)

  const confirmPurchase = (toastHandler = toast) => {
    toastHandler.success('Purchase successful!', {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })
  }

  const buyItem = async (
    listingId: string = selectedMarketNft.id,
    quantityDesired: number = 1,
    module: MarketplaceModule = marketplaceModule
  ) => {
    try {
      await module.buyoutDirectListing({ listingId, quantityDesired })
      confirmPurchase()
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find(
          (marketNft: MarketNFT) => marketNft.asset?.id === selectedNft.id
        )
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-center" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default Purchase
